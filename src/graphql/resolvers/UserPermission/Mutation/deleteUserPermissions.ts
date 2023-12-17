import type { MutationDeleteUserPermissionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserPermission } from "@prisma/client";

export default {
  Mutation: {
    async deleteUserPermissions(
      _parent: unknown,
      { inputs }: MutationDeleteUserPermissionsArgs,
      context: AppContext,
    ): Promise<UserPermission[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ id }) =>
          prismaClient.userPermission.delete({
            where: {
              id,
            },
          }),
        ),
      );
    },
  },
};
