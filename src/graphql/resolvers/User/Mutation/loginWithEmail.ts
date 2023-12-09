import dayjs from "@/utils/dayjs";
import { UserStatus } from "@prisma/client";
import { AUTH_PREFIX, LOGIN_ATTEMPT_PREFIX } from "@/constants/cachePrefixes";
import {
  RESET_LOGIN_ATTEMPTS_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  BRUTE_FORCE_THRESHOLD,
  BLOCK_IP_DURATION,
} from "@/constants/limits";
import { BLOCKED_IP_TEMPLATE } from "@/constants/templates";
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
      const {
        t,
        ip,
        clientId,
        jwtClient,
        redisClient,
        emailClient,
        prismaClient,
      } = context;

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

      const blockedIps = new Map(Object.entries(user.blockedIps!));
      const blockedIpAt = ip ? blockedIps.get(ip) : undefined;

      const isBlocked =
        blockedIpAt &&
        dayjs().diff(blockedIpAt, "days") <= BLOCK_IP_DURATION[0];

      if (isBlocked) {
        // We alert users of incorrect email/password to avoid confirming the password's accuracy to potential attackers.
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

      const isMatched = await user.comparePassword(input.password);

      if (!isMatched) {
        if (!denyList.includes(user.status)) {
          const attemptsKey = `${LOGIN_ATTEMPT_PREFIX}:${ip}:${input.email}`;
          const attempts = await redisClient.get(attemptsKey);

          const count = attempts ? Number.parseInt(attempts, 10) : 1;

          if (count === BRUTE_FORCE_THRESHOLD) {
            if (ip) {
              blockedIps.set(ip, dayjs().toISOString());
            }
            emailClient.send({
              template: BLOCKED_IP_TEMPLATE,
              message: {
                to: user.email,
              },
              locals: {
                locale: user.language,
                ip,
              },
            });
            await prismaClient.user.update({
              where: {
                id: user.id,
              },
              data: {
                blockedIps: Object.fromEntries(blockedIps),
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
