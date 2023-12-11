import dayjs from "@/utils/dayjs";
import { UserStatus } from "@prisma/client";
import getOTP from "@/utils/getOTP";
import { PHONE_NUMBER_LOGIN_OTP_PREFIX } from "@/constants/cachePrefixes";
import type {
  MutationRequestSmsLoginOtpArgs,
  MutationResponse,
} from "types/graphql";
import type { AppContext } from "types";
import { PHONE_NUMBER_OTP_EXPIRES_IN } from "@/constants/limits";

export default {
  Mutation: {
    async requestSMSLoginOTP(
      _parent: unknown,
      { phoneNumber }: MutationRequestSmsLoginOtpArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { redisClient, prismaClient, smsClient, t } = context;

      const cacheKey = `${PHONE_NUMBER_LOGIN_OTP_PREFIX}:${phoneNumber}`;
      const sentToken = await redisClient.get(cacheKey);

      if (!sentToken) {
        const user = await prismaClient.user.findFirst({
          where: {
            phoneNumber,
            isPhoneNumberVerified: true,
            status: UserStatus.Active,
          },
        });

        if (user) {
          const otp = getOTP();
          await redisClient.setex(
            cacheKey,
            dayjs.duration(...PHONE_NUMBER_OTP_EXPIRES_IN).asSeconds(),
            otp,
          );

          smsClient.sendMessage({
            phoneNumber,
            text: otp,
          });
        }
      }

      return {
        success: true,
        message: t("mutation.requestSMSLoginOTP.message", { phoneNumber }),
      };
    },
  },
};
