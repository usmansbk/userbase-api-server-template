import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3 from "@/config/aws/s3";

import logger from "./logger";

export const deleteObject = async (Key: string, Bucket: string) => {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket,
        Key,
      }),
    );
  } catch (error) {
    logger.error(error);
  }
};

export const deleteManyObjects = async (keys: string[], Bucket: string) => {
  try {
    await s3.send(
      new DeleteObjectsCommand({
        Bucket,
        Delete: {
          Objects: keys.map((Key) => ({ Key })),
        },
      }),
    );
  } catch (error) {
    logger.error(error);
  }
};

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
  deleteObject,
  deleteManyObjects,
  getSignedDownloadUrl,
};

export type Storage = typeof storage;

export default storage;
