import { nanoid } from "nanoid";
import type { MutationResponse, MutationJoinWaitListArgs } from "types/graphql";
import type { AppContext } from "types";

export default {
  Mutation: {
    async joinWaitList(
      _parent: unknown,
      { email }: MutationJoinWaitListArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, t } = context;

      const user = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        await prismaClient.user.create({
          data: {
            firstName: email,
            email,
            password: nanoid(),
          },
        });

        // TODO: send email
      }

      return {
        success: true,
        message: t("mutation.joinWaitList.added"),
      };
    },
  },
};
