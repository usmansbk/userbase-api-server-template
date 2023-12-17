import type { User, UserStatus } from "@prisma/client";
import type { MutationUpdateUsersArgs } from "types/graphql";
import type { AppContext } from "types";

export default {
  Mutation: {
    async updateUsers(
      _parent: unknown,
      { inputs }: MutationUpdateUsersArgs,
      context: AppContext,
    ): Promise<User[]> {
      const { prismaClient } = context;

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
    },
  },
};
