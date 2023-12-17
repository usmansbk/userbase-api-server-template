import { ZodError, z } from "zod";
import { UserStatus } from "@prisma/client";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import ValidationError from "@/utils/errors/ValidationError";
import dayjs from "@/utils/dayjs";
import {
  PASSWORD_CHANGED_TEMPLATE,
  WELCOME_TEMPLATE,
} from "@/constants/templates";
import { PASSWORD_RESET_PREFIX } from "@/constants/cachePrefixes";
import {
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from "@/constants/limits";
import type {
  MutationResetUserPasswordArgs,
  MutationResponse,
} from "types/graphql";
import type { AppContext } from "types";

export default {
  Mutation: {
    async resetUserPassword(
      _parent: unknown,
      { input }: MutationResetUserPasswordArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, jwtClient, redisClient, emailClient, t } = context;

      try {
        const password = z
          .string()
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
          .parse(input.password);

        const verified = jwtClient.verifyForAllClients(input.token as string);
        const cacheKey = `${PASSWORD_RESET_PREFIX}:${verified.email}`;
        const sentToken = await redisClient.get(cacheKey);

        if (!sentToken || sentToken !== input.token) {
          throw new AuthenticationError(
            t("mutation.resetUserPassword.errors.message"),
          );
        }

        const user = await prismaClient.user.findFirst({
          where: {
            email: verified.email,
            status: {
              in: [
                UserStatus.Provisioned,
                UserStatus.Active,
                UserStatus.LockedOut,
                UserStatus.PasswordExpired,
                UserStatus.Recovery,
              ],
            },
          },
        });

        if (!user) {
          throw new AuthenticationError(
            t("mutation.resetUserPassword.errors.message"),
          );
        }

        await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            password,
            isEmailVerified: true,
            status: UserStatus.Active,
            passwordUpdatedAt: dayjs().toDate(),
          },
        });

        await redisClient.del(cacheKey);

        // TODO: delete user current session

        if (!user.isEmailVerified) {
          emailClient.send({
            template: WELCOME_TEMPLATE,
            message: {
              to: user.email,
            },
            locals: {
              locale: user.language,
              name: user.firstName,
            },
          });
        }

        emailClient.send({
          template: PASSWORD_CHANGED_TEMPLATE,
          message: {
            to: user.email,
          },
          locals: {
            locale: user.language,
            name: user.firstName,
          },
        });

        return {
          success: true,
          message: t("mutation.resetUserPassword.message"),
        };
      } catch (e) {
        if (e instanceof ZodError) {
          throw new ValidationError(
            t("mutation.resetUserPassword.errors.validation.message"),
            {
              originalError: e,
              fieldErrors: [
                { name: "password", messages: e.formErrors.formErrors },
              ],
            },
          );
        }
        if (e instanceof JsonWebTokenError || e instanceof TokenExpiredError) {
          throw new AuthenticationError(
            t("mutation.resetUserPassword.errors.message"),
          );
        }
        throw e;
      }
    },
  },
};
