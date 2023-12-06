import { nanoid } from "nanoid";
import type { MutationResponse, MutationJoinWaitlistArgs } from "types/graphql";
import type { AppContext } from "types";

export default {
  Mutation: {
    async joinWaitlist(
      _parent: unknown,
      { email }: MutationJoinWaitlistArgs,
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
        message: t("mutation.joinWaitlist.message"),
      };
    },
  },
};
