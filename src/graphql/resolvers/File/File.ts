import dayjs from "@/utils/dayjs";
import { S3_URL_EXPIRES_IN } from "@/constants/limits";
import type { File } from "@prisma/client";
import type { AppContext } from "types";

export default {
  File: {
    async downloadUrl(parent: File, _args: never, context: AppContext) {
      const { storage } = context;
      return storage.getSignedDownloadUrl(
        parent.bucket,
        parent.key,
        dayjs.duration(...S3_URL_EXPIRES_IN).asSeconds(),
      );
    },
  },
};
