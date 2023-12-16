import type { QueryRolePermissionArgs } from "types/graphql";
import type { AppContext } from "types";
import type { RolePermission } from "@prisma/client";
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
  },
};
