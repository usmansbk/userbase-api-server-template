import { type User, UserStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { nanoid } from "nanoid";
import type { AppContext } from "types";
import type { MutationCreateUsersArgs } from "types/graphql";
import { z, ZodError } from "zod";

import {
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from "@/constants/limits";
import QueryError from "@/utils/errors/QueryError";
import ValidationError from "@/utils/errors/ValidationError";

export default {
  Mutation: {
    async createUsers(
      _parent: unknown,
      { inputs }: MutationCreateUsersArgs,
      context: AppContext,
    ): Promise<User[]> {
      const { prismaClient, t } = context;

      try {
        const inputSchema = z.object({
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
              t("mutation.registerWithEmail.errors.fields.email.invalidEmail"),
            ),
          firstName: z
            .string()
            .trim()
            .min(
              USER_NAME_MIN_LENGTH,
              t("mutation.registerWithEmail.errors.fields.name.min", {
                count: USER_NAME_MIN_LENGTH,
              }),
            )
            .max(
              USER_NAME_MAX_LENGTH,
              t("mutation.registerWithEmail.errors.fields.name.max", {
                count: USER_NAME_MAX_LENGTH,
              }),
            ),
          lastName: z
            .string()
            .trim()
            .min(
              USER_NAME_MIN_LENGTH,
              t("mutation.registerWithEmail.errors.fields.name.min", {
                count: USER_NAME_MIN_LENGTH,
              }),
            )
            .max(
              USER_NAME_MAX_LENGTH,
              t("mutation.registerWithEmail.errors.fields.name.max", {
                count: USER_NAME_MAX_LENGTH,
              }),
            )
            .optional(),
          surname: z
            .string()
            .trim()
            .min(
              USER_NAME_MIN_LENGTH,
              t("mutation.registerWithEmail.errors.fields.name.min", {
                count: USER_NAME_MIN_LENGTH,
              }),
            )
            .max(
              USER_NAME_MAX_LENGTH,
              t("mutation.registerWithEmail.errors.fields.name.max", {
                count: USER_NAME_MAX_LENGTH,
              }),
            )
            .optional(),
          password: z
            .string(
              t("mutation.registerWithEmail.errors.fields.password.required"),
            )
            .trim()
            .min(
              USER_PASSWORD_MIN_LENGTH,
              t("mutation.registerWithEmail.errors.fields.password.min", {
                count: USER_PASSWORD_MIN_LENGTH,
              }),
            )
            .max(
              USER_PASSWORD_MAX_LENGTH,
              t("mutation.registerWithEmail.errors.fields.password.max", {
                count: USER_PASSWORD_MAX_LENGTH,
              }),
            )
            .optional(),
          status: z
            .enum([
              UserStatus.Active,
              UserStatus.Deprovisioned,
              UserStatus.LockedOut,
              UserStatus.PasswordExpired,
              UserStatus.Provisioned,
              UserStatus.Recovery,
              UserStatus.Staged,
              UserStatus.Suspended,
            ])
            .default(UserStatus.Provisioned)
            .optional(),
          phoneNumber: z.string().optional(),
          language: z.string().optional(),
        });

        const data = z.array(inputSchema).parse(inputs);

        return await prismaClient.$transaction(
          data.map(({ password, ...data }) =>
            prismaClient.user.create({
              data: {
                ...data,
                password: password ?? nanoid(),
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.createUsers.errors.message", {
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

          throw new ValidationError(t("mutation.createUsers.errors.message"), {
            originalError: e,
            fieldErrors,
          });
        }
        throw e;
      }
    },
  },
};
