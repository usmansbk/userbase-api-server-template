import type { MutationDeleteUserAvatarsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserAvatar } from "@prisma/client";

export default {
  Mutation: {
    async deleteUserAvatars(
      _parent: unknown,
      { inputs }: MutationDeleteUserAvatarsArgs,
      context: AppContext,
    ): Promise<UserAvatar[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ id }) =>
          prismaClient.userAvatar.delete({
            where: {
              id,
            },
          }),
        ),
      );
    },
  },
};
