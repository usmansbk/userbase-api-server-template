import { ApolloServer } from "@apollo/server";
import schema from "@/graphql/schema";
import type { AppContext } from "types";

export function createMockApolloServer() {
  const server = new ApolloServer<AppContext>({
    schema,
    includeStacktraceInErrorResponses: false,
  });

  return server;
}
