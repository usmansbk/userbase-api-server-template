import type { MutationDeletePermissionsArgs } from "types/graphql";
import type { AppContext } from "types";
import { type Permission, Prisma } from "@prisma/client";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async deletePermissions(
      _parent: unknown,
      { inputs }: MutationDeletePermissionsArgs,
      context: AppContext,
    ): Promise<Permission[]> {
      const { prismaClient, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ id }) =>
            prismaClient.permission.delete({
              where: {
                id,
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.deletePermissions.errors.message", {
              context: e.code as unknown,
            }),
            { originalError: e },
          );
        }
        throw e;
      }
    },
  },
};
