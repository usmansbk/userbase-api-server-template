import { nanoid } from "nanoid";
import { UserStatus, type User } from "@prisma/client";
import type { MutationCreateUsersArgs } from "types/graphql";
import type { AppContext } from "types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async createUsers(
      _parent: unknown,
      { inputs }: MutationCreateUsersArgs,
      context: AppContext,
    ): Promise<User[]> {
      const { prismaClient, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ password, status, ...data }) =>
            prismaClient.user.create({
              data: {
                ...data,
                password: password ?? nanoid(),
                status: status ?? UserStatus.Provisioned,
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.createUsers.errors.message", {
              context: e.code as unknown,
              count: inputs.length,
              meta: e.meta,
            }),
            { originalError: e },
          );
        }
        throw e;
      }
    },
  },
};
