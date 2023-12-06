import { GraphQLError } from "graphql";
import type { ErrorRequestHandler, Request } from "express";

const errorHandler: ErrorRequestHandler = (error, req: Request, res, next) => {
  const { t, log } = req.context;

  log.error({
    error,
  });

  if (error instanceof GraphQLError) {
    next(error);
  } else {
    res.status(500).json({
      error: new GraphQLError(t("SOMETHING_WENT_WRONG", { ns: "error" })),
    });
  }
};

export default errorHandler;
