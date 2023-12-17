import type { MutationCreateUserRolesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserRole } from "@prisma/client";

export default {
  Mutation: {
    async createUserRoles(
      _parent: unknown,
      { inputs }: MutationCreateUserRolesArgs,
      context: AppContext,
    ): Promise<UserRole[]> {
      const { prismaClient, currentUser } = context;

      return await prismaClient.$transaction(
        inputs.map(({ userId, roleId }) =>
          prismaClient.userRole.create({
            data: {
              role: {
                connect: {
                  id: roleId,
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
