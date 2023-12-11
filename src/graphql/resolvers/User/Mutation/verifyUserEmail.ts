import type {
  MutationVerifyUserEmailArgs,
  MutationResponse,
} from "types/graphql";
import type { AppContext } from "types";
import { VERIFY_EMAIL_OTP_PREFIX } from "@/constants/cachePrefixes";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import { UserStatus } from "@prisma/client";
import { WELCOME_TEMPLATE } from "@/constants/templates";

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
        const sentToken = await redisClient.getdel(
          `${VERIFY_EMAIL_OTP_PREFIX}:${decoded.email}`,
        );

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
