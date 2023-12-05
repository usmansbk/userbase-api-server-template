import dayjs from "@/utils/dayjs";
import { S3_URL_EXPIRES_IN } from "@/constants/limits";
import type { File } from "@prisma/client";
import type { AppContext } from "types";

export default {
  File: {
    async downloadUrl(file: File, _args: never, context: AppContext) {
      const { storage } = context;
      return await storage.getSignedDownloadUrl(
        file.bucket,
        file.key,
        dayjs.duration(...S3_URL_EXPIRES_IN).asSeconds(),
      );
    },
  },
};
