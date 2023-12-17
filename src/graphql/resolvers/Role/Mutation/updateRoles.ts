import type { MutationUpdateRolesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Role } from "@prisma/client";

export default {
  Mutation: {
    async updateRoles(
      _parent: unknown,
      { inputs }: MutationUpdateRolesArgs,
      context: AppContext,
    ): Promise<Role[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ name, description, id }) =>
          prismaClient.role.update({
            where: {
              id,
            },
            data: {
              name,
              description,
            },
          }),
        ),
      );
    },
  },
};
