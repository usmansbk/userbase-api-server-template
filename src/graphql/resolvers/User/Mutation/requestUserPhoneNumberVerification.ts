import type {
  MutationRequestUserPhoneNumberVerificationArgs,
  MutationResponse,
} from "types/graphql";
import type { AppContext } from "types";
import dayjs from "@/utils/dayjs";
import { VERIFY_PHONE_NUMBER_PREFIX } from "@/constants/cachePrefixes";
import { UserStatus } from "@prisma/client";
import { PHONE_NUMBER_VERIFICATION_TOKEN_EXPIRES_IN } from "@/constants/limits";
import getOTP from "@/utils/getOTP";

export default {
  Mutation: {
    async requestUserPhoneNumberVerification(
      _parent: undefined,
      { phoneNumber }: MutationRequestUserPhoneNumberVerificationArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { redisClient, prismaClient, smsClient, t } = context;

      const cacheKey = `${VERIFY_PHONE_NUMBER_PREFIX}:${phoneNumber}`;
      const sentToken = await redisClient.get(cacheKey);

      if (!sentToken) {
        const user = await prismaClient.user.findFirst({
          where: {
            phoneNumber,
            status: {
              in: [UserStatus.Provisioned, UserStatus.Active],
            },
            isPhoneNumberVerified: {
              not: true,
            },
          },
        });

        if (user) {
          const token = getOTP();

          await redisClient.setex(
            cacheKey,
            dayjs
              .duration(...PHONE_NUMBER_VERIFICATION_TOKEN_EXPIRES_IN)
              .asSeconds(),
            token,
          );

          smsClient.sendMessage({
            phoneNumber,
            text: token,
          });
        }
      }

      return {
        success: true,
        message: t("mutation.requestUserPhoneNumberVerification.message", {
          phoneNumber,
        }),
      };
    },
  },
};
