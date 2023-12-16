import { useServer } from "graphql-ws/lib/use/ws";
import { CloseCode } from "graphql-ws";
import { WebSocketServer } from "ws";
import { configureScope } from "@sentry/node";
import i18next from "@/config/i18n";
import { pubsub } from "@/config/redis";
import storage from "@/utils/storage";
import prismaClient from "@/config/database";
import log from "@/utils/logger";
import jwtClient from "@/utils/jwt";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import Sentry from "@/config/sentry";
import type { IncomingMessage, ServerResponse, Server } from "http";
import type { GraphQLSchema } from "graphql";
import type { CurrentUser, SocketContext } from "types";

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
      onConnect: async (ctx) => {
        try {
          const apps = await prismaClient.application.findMany();

          jwtClient.setClients(apps.map((app) => app.clientId));

          const clientId = ctx.connectionParams?.client_id as string;

          if (
            process.env.NODE_ENV === "production" &&
            !jwtClient.clientIds.includes(clientId)
          ) {
            return false;
          }

          jwtClient.setAudience(clientId);

          const authorization = ctx.connectionParams?.authorization as
            | string
            | undefined;
          if (!(authorization && authorization.startsWith("Bearer"))) {
            return false;
          }

          const token = authorization.split(/\s+/)[1];

          return !!jwtClient.verify(token);
        } catch (error) {
          return false;
        }
      },
      context: async (ctx): Promise<SocketContext | undefined> => {
        try {
          let currentUser: CurrentUser | undefined | null;
          const { t } = i18next;

          const authorization = ctx.connectionParams?.authorization as
            | string
            | undefined;

          if (authorization?.startsWith("Bearer")) {
            const token = authorization.split(/\s+/)[1];
            const payload = jwtClient.verify(token);
            if (payload) {
              currentUser = await prismaClient.user.currentUser(payload.sub!);

              if (currentUser) {
                configureScope((scope) => {
                  scope.setUser({ id: currentUser!.id });
                });
                if (currentUser?.language) {
                  await i18next.changeLanguage(currentUser.language);
                }

                const session = currentUser.sessions.find(
                  (session) => session.id === payload.azp,
                );

                if (!session) {
                  throw new AuthenticationError(
                    t("INVALID_AUTH_TOKEN", { ns: "error" }),
                  );
                }
              }
            }
          }

          return {
            t,
            pubsub,
            storage,
            currentUser,
            prismaClient,
          };
        } catch (error) {
          log.info({ error });
          Sentry.captureException(error);
          ctx.extra.socket.close(CloseCode.Forbidden, "Forbidden");
        }
      },
    },
    wsServer,
  );
}
