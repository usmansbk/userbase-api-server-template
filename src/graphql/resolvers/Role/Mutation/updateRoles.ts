import type { MutationUpdateRolesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Role } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";
import { ZodError, z } from "zod";
import ValidationError from "@/utils/errors/ValidationError";
import {
  ROLE_DESCRIPTION_MAX_LENGTH,
  ROLE_NAME_MAX_LENGTH,
} from "@/constants/limits";

export default {
  Mutation: {
    async updateRoles(
      _parent: unknown,
      { inputs }: MutationUpdateRolesArgs,
      context: AppContext,
    ): Promise<Role[]> {
      const { prismaClient, t } = context;

      try {
        const inputSchema = z
          .object({
            name: z.string().max(
              ROLE_NAME_MAX_LENGTH,
              t("mutation.createRoles.errors.fields.name.max", {
                count: ROLE_NAME_MAX_LENGTH,
              }),
            ),
            description: z.string().max(
              ROLE_DESCRIPTION_MAX_LENGTH,
              t("mutation.createRoles.errors.fields.description.max", {
                count: ROLE_DESCRIPTION_MAX_LENGTH,
              }),
            ),
          })
          .partial();

        z.array(inputSchema).parse(inputs);

        return await prismaClient.$transaction(
          inputs.map(({ name, description, id }) =>
            prismaClient.role.update({
              where: {
                id,
              },
              data: {
                name,
                description,
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.updateRoles.errors.message", {
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

          throw new ValidationError(t("mutation.updateRoles.errors.message"), {
            originalError: e,
            fieldErrors,
          });
        }
        throw e;
      }
    },
  },
};
