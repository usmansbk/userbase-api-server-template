import type { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import type { User } from "@prisma/client";
import redisClient, { pubsub } from "@/config/redis";
import prismaClient from "@/config/database";
import smsClient from "@/utils/sms";

const appContext = (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    const { t, language, i18n, headers, log } = req;
    try {
      const { authorization } = headers;

      req.context = {
        t,
        log,
        pubsub,
        language,
        redisClient,
        prismaClient,
        smsClient,
      };

      if (authorization?.startsWith("Bearer")) {
        const token = authorization.split(/\s+/)[1];
        // TODO: verify token
        log.info(token);
        let currentUser: User | undefined;

        if (currentUser?.language) {
          await i18n.changeLanguage(currentUser.language);
        }
      }

      next();
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        next(new Error(t("EXPIRED_AUTH_TOKEN", { ns: "error" })));
      } else if (e instanceof JsonWebTokenError) {
        next(new Error(t("INVALID_AUTH_TOKEN", { ns: "error" })));
      } else {
        next(e);
      }
    }
  })();
};

export default appContext;
