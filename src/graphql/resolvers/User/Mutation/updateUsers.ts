import { type User, UserStatus } from "@prisma/client";
import type { MutationUpdateUsersArgs } from "types/graphql";
import type { AppContext } from "types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";
import { ZodError, z } from "zod";
import ValidationError from "@/utils/errors/ValidationError";
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/constants/limits";

export default {
  Mutation: {
    async updateUsers(
      _parent: unknown,
      { inputs }: MutationUpdateUsersArgs,
      context: AppContext,
    ): Promise<User[]> {
      const { prismaClient, t } = context;

      try {
        const inputSchema = z
          .object({
            email: z
              .string({
                required_error: t(
                  "mutation.registerWithEmail.errors.fields.email.required",
                ),
                invalid_type_error: t(
                  "mutation.registerWithEmail.errors.fields.email.invalidEmail",
                ),
              })
              .trim()
              .email(
                t(
                  "mutation.registerWithEmail.errors.fields.email.invalidEmail",
                ),
              ),
            firstName: z
              .string()
              .trim()
              .min(
                NAME_MIN_LENGTH,
                t("mutation.registerWithEmail.errors.fields.name.min", {
                  count: NAME_MIN_LENGTH,
                }),
              )
              .max(
                NAME_MAX_LENGTH,
                t("mutation.registerWithEmail.errors.fields.name.max", {
                  count: NAME_MAX_LENGTH,
                }),
              ),
            lastName: z
              .string()
              .trim()
              .min(
                NAME_MIN_LENGTH,
                t("mutation.registerWithEmail.errors.fields.name.min", {
                  count: NAME_MIN_LENGTH,
                }),
              )
              .max(
                NAME_MAX_LENGTH,
                t("mutation.registerWithEmail.errors.fields.name.max", {
                  count: NAME_MAX_LENGTH,
                }),
              ),
            surname: z
              .string()
              .trim()
              .min(
                NAME_MIN_LENGTH,
                t("mutation.registerWithEmail.errors.fields.name.min", {
                  count: NAME_MIN_LENGTH,
                }),
              )
              .max(
                NAME_MAX_LENGTH,
                t("mutation.registerWithEmail.errors.fields.name.max", {
                  count: NAME_MAX_LENGTH,
                }),
              ),
            password: z
              .string()
              .trim()
              .min(
                PASSWORD_MIN_LENGTH,
                t("mutation.registerWithEmail.errors.fields.password.min", {
                  count: PASSWORD_MIN_LENGTH,
                }),
              )
              .max(
                PASSWORD_MAX_LENGTH,
                t("mutation.registerWithEmail.errors.fields.password.max", {
                  count: PASSWORD_MAX_LENGTH,
                }),
              ),
            status: z.enum([
              UserStatus.Active,
              UserStatus.Deprovisioned,
              UserStatus.LockedOut,
              UserStatus.PasswordExpired,
              UserStatus.Provisioned,
              UserStatus.Recovery,
              UserStatus.Staged,
              UserStatus.Suspended,
            ]),
            phoneNumber: z.string(),
            language: z.string(),
          })
          .partial();

        z.array(inputSchema).parse(inputs);

        return await prismaClient.$transaction(
          inputs.map(({ id, status, ...data }) =>
            prismaClient.user.update({
              where: {
                id,
              },
              data: {
                ...data,
                status: status as UserStatus,
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.updateUsers.errors.message", {
              context: e.code as unknown,
              count: inputs.length,
              meta: e.meta,
            }),
          );
        }

        if (e instanceof ZodError) {
          const fieldErrors = Object.entries(e.formErrors.fieldErrors).map(
            ([name, messages]) => ({
              name,
              messages,
            }),
          );

          throw new ValidationError(t("mutation.updateUsers.errors.message"), {
            originalError: e,
            fieldErrors,
          });
        }
        throw e;
      }
    },
  },
};
