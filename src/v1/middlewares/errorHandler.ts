import { GraphQLError } from "graphql";
import type { ErrorRequestHandler, Request } from "express";

const errorHandler: ErrorRequestHandler = (error, req: Request, res, _next) => {
  const { t } = req.context;
  req.log.info({
    error,
  });

  if (error instanceof GraphQLError) {
    return res.status(200).json({ errors: [error] });
  }

  return res.status(500).json({
    error: new Error(t("SOMETHING_WENT_WRONG", { ns: "error" })),
  });
};

export default errorHandler;
