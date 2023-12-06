import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import type { NextFunction, Request, Response } from "express";

interface AuthRule {
  allow: "roles" | "permissions";
  roles: string[];
  permissions: string[];
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
    } else {
      if (rules) {
        const checks = rules.map(({ allow, roles, permissions }) => {
          switch (allow) {
            case "roles": {
              return roles.some((role) => currentUser.roles.includes(role));
            }
            case "permissions": {
              return permissions.some((permission) =>
                currentUser.permissions.includes(permission),
              );
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
    }
  };

export default authMiddleware;
