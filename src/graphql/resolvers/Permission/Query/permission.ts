import type { Permission } from "@prisma/client";
import type { AppContext } from "types";
import type { QueryPermissionArgs, QueryPermissionsArgs } from "types/graphql";

import { DEFAULT_LIST_SIZE } from "@/constants/limits";
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
    async permissions(
      _parent: unknown,
      { limit }: QueryPermissionsArgs,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      const items = await prismaClient.permission.findMany({
        take: limit ?? DEFAULT_LIST_SIZE,
      });

      return {
        items,
      };
    },
  },
};
