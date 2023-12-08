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
import { AUTH_PREFX } from "@/constants/cachePrefixes";

export default {
  Mutation: {
    async loginWithIdentityProvider(
      _parent: unknown,
      { input }: MutationLoginWithIdentityProviderArgs,
      context: AppContext,
    ): Promise<AuthResponse> {
      const { prismaClient, t, jwtClient, redisClient, clientId } = context;
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

      const { accessToken, refreshToken, jti, azp } = jwtClient.getAuthTokens({
        sub: user.id,
      });

      await redisClient.setex(
        `${AUTH_PREFX}:${clientId}:${azp}:${user.id}`,
        dayjs.duration(...REFRESH_TOKEN_EXPIRES_IN).asSeconds(),
        jti,
      );

      const sessions = new Map(Object.entries(user.sessions as UserSessions));
      sessions.set(azp, {
        jti,
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

      if (isNewUser) {
        // TODO: send welcome email
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
