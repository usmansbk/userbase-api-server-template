import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import dayjs from "@/utils/dayjs";
import { AUTH_PREFIX } from "@/constants/cachePrefixes";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import { REFRESH_TOKEN_EXPIRES_IN } from "@/constants/limits";
import type { NextFunction, Request, Response } from "express";
import type { UserSessions } from "types";

export default function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  (async () => {
    const { prismaClient, redisClient, t, jwtClient, clientId } = req.context;
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

      const sessions = new Map(Object.entries(user.sessions as UserSessions));

      const oldSession = sessions.get(oldAzp!);

      if (!oldSession || oldSession.jti !== decodedRefreshToken.sub) {
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
        createdAt: dayjs.utc().toISOString(),
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
      if (e instanceof TokenExpiredError) {
        next(new AuthenticationError(t("EXPIRED_AUTH_TOKEN", { ns: "error" })));
      } else if (e instanceof JsonWebTokenError) {
        next(new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" })));
      } else {
        next(e);
      }
    }
  })();
}
