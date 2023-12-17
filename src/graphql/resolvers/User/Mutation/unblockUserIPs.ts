import type {
  MutationUnblockUserIPsArgs,
  User,
  UserResponse,
} from "types/graphql";
import type { AppContext } from "types";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async unblockUserIPs(
      _parent: unknown,
      { input }: MutationUnblockUserIPsArgs,
      context: AppContext,
    ): Promise<UserResponse> {
      const { prismaClient, t } = context;
      const { id, ips } = input;

      let user = await prismaClient.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new QueryError(t("query.user.errors.notFound"));
      }

      const blockedIps = new Map(
        Object.entries(user.blockedIps as Record<string, string>),
      );

      ips.forEach((ip) => blockedIps.delete(ip as string));

      user = await prismaClient.user.update({
        where: {
          id,
        },
        data: {
          blockedIps: Object.fromEntries(blockedIps),
        },
      });

      return {
        success: true,
        message: t("mutation.unblockUserIPs.message"),
        user: user as unknown as User,
      };
    },
  },
};
