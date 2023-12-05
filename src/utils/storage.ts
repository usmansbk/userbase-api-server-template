import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "@/config/s3";

export const getSignedDownloadUrl = async (
  bucket: string,
  key: string,
  expiresIn: number,
) => {
  const command = new GetObjectCommand({
    Key: key,
    Bucket: bucket,
  });

  return await getSignedUrl(s3, command, {
    expiresIn,
  });
};

const storage = {
  getSignedDownloadUrl,
};

export type Storage = typeof storage;

export default storage;
