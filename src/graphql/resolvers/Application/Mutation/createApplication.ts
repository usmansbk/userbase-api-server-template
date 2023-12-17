import type { MutationCreateApplicationArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Application } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";
import { z } from "zod";
import {
  APPLICATION_DESCRIPTION_MAX_LENGTH,
  APPLICATION_NAME_MAX_LENGTH,
} from "@/constants/limits";

export default {
  Mutation: {
    async createApplication(
      _parent: unknown,
      { input }: MutationCreateApplicationArgs,
      context: AppContext,
    ): Promise<Application> {
      const { prismaClient, t } = context;

      try {
        const data = z
          .object({
            name: z.string().max(APPLICATION_NAME_MAX_LENGTH),
            description: z
              .string()
              .max(APPLICATION_DESCRIPTION_MAX_LENGTH)
              .optional(),
          })
          .parse(input);

        return await prismaClient.application.create({
          data,
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
