import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import i18next from "i18next";
import redisClient, { pubsub } from "@/config/redis";
import getPrismaClient from "@/config/database";
import smsClient from "@/utils/sms";
import logger from "@/utils/logger";
import storage from "@/utils/storage";
import type { IncomingMessage, ServerResponse, Server } from "http";
import type { GraphQLSchema } from "graphql";
import type { AppContext, CurrentUser } from "types";

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

        const prismaClient = getPrismaClient();

        try {
          const token = ctx.connectionParams?.Authorization as
            | string
            | undefined;

          // TODO
          const decoded = token;

          currentUser = await prismaClient.user.currentUser("");
          if (decoded) {
            if (currentUser?.user.language) {
              await i18next.changeLanguage(currentUser.user.language);
            }
          }
        } catch (error) {
          logger.info({ error });
        }

        return {
          pubsub,
          smsClient,
          currentUser,
          redisClient,
          prismaClient,
          t: i18next.t,
          language: i18next.language,
          log: logger,
          storage,
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
