import AuthenticationError from "@/utils/errors/AuthenticationError";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import QueryError from "@/utils/errors/QueryError";
import type { NextFunction, Request, Response } from "express";
import { AuthStrategy, type AuthRule } from "types/graphql";

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
          case AuthStrategy.Roles: {
            return roles?.some((role) => currentUser.roles.includes(role!));
          }
          case AuthStrategy.Permissions: {
            return permissions?.some((permission) =>
              currentUser.permissions.includes(permission!),
            );
          }
          case AuthStrategy.Status: {
            return status?.includes(currentUser.status);
          }
          case AuthStrategy.Owner: {
            throw new QueryError(
              t("AUTH_STRATEGY_NOT_IMPLEMENTED", {
                ns: "error",
              }),
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
  };

export default authMiddleware;
