import type { MutationDeleteUserSessionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserSession } from "@prisma/client";

export default {
  Mutation: {
    async deleteUserSessions(
      _parent: unknown,
      { inputs }: MutationDeleteUserSessionsArgs,
      context: AppContext,
    ): Promise<UserSession[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ id }) =>
          prismaClient.userSession.delete({
            where: {
              id,
            },
          }),
        ),
      );
    },
  },
};
