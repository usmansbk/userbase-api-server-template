import { ZodError, z } from "zod";
import { UserStatus } from "@prisma/client";
import ValidationError from "@/utils/errors/ValidationError";
import {
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/constants/limits";
import type { AppContext } from "types";
import type {
  MutationRegisterWithEmailArgs,
  AuthResponse,
} from "types/graphql";

export default {
  Mutation: {
    async registerWithEmail(
      _parent: unknown,
      { input }: MutationRegisterWithEmailArgs,
      context: AppContext,
    ): Promise<AuthResponse> {
      const { prismaClient, t, jwtClient, clientId, clientIp, userAgent } =
        context;

      try {
        const { email, language, phoneNumber } = input;

        const form = z.object({
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
            )
            .optional(),
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
            )
            .optional(),
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
        });

        const { password, firstName, lastName, surname } = form.parse(input);

        let user = await prismaClient.user.findFirst({
          where: {
            email,
          },
        });

        const tempUserList: UserStatus[] = [
          UserStatus.Staged,
          UserStatus.Provisioned,
        ];

        if (user && tempUserList.includes(user.status)) {
          await prismaClient.user.delete({
            where: {
              id: user.id,
            },
          });
          user = await prismaClient.user.create({
            data: {
              email,
              password,
              firstName,
              lastName,
              surname,
              language,
              phoneNumber,
              status: UserStatus.Provisioned,
            },
          });
        } else if (user) {
          throw new ValidationError(
            t("mutation.registerWithEmail.errors.message"),
            {
              fieldErrors: [
                {
                  name: "email",
                  messages: [
                    t(
                      "mutation.registerWithEmail.errors.fields.email.alreadyExist",
                    ),
                  ],
                },
              ],
            },
          );
        } else {
          user = await prismaClient.user.create({
            data: {
              email,
              password,
              firstName,
              lastName,
              surname,
              language,
              phoneNumber,
              status: UserStatus.Provisioned,
            },
          });
        }

        const session = await prismaClient.userSession.create({
          data: {
            clientId,
            clientIp,
            userAgent,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });

        const { accessToken, refreshToken } = jwtClient.getAuthTokens({
          sub: user.id,
          azp: session.id,
          jti: session.jti,
        });

        return {
          success: true,
          message: t("mutation.login.welcome", { name: firstName }),
          accessToken,
          refreshToken,
        };
      } catch (e) {
        if (e instanceof ZodError) {
          const fieldErrors = Object.entries(e.formErrors.fieldErrors).map(
            ([name, messages]) => ({
              name,
              messages,
            }),
          );

          throw new ValidationError(
            t("mutation.registerWithEmail.errors.message"),
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
