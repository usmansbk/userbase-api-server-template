import { ZodError, z } from "zod";
import { UserStatus } from "@prisma/client";
import ValidationError from "@/utils/errors/ValidationError";
import dayjs from "@/utils/dayjs";
import { AUTH_PREFIX } from "@/constants/cachePrefixes";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  REFRESH_TOKEN_EXPIRES_IN,
} from "@/constants/limits";
import type { AppContext, UserSessions } from "types";
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
      const { prismaClient, t, jwtClient, redisClient, clientId } = context;

      try {
        const { email, firstName, lastName, surname, language, phoneNumber } =
          input;

        const form = z.object({
          password: z
            .string()
            .min(
              MIN_PASSWORD_LENGTH,
              t("mutation.registerWithEmail.errors.fields.password.tooShort", {
                count: MIN_PASSWORD_LENGTH,
              }),
            )
            .max(
              MAX_PASSWORD_LENGTH,
              t("mutation.registerWithEmail.errors.fields.password.tooLong", {
                count: MAX_PASSWORD_LENGTH,
              }),
            ),
        });

        const { password } = form.parse({
          password: input.password,
        });

        let user = await prismaClient.user.findFirst({
          where: {
            email,
          },
        });

        if (user && user.status === UserStatus.Staged) {
          user = await prismaClient.user.update({
            where: {
              id: user.id,
            },
            data: {
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

        const { accessToken, refreshToken, jti, azp } = jwtClient.getAuthTokens(
          {
            sub: user.id,
          },
        );

        await redisClient.setex(
          `${AUTH_PREFIX}:${clientId}:${azp}:${user.id}`,
          dayjs.duration(...REFRESH_TOKEN_EXPIRES_IN).asSeconds(),
          jti,
        );

        const sessions = new Map(Object.entries(user.sessions as UserSessions));
        sessions.set(azp, {
          id: azp,
          jti,
          clientId: clientId!,
          createdAt: dayjs.utc().toISOString(),
        });

        await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            sessions: Object.fromEntries(sessions),
          },
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
