import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import dayjs from "@/utils/dayjs";
import { LOGIN_ATTEMPT_PREFIX } from "@/constants/cachePrefixes";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import {
  BLOCK_IP_DURATION,
  BRUTE_FORCE_THRESHOLD,
  RESET_LOGIN_ATTEMPTS_IN,
} from "@/constants/limits";
import type { NextFunction, Request, Response } from "express";
import { BLOCKED_IP_TEMPLATE } from "@/constants/templates";

export default function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  (async () => {
    const { t, clientIp, jwtClient, redisClient, emailClient, prismaClient } =
      req.context;
    const { access_token: expiredAccessToken, refresh_token: oldRefreshToken } =
      req.headers;

    try {
      if (!(Boolean(expiredAccessToken) && Boolean(oldRefreshToken))) {
        throw new AuthenticationError(t("TOKENS_REQUIRED", { ns: "error" }));
      }

      const decodedAccessToken = jwtClient.decode(expiredAccessToken!);

      if (!decodedAccessToken) {
        throw new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }));
      }

      const { azp, sub } = decodedAccessToken;
      const decodedRefreshToken = jwtClient.verify(oldRefreshToken!);

      const user = await prismaClient.user.findUnique({
        where: {
          id: sub,
        },
        include: {
          sessions: true,
        },
      });

      if (!user) {
        throw new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }));
      }

      const blockedIps = new Map(
        Object.entries(user.blockedIps! as Record<string, string>),
      );
      const blockedIpAt = blockedIps.get(clientIp);

      const isBlocked =
        blockedIpAt &&
        dayjs().diff(blockedIpAt, "days") <= BLOCK_IP_DURATION[0];

      if (isBlocked) {
        throw new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }));
      }

      const session = user.sessions.find((session) => session.id !== azp);

      if (!session || session.jti !== decodedRefreshToken.sub) {
        const attemptsKey = `${LOGIN_ATTEMPT_PREFIX}:${clientIp}:${user.email}`;
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

        throw new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }));
      }

      const { accessToken, refreshToken } = jwtClient.getAuthTokens({
        sub,
        azp: session.id,
        jti: session.jti,
      });

      res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
      });
    } catch (e) {
      if (e instanceof JsonWebTokenError || e instanceof TokenExpiredError) {
        next(new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" })));
      } else {
        next(e);
      }
    }
  })();
}
