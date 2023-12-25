import type { RolePermission } from "@prisma/client";
import type { AppContext } from "types";
import type {
  QueryRolePermissionArgs,
  QueryRolePermissionsArgs,
} from "types/graphql";

import { DEFAULT_LIST_SIZE } from "@/constants/limits";
import QueryError from "@/utils/errors/QueryError";

export default {
  Query: {
    async rolePermission(
      _parent: unknown,
      { id }: QueryRolePermissionArgs,
      context: AppContext,
    ): Promise<RolePermission> {
      const { prismaClient, t } = context;

      const rolePermission = await prismaClient.rolePermission.findUnique({
        where: {
          id,
        },
      });

      if (!rolePermission) {
        throw new QueryError(t("query.rolePermission.errors.notFound"));
      }

      return rolePermission;
    },
    async rolePermissions(
      _parent: unknown,
      { limit }: QueryRolePermissionsArgs,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      const items = await prismaClient.rolePermission.findMany({
        take: limit ?? DEFAULT_LIST_SIZE,
      });

      return {
        items,
      };
    },
  },
};
