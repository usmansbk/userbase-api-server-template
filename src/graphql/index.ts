import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import type { Express } from "express";
import http from "http";
import type { AppContext } from "types";

import schema from "./schema";
import useWebSocketServer from "./ws";

export default async function createApolloHTTPServer(app: Express) {
  const httpServer = http.createServer(app);
  const serverCleanup = useWebSocketServer(schema, httpServer);

  const apolloServer = new ApolloServer<AppContext>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    allowBatchedHttpRequests: true,
  });

  // Ensure we wait for our server to start
  await apolloServer.start();

  return { apolloServer, httpServer };
}
