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
import { WELCOME_TEMPLATE } from "@/constants/templates";

export default {
  Mutation: {
    async loginWithIdentityProvider(
      _parent: unknown,
      { input }: MutationLoginWithIdentityProviderArgs,
      context: AppContext,
    ): Promise<AuthResponse> {
      const {
        t,
        clientId,
        clientIp,
        language,
        userAgent,
        jwtClient,
        emailClient,
        prismaClient,
      } = context;
      const { provider, token } = input;

      let userPayload;

      if (provider === "GOOGLE") {
        userPayload = await verifyGoogleIdToken(token as string);
      }

      if (!userPayload) {
        throw new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }));
      }

      const {
        email,
        firstName,
        lastName,
        locale,
        socialPictureUrl,
        isEmailVerified,
      } = userPayload;

      let user = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      const allowList: UserStatus[] = [
        UserStatus.Staged,
        UserStatus.Provisioned,
        UserStatus.Active,
      ];

      if (user && !allowList.includes(user.status)) {
        throw new ForbiddenError(
          t("mutation.login.errors.unauthorized", { context: user.status }),
        );
      }

      let isNewUser = true;
      let isWelcomeEmailSent = false;

      if (!user) {
        user = await prismaClient.user.create({
          data: {
            email,
            firstName: firstName ?? email,
            lastName,
            language: locale,
            socialPictureUrl,
            isEmailVerified,
            password: nanoid(),
            status: isEmailVerified
              ? UserStatus.Active
              : UserStatus.Provisioned,
          },
        });
      } else if (user.status === UserStatus.Staged) {
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
            isEmailVerified,
            status: isEmailVerified
              ? UserStatus.Active
              : UserStatus.Provisioned,
          },
        });
      } else {
        isNewUser = false;
        isWelcomeEmailSent = !!user.isEmailVerified;
        user = await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            isEmailVerified: user.isEmailVerified ?? !!isEmailVerified,
            socialPictureUrl,
            status:
              user.isEmailVerified ?? !!isEmailVerified
                ? UserStatus.Active
                : UserStatus.Provisioned,
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

      if (!isWelcomeEmailSent) {
        emailClient.send({
          template: WELCOME_TEMPLATE,
          message: {
            to: user.email,
          },
          locals: {
            locale: user.language ?? language,
            name: firstName,
          },
        });
      }

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
