import { GraphQLError } from "graphql";
import type { ErrorRequestHandler, Request } from "express";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";

const errorHandler: ErrorRequestHandler = (error, req: Request, res, next) => {
  const { t, log } = req.context;

  log.error({
    error,
  });

  if (error instanceof AuthenticationError) {
    res.status(401).json({
      error,
    });
  } else if (error instanceof ForbiddenError) {
    res.status(403).json({
      error,
    });
  } else if (error instanceof GraphQLError) {
    res.json({
      error,
    });
  } else {
    res.status(500).json({
      error: new GraphQLError(t("SOMETHING_WENT_WRONG", { ns: "error" })),
    });
  }
};

export default errorHandler;
