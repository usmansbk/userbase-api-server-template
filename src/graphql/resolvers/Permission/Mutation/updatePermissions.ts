import type { MutationUpdatePermissionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Permission } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async updatePermissions(
      _parent: unknown,
      { inputs }: MutationUpdatePermissionsArgs,
      context: AppContext,
    ): Promise<Permission[]> {
      const { prismaClient, t } = context;

      try {
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
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.updatePermissions.errors.message", {
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
