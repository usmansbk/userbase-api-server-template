import type { MutationDeleteRolesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Role } from "@prisma/client";

export default {
  Mutation: {
    async deleteRoles(
      _parent: unknown,
      { inputs }: MutationDeleteRolesArgs,
      context: AppContext,
    ): Promise<Role[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ id }) =>
          prismaClient.role.delete({
            where: {
              id,
            },
          }),
        ),
      );
    },
  },
};
