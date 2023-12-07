import { nanoid } from "nanoid";
import { UserStatus } from "@prisma/client";
import verifyGoogleIdToken from "@/utils/googleOauth";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import type {
  MutationLoginWithIdentityProviderArgs,
  AuthResponse,
} from "types/graphql";
import type { AppContext } from "types";

export default {
  Mutation: {
    async loginWithIdentityProvider(
      _parent: unknown,
      { input }: MutationLoginWithIdentityProviderArgs,
      context: AppContext,
    ): Promise<AuthResponse> {
      const { prismaClient, t, jwtClient } = context;
      const { provider, token } = input;

      let userPayload;

      if (provider === "GOOGLE") {
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

      const denyList: UserStatus[] = [
        UserStatus.Deprovisioned,
        UserStatus.Suspended,
      ];

      if (user && denyList.includes(user.status)) {
        throw new ForbiddenError(t("UNAUTHORIZED", { ns: "error" }));
      }

      let isNewUser = false;

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
      } else {
        user = await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            socialPictureUrl,
            status: UserStatus.Active,
          },
        });
      }

      if (isNewUser) {
        // TODO: send welcome email
      }

      const { accessToken, refreshToken } = jwtClient.getAuthTokens({
        sub: user.id,
      });

      return {
        success: true,
        message: t(
          isNewUser ? "mutation.login.welcome" : "mutation.login.welcomeBack",
          { name: user.firstName },
        ),
        accessToken,
        refreshToken,
      };
    },
  },
};
