import type { RolePermission } from "@prisma/client";
import type { AppContext } from "types";

export default {
  RolePermission: {
    async role(
      rolePermission: RolePermission,
      _args: never,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      return await prismaClient.rolePermission
        .findUnique({
          where: {
            id: rolePermission.id,
          },
        })
        .role();
    },
    async permission(
      rolePermission: RolePermission,
      _args: never,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      return await prismaClient.rolePermission
        .findUnique({
          where: {
            id: rolePermission.id,
          },
        })
        .permission();
    },
    async assignor(
      rolePermission: RolePermission,
      _args: never,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      return await prismaClient.rolePermission
        .findUnique({
          where: {
            id: rolePermission.id,
          },
        })
        .assignor();
    },
  },
};
