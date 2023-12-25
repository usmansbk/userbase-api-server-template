import type { AppContext } from "types";
import type {
  MutationResponse,
  MutationSendPasswordResetEmailToUsersArgs,
} from "types/graphql";

import { PASSWORD_RESET_PREFIX } from "@/constants/cachePrefixes";
import { PASSWORD_RESET_TOKEN_EXPIRES_IN } from "@/constants/limits";
import { FORGOT_PASSWORD_TEMPLATE } from "@/constants/templates";
import universalLinks from "@/constants/universalLinks";
import dayjs from "@/utils/dayjs";

export default {
  Mutation: {
    async sendPasswordResetEmailToUsers(
      _parent: unknown,
      { inputs }: MutationSendPasswordResetEmailToUsersArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { emailClient, prismaClient, t, jwtClient, redisClient } = context;

      const users = await prismaClient.user.findMany({
        where: {
          email: {
            in: inputs.map((input) => input.email),
          },
        },
      });

      users.forEach((user) => {
        (async () => {
          const { email, language, firstName } = user;
          const cacheKey = `${PASSWORD_RESET_PREFIX}:${email}`;
          const expiresIn = dayjs
            .duration(...PASSWORD_RESET_TOKEN_EXPIRES_IN)
            .asSeconds();

          const token = jwtClient.signForAllClients(
            { email },
            {
              expiresIn,
            },
          );

          await redisClient.setex(cacheKey, expiresIn, token);

          emailClient.send({
            template: FORGOT_PASSWORD_TEMPLATE,
            message: {
              to: email,
            },
            locals: {
              locale: language,
              name: firstName,
              link: universalLinks.resetPassword.replace(":token", token),
            },
          });
        })();
      });

      return {
        success: true,
        message: t("mutation.sendPasswordResetEmailToUsers.message"),
      };
    },
  },
};
