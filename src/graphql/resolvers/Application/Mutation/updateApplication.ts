import type { MutationUpdateApplicationArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Application } from "@prisma/client";

export default {
  Mutation: {
    async updateApplication(
      _parent: unknown,
      { input }: MutationUpdateApplicationArgs,
      context: AppContext,
    ): Promise<Application> {
      const { prismaClient } = context;
      const { id, ...data } = input;

      return await prismaClient.application.update({
        where: {
          id,
        },
        data,
      });
    },
  },
};
