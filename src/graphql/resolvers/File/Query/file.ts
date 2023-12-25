import type { File } from "@prisma/client";
import type { AppContext } from "types";
import type { QueryFileArgs, QueryFilesArgs } from "types/graphql";

import { DEFAULT_LIST_SIZE } from "@/constants/limits";
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
    ) {
      const { prismaClient } = context;

      const items = await prismaClient.file.findMany({
        take: limit ?? DEFAULT_LIST_SIZE,
      });

      return {
        items,
      };
    },
  },
};
