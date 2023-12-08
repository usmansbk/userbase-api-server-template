import { GraphQLError } from "graphql";

interface FieldError {
  name: string;
  messages: string[] | undefined;
}

interface Options {
  originalError?: Error;
  fieldErrors?: FieldError[];
}

export default class ValidationError extends GraphQLError {
  constructor(message: string, { originalError, fieldErrors }: Options = {}) {
    super(message, {
      originalError,
      extensions: {
        code: "ValidationError",
        fieldErrors,
      },
    });
  }
}
