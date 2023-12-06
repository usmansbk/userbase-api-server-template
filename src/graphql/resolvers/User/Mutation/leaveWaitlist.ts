import type {
  MutationResponse,
  MutationLeaveWaitlistArgs,
} from "types/graphql";
import { UserStatus } from "@prisma/client";
import type { AppContext } from "types";

export default {
  Mutation: {
    async leaveWaitlist(
      _parent: unknown,
      { email }: MutationLeaveWaitlistArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, t } = context;

      const user = await prismaClient.user.findFirst({
        where: {
          email,
          status: UserStatus.Staged,
        },
      });

      if (user) {
        await prismaClient.user.delete({
          where: {
            id: user.id,
          },
        });
      }

      return {
        success: true,
        message: t("mutation.leaveWaitlist.message"),
      };
    },
  },
};
