import type { Role } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { AppContext } from "types";
import type { MutationCreateRolesArgs } from "types/graphql";
import { z, ZodError } from "zod";

import {
  ROLE_DESCRIPTION_MAX_LENGTH,
  ROLE_NAME_MAX_LENGTH,
} from "@/constants/limits";
import QueryError from "@/utils/errors/QueryError";
import ValidationError from "@/utils/errors/ValidationError";

export default {
  Mutation: {
    async createRoles(
      _parent: unknown,
      { inputs }: MutationCreateRolesArgs,
      context: AppContext,
    ): Promise<Role[]> {
      const { prismaClient, currentUser, t } = context;

      try {
        const inputSchema = z.object({
          name: z.string().max(
            ROLE_NAME_MAX_LENGTH,
            t("mutation.createRoles.errors.fields.name.max", {
              count: ROLE_NAME_MAX_LENGTH,
            }),
          ),
          description: z
            .string()
            .max(
              ROLE_DESCRIPTION_MAX_LENGTH,
              t("mutation.createRoles.errors.fields.description.max", {
                count: ROLE_DESCRIPTION_MAX_LENGTH,
              }),
            )
            .optional(),
        });

        const data = z.array(inputSchema).parse(inputs);

        return await prismaClient.$transaction(
          data.map(({ name, description }) =>
            prismaClient.role.create({
              data: {
                name,
                description,
                creator: {
                  connect: {
                    id: currentUser!.id,
                  },
                },
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.createRoles.errors.message", {
              context: e.code as unknown,
              count: inputs.length,
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

          throw new ValidationError(t("mutation.createRoles.errors.message"), {
            originalError: e,
            fieldErrors,
          });
        }
        throw e;
      }
    },
  },
};
