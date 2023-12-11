import { UserStatus } from "@prisma/client";
import dayjs from "@/utils/dayjs";
import {
  AUTH_PREFIX,
  LOGIN_ATTEMPT_PREFIX,
  PHONE_NUMBER_LOGIN_OTP_PREFIX,
} from "@/constants/cachePrefixes";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import {
  BLOCK_IP_DURATION,
  BRUTE_FORCE_THRESHOLD,
  REFRESH_TOKEN_EXPIRES_IN,
  RESET_LOGIN_ATTEMPTS_IN,
} from "@/constants/limits";
import { BLOCKED_IP_TEMPLATE } from "@/constants/templates";
import type { MutationLoginWithSmsotpArgs, AuthResponse } from "types/graphql";
import type { AppContext, UserSessions } from "types";

export default {
  Mutation: {
    async loginWithSMSOTP(
      _parent: unknown,
      { input }: MutationLoginWithSmsotpArgs,
      context: AppContext,
    ): Promise<AuthResponse> {
      const {
        t,
        redisClient,
        prismaClient,
        emailClient,
        jwtClient,
        ip,
        clientId,
      } = context;
      const { phoneNumber, otp } = input;

      const cacheKey = `${PHONE_NUMBER_LOGIN_OTP_PREFIX}:${phoneNumber}`;
      const sentOtp = await redisClient.get(cacheKey);

      if (!sentOtp) {
        throw new AuthenticationError(
          t("mutation.loginWithSMSOTP.errors.message"),
        );
      }

      const user = await prismaClient.user.findFirst({
        where: {
          phoneNumber,
          isPhoneNumberVerified: true,
          status: UserStatus.Active,
        },
      });

      if (!user) {
        throw new AuthenticationError(
          t("mutation.loginWithSMSOTP.errors.message"),
        );
      }

      const blockedIps = new Map(
        Object.entries(user.blockedIps! as Record<string, string>),
      );
      const blockedIpAt = ip ? blockedIps.get(ip) : undefined;

      const isBlocked =
        blockedIpAt &&
        dayjs().diff(blockedIpAt, "days") <= BLOCK_IP_DURATION[0];

      if (isBlocked) {
        throw new AuthenticationError(
          t("mutation.loginWithSMSOTP.errors.message"),
        );
      }

      if (otp !== sentOtp) {
        const attemptsKey = `${LOGIN_ATTEMPT_PREFIX}:${ip}:${phoneNumber}`;
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

          if (user.isEmailVerified) {
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
        }

        throw new AuthenticationError(
          t("mutation.loginWithSMSOTP.errors.message"),
        );
      }

      await redisClient.del(cacheKey);

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
        createdAt: dayjs().toISOString(),
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
