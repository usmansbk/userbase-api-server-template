import type { Application } from "@prisma/client";
import type { AppContext } from "types";
import type { QueryApplicationArgs } from "types/graphql";

import QueryError from "@/utils/errors/QueryError";

export default {
  Query: {
    async application(
      _parent: unknown,
      { id }: QueryApplicationArgs,
      context: AppContext,
    ): Promise<Application> {
      const { prismaClient, t } = context;

      const application = await prismaClient.application.findUnique({
        where: {
          id,
        },
      });

      if (!application) {
        throw new QueryError(t("query.application.errors.notFound"));
      }

      return application;
    },
    async applications(
      _parent: unknown,
      _args: never,
      context: AppContext,
    ): Promise<Application[]> {
      const { prismaClient } = context;

      return await prismaClient.application.findMany();
    },
  },
};
