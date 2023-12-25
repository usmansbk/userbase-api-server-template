import { UserStatus } from "@prisma/client";
import type { AppContext } from "types";
import type { AuthResponse, MutationLoginWithEmailArgs } from "types/graphql";

import { LOGIN_ATTEMPT_PREFIX } from "@/constants/cachePrefixes";
import {
  BLOCK_IP_DURATION,
  BRUTE_FORCE_THRESHOLD,
  RESET_LOGIN_ATTEMPTS_IN,
} from "@/constants/limits";
import { BLOCKED_IP_TEMPLATE } from "@/constants/templates";
import dayjs from "@/utils/dayjs";
import AuthenticationError from "@/utils/errors/AuthenticationError";

export default {
  Mutation: {
    async loginWithEmail(
      _parent: unknown,
      { input }: MutationLoginWithEmailArgs,
      context: AppContext,
    ): Promise<AuthResponse> {
      const {
        t,
        clientIp,
        clientId,
        userAgent,
        jwtClient,
        redisClient,
        emailClient,
        prismaClient,
      } = context;

      const user = await prismaClient.user.findFirst({
        where: {
          email: input.email,
          status: {
            in: [UserStatus.Active, UserStatus.Provisioned],
          },
        },
      });

      if (!user) {
        throw new AuthenticationError(
          t("mutation.loginWithEmail.errors.message"),
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
        console.log("blocked");
        // We alert users of incorrect email/password to avoid confirming the password's accuracy to potential attackers.
        throw new AuthenticationError(
          t("mutation.loginWithEmail.errors.message"),
        );
      }

      const isMatched = await user.comparePassword(input.password as string);

      if (!isMatched) {
        const attemptsKey = `${LOGIN_ATTEMPT_PREFIX}:${clientIp}:${input.email}`;
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
          t("mutation.loginWithEmail.errors.message"),
        );
      }

      const session = await prismaClient.session.create({
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
