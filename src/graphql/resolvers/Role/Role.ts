import type { Role } from "@prisma/client";
import type { AppContext } from "types";

export default {
  Role: {
    async creator(role: Role, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.role
        .findUnique({
          where: {
            id: role.id,
          },
        })
        .creator();
    },
    async userRoles(role: Role, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.role
        .findUnique({
          where: {
            id: role.id,
          },
        })
        .userRoles();
    },
    async rolePermissions(role: Role, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.role
        .findUnique({
          where: {
            id: role.id,
          },
        })
        .rolePermissions();
    },
  },
};
