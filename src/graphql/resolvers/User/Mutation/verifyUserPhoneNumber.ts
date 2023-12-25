import { UserStatus } from "@prisma/client";
import type { AppContext } from "types";
import type {
  MutationResponse,
  MutationVerifyUserPhoneNumberArgs,
} from "types/graphql";

import { VERIFY_PHONE_NUMBER_PREFIX } from "@/constants/cachePrefixes";
import AuthenticationError from "@/utils/errors/AuthenticationError";

export default {
  Mutation: {
    async verifyUserPhoneNumber(
      _parent: unknown,
      { input }: MutationVerifyUserPhoneNumberArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { redisClient, prismaClient, t } = context;

      const { token, phoneNumber } = input;

      const cacheKey = `${VERIFY_PHONE_NUMBER_PREFIX}:${phoneNumber}`;
      const sentToken = await redisClient.get(cacheKey);

      if (!sentToken || sentToken !== token) {
        throw new AuthenticationError(
          t("mutation.verifyUserPhoneNumber.errors.message"),
        );
      }

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

      if (!user) {
        throw new AuthenticationError(
          t("mutation.verifyUserPhoneNumber.errors.message"),
        );
      }

      await prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          isPhoneNumberVerified: true,
        },
      });

      await redisClient.del(cacheKey);

      return {
        success: true,
        message: t("mutation.verifyUserPhoneNumber.message", {
          phoneNumber,
        }),
      };
    },
  },
};
