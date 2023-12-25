import type { UserRole } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { AppContext } from "types";
import type { MutationDeleteUserRolesArgs } from "types/graphql";

import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async deleteUserRoles(
      _parent: unknown,
      { inputs }: MutationDeleteUserRolesArgs,
      context: AppContext,
    ): Promise<UserRole[]> {
      const { prismaClient, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ id }) =>
            prismaClient.userRole.delete({
              where: {
                id,
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.deleteUserRoles.errors.message", {
              context: e.code as unknown,
              count: inputs.length,
              meta: e.meta,
            }),
            { originalError: e },
          );
        }
        throw e;
      }
    },
  },
};
