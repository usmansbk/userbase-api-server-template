import type { MutationUpdatePermissionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Permission } from "@prisma/client";

export default {
  Mutation: {
    async updatePermissions(
      _parent: unknown,
      { inputs }: MutationUpdatePermissionsArgs,
      context: AppContext,
    ): Promise<Permission[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ id, name, description }) =>
          prismaClient.permission.update({
            where: {
              id,
            },
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
