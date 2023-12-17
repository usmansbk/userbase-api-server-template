import type { MutationDeleteFilesArgs } from "types/graphql";
import type { AppContext } from "types";
import type { File } from "@prisma/client";

export default {
  Mutation: {
    async deleteFiles(
      _parent: unknown,
      { inputs }: MutationDeleteFilesArgs,
      context: AppContext,
    ): Promise<File[]> {
      const { prismaClient } = context;

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
    },
  },
};
