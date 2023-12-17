import type { MutationCreateRolesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Role } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async createRoles(
      _parent: unknown,
      { inputs }: MutationCreateRolesArgs,
      context: AppContext,
    ): Promise<Role[]> {
      const { prismaClient, currentUser, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ name, description }) =>
            prismaClient.role.create({
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
          throw new QueryError(
            t("mutation.createRoles.errors.message", {
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
