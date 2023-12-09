import type {
  MutationResponse,
  MutationRequestEmailLoginOtpArgs,
} from "types/graphql";
import type { AppContext } from "types";
import { UserStatus } from "@prisma/client";
import dayjs from "@/utils/dayjs";
import { EMAIL_LOGIN_OTP_PREFIX } from "@/constants/cachePrefixes";
import { LOGIN_OTP_EXPIRES_IN } from "@/constants/limits";
import { EMAIL_LOGIN_OTP_TEMPLATE } from "@/constants/templates";
import getOTP from "@/utils/getOTP";

export default {
  Mutation: {
    async requestEmailLoginOTP(
      _parent: unknown,
      { email }: MutationRequestEmailLoginOtpArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, t, emailClient, redisClient } = context;

      const user = await prismaClient.user.findFirst({
        where: {
          email,
          status: UserStatus.Active,
          isEmailVerified: true,
        },
      });

      if (user) {
        const cacheKey = `${EMAIL_LOGIN_OTP_PREFIX}:${email}`;
        const sentToken = await redisClient.get(cacheKey);

        if (!sentToken) {
          const token = getOTP();
          console.log(token);

          emailClient.send({
            template: EMAIL_LOGIN_OTP_TEMPLATE,
            message: {
              to: email,
            },
            locals: {
              locale: user.language,
              link: token, // TODO: use universal link
            },
          });

          await redisClient.setex(
            cacheKey,
            dayjs.duration(...LOGIN_OTP_EXPIRES_IN).asSeconds(),
            token,
          );
        }
      }

      return {
        success: true,
        message: t("mutation.requestEmailLoginOTP.message"),
      };
    },
  },
};
