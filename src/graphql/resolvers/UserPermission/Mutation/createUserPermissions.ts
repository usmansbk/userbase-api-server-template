import type { MutationCreateUserPermissionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserPermission } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async createUserPermissions(
      _parent: unknown,
      { inputs }: MutationCreateUserPermissionsArgs,
      context: AppContext,
    ): Promise<UserPermission[]> {
      const { prismaClient, currentUser, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ userId, permissionId }) =>
            prismaClient.userPermission.create({
              data: {
                permission: {
                  connect: {
                    id: permissionId,
                  },
                },
                assignee: {
                  connect: {
                    id: userId,
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
            t("mutation.createUserPermissions.errors.message", {
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
