import type { Application } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { AppContext } from "types";
import type { MutationUpdateApplicationArgs } from "types/graphql";
import { z, ZodError } from "zod";

import {
  APPLICATION_DESCRIPTION_MAX_LENGTH,
  APPLICATION_NAME_MAX_LENGTH,
} from "@/constants/limits";
import QueryError from "@/utils/errors/QueryError";
import ValidationError from "@/utils/errors/ValidationError";

export default {
  Mutation: {
    async updateApplication(
      _parent: unknown,
      { input }: MutationUpdateApplicationArgs,
      context: AppContext,
    ): Promise<Application> {
      const { prismaClient, t } = context;
      const { id } = input;

      try {
        const data = z
          .object({
            name: z.string().max(
              APPLICATION_NAME_MAX_LENGTH,
              t("mutation.createApplication.errors.fields.name.max", {
                count: APPLICATION_NAME_MAX_LENGTH,
              }),
            ),
            description: z.string().max(
              APPLICATION_DESCRIPTION_MAX_LENGTH,
              t("mutation.createApplication.errors.fields.description.max", {
                count: APPLICATION_DESCRIPTION_MAX_LENGTH,
              }),
            ),
          })
          .partial()
          .parse(input);

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

        if (e instanceof ZodError) {
          const fieldErrors = Object.entries(e.formErrors.fieldErrors).map(
            ([name, messages]) => ({
              name,
              messages,
            }),
          );

          throw new ValidationError(
            t("mutation.updateApplication.errors.message"),
            {
              originalError: e,
              fieldErrors,
            },
          );
        }

        throw e;
      }
    },
  },
};
