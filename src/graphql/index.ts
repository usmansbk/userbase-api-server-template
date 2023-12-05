import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import type { Express } from "express";
import type { AppContext } from "types";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import authDirectiveTransformer from "./directives/auth";

const schema = authDirectiveTransformer(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  "auth",
);

export default async function createApolloHTTPServer(app: Express): Promise<{
  apolloServer: ApolloServer<AppContext>;
  httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
}> {
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer<AppContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Ensure we wait for our server to start
  await apolloServer.start();

  return { apolloServer, httpServer };
}
