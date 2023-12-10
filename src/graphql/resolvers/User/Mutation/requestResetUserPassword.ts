import type {
  MutationRequestResetUserPasswordArgs,
  MutationResponse,
} from "types/graphql";
import type { AppContext } from "types";
import dayjs from "@/utils/dayjs";
import { PASSWORD_RESET_PREFIX } from "@/constants/cachePrefixes";
import { UserStatus } from "@prisma/client";
import { PASSWORD_RESET_TOKEN_EXPIRES_IN } from "@/constants/limits";
import { FORGOT_PASSWORD_TEMPLATE } from "@/constants/templates";

export default {
  Mutation: {
    async requestResetUserPassword(
      _parent: unknown,
      { email }: MutationRequestResetUserPasswordArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, redisClient, jwtClient, emailClient, t } = context;

      const cacheKey = `${PASSWORD_RESET_PREFIX}:${email}`;
      const sentToken = await redisClient.get(cacheKey);

      if (!sentToken) {
        const user = await prismaClient.user.findFirst({
          where: {
            email,
            status: {
              in: [
                UserStatus.Provisioned,
                UserStatus.Active,
                UserStatus.LockedOut,
                UserStatus.PasswordExpired,
                UserStatus.Recovery,
              ],
            },
          },
        });

        if (user) {
          const expiresIn = dayjs
            .duration(...PASSWORD_RESET_TOKEN_EXPIRES_IN)
            .asSeconds();

          const token = jwtClient.signForAllClients(
            { email },
            {
              expiresIn,
            },
          );

          await redisClient.setex(cacheKey, expiresIn, token);

          emailClient.send({
            template: FORGOT_PASSWORD_TEMPLATE,
            message: {
              to: email,
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
        message: t("mutation.requestResetUserPassword.message"),
      };
    },
  },
};
