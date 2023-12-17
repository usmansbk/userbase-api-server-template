import type { MutationDeleteUserAvatarsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserAvatar } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async deleteUserAvatars(
      _parent: unknown,
      { inputs }: MutationDeleteUserAvatarsArgs,
      context: AppContext,
    ): Promise<UserAvatar[]> {
      const { prismaClient, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ id }) =>
            prismaClient.userAvatar.delete({
              where: {
                id,
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.deleteUserAvatars.errors.message", {
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
