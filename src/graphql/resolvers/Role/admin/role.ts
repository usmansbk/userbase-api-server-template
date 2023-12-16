import type { QueryRoleArgs } from "types/graphql";
import type { AppContext } from "types";
import type { Role } from "@prisma/client";
import QueryError from "@/utils/errors/QueryError";

export default {
  Query: {
    async role(
      _parent: unknown,
      { id }: QueryRoleArgs,
      context: AppContext,
    ): Promise<Role> {
      const { prismaClient, t } = context;

      const role = await prismaClient.role.findUnique({
        where: {
          id,
        },
      });

      if (!role) {
        throw new QueryError(t("query.role.errors.notFound"));
      }

      return role;
    },
  },
};
