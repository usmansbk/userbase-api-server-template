import { nanoid } from "nanoid";
import type { MutationResponse, MutationJoinWaitlistArgs } from "types/graphql";
import type { AppContext } from "types";
import { JOIN_WAITLIST_TEMPLATE } from "@/constants/templates";
import universalLinks from "@/constants/universalLinks";

export default {
  Mutation: {
    async joinWaitlist(
      _parent: unknown,
      { email }: MutationJoinWaitlistArgs,
      context: AppContext,
    ): Promise<MutationResponse> {
      const { prismaClient, t, emailClient, language, jwtClient } = context;

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

        const token = jwtClient.signForAllClients({ email });

        emailClient.send({
          template: JOIN_WAITLIST_TEMPLATE,
          message: {
            to: email,
          },
          locals: {
            locale: language,
            link: universalLinks.leaveWaitlist.replace(":token", token),
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
