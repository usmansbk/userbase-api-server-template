import type { UserSession } from "@prisma/client";
import type { AppContext } from "types";

export default {
  UserSession: {
    async user(session: UserSession, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.userSession
        .findUnique({
          where: {
            id: session.id,
          },
        })
        .user();
    },
  },
};
