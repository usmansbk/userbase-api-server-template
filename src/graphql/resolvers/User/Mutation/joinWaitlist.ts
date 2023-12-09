import { nanoid } from "nanoid";
import type { MutationResponse, MutationJoinWaitlistArgs } from "types/graphql";
import type { AppContext } from "types";
import { JOIN_WAITLIST } from "@/constants/templates";

export default {
  Mutation: {
    async joinWaitlist(
      _parent: unknown,
      { email }: MutationJoinWaitlistArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, t, emailClient, language } = context;

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

        emailClient.send({
          template: JOIN_WAITLIST,
          message: {
            to: email,
          },
          locals: {
            locale: language,
          },
        });
      }

      return {
        success: true,
        message: t("mutation.joinWaitlist.message"),
      };
    },
  },
};
