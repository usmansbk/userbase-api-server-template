import type { MutationDeleteApplicationArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Application } from "@prisma/client";

export default {
  Mutation: {
    async deleteApplication(
      _parent: unknown,
      { input }: MutationDeleteApplicationArgs,
      context: AppContext,
    ): Promise<Application> {
      const { prismaClient } = context;
      const { id } = input;

      return await prismaClient.application.delete({
        where: {
          id,
        },
      });
    },
  },
};
