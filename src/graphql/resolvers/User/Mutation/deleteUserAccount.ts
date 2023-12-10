import type {
  MutationDeleteUserAccountArgs,
  MutationResponse,
} from "types/graphql";
import type { AppContext } from "types";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import AuthenticationError from "@/utils/errors/AuthenticationError";
import { DELETE_USER_PREFIX } from "@/constants/cachePrefixes";
import { UserStatus } from "@prisma/client";

export default {
  Mutation: {
    async deleteUserAccount(
      _parent: unknown,
      { input }: MutationDeleteUserAccountArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, redisClient, jwtClient, t } = context;

      try {
        const verified = jwtClient.verifyForAllClients(input.token);

        const cacheKey = `${DELETE_USER_PREFIX}:${verified.email}`;

        const sentToken = await redisClient.getdel(cacheKey);

        if (!sentToken || sentToken !== input.token) {
          throw new AuthenticationError(
            t("mutation.deleteUserAccount.errors.message"),
          );
        }

        const user = await prismaClient.user.findFirst({
          where: {
            email: verified.email,
            status: UserStatus.Active,
          },
        });

        if (!user) {
          throw new AuthenticationError(
            t("mutation.deleteUserAccount.errors.message"),
          );
        }

        const isMatched = await user.comparePassword(input.password);

        if (!isMatched) {
          throw new AuthenticationError(
            t("mutation.deleteUserAccount.errors.message"),
          );
        }

        await prismaClient.user.delete({
          where: {
            id: user.id,
          },
        });

        return {
          success: true,
          message: t("mutation.deleteUserAccount.message"),
        };
      } catch (e) {
        if (e instanceof JsonWebTokenError || e instanceof TokenExpiredError) {
          throw new AuthenticationError(
            t("mutation.deleteUserAccount.errors.message"),
          );
        }
        throw e;
      }
    },
  },
};
