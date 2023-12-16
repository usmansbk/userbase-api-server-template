import type { QueryUserRoleArgs } from "types/graphql";
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
  },
};
