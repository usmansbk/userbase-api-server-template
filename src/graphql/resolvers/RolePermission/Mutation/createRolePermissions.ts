import type { MutationCreateRolePermissionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { RolePermission } from "@prisma/client";

export default {
  Mutation: {
    async createRolePermissions(
      _parent: unknown,
      { inputs }: MutationCreateRolePermissionsArgs,
      context: AppContext,
    ): Promise<RolePermission[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ roleId, permissionId }) =>
          prismaClient.rolePermission.create({
            data: {
              role: {
                connect: {
                  id: roleId,
                },
              },
              permission: {
                connect: {
                  id: permissionId,
                },
              },
            },
          }),
        ),
      );
    },
  },
};
