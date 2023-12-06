import type { User } from "@prisma/client";
import type { AppContext } from "types";

export default {
  User: {
    isMe(user: User, _args: never, context: AppContext) {
      return user.id === context.currentUser?.id;
    },
    async picture(user: User, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .picture();
    },
    async roles(user: User, _args: never, context: AppContext) {
      const { prismaClient } = context;

      const userRoles = await prismaClient.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .rolesAssignedToUser({
          include: {
            role: true,
          },
        });

      return userRoles?.map((role) => role?.role.name);
    },
    async rolesCreatedByUser(user: User, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .rolesCreatedByUser();
    },
    async permissionsCreatedByUser(
      user: User,
      _args: never,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      return await prismaClient.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .permissionsCreatedByUser();
    },
    async rolesAssignedToUser(user: User, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .rolesAssignedToUser();
    },
    async rolesAssignedByUser(user: User, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .rolesAssignedByUser();
    },
    async permissionsAssignedToUser(
      user: User,
      _args: never,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      return await prismaClient.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .permissionsAssignedToUser();
    },
    async permissionsAssignedByUser(
      user: User,
      _args: never,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      return await prismaClient.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .permissionsAssignedByUser();
    },
    async rolePermissionsAssignedByUser(
      user: User,
      _args: never,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      return await prismaClient.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .rolePermissionsAssignedByUser();
    },
  },
};
