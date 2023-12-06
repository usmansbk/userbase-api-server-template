import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import type { Express } from "express";
import type { AppContext } from "types";
import schema from "./schema";

export default async function createApolloHTTPServer(app: Express) {
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer<AppContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    allowBatchedHttpRequests: true,
  });

  // Ensure we wait for our server to start
  await apolloServer.start();

  return { apolloServer, httpServer };
}
