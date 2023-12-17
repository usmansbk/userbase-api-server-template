import type { MutationDeleteUserRolesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserRole } from "@prisma/client";

export default {
  Mutation: {
    async deleteUserRoles(
      _parent: unknown,
      { inputs }: MutationDeleteUserRolesArgs,
      context: AppContext,
    ): Promise<UserRole[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ id }) =>
          prismaClient.userRole.delete({
            where: {
              id,
            },
          }),
        ),
      );
    },
  },
};
