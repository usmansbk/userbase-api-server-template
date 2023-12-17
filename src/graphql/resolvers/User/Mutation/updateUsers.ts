import type { User, UserStatus } from "@prisma/client";
import type { MutationUpdateUsersArgs } from "types/graphql";
import type { AppContext } from "types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async updateUsers(
      _parent: unknown,
      { inputs }: MutationUpdateUsersArgs,
      context: AppContext,
    ): Promise<User[]> {
      const { prismaClient, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ id, status, ...data }) =>
            prismaClient.user.update({
              where: {
                id,
              },
              data: {
                ...data,
                status: status as UserStatus,
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.updateUsers.errors.message", {
              context: e.code as unknown,
              count: inputs.length,
              meta: e.meta,
            }),
          );
        }
        throw e;
      }
    },
  },
};
