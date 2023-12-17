import type {
  MutationSendSmsLoginOtpToUsersArgs,
  MutationResponse,
} from "types/graphql";
import type { AppContext } from "types";
import getOTP from "@/utils/getOTP";
import { PHONE_NUMBER_LOGIN_OTP_PREFIX } from "@/constants/cachePrefixes";
import { PHONE_NUMBER_OTP_EXPIRES_IN } from "@/constants/limits";
import dayjs from "@/utils/dayjs";

export default {
  Mutation: {
    async sendSMSLoginOTPToUsers(
      _parent: unknown,
      { inputs }: MutationSendSmsLoginOtpToUsersArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, smsClient, redisClient, t } = context;

      const users = await prismaClient.user.findMany({
        where: {
          phoneNumber: {
            in: inputs.map((input) => input.phoneNumber),
          },
        },
      });

      users.forEach((user) => {
        (async () => {
          const phoneNumber = user.phoneNumber!;
          const otp = getOTP();

          const cacheKey = `${PHONE_NUMBER_LOGIN_OTP_PREFIX}:${phoneNumber}`;
          await redisClient.setex(
            cacheKey,
            dayjs.duration(...PHONE_NUMBER_OTP_EXPIRES_IN).asSeconds(),
            otp,
          );

          smsClient.sendMessage({
            phoneNumber,
            text: otp,
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
