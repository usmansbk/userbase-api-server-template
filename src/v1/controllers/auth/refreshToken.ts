import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import dayjs from "@/utils/dayjs";
import { AUTH_PREFIX, LOGIN_ATTEMPT_PREFIX } from "@/constants/cachePrefixes";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import {
  BLOCK_IP_DURATION,
  BRUTE_FORCE_THRESHOLD,
  REFRESH_TOKEN_EXPIRES_IN,
  RESET_LOGIN_ATTEMPTS_IN,
} from "@/constants/limits";
import type { NextFunction, Request, Response } from "express";
import type { UserSessions } from "types";
import { BLOCKED_IP_TEMPLATE } from "@/constants/templates";

export default function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  (async () => {
    const {
      prismaClient,
      redisClient,
      t,
      jwtClient,
      emailClient,
      clientId,
      ip,
    } = req.context;
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

      const { azp: oldAzp, sub } = decodedAccessToken;
      const decodedRefreshToken = jwtClient.verify(oldRefreshToken!);
      const oldJti = await redisClient.getdel(
        `${AUTH_PREFIX}:${clientId}:${oldAzp}:${sub}`,
      );

      if (!oldJti || decodedRefreshToken.sub !== oldJti) {
        throw new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }));
      }

      const user = await prismaClient.user.findUnique({
        where: {
          id: sub,
        },
      });

      if (!user) {
        throw new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }));
      }

      const blockedIps = new Map(
        Object.entries(user.blockedIps! as Record<string, string>),
      );
      const blockedIpAt = ip ? blockedIps.get(ip) : undefined;

      const isBlocked =
        blockedIpAt &&
        dayjs().diff(blockedIpAt, "days") <= BLOCK_IP_DURATION[0];

      if (isBlocked) {
        throw new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }));
      }

      const sessions = new Map(Object.entries(user.sessions as UserSessions));

      const oldSession = sessions.get(oldAzp!);

      if (!oldSession || oldSession.jti !== decodedRefreshToken.sub) {
        const attemptsKey = `${LOGIN_ATTEMPT_PREFIX}:${ip}:${decodedRefreshToken.sub}`;
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
        } else {
          await redisClient.setex(
            attemptsKey,
            dayjs.duration(...RESET_LOGIN_ATTEMPTS_IN).asSeconds(),
            count + 1,
          );
        }

        throw new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }));
      }

      const { accessToken, refreshToken, jti, azp } = jwtClient.getAuthTokens({
        sub,
      });

      await redisClient.setex(
        `${AUTH_PREFIX}:${clientId}:${azp}:${sub}`,
        dayjs.duration(...REFRESH_TOKEN_EXPIRES_IN).asSeconds(),
        jti,
      );

      sessions.delete(oldAzp!);
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
        data: { sessions: Object.fromEntries(sessions) },
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
