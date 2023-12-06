import { defaultFieldResolver, type GraphQLSchema } from "graphql";
import { MapperKind, mapSchema, getDirective } from "@graphql-tools/utils";
import type { AppContext } from "types";
import type { AuthRule } from "types/graphql";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import AuthenticationError from "@/utils/errors/AuthenticationError";

export default function authDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  const typeDirectiveArgumentMaps: Record<string, any> = {};

  return mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const authDirective = getDirective(schema, type, directiveName)?.[0];
      if (authDirective) {
        typeDirectiveArgumentMaps[type.name] = authDirective;
      }
      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const authDirective =
        getDirective(schema, fieldConfig, directiveName)?.[0] ??
        typeDirectiveArgumentMaps[typeName];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        return {
          ...fieldConfig,
          async resolve(source, args, context: AppContext, info) {
            const { currentUser, t } = context;

            if (!currentUser) {
              throw new AuthenticationError(
                t("UNAUTHENTICATED", {
                  ns: "error",
                }),
              );
            }

            const { rules } = authDirective as { rules?: AuthRule[] };

            if (rules) {
              const checks = rules.map(
                ({ allow, ownerField, roles, permissions, status }) => {
                  switch (allow) {
                    case "owner": {
                      return source[ownerField ?? "ownerId"] === currentUser.id;
                    }
                    case "roles": {
                      return roles?.some((role) =>
                        currentUser.roles.includes(role!),
                      );
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
                },
              );

              if (!checks.some((allowed) => allowed)) {
                throw new ForbiddenError(
                  t("UNAUTHORIZED", {
                    ns: "error",
                  }),
                );
              }
            }
            return resolve(source, args, context, info);
          },
        };
      }

      return fieldConfig;
    },
  });
}
