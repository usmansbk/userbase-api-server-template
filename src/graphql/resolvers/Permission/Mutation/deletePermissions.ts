import type { MutationDeletePermissionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Permission } from "@prisma/client";

export default {
  Mutation: {
    async deletePermissions(
      _parent: unknown,
      { inputs }: MutationDeletePermissionsArgs,
      context: AppContext,
    ): Promise<Permission[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ id }) =>
          prismaClient.permission.delete({
            where: {
              id,
            },
          }),
        ),
      );
    },
  },
};
