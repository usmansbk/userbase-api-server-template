import type { ErrorRequestHandler, Request } from "express";
import { GraphQLError } from "graphql";

import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";

const errorHandler: ErrorRequestHandler = (error, req: Request, res, next) => {
  const { t, log } = req.context;

  if (error instanceof AuthenticationError) {
    res.status(401).json({
      error,
    });
  } else if (error instanceof ForbiddenError) {
    res.status(403).json({
      error,
    });
  } else if (error instanceof GraphQLError) {
    res.status(400).json({
      error,
    });
  } else {
    log.error(error);
    res.status(500).json({
      error: new GraphQLError(t("SOMETHING_WENT_WRONG", { ns: "error" })),
    });
  }
};

export default errorHandler;
