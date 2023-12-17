import type { MutationCreateUserPermissionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserPermission } from "@prisma/client";

export default {
  Mutation: {
    async createUserPermissions(
      _parent: unknown,
      { inputs }: MutationCreateUserPermissionsArgs,
      context: AppContext,
    ): Promise<UserPermission[]> {
      const { prismaClient, currentUser } = context;

      return await prismaClient.$transaction(
        inputs.map(({ userId, permissionId }) =>
          prismaClient.userPermission.create({
            data: {
              permission: {
                connect: {
                  id: permissionId,
                },
              },
              assignee: {
                connect: {
                  id: userId,
                },
              },
              assignor: {
                connect: {
                  id: currentUser!.id,
                },
              },
            },
          }),
        ),
      );
    },
  },
};
