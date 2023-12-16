import type { QueryUserAvatarArgs, QueryUserAvatarsArgs } from "types/graphql";
import type { AppContext } from "types";
import type { UserAvatar } from "@prisma/client";
import QueryError from "@/utils/errors/QueryError";

export default {
  Query: {
    async userAvatar(
      _parent: unknown,
      { id }: QueryUserAvatarArgs,
      context: AppContext,
    ): Promise<UserAvatar> {
      const { prismaClient, t } = context;

      const avatar = await prismaClient.userAvatar.findUnique({
        where: {
          id,
        },
      });

      if (!avatar) {
        throw new QueryError(t("query.userAvatar.errors.notFound"));
      }

      return avatar;
    },
    async userAvatars(
      _parent: unknown,
      { limit }: QueryUserAvatarsArgs,
      context: AppContext,
    ) {
      const { prismaClient } = context;

      const items = await prismaClient.userAvatar.findMany({
        take: limit ?? 25,
      });

      return {
        items,
      };
    },
  },
};
