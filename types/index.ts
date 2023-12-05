import type pino from "pino";
import type { TFunction } from "i18next";
import type { PrismaClient, User } from "@prisma/client";
import type { Twilio } from "twilio";
import type { RedisPubSub } from "graphql-redis-subscriptions";
import type { Redis } from "ioredis";

export interface AppContext {
  log: pino.Logger<pino.LoggerOptions>;
  currentUser?: User;
  t: TFunction<"translation" | "error", undefined>;
  prismaClient: PrismaClient;
  redisClient: Redis;
  twilioClient: Twilio;
  pubsub: RedisPubSub;
  language: string;
}

export interface SocketContext {
  prismaClient: PrismaClient;
  redisClient: Redis;
  pubsub: RedisPubSub;
  twilioClient: Twilio;
  t: TFunction<"translation" | "error", undefined>;
  currentUser?: User | null;
  language: string;
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
