import { makeExecutableSchema } from "@graphql-tools/schema";

import authDirectiveTransformer from "./directives/auth";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const schema = authDirectiveTransformer(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  "auth",
);

export default schema;
