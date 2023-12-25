import { ApolloServer } from "@apollo/server";
import type { AppContext } from "types";

import schema from "@/graphql/schema";

export function createMockApolloServer() {
  const server = new ApolloServer<AppContext>({
    schema,
    includeStacktraceInErrorResponses: false,
  });

  return server;
}
