import type { Permission } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { AppContext } from "types";
import type { MutationCreatePermissionsArgs } from "types/graphql";
import { z, ZodError } from "zod";

import {
  PERMISSION_DESCRIPTION_MAX_LENGTH,
  PERMISSION_NAME_MAX_LENGTH,
} from "@/constants/limits";
import QueryError from "@/utils/errors/QueryError";
import ValidationError from "@/utils/errors/ValidationError";

export default {
  Mutation: {
    async createPermissions(
      _parent: unknown,
      { inputs }: MutationCreatePermissionsArgs,
      context: AppContext,
    ): Promise<Permission[]> {
      const { prismaClient, currentUser, t } = context;

      try {
        const inputSchema = z.object({
          name: z.string().max(
            PERMISSION_NAME_MAX_LENGTH,
            t("mutation.createPermissions.errors.fields.name.max", {
              count: PERMISSION_NAME_MAX_LENGTH,
            }),
          ),
          description: z
            .string()
            .max(
              PERMISSION_NAME_MAX_LENGTH,
              t("mutation.createPermissions.errors.fields.description.max", {
                count: PERMISSION_DESCRIPTION_MAX_LENGTH,
              }),
            )
            .optional(),
        });

        const data = z.array(inputSchema).parse(inputs);

        return await prismaClient.$transaction(
          data.map(({ name, description }) =>
            prismaClient.permission.create({
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
            t("mutation.createPermissions.errors.message", {
              context: e.code as unknown,
              count: inputs.length,
              meta: e.meta,
            }),
            {
              originalError: e,
            },
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
            t("mutation.createPermissions.errors.message"),
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
