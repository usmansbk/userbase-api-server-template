import { defaultFieldResolver, type GraphQLSchema } from "graphql";
import { MapperKind, mapSchema, getDirective } from "@graphql-tools/utils";
import type { AppContext } from "types";
import type { AuthRule } from "types/graphql";

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
              throw new Error(
                t("UNAUTHENTICATED", {
                  ns: "error",
                }),
              );
            }

            const { rules } = authDirective as { rules?: AuthRule[] };

            if (rules) {
              const checks = rules.map(({ allow, identityClaim }) => {
                switch (allow) {
                  case "owner": {
                    return source[identityClaim!] === currentUser.id;
                  }
                  default: {
                    return false;
                  }
                }
              });

              if (!checks.some((allowed) => allowed)) {
                throw new Error(
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