import type { QuerySessionArgs, QuerySessionsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserSession } from "@prisma/client";
import QueryError from "@/utils/errors/QueryError";

export default {
  Query: {
    async session(
      _parent: unknown,
      { id }: QuerySessionArgs,
      context: AppContext,
    ): Promise<UserSession> {
      const { prismaClient, t } = context;

      const session = await prismaClient.userSession.findUnique({
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
    ): Promise<UserSession[]> {
      const { prismaClient } = context;

      return await prismaClient.userSession.findMany({
        take: limit ?? 25,
      });
    },
  },
};
