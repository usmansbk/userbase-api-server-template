import type { MutationDeleteApplicationArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Application } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async deleteApplication(
      _parent: unknown,
      { input }: MutationDeleteApplicationArgs,
      context: AppContext,
    ): Promise<Application> {
      const { prismaClient, t } = context;
      const { id } = input;

      try {
        return await prismaClient.application.delete({
          where: {
            id,
          },
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.deleteApplication.errors.message", {
              context: e.code as unknown,
            }),
            { originalError: e },
          );
        }
        throw e;
      }
    },
  },
};
