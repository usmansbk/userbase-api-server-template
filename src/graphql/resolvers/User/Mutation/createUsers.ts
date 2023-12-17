import { nanoid } from "nanoid";
import { UserStatus, type User } from "@prisma/client";
import type { MutationCreateUsersArgs } from "types/graphql";
import type { AppContext } from "types";

export default {
  Mutation: {
    async createUsers(
      _parent: unknown,
      { inputs }: MutationCreateUsersArgs,
      context: AppContext,
    ): Promise<User[]> {
      const { prismaClient } = context;

      return await prismaClient.$transaction(
        inputs.map(({ password, status, ...data }) =>
          prismaClient.user.create({
            data: {
              ...data,
              password: password ?? nanoid(),
              status: status ?? UserStatus.Provisioned,
            },
          }),
        ),
      );
    },
  },
};
