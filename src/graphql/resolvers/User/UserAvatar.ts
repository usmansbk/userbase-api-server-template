import getImageUrl from "@/utils/getImageUrl";
import type { UserAvatar } from "@prisma/client";
import type { UserAvatarUrlArgs, UserAvatarThumbnailArgs } from "types/graphql";
import type { AppContext } from "types";

export default {
  UserAvatar: {
    async file(avatar: UserAvatar, _args: never, context: AppContext) {
      const { prismaClient } = context;
      return await prismaClient.userAvatar
        .findUnique({
          where: {
            id: avatar.id,
          },
        })
        .file();
    },
    async url(
      avatar: UserAvatar,
      { edits }: UserAvatarUrlArgs,
      context: AppContext,
    ) {
      const { prismaClient } = context;
      const file = await prismaClient.userAvatar
        .findUnique({
          where: {
            id: avatar.id,
          },
        })
        .file();

      if (!file) {
        return null;
      }

      return getImageUrl({ edits, key: file.key, bucket: file.bucket });
    },
    async thumbnail(
      avatar: UserAvatar,
      { edits }: UserAvatarThumbnailArgs,
      context: AppContext,
    ) {
      const { prismaClient } = context;
      const file = await prismaClient.userAvatar
        .findUnique({
          where: {
            id: avatar.id,
          },
        })
        .file();

      if (!file) {
        return null;
      }

      return getImageUrl({ edits, key: file.key, bucket: file.bucket });
    },
  },
};
