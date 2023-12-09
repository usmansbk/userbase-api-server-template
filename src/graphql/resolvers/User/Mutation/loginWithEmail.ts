import dayjs from "@/utils/dayjs";
import { UserStatus } from "@prisma/client";
import { AUTH_PREFIX, LOGIN_ATTEMPT } from "@/constants/cachePrefixes";
import {
  RESET_LOGIN_ATTEMPTS_IN,
  MAX_LOGIN_ATTEMPT,
  REFRESH_TOKEN_EXPIRES_IN,
} from "@/constants/limits";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import type { MutationLoginWithEmailArgs, AuthResponse } from "types/graphql";
import type { AppContext, UserSessions } from "types";

export default {
  Mutation: {
    async loginWithEmail(
      _parent: unknown,
      { input }: MutationLoginWithEmailArgs,
      context: AppContext,
    ): Promise<AuthResponse> {
      const { t, prismaClient, jwtClient, redisClient, clientId, emailClient } =
        context;

      const user = await prismaClient.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user || user.status === UserStatus.Staged) {
        throw new AuthenticationError(
          t("mutation.loginWithEmail.errors.message"),
        );
      }

      const denyList: UserStatus[] = [
        UserStatus.LockedOut,
        UserStatus.Suspended,
        UserStatus.PasswordExpired,
        UserStatus.Recovery,
        UserStatus.Deprovisioned,
      ];

      const attemptsKey = `${LOGIN_ATTEMPT}:${input.email}`;
      const isMatched = await user.comparePassword(input.password);
      if (!isMatched) {
        if (!denyList.includes(user.status)) {
          const attempts = await redisClient.get(attemptsKey);

          const count = attempts ? Number.parseInt(attempts, 10) : 1;

          if (count === MAX_LOGIN_ATTEMPT) {
            emailClient.send({
              template: "account-locked",
              message: {
                to: user.email,
              },
              locals: {
                locale: user.language,
              },
            });
            await prismaClient.user.update({
              where: {
                id: user.id,
              },
              data: {
                status: UserStatus.LockedOut,
              },
            });
          }

          await redisClient.setex(
            attemptsKey,
            dayjs.duration(...RESET_LOGIN_ATTEMPTS_IN).asSeconds(),
            count + 1,
          );
        }

        throw new AuthenticationError(
          t("mutation.loginWithEmail.errors.message"),
        );
      }
      await redisClient.del(attemptsKey);

      if (denyList.includes(user.status)) {
        throw new ForbiddenError(
          t(`mutation.loginWithEmail.errors.unauthorized`, {
            context: user.status,
          }),
        );
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

      return {
        success: true,
        message: t("mutation.login.welcome", { name: user.firstName }),
        accessToken,
        refreshToken,
      };
    },
  },
};
