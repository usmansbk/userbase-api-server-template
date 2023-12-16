import type { QueryUserArgs, QueryUsersArgs } from "types/graphql";
import type { AppContext } from "types";
import type { User } from "@prisma/client";
import QueryError from "@/utils/errors/QueryError";

export default {
  Query: {
    async user(
      _parent: unknown,
      { id }: QueryUserArgs,
      context: AppContext,
    ): Promise<User> {
      const { prismaClient, t } = context;

      const user = await prismaClient.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new QueryError(t("query.user.errors.notFound"));
      }

      return user;
    },
    async users(
      _parent: unknown,
      { limit }: QueryUsersArgs,
      context: AppContext,
    ): Promise<User[]> {
      const { prismaClient } = context;

      return await prismaClient.user.findMany({
        take: limit ?? 25,
      });
    },
  },
};
