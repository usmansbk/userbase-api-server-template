import type { MutationResponse } from "types/graphql";
import type { AppContext } from "types";
import dayjs from "@/utils/dayjs";
import { DELETE_USER_PREFIX } from "@/constants/cachePrefixes";
import { DELETE_ACCOUNT_TOKEN_EXPIRES_IN } from "@/constants/limits";
import { UserStatus } from "@prisma/client";

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

          return {
            success: true,
            message: t("mutation.requestDeleteAccount.message", {
              context: user.status,
            }),
          };
        }

        const cacheKey = `${DELETE_USER_PREFIX}:${user.email}`;
        const sentToken = await redisClient.get(cacheKey);

        if (!sentToken) {
          const expiresIn = dayjs
            .duration(...DELETE_ACCOUNT_TOKEN_EXPIRES_IN)
            .asSeconds();

          const token = jwtClient.signForAllClients(
            { id: user.email },
            {
              expiresIn,
            },
          );

          console.log(token);

          await redisClient.setex(cacheKey, expiresIn, token);

          emailClient.send({
            message: {
              to: user.email,
            },
            locals: {
              locale: user.language,
              name: user.firstName,
              link: token, // TODO: use universal link
            },
          });
        }
      }

      return {
        success: true,
        message: t("mutation.requestDeleteAccount.message"),
      };
    },
  },
};