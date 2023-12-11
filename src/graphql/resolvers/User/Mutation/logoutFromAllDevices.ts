import type { AppContext } from "types";
import type { MutationResponse } from "types/graphql";

export default {
  Mutation: {
    async logoutFromAllDevices(
      _parent: unknown,
      _args: never,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, currentUser, t } = context;

      await prismaClient.userSession.deleteMany({
        where: {
          id: {
            in: currentUser!.sessions.map((session) => session.id),
          },
        },
      });

      return {
        success: true,
        message: t("mutation.logoutFromAllDevices.message"),
      };
    },
  },
};
