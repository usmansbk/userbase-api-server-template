import type { User } from "@prisma/client";
import type { MutationDeleteUsersArgs } from "types/graphql";
import type { AppContext } from "types";

export default {
  Mutation: {
    async deleteUsers(
      _parent: unknown,
      { inputs }: MutationDeleteUsersArgs,
      context: AppContext,
    ): Promise<User[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ id }) =>
          prismaClient.user.delete({
            where: {
              id,
            },
          }),
        ),
      );
    },
  },
};
