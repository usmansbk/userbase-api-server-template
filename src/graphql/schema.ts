import { makeExecutableSchema } from "@graphql-tools/schema";
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

export default schema;
