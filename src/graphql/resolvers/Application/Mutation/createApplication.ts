import type { MutationCreateApplicationArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Application } from "@prisma/client";

export default {
  Mutation: {
    async createApplication(
      _parent: unknown,
      { input }: MutationCreateApplicationArgs,
      context: AppContext,
    ): Promise<Application> {
      const { prismaClient } = context;

      return await prismaClient.application.create({
        data: input,
      });
    },
  },
};
