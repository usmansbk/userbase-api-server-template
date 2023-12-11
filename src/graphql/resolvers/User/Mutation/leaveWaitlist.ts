import type {
  MutationResponse,
  MutationLeaveWaitlistArgs,
} from "types/graphql";
import { UserStatus } from "@prisma/client";
import type { AppContext } from "types";
import { JsonWebTokenError } from "jsonwebtoken";
import AuthenticationError from "@/utils/errors/AuthenticationError";

export default {
  Mutation: {
    async leaveWaitlist(
      _parent: unknown,
      { token }: MutationLeaveWaitlistArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, t, jwtClient } = context;

      try {
        const verified = jwtClient.verifyForAllClients(token as string);

        const user = await prismaClient.user.findFirst({
          where: {
            email: verified.email,
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
      } catch (e) {
        if (e instanceof JsonWebTokenError) {
          throw new AuthenticationError(t("mutation.leaveWaitlist.message"));
        }
        throw e;
      }
    },
  },
};
