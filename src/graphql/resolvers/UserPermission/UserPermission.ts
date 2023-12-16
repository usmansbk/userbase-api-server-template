import type { UserPermission } from "@prisma/client";
import type { AppContext } from "types";

export default {
  UserPermission: {
    async permission(
      userPermission: UserPermission,
      _args: never,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      return await prismaClient.userPermission
        .findUnique({
          where: {
            id: userPermission.id,
          },
        })
        .permission();
    },
    async assignee(
      userPermission: UserPermission,
      _args: never,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      return await prismaClient.userPermission
        .findUnique({
          where: {
            id: userPermission.id,
          },
        })
        .assignee();
    },
    async assignor(
      userPermission: UserPermission,
      _args: never,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      return await prismaClient.userPermission
        .findUnique({
          where: {
            id: userPermission.id,
          },
        })
        .assignor();
    },
  },
};
