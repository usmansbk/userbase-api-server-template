import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import type { NextFunction, Request, Response } from "express";
import type { AccountStatus } from "types/graphql";

interface AuthRule {
  allow: "roles" | "permissions" | "status";
  roles?: string[];
  permissions?: string[];
  status?: AccountStatus[];
}

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
    } else if (rules) {
      const checks = rules.map(({ allow, roles, permissions, status }) => {
        switch (allow) {
          case "roles": {
            return roles?.some((role) => currentUser.roles.includes(role));
          }
          case "permissions": {
            return permissions?.some((permission) =>
              currentUser.permissions.includes(permission),
            );
          }
          case "status": {
            return status?.includes(currentUser.user.status as AccountStatus);
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
