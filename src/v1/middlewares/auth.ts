import AuthenticationError from "@/utils/errors/AuthenticationError";
import type { NextFunction, Request, Response } from "express";

const authMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    const {
      context: { currentUser, t },
    } = req;

    if (!currentUser) {
      next(
        new AuthenticationError(
          t("UNAUTHENTICATED", {
            ns: "error",
          }),
        ),
      );
    } else {
      next();
    }
  };

export default authMiddleware;
