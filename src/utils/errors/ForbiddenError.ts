import { GraphQLError } from "graphql";

interface Options {
  originalError?: Error;
  status?: number;
}

export default class ForbiddenError extends GraphQLError {
  constructor(message: string, { originalError, status }: Options = {}) {
    super(message, {
      originalError,
      extensions: {
        code: "ForbiddenError",
        http: status ? { status } : undefined,
      },
    });
  }
}
