import type { MutationDeleteFilesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { File } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QueryError from "@/utils/errors/QueryError";

export default {
  Mutation: {
    async deleteFiles(
      _parent: unknown,
      { inputs }: MutationDeleteFilesArgs,
      context: AppContext,
    ): Promise<File[]> {
      const { prismaClient, t } = context;

      try {
        return await prismaClient.$transaction(
          inputs.map(({ key, bucket }) =>
            prismaClient.file.delete({
              where: {
                key_bucket: {
                  key,
                  bucket,
                },
              },
            }),
          ),
        );
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new QueryError(
            t("mutation.deleteFiles.errors.message", {
              context: e.code as unknown,
            }),
            { originalError: e },
          );
        }
        throw e;
      }
    },
  },
};
