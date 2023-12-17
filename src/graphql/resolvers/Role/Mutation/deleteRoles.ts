import type { MutationDeleteRolesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Role } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async deleteRoles(
      _parent: unknown,
      { inputs }: MutationDeleteRolesArgs,
      context: AppContext,
    ): Promise<Role[]> {
      const { prismaClient, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ id }) =>
            prismaClient.role.delete({
              where: {
                id,
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.deleteRoles.errors.message", {
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
