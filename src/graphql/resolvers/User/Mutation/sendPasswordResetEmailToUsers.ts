import type {
  MutationSendPasswordResetEmailToUsersArgs,
  MutationResponse,
} from "types/graphql";
import type { AppContext } from "types";
import { FORGOT_PASSWORD_TEMPLATE } from "@/constants/templates";
import dayjs from "@/utils/dayjs";
import { PASSWORD_RESET_TOKEN_EXPIRES_IN } from "@/constants/limits";
import { PASSWORD_RESET_PREFIX } from "@/constants/cachePrefixes";
import universalLinks from "@/constants/universalLinks";

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
        message: t("mutation.sendVerificationEmailToUsers.message"),
      };
    },
  },
};
