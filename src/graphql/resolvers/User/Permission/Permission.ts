import type { Permission } from "@prisma/client";
import type { AppContext } from "types";

export default {
  Permission: {
    async creator(permission: Permission, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.permission
        .findUnique({
          where: {
            id: permission.id,
          },
        })
        .creator();
    },
    async userPermissions(
      permission: Permission,
      _args: never,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      return await prismaClient.permission
        .findUnique({
          where: {
            id: permission.id,
          },
        })
        .userPermissions();
    },
    async rolePermissions(
      permission: Permission,
      _args: never,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      return await prismaClient.permission
        .findUnique({
          where: {
            id: permission.id,
          },
        })
        .rolePermissions();
    },
  },
};
