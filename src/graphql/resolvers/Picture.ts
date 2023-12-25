import type { File } from "@prisma/client";
import type { AppContext } from "types";
import type { PictureThumbnailArgs, PictureUrlArgs } from "types/graphql";

import { S3_URL_EXPIRES_IN } from "@/constants/limits";
import dayjs from "@/utils/dayjs";
import getImageUrl from "@/utils/getImageUrl";

export default {
  Picture: {
    url({ key, bucket }: File, { edits }: PictureUrlArgs) {
      return getImageUrl({ edits, key, bucket });
    },
    thumbnail({ key, bucket }: File, { edits }: PictureThumbnailArgs) {
      return getImageUrl({ edits, key, bucket });
    },
    async downloadUrl(
      { key, bucket }: File,
      _args: never,
      context: AppContext,
    ) {
      const { storage } = context;
      return await storage.getSignedDownloadUrl(
        bucket,
        key,
        dayjs.duration(...S3_URL_EXPIRES_IN).asSeconds(),
      );
    },
  },
};
