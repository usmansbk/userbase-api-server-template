import type { AppContext } from "types";
import type { User, UserResponse } from "types/graphql";

export default {
  Mutation: {
    async removeCurrentUserPicture(
      _parent: unknown,
      _args: never,
      context: AppContext,
    ): Promise<UserResponse> {
      const { currentUser, prismaClient, t } = context;

      const user = await prismaClient.user.findUnique({
        where: {
          id: currentUser!.id,
        },
        include: {
          avatar: {
            include: {
              file: true,
            },
          },
        },
      });

      if (user?.avatar) {
        const { file } = user.avatar;
        prismaClient.file.delete({
          where: {
            key: file.key,
            bucket: file.bucket,
          },
        });
      }

      if (user?.socialPictureUrl) {
        prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            socialPictureUrl: null,
          },
        });
      }

      return {
        success: true,
        message: t("mutation.removeCurrentUserPicture.message"),
        user: user as unknown as User,
      };
    },
  },
};
