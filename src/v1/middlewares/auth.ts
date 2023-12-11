import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import type { NextFunction, Request, Response } from "express";
import type { AuthRule } from "types/graphql";

const authMiddleware =
  (rules?: AuthRule[]) => (req: Request, res: Response, next: NextFunction) => {
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
    } else if (!currentUser.roles.includes("Root") && rules) {
      const checks = rules.map(({ allow, roles, permissions, status }) => {
        switch (allow) {
          case "roles": {
            return roles?.some((role) => currentUser.roles.includes(role!));
          }
          case "permissions": {
            return permissions?.some((permission) =>
              currentUser.permissions.includes(permission!),
            );
          }
          case "status": {
            return status?.includes(currentUser.status);
          }
          default: {
            return false;
          }
        }
      });

      if (!checks.some((allowed) => allowed)) {
        throw new ForbiddenError(
          t("UNAUTHORIZED", {
            ns: "error",
          }),
        );
      }
    }

    next();
  };

export default authMiddleware;
