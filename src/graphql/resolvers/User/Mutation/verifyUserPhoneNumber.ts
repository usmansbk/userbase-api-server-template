import type {
  MutationVerifyUserPhoneNumberArgs,
  MutationResponse,
} from "types/graphql";
import type { AppContext } from "types";
import { VERIFY_PHONE_NUMBER_PREFIX } from "@/constants/cachePrefixes";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import { UserStatus } from "@prisma/client";

export default {
  Mutation: {
    async verifyUserPhoneNumber(
      _parent: unknown,
      { input }: MutationVerifyUserPhoneNumberArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { redisClient, prismaClient, t } = context;

      const { token, phoneNumber } = input;

      const sentToken = await redisClient.getdel(
        `${VERIFY_PHONE_NUMBER_PREFIX}:${phoneNumber}`,
      );

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

      return {
        success: true,
        message: t("mutation.verifyUserPhoneNumber.message", {
          phoneNumber,
        }),
      };
    },
  },
};
