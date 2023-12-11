import dayjs from "@/utils/dayjs";
import type {
  MutationRequestUserEmailVerificationArgs,
  MutationResponse,
} from "types/graphql";
import type { AppContext } from "types";
import { UserStatus } from "@prisma/client";
import { VERIFY_EMAIL_OTP_PREFIX } from "@/constants/cachePrefixes";
import { EMAIL_VERIFICATION_TOKEN_EXPIRES_IN } from "@/constants/limits";
import { VERIFY_EMAIL_TEMPLATE } from "@/constants/templates";
import universalLinks from "@/constants/universalLinks";

export default {
  Mutation: {
    async requestUserEmailVerification(
      _parent: unknown,
      { email }: MutationRequestUserEmailVerificationArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, t, emailClient, redisClient, jwtClient } = context;

      const cacheKey = `${VERIFY_EMAIL_OTP_PREFIX}:${email}`;
      const sentToken = await redisClient.get(cacheKey);

      if (!sentToken) {
        const user = await prismaClient.user.findFirst({
          where: {
            email,
            isEmailVerified: {
              not: true,
            },
            status: UserStatus.Provisioned,
          },
        });

        if (user) {
          const expiresIn = dayjs
            .duration(...EMAIL_VERIFICATION_TOKEN_EXPIRES_IN)
            .asSeconds();

          const token = jwtClient.signForAllClients(
            { email },
            {
              expiresIn,
            },
          );

          await redisClient.setex(cacheKey, expiresIn, token);

          emailClient.send({
            template: VERIFY_EMAIL_TEMPLATE,
            message: {
              to: email,
            },
            locals: {
              name: user.firstName,
              locale: user.language,
              link: universalLinks.verifyEmail.replace(":token", token),
            },
          });
        }
      }

      return {
        success: true,
        message: t("mutation.requestUserEmailVerification.message"),
      };
    },
  },
};
