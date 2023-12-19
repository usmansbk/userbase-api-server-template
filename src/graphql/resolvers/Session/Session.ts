import type { Session } from "@prisma/client";
import type { AppContext } from "types";

export default {
  Session: {
    async user(session: Session, _args: never, context: AppContext) {
      const { prismaClient } = context;

      return await prismaClient.session
        .findUnique({
          where: {
            id: session.id,
          },
        })
        .user();
    },
  },
};
