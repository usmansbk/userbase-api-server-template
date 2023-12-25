import type { RolePermission } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { AppContext } from "types";
import type { MutationCreateRolePermissionsArgs } from "types/graphql";

import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async createRolePermissions(
      _parent: unknown,
      { inputs }: MutationCreateRolePermissionsArgs,
      context: AppContext,
    ): Promise<RolePermission[]> {
      const { prismaClient, currentUser, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ roleId, permissionId }) =>
            prismaClient.rolePermission.create({
              data: {
                role: {
                  connect: {
                    id: roleId,
                  },
                },
                permission: {
                  connect: {
                    id: permissionId,
                  },
                },
                assignor: {
                  connect: {
                    id: currentUser!.id,
                  },
                },
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.createRolePermissions.errors.message", {
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
