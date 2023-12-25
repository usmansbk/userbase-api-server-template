import type { MutationResponse } from "types/graphql";
import type { AppContext } from "types/index";

import { generateKeys } from "@/utils/generateKeys";

export default {
  Mutation: {
    rotateKeys(
      _parent: unknown,
      _args: never,
      context: AppContext,
    ): MutationResponse {
      const { t } = context;

      generateKeys();

      return {
        success: true,
        message: t("mutation.rotateKeys.message"),
      };
    },
  },
};
