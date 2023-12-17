import type { MutationCreatePermissionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Permission } from "@prisma/client";

export default {
  Mutation: {
    async createPermissions(
      _parent: unknown,
      { inputs }: MutationCreatePermissionsArgs,
      context: AppContext,
    ): Promise<Permission[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ name, description }) =>
          prismaClient.permission.create({
            data: {
              name,
              description,
            },
          }),
        ),
      );
    },
  },
};
