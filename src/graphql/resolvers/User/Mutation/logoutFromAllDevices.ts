import { AUTH_PREFIX } from "@/constants/cachePrefixes";
import type { AppContext } from "types";
import type { MutationResponse } from "types/graphql";

export default {
  Mutation: {
    async logoutFromAllDevices(
      _parent: unknown,
      _args: never,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, currentUser, redisClient, t } = context;

      await Promise.all(
        Object.values(currentUser!.sessions).map(
          async ({ clientId, id }) =>
            await redisClient.del(`${AUTH_PREFIX}:${clientId}:${id}}`),
        ),
      );

      await prismaClient.userSession.deleteMany({
        where: {
          id: {
            in: currentUser!.sessions.map((session) => session.id),
          },
        },
      });

      return {
        success: true,
        message: t("mutation.logoutFromAllDevices.message"),
      };
    },
  },
};
