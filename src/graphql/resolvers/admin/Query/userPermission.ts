import type {
  QueryUserPermissionArgs,
  QueryUserPermissionsArgs,
} from "types/graphql";
import type { AppContext } from "types";
import type { UserPermission } from "@prisma/client";
import QueryError from "@/utils/errors/QueryError";

export default {
  Query: {
    async userPermission(
      _parent: unknown,
      { id }: QueryUserPermissionArgs,
      context: AppContext,
    ): Promise<UserPermission> {
      const { prismaClient, t } = context;

      const userPermission = await prismaClient.userPermission.findUnique({
        where: {
          id,
        },
      });

      if (!userPermission) {
        throw new QueryError(t("query.userPermission.errors.notFound"));
      }

      return userPermission;
    },
    async userPermissions(
      _parent: unknown,
      { limit }: QueryUserPermissionsArgs,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      const items = await prismaClient.userPermission.findMany({
        take: limit ?? 25,
      });

      return {
        items,
      };
    },
  },
};
