import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import type { NextFunction, Request, Response } from "express";

export default function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  (async () => {
    const { t, jwtClient, prismaClient, clientId, userAgent, clientIp } =
      req.context;
    const { access_token: expiredAccessToken, refresh_token: oldRefreshToken } =
      req.headers;

    try {
      if (!(expiredAccessToken && oldRefreshToken)) {
        throw new AuthenticationError(t("TOKENS_REQUIRED", { ns: "error" }));
      }

      const decodedAccessToken = jwtClient.decode(expiredAccessToken);

      if (!decodedAccessToken) {
        throw new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }));
      }

      jwtClient.verify(oldRefreshToken);

      const { azp, sub } = decodedAccessToken;

      const user = await prismaClient.user.findUnique({
        where: {
          id: sub,
          sessions: {
            some: {
              id: azp,
            },
          },
        },
        include: {
          sessions: {
            where: {
              id: azp,
            },
          },
        },
      });

      if (!user) {
        throw new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }));
      }

      const [oldSession] = user.sessions;

      await prismaClient.userSession.delete({
        where: {
          id: oldSession.id,
        },
      });

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
