import type { AppContext } from "types";
import type {
  MutationResponse,
  MutationSendPhoneNumberVerificationSmsToUsersArgs,
} from "types/graphql";

import { VERIFY_PHONE_NUMBER_PREFIX } from "@/constants/cachePrefixes";
import { PHONE_NUMBER_VERIFICATION_TOKEN_EXPIRES_IN } from "@/constants/limits";
import dayjs from "@/utils/dayjs";
import getOTP from "@/utils/getOTP";

export default {
  Mutation: {
    async sendPhoneNumberVerificationSMSToUsers(
      _parent: unknown,
      { inputs }: MutationSendPhoneNumberVerificationSmsToUsersArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, smsClient, redisClient, t } = context;

      const users = await prismaClient.user.findMany({
        where: {
          phoneNumber: {
            in: inputs.map((input) => input.phoneNumber),
          },
          isPhoneNumberVerified: {
            not: true,
          },
        },
      });

      users.forEach((user) => {
        (async () => {
          const phoneNumber = user.phoneNumber!;
          const token = getOTP();
          const cacheKey = `${VERIFY_PHONE_NUMBER_PREFIX}:${phoneNumber}`;

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
        })();
      });

      return {
        success: true,
        message: t("mutation.sendPhoneNumberVerificationSMSToUsers.message"),
      };
    },
  },
};
