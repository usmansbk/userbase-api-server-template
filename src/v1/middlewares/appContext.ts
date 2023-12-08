import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { configureScope } from "@sentry/node";
import redisClient, { pubsub } from "@/config/redis";
import smsClient from "@/utils/sms";
import jwtClient from "@/utils/jwt";
import storage from "@/utils/storage";
import prismaClient from "@/config/database";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import type { NextFunction, Request, Response } from "express";
import type { CurrentUser } from "types";

const appContext = (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    const { t, language, i18n, headers, log } = req;

    req.context = {
      t,
      log,
      pubsub,
      language,
      redisClient,
      prismaClient,
      smsClient,
      jwtClient,
      storage,
    };

    try {
      const { authorization, client_id: clientId } = headers;

      if (
        process.env.NODE_ENV === "production" &&
        !(clientId && jwtClient.clientIds.includes(clientId))
      ) {
        throw new ForbiddenError(t("UNSUPPORTED_CLIENT", { ns: "error" }));
      }

      if (clientId) {
        req.context.clientId = clientId;
        jwtClient.setAudience(clientId);
      }

      let currentUser: CurrentUser | undefined | null;

      if (authorization?.startsWith("Bearer")) {
        const token = authorization.split(/\s+/)[1];
        const payload = jwtClient.verify(token);

        if (payload) {
          req.context.sessionId = payload.azp;
          currentUser = await prismaClient.user.currentUser(payload.sub!);
        }

        if (currentUser) {
          if (currentUser.language) {
            await i18n.changeLanguage(currentUser?.language);
          }
          configureScope((scope) => {
            scope.setUser({ id: currentUser!.id });
          });
          if (!currentUser.sessions?.[payload.azp!]) {
            throw new AuthenticationError(
              t("INVALID_AUTH_TOKEN", { ns: "error" }),
            );
          }
          req.context.currentUser = currentUser;
        }
      }

      next();
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
};

export default appContext;
