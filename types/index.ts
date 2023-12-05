import type pino from "pino";
import type { TFunction } from "i18next";
import type { PrismaClient, User } from "@prisma/client";
import type { RedisPubSub } from "graphql-redis-subscriptions";
import type { SMS } from "@/utils/sms";
import type { Storage } from "@/utils/storage";
import type { Redis } from "ioredis";

export interface AppContext {
  log: pino.Logger<pino.LoggerOptions>;
  currentUser?: User;
  t: TFunction<"translation" | "error", undefined>;
  prismaClient: PrismaClient;
  redisClient: Redis;
  smsClient: SMS;
  pubsub: RedisPubSub;
  language: string;
  storage: Storage;
}

declare global {
  namespace Express {
    namespace MulterS3 {
      export interface File extends Multer.File {
        bucket: string;
        key: string;
        acl: string;
        contentType: string;
        contentDisposition: null;
        storageClass: string;
        serverSideEncryption: null;
        metadata: JSON;
        location: string;
        etag: string;
      }
    }

    export interface Request {
      context: AppContext;
      file?: MulterS3.File | undefined;
      files?:
        | {
            [fieldname: string]: MulterS3.File[];
          }
        | MulterS3.File[]
        | undefined;
    }
  }
}

export default {};
