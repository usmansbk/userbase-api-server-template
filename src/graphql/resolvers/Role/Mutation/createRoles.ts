import type { MutationCreateRolesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Role } from "@prisma/client";

export default {
  Mutation: {
    async createRoles(
      _parent: unknown,
      { inputs }: MutationCreateRolesArgs,
      context: AppContext,
    ): Promise<Role[]> {
      const { prismaClient, currentUser } = context;

      return await prismaClient.$transaction(
        inputs.map(({ name, description }) =>
          prismaClient.role.create({
            data: {
              name,
              description,
              creator: {
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
