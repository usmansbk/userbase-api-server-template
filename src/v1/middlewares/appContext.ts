import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { GraphQLError } from "graphql";
import redisClient, { pubsub } from "@/config/redis";
import smsClient from "@/utils/sms";
import storage from "@/utils/storage";
import getPrismaClient from "@/config/database";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import QueryError from "@/utils/errors/QueryError";
import type { NextFunction, Request, Response } from "express";
import type { CurrentUser } from "types";

const appContext = (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    const { t, language, i18n, headers, log } = req;
    try {
      const { authorization } = headers;

      const prismaClient = getPrismaClient();

      let currentUser: CurrentUser | undefined | null;

      if (authorization?.startsWith("Bearer")) {
        const token = authorization.split(/\s+/)[1];
        // TODO: verify token
        log.info(token);
        currentUser = await prismaClient.user.currentUser("");

        if (currentUser?.user.language) {
          await i18n.changeLanguage(currentUser?.user.language);
        }
      }

      req.context = {
        t,
        log,
        pubsub,
        language,
        redisClient,
        prismaClient,
        currentUser,
        smsClient,
        storage,
      };

      next();
    } catch (e) {
      if (e instanceof GraphQLError) {
        next(e);
      } else if (e instanceof TokenExpiredError) {
        next(new AuthenticationError(t("EXPIRED_AUTH_TOKEN", { ns: "error" })));
      } else if (e instanceof JsonWebTokenError) {
        next(new AuthenticationError(t("INVALID_AUTH_TOKEN", { ns: "error" })));
      } else {
        next(
          new QueryError(t("SOMETHING_WENT_WRONG", { ns: "error" }), {
            originalError: e as Error,
          }),
        );
      }
    }
  })();
};

export default appContext;
