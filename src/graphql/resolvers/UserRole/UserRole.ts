import type { UserRole } from "@prisma/client";
import type { AppContext } from "types";

export default {
  UserRole: {
    async role(userRole: UserRole, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.userRole
        .findUnique({
          where: {
            id: userRole.id,
          },
        })
        .role();
    },
    async assignee(userRole: UserRole, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.userRole
        .findUnique({
          where: {
            id: userRole.id,
          },
        })
        .assignee();
    },
    async assignor(userRole: UserRole, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.userRole
        .findUnique({
          where: {
            id: userRole.id,
          },
        })
        .assignor();
    },
  },
};
