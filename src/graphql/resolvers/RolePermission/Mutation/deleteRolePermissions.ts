import type { MutationDeleteRolePermissionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { RolePermission } from "@prisma/client";

export default {
  Mutation: {
    async deleteRolePermissions(
      _parent: unknown,
      { inputs }: MutationDeleteRolePermissionsArgs,
      context: AppContext,
    ): Promise<RolePermission[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ id }) =>
          prismaClient.rolePermission.delete({
            where: {
              id,
            },
          }),
        ),
      );
    },
  },
};
