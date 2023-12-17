import type {
  MutationSendEmailLoginOtpToUsersArgs,
  MutationResponse,
} from "types/graphql";
import type { AppContext } from "types";
import getOTP from "@/utils/getOTP";
import { EMAIL_LOGIN_OTP_PREFIX } from "@/constants/cachePrefixes";
import { LOGIN_OTP_EXPIRES_IN } from "@/constants/limits";
import dayjs from "@/utils/dayjs";
import { EMAIL_LOGIN_OTP_TEMPLATE } from "@/constants/templates";

export default {
  Mutation: {
    async sendEmailLoginOTPToUsers(
      _parent: unknown,
      { inputs }: MutationSendEmailLoginOtpToUsersArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, emailClient, redisClient, t } = context;

      const users = await prismaClient.user.findMany({
        where: {
          email: {
            in: inputs.map((input) => input.email),
          },
        },
      });

      users.forEach((user) => {
        (async () => {
          const { email, firstName, language } = user;
          const otp = getOTP();
          const cacheKey = `${EMAIL_LOGIN_OTP_PREFIX}:${email}`;

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
              name: firstName,
              locale: language,
              otp,
            },
          });
        })();
      });

      return {
        success: true,
        message: t("mutation.sendEmailLoginOTPToUsers.message"),
      };
    },
  },
};
