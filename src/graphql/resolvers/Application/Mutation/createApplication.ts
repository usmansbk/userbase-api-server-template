import type { MutationCreateApplicationArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Application } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async createApplication(
      _parent: unknown,
      { input }: MutationCreateApplicationArgs,
      context: AppContext,
    ): Promise<Application> {
      const { prismaClient, t } = context;

      try {
        return await prismaClient.application.create({
          data: input,
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.createApplication.errors.message", {
              context: e.code as unknown,
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
