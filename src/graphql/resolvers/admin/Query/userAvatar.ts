import type { QueryUserAvatarArgs } from "types/graphql";
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
  },
};
