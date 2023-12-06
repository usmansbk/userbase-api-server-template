import type { AppContext } from "types";

export default {
  Query: {
    me(_parent: unknown, _args: never, context: AppContext) {
      const { currentUser } = context;

      return currentUser?.user;
    },
  },
};
