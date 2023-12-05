import { GraphQLError } from "graphql";

interface Options {
  originalError?: Error;
  status?: number;
}

export default class AuthenticationError extends GraphQLError {
  constructor(message: string, { originalError, status }: Options = {}) {
    super(message, {
      originalError,
      extensions: {
        code: "AuthenticationError",
        http: status ? { status } : undefined,
      },
    });
  }
}
