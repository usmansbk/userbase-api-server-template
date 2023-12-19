import type { QuerySessionArgs, QuerySessionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Session } from "@prisma/client";
import QueryError from "@/utils/errors/QueryError";
import { DEFAULT_LIST_SIZE } from "@/constants/limits";

export default {
  Query: {
    async session(
      _parent: unknown,
      { id }: QuerySessionArgs,
      context: AppContext,
    ): Promise<Session> {
      const { prismaClient, t } = context;

      const session = await prismaClient.session.findUnique({
        where: {
          id,
        },
      });

      if (!session) {
        throw new QueryError(t("query.session.errors.notFound"));
      }

      return session;
    },
    async sessions(
      _parent: unknown,
      { limit }: QuerySessionsArgs,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      const items = await prismaClient.session.findMany({
        take: limit ?? DEFAULT_LIST_SIZE,
      });

      return {
        items,
      };
    },
  },
};
