import type { AppContext } from "types";

export default {
  Query: {
    async me(_parent: unknown, _args: never, context: AppContext) {
      const { currentUser, prismaClient } = context;

      return await prismaClient.user.findUnique({
        where: {
          id: currentUser!.id,
        },
      });
    },
  },
};
