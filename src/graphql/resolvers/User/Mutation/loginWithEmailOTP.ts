import type {
  MutationLoginWithEmailOtpArgs,
  AuthResponse,
} from "types/graphql";
import type { AppContext, UserSessions } from "types";
import {
  AUTH_PREFIX,
  EMAIL_LOGIN_OTP_PREFIX,
  LOGIN_ATTEMPT_PREFIX,
} from "@/constants/cachePrefixes";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import { UserStatus } from "@prisma/client";
import {
  BLOCK_IP_DURATION,
  BRUTE_FORCE_THRESHOLD,
  REFRESH_TOKEN_EXPIRES_IN,
  RESET_LOGIN_ATTEMPTS_IN,
} from "@/constants/limits";
import dayjs from "@/utils/dayjs";
import { BLOCKED_IP_TEMPLATE } from "@/constants/templates";

export default {
  Mutation: {
    async loginWithEmailOTP(
      _parent: never,
      { input }: MutationLoginWithEmailOtpArgs,
      context: AppContext,
    ): Promise<AuthResponse> {
      const {
        prismaClient,
        redisClient,
        t,
        ip,
        emailClient,
        jwtClient,
        clientId,
      } = context;

      const otp = await redisClient.getdel(
        `${EMAIL_LOGIN_OTP_PREFIX}:${input.email}`,
      );

      if (!otp) {
        throw new AuthenticationError(
          t("mutation.loginWithOTP.errors.message"),
        );
      }

      const user = await prismaClient.user.findFirst({
        where: {
          email: input.email,
          isEmailVerified: true,
          status: UserStatus.Active,
        },
      });

      if (!user) {
        throw new AuthenticationError(
          t("mutation.loginWithOTP.errors.message"),
        );
      }

      const blockedIps = new Map(Object.entries(user.blockedIps!));
      const blockedIpAt = ip ? blockedIps.get(ip) : undefined;

      const isBlocked =
        blockedIpAt &&
        dayjs().diff(blockedIpAt, "days") <= BLOCK_IP_DURATION[0];

      if (isBlocked) {
        throw new AuthenticationError(
          t("mutation.loginWithOTP.errors.message"),
        );
      }

      if (otp !== input.otp) {
        const attemptsKey = `${LOGIN_ATTEMPT_PREFIX}:${ip}:${input.email}`;
        const attempts = await redisClient.get(attemptsKey);

        const count = attempts ? Number.parseInt(attempts, 10) : 1;

        if (count === BRUTE_FORCE_THRESHOLD) {
          if (ip) {
            blockedIps.set(ip, dayjs().toISOString());
          }

          await prismaClient.user.update({
            where: {
              id: user.id,
            },
            data: {
              blockedIps: Object.fromEntries(blockedIps),
            },
          });

          await redisClient.setex(
            attemptsKey,
            dayjs.duration(...RESET_LOGIN_ATTEMPTS_IN).asSeconds(),
            count + 1,
          );

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
        }

        throw new AuthenticationError(
          t("mutation.loginWithOTP.errors.message"),
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
