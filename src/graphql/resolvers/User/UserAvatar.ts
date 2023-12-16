import type { UserAvatar } from "@prisma/client";
import type { AppContext } from "types";

export default {
  UserAvatar: {
    async picture(avatar: UserAvatar, _args: never, context: AppContext) {
      const { prismaClient } = context;
      return await prismaClient.userAvatar
        .findUnique({
          where: {
            id: avatar.id,
          },
        })
        .file();
    },
  },
};
