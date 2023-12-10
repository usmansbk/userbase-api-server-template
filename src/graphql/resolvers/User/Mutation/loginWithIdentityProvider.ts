import { nanoid } from "nanoid";
import { UserStatus } from "@prisma/client";
import verifyGoogleIdToken from "@/utils/googleOauth";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import type {
  MutationLoginWithIdentityProviderArgs,
  AuthResponse,
} from "types/graphql";
import type { AppContext, UserSessions } from "types";
import dayjs from "@/utils/dayjs";
import { REFRESH_TOKEN_EXPIRES_IN } from "@/constants/limits";
import { AUTH_PREFIX } from "@/constants/cachePrefixes";
import { WELCOME_TEMPLATE } from "@/constants/templates";

export default {
  Mutation: {
    async loginWithIdentityProvider(
      _parent: unknown,
      { input }: MutationLoginWithIdentityProviderArgs,
      context: AppContext,
    ): Promise<AuthResponse> {
      const {
        prismaClient,
        t,
        jwtClient,
        redisClient,
        clientId,
        emailClient,
        language,
      } = context;
      const { provider, token } = input;

      let userPayload;

      if (provider === "GOOGLE") {
        userPayload = await verifyGoogleIdToken(token);
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

      const { accessToken, refreshToken, jti, azp } = jwtClient.getAuthTokens({
        sub: user.id,
      });

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
