import dayjs from "@/utils/dayjs";
import getImageUrl from "@/utils/getImageUrl";
import type { File } from "@prisma/client";
import type { PictureUrlArgs, PictureThumbnailArgs } from "types/graphql";
import type { AppContext } from "types";
import { S3_URL_EXPIRES_IN } from "@/constants/limits";

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
