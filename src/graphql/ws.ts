import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import i18next from "i18next";
import { configureScope } from "@sentry/node";
import redisClient, { pubsub } from "@/config/redis";
import prismaClient from "@/config/database";
import smsClient from "@/utils/sms";
import emailClient from "@/utils/email";
import log from "@/utils/logger";
import storage from "@/utils/storage";
import jwtClient from "@/utils/jwt";
import type { IncomingMessage, ServerResponse, Server } from "http";
import type { GraphQLSchema } from "graphql";
import type { AppContext, CurrentUser } from "types";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";

export default function useWebSocketServer(
  schema: GraphQLSchema,
  server: Server<typeof IncomingMessage, typeof ServerResponse>,
) {
  const wsServer = new WebSocketServer({
    server,
    path: "/graphql",
  });

  return useServer(
    {
      schema,
      context: async (ctx): Promise<AppContext> => {
        let currentUser: CurrentUser | undefined | null;
        let sessionId: string | undefined;
        const { t, language } = i18next;

        const clientId = ctx.connectionParams?.client_id as string;

        if (
          process.env.NODE_ENV === "production" &&
          !(clientId && jwtClient.clientIds.includes(clientId))
        ) {
          throw new ForbiddenError(t("UNSUPPORTED_CLIENT", { ns: "error" }));
        }

        if (clientId) {
          jwtClient.setAudience(clientId);
        }

        try {
          const authorization = ctx.connectionParams?.authorization as
            | string
            | undefined;

          if (authorization?.startsWith("Bearer")) {
            const token = authorization.split(/\s+/)[1];
            const payload = jwtClient.verify(token);
            if (payload) {
              sessionId = payload.azp;
              currentUser = await prismaClient.user.currentUser(payload.sub!);
            }

            if (currentUser) {
              configureScope((scope) => {
                scope.setUser({ id: currentUser!.id });
              });
              if (currentUser?.language) {
                await i18next.changeLanguage(currentUser.language);
              }
              if (!currentUser.sessions?.[payload.azp!]) {
                throw new AuthenticationError(
                  t("INVALID_AUTH_TOKEN", { ns: "error" }),
                );
              }
            }
          }
        } catch (error) {
          log.info({ error });
        }

        return {
          t,
          log,
          pubsub,
          smsClient,
          jwtClient,
          currentUser,
          redisClient,
          prismaClient,
          emailClient,
          sessionId,
          clientId,
          language,
          storage,
        };
      },
      onConnect: (ctx) => {
        try {
          const token = ctx.connectionParams?.authorization as
            | string
            | undefined;
          if (token) {
            return !!jwtClient.verify(token);
          }

          return false;
        } catch (error) {
          return false;
        }
      },
    },
    wsServer,
  );
}
