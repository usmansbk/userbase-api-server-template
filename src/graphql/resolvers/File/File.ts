import dayjs from "@/utils/dayjs";
import { getSignedDownloadUrl } from "@/utils/storage";
import { S3_URL_EXPIRES_IN } from "@/constants/limits";
import type { File } from "@prisma/client";

export default {
  File: {
    async downloadUrl(parent: File) {
      return await getSignedDownloadUrl(
        parent.bucket,
        parent.key,
        dayjs.duration(...S3_URL_EXPIRES_IN).asSeconds(),
      );
    },
  },
};
