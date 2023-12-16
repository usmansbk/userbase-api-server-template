import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { configureScope } from "@sentry/node";
import redisClient, { pubsub } from "@/config/redis";
import smsClient from "@/utils/sms";
import jwtClient from "@/utils/jwt";
import storage from "@/utils/storage";
import prismaClient from "@/config/database";
import emailClient from "@/utils/email";
import docClient from "@/utils/docClient";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import type { NextFunction, Request, Response } from "express";
import type { CurrentUser } from "types";

const appContext = (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    const { t, language, i18n, headers, log, useragent, clientIp } = req;

    const apps = await prismaClient.application.findMany();
    const clientId = req.headers.client_id;

    jwtClient.setClients(apps.map((app) => app.clientId));

    req.context = {
      t,
      log,
      pubsub,
      language,
      redisClient,
      prismaClient,
      emailClient,
      docClient,
      clientIp: clientIp!,
      userAgent: useragent?.source,
      smsClient,
      jwtClient,
      storage,
      clientId,
    };

    try {
      const { authorization } = headers;

      if (
        process.env.NODE_ENV === "production" &&
        !jwtClient.clientIds.includes(clientId)
      ) {
        throw new ForbiddenError(t("UNSUPPORTED_CLIENT", { ns: "error" }));
      }

      jwtClient.setAudience(clientId);

      let currentUser: CurrentUser | undefined | null;

      if (authorization?.startsWith("Bearer")) {
        const token = authorization.split(/\s+/)[1];
        const payload = jwtClient.verify(token);

        if (payload) {
          currentUser = await prismaClient.user.currentUser(payload.sub!);

          if (currentUser) {
            if (currentUser.language) {
              await i18n.changeLanguage(currentUser.language);
            }
            configureScope((scope) => {
              scope.setUser({ id: currentUser!.id });
            });

            const session = currentUser.sessions.find(
              (session) => session.id === payload.azp,
            );

            if (!session) {
              throw new AuthenticationError(
                t("INVALID_AUTH_TOKEN", { ns: "error" }),
              );
            }
            req.context.currentUser = currentUser;
          }
        }
      }

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        next(
          new AuthenticationError(t("EXPIRED_AUTH_TOKEN", { ns: "error" }), {
            originalError: error,
          }),
        );
      } else if (error instanceof JsonWebTokenError) {
        next(
          new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" }), {
            originalError: error,
          }),
        );
      } else {
        next(error);
      }
    }
  })();
};

export default appContext;
