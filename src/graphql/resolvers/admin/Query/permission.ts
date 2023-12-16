import type { QueryPermissionArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Permission } from "@prisma/client";
import QueryError from "@/utils/errors/QueryError";

export default {
  Query: {
    async permission(
      _parent: unknown,
      { id }: QueryPermissionArgs,
      context: AppContext,
    ): Promise<Permission> {
      const { prismaClient, t } = context;

      const permission = await prismaClient.permission.findUnique({
        where: {
          id,
        },
      });

      if (!permission) {
        throw new QueryError(t("query.permission.errors.notFound"));
      }

      return permission;
    },
  },
};