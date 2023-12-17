import type { MutationCreatePermissionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Permission } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async createPermissions(
      _parent: unknown,
      { inputs }: MutationCreatePermissionsArgs,
      context: AppContext,
    ): Promise<Permission[]> {
      const { prismaClient, currentUser, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ name, description }) =>
            prismaClient.permission.create({
              data: {
                name,
                description,
                creator: {
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
          console.log(e.meta);
          throw new QueryError(
            t("mutation.createPermissions.errors.message", {
              context: e.code as unknown,
              count: inputs.length,
              meta: e.meta,
            }),
            {
              originalError: e,
            },
          );
        }
        throw e;
      }
    },
  },
};
