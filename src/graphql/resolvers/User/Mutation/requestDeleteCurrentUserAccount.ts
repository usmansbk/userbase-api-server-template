import { UserStatus } from "@prisma/client";
import type { AppContext } from "types";
import type { MutationResponse } from "types/graphql";

import { DELETE_USER_PREFIX } from "@/constants/cachePrefixes";
import { DELETE_ACCOUNT_TOKEN_EXPIRES_IN } from "@/constants/limits";
import universalLinks from "@/constants/universalLinks";
import dayjs from "@/utils/dayjs";

export default {
  Mutation: {
    async requestDeleteCurrentUserAccount(
      _parent: unknown,
      _args: never,
      context: AppContext,
    ): Promise<MutationResponse> {
      const {
        currentUser,
        prismaClient,
        redisClient,
        jwtClient,
        emailClient,
        t,
      } = context;

      const user = await prismaClient.user.findUnique({
        where: {
          id: currentUser!.id,
        },
      });

      if (user) {
        if (user.status === UserStatus.Provisioned) {
          await prismaClient.user.delete({
            where: {
              id: user.id,
            },
          });
        } else {
          const cacheKey = `${DELETE_USER_PREFIX}:${user.email}`;
          const sentToken = await redisClient.get(cacheKey);

          if (!sentToken) {
            const expiresIn = dayjs
              .duration(...DELETE_ACCOUNT_TOKEN_EXPIRES_IN)
              .asSeconds();

            const token = jwtClient.signForAllClients(
              { email: user.email },
              {
                expiresIn,
              },
            );

            await redisClient.setex(cacheKey, expiresIn, token);

            emailClient.send({
              message: {
                to: user.email,
              },
              locals: {
                locale: user.language,
                name: user.firstName,
                link: universalLinks.deleteAccount.replace(":token", token),
              },
            });
          }
        }
      }

      return {
        success: true,
        message: t("mutation.requestDeleteAccount.message", {
          context: user?.status,
        }),
      };
    },
  },
};
