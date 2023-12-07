import { nanoid } from "nanoid";
import { UserStatus } from "@prisma/client";
import {
  type MutationLoginWithSocialProviderArgs,
  type AuthResponse,
  SocialProvider,
} from "types/graphql";
import type { AppContext } from "types";
import verifyGoogleIdToken from "@/utils/googleOauth";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";

export default {
  Mutation: {
    async loginWithSocialProvider(
      _parent: unknown,
      { input }: MutationLoginWithSocialProviderArgs,
      context: AppContext,
    ): Promise<AuthResponse> {
      const { prismaClient, t } = context;
      const { provider, token } = input;

      let userPayload;

      if (provider === SocialProvider.Google) {
        userPayload = await verifyGoogleIdToken(token);
      }

      if (!userPayload) {
        throw new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }));
      }

      const { email, firstName, lastName, locale, socialPictureUrl } =
        userPayload;

      let user = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      let isNewUser = false;

      const denyList: UserStatus[] = [
        UserStatus.Deprovisioned,
        UserStatus.Suspended,
        UserStatus.Recovery,
      ];

      if (!user) {
        isNewUser = true;
        user = await prismaClient.user.create({
          data: {
            email,
            firstName: firstName ?? email,
            lastName,
            language: locale,
            socialPictureUrl,
            password: nanoid(),
            status: UserStatus.Active,
          },
        });
      } else if (user.status === UserStatus.Staged) {
        isNewUser = true;
        user = await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            email,
            firstName: firstName ?? email,
            lastName,
            language: locale,
            socialPictureUrl,
            status: UserStatus.Active,
          },
        });
      } else if (denyList.includes(user.status)) {
        throw new ForbiddenError(t("UNAUTHORIZED", { ns: "error" }));
      }

      if (isNewUser) {
        // TODO: send welcome email
      }

      // TODO: generate tokens
      return {
        success: true,
        message: t(
          isNewUser ? "mutation.login.welcome" : "mutation.login.welcomeBack",
          { name: user.firstName },
        ),
        accessToken: "",
        refreshToken: "",
      };
    },
  },
};
