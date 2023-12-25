import { UserStatus } from "@prisma/client";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import type { AppContext } from "types";
import type {
  MutationResponse,
  MutationVerifyUserEmailArgs,
} from "types/graphql";

import { VERIFY_EMAIL_OTP_PREFIX } from "@/constants/cachePrefixes";
import { WELCOME_TEMPLATE } from "@/constants/templates";
import AuthenticationError from "@/utils/errors/AuthenticationError";

export default {
  Mutation: {
    async verifyUserEmail(
      _parent: unknown,
      { input }: MutationVerifyUserEmailArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { jwtClient, prismaClient, redisClient, t, emailClient } = context;

      try {
        const decoded = jwtClient.verifyForAllClients(input.token as string);
        const cacheKey = `${VERIFY_EMAIL_OTP_PREFIX}:${decoded.email}`;
        const sentToken = await redisClient.get(cacheKey);

        if (!sentToken || sentToken !== input.token) {
          throw new AuthenticationError(
            t("mutation.verifyUserEmail.errors.message"),
          );
        }

        const user = await prismaClient.user.findFirst({
          where: {
            email: decoded.email,
            isEmailVerified: {
              not: true,
            },
            status: UserStatus.Provisioned,
          },
        });

        if (!user) {
          throw new AuthenticationError(
            t("mutation.verifyUserEmail.errors.message"),
          );
        }

        await prismaClient.user.update({
          where: {
            email: decoded.email,
          },
          data: {
            status: UserStatus.Active,
            isEmailVerified: true,
          },
        });

        await redisClient.del(cacheKey);

        emailClient.send({
          template: WELCOME_TEMPLATE,
          message: {
            to: user.email,
          },
          locals: {
            locale: user.language,
            name: user.firstName,
          },
        });

        return {
          success: true,
          message: t("mutation.verifyUserEmail.message"),
        };
      } catch (e) {
        if (e instanceof JsonWebTokenError || e instanceof TokenExpiredError) {
          throw new AuthenticationError(
            t("mutation.verifyUserEmail.errors.message"),
          );
        }
        throw e;
      }
    },
  },
};
