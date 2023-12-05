import { GraphQLError } from "graphql";

interface Options {
  originalError?: Error;
  code?: string;
}

export default class QueryError extends GraphQLError {
  constructor(message: string, { originalError, code }: Options = {}) {
    super(message, {
      originalError,
      extensions: {
        code: code ?? "QueryError",
      },
    });
  }
}
