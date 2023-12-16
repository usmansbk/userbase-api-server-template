import type { QueryUserRoleArgs, QueryUserRolesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserRole } from "@prisma/client";
import QueryError from "@/utils/errors/QueryError";

export default {
  Query: {
    async userRole(
      _parent: unknown,
      { id }: QueryUserRoleArgs,
      context: AppContext,
    ): Promise<UserRole> {
      const { prismaClient, t } = context;

      const userRole = await prismaClient.userRole.findUnique({
        where: {
          id,
        },
      });

      if (!userRole) {
        throw new QueryError(t("query.userRole.errors.notFound"));
      }

      return userRole;
    },
    async userRoles(
      _parent: unknown,
      { limit }: QueryUserRolesArgs,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      const items = await prismaClient.userRole.findMany({
        take: limit ?? 25,
      });

      return {
        items,
      };
    },
  },
};
