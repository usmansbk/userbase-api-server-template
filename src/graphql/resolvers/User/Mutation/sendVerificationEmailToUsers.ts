import type {
  MutationSendVerificationEmailToUsersArgs,
  MutationResponse,
} from "types/graphql";
import type { AppContext } from "types";
import { VERIFY_EMAIL_TEMPLATE } from "@/constants/templates";
import dayjs from "@/utils/dayjs";
import { EMAIL_VERIFICATION_TOKEN_EXPIRES_IN } from "@/constants/limits";
import { VERIFY_EMAIL_OTP_PREFIX } from "@/constants/cachePrefixes";
import universalLinks from "@/constants/universalLinks";

export default {
  Mutation: {
    async sendVerificationEmailToUsers(
      _parent: unknown,
      { inputs }: MutationSendVerificationEmailToUsersArgs,
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
          const expiresIn = dayjs
            .duration(...EMAIL_VERIFICATION_TOKEN_EXPIRES_IN)
            .asSeconds();

          const token = jwtClient.signForAllClients(
            { email },
            {
              expiresIn,
            },
          );

          const cacheKey = `${VERIFY_EMAIL_OTP_PREFIX}:${email}`;
          await redisClient.setex(cacheKey, expiresIn, token);

          emailClient.send({
            template: VERIFY_EMAIL_TEMPLATE,
            message: {
              to: email,
            },
            locals: {
              locale: language,
              name: firstName,
              link: universalLinks.verifyEmail.replace(":token", token),
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
