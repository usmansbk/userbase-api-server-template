import { ZodError, z } from "zod";
import ValidationError from "@/utils/errors/ValidationError";
import type { AppContext } from "types";
import type {
  MutationUpdateCurrentUserBasicInfoArgs,
  User,
  UserResponse,
} from "types/graphql";
import { USER_NAME_MAX_LENGTH, USER_NAME_MIN_LENGTH } from "@/constants/limits";
import { USER_UPDATED_TOPIC } from "@/constants/subscriptions";

export default {
  Mutation: {
    async updateCurrentUserBasicInfo(
      _parent: unknown,
      { input }: MutationUpdateCurrentUserBasicInfoArgs,
      context: AppContext,
    ): Promise<UserResponse> {
      const { prismaClient, currentUser, t, pubsub } = context;

      try {
        const { firstName, lastName, surname } = z
          .object({
            firstName: z
              .string({
                required_error: t(
                  "mutation.registerWithEmail.errors.fields.firstName.required",
                ),
              })
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
          })
          .parse(input);

        const user = await prismaClient.user.update({
          where: {
            id: currentUser!.id,
          },
          data: {
            firstName,
            lastName,
            surname,
            language: input.language,
          },
        });

        pubsub.publish(USER_UPDATED_TOPIC, user);

        return {
          success: true,
          message: t("mutation.updateCurrentUserBasicInfo.message"),
          user: user as unknown as User,
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
            t("mutation.updateCurrentUserBasicInfo.errors.message"),
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
