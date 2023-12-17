import type { MutationDeleteUserPermissionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserPermission } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async deleteUserPermissions(
      _parent: unknown,
      { inputs }: MutationDeleteUserPermissionsArgs,
      context: AppContext,
    ): Promise<UserPermission[]> {
      const { prismaClient, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ id }) =>
            prismaClient.userPermission.delete({
              where: {
                id,
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.deleteUserPermissions.errors.message", {
              context: e.code as unknown,
              count: inputs.length,
            }),
            { originalError: e },
          );
        }
        throw e;
      }
    },
  },
};
