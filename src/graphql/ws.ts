import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import i18next from "i18next";
import redisClient, { pubsub } from "@/config/redis";
import prismaClient from "@/config/database";
import sms from "@/utils/sms";
import logger from "@/utils/logger";
import type { IncomingMessage, ServerResponse, Server } from "http";
import type { GraphQLSchema } from "graphql";
import type { User } from "@prisma/client";
import type { SocketContext } from "types";

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
      context: async (ctx): Promise<SocketContext> => {
        let currentUser: User | undefined | null;

        try {
          const token = ctx.connectionParams?.Authorization as
            | string
            | undefined;

          // TODO
          const decoded = token;
          if (decoded) {
            if (currentUser) {
              if (currentUser.language) {
                await i18next.changeLanguage(currentUser.language);
              }
            }
          }
        } catch (error) {
          logger.info({ error });
        }

        return {
          pubsub,
          currentUser,
          redisClient,
          prismaClient,
          t: i18next.t,
          language: i18next.language,
          smsClient: sms,
        };
      },
      onConnect: (ctx) => {
        try {
          const token = ctx.connectionParams?.Authorization as
            | string
            | undefined;

          return !!token;
        } catch (error) {
          logger.info({ error });
        }
        return false;
      },
    },
    wsServer,
  );
}
