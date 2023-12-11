import type {
  MutationUpdateCurrentUserPhoneNumberArgs,
  User,
  UserResponse,
} from "types/graphql";
import type { AppContext } from "types";

export default {
  Mutation: {
    async updateCurrentUserPhoneNumber(
      _parent: unknown,
      { input }: MutationUpdateCurrentUserPhoneNumberArgs,
      context: AppContext,
    ): Promise<UserResponse> {
      const { phoneNumber } = input;
      const { prismaClient, currentUser, t } = context;

      let user = await prismaClient.user.findFirst({
        where: {
          id: currentUser!.id,
        },
      });

      if (user && user.phoneNumber !== input.phoneNumber) {
        user = await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            phoneNumber,
            isPhoneNumberVerified: false,
          },
        });
      }

      return {
        success: true,
        message: t("mutation.updateCurrentUserPhoneNumber.message"),
        user: user as unknown as User,
      };
    },
  },
};
