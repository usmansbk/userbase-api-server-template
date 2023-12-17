import type { MutationCreateUserRolesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserRole } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async createUserRoles(
      _parent: unknown,
      { inputs }: MutationCreateUserRolesArgs,
      context: AppContext,
    ): Promise<UserRole[]> {
      const { prismaClient, currentUser, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ userId, roleId }) =>
            prismaClient.userRole.create({
              data: {
                role: {
                  connect: {
                    id: roleId,
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
            t("mutation.createUserRoles.errors.message", {
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
