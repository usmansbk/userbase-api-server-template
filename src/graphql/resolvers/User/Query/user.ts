import type { QueryUserArgs, QueryUsersArgs } from "types/graphql";
import type { AppContext } from "types";
import type { User } from "@prisma/client";
import QueryError from "@/utils/errors/QueryError";
import { DEFAULT_LIST_SIZE } from "@/constants/limits";

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
    ) {
      const { prismaClient } = context;

      const items = await prismaClient.user.findMany({
        take: limit ?? DEFAULT_LIST_SIZE,
      });

      return {
        items,
      };
    },
  },
};
