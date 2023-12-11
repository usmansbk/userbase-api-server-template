import { UserStatus } from "@prisma/client";
import dayjs from "@/utils/dayjs";
import {
  LOGIN_ATTEMPT_PREFIX,
  PHONE_NUMBER_LOGIN_OTP_PREFIX,
} from "@/constants/cachePrefixes";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import {
  BLOCK_IP_DURATION,
  BRUTE_FORCE_THRESHOLD,
  RESET_LOGIN_ATTEMPTS_IN,
} from "@/constants/limits";
import { BLOCKED_IP_TEMPLATE } from "@/constants/templates";
import type { MutationLoginWithSmsotpArgs, AuthResponse } from "types/graphql";
import type { AppContext } from "types";

export default {
  Mutation: {
    async loginWithSMSOTP(
      _parent: unknown,
      { input }: MutationLoginWithSmsotpArgs,
      context: AppContext,
    ): Promise<AuthResponse> {
      const {
        t,
        clientIp,
        redisClient,
        prismaClient,
        emailClient,
        jwtClient,
        clientId,
        userAgent,
      } = context;
      const { phoneNumber, otp } = input;

      const cacheKey = `${PHONE_NUMBER_LOGIN_OTP_PREFIX}:${phoneNumber}`;
      const sentOtp = await redisClient.get(cacheKey);

      if (!sentOtp) {
        throw new AuthenticationError(
          t("mutation.loginWithOTP.errors.message"),
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
          t("mutation.loginWithOTP.errors.message"),
        );
      }

      const blockedIps = new Map(
        Object.entries(user.blockedIps! as Record<string, string>),
      );
      const blockedIpAt = blockedIps.get(clientIp);

      const isBlocked =
        blockedIpAt &&
        dayjs().diff(blockedIpAt, "days") <= BLOCK_IP_DURATION[0];

      if (isBlocked) {
        throw new AuthenticationError(
          t("mutation.loginWithOTP.errors.message"),
        );
      }

      if (otp !== sentOtp) {
        const attemptsKey = `${LOGIN_ATTEMPT_PREFIX}:${clientIp}:${phoneNumber}`;
        const attempts = await redisClient.get(attemptsKey);

        const count = attempts ? Number.parseInt(attempts, 10) : 1;

        if (count === BRUTE_FORCE_THRESHOLD) {
          blockedIps.set(clientIp, dayjs().toISOString());
          await prismaClient.user.update({
            where: {
              id: user.id,
            },
            data: {
              blockedIps: Object.fromEntries(blockedIps),
            },
          });

          if (user.isEmailVerified) {
            emailClient.send({
              template: BLOCKED_IP_TEMPLATE,
              message: {
                to: user.email,
              },
              locals: {
                locale: user.language,
                clientIp,
                userAgent,
              },
            });
          }
        } else {
          await redisClient.setex(
            attemptsKey,
            dayjs.duration(...RESET_LOGIN_ATTEMPTS_IN).asSeconds(),
            count + 1,
          );
        }

        throw new AuthenticationError(
          t("mutation.loginWithOTP.errors.message"),
        );
      }

      await redisClient.del(cacheKey);

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

      return {
        success: true,
        message: t("mutation.login.welcome", { name: user.firstName }),
        accessToken,
        refreshToken,
      };
    },
  },
};
