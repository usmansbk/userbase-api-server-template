import { UserStatus } from "@prisma/client";
import type { AppContext } from "types";
import type {
  MutationRequestEmailLoginOtpArgs,
  MutationResponse,
} from "types/graphql";

import { EMAIL_LOGIN_OTP_PREFIX } from "@/constants/cachePrefixes";
import { LOGIN_OTP_EXPIRES_IN } from "@/constants/limits";
import { EMAIL_LOGIN_OTP_TEMPLATE } from "@/constants/templates";
import dayjs from "@/utils/dayjs";
import getOTP from "@/utils/getOTP";

export default {
  Mutation: {
    async requestEmailLoginOTP(
      _parent: unknown,
      { email }: MutationRequestEmailLoginOtpArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, t, emailClient, redisClient } = context;

      const cacheKey = `${EMAIL_LOGIN_OTP_PREFIX}:${email}`;
      const sentOTP = await redisClient.get(cacheKey);

      if (!sentOTP) {
        const user = await prismaClient.user.findFirst({
          where: {
            email,
            status: UserStatus.Active,
            isEmailVerified: true,
          },
        });

        if (user) {
          const otp = getOTP();

          await redisClient.setex(
            cacheKey,
            dayjs.duration(...LOGIN_OTP_EXPIRES_IN).asSeconds(),
            otp,
          );

          emailClient.send({
            template: EMAIL_LOGIN_OTP_TEMPLATE,
            message: {
              to: email,
            },
            locals: {
              name: user.firstName,
              locale: user.language,
              otp,
            },
          });
        }
      }

      return {
        success: true,
        message: t("mutation.requestEmailLoginOTP.message"),
      };
    },
  },
};
