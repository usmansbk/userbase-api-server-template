import type { MutationUpdateApplicationArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Application } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async updateApplication(
      _parent: unknown,
      { input }: MutationUpdateApplicationArgs,
      context: AppContext,
    ): Promise<Application> {
      const { prismaClient, t } = context;
      const { id, ...data } = input;

      try {
        return await prismaClient.application.update({
          where: {
            id,
          },
          data,
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.updateApplication.errors.message", {
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
