import type { MutationUpdateRolesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Role } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async updateRoles(
      _parent: unknown,
      { inputs }: MutationUpdateRolesArgs,
      context: AppContext,
    ): Promise<Role[]> {
      const { prismaClient, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ name, description, id }) =>
            prismaClient.role.update({
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
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.updateRoles.errors.message", {
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
