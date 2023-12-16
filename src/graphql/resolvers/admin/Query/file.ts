import type { QueryFileArgs, QueryFilesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { File } from "@prisma/client";
import QueryError from "@/utils/errors/QueryError";

export default {
  Query: {
    async file(
      _parent: unknown,
      { key, bucket }: QueryFileArgs,
      context: AppContext,
    ): Promise<File> {
      const { prismaClient, t } = context;

      const file = await prismaClient.file.findUnique({
        where: {
          key,
          bucket,
        },
      });

      if (!file) {
        throw new QueryError(t("query.file.errors.notFound"));
      }

      return file;
    },
    async files(
      _parent: unknown,
      { limit }: QueryFilesArgs,
      context: AppContext,
    ): Promise<File[]> {
      const { prismaClient } = context;

      return await prismaClient.file.findMany({
        take: limit ?? 25,
      });
    },
  },
};
