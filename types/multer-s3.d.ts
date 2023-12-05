declare module "multer-s3" {
  interface Options {
    s3: import("@aws-sdk/client-s3").S3Client;
    bucket:
      | ((
          req: Express.Request,
          file: Express.Multer.File,
          callback: (error: any, bucket?: string) => void,
        ) => void)
      | string;
    key?(
      req: Express.Request,
      file: Express.Multer.File,
      callback: (error: any, key?: string) => void,
    ): void;
    acl?:
      | ((
          req: Express.Request,
          file: Express.Multer.File,
          callback: (error: any, acl?: string) => void,
        ) => void)
      | string
      | undefined;
    contentType?(
      req: Express.Request,
      file: Express.Multer.File,
      callback: (
        error: any,
        mime?: string,
        stream?: NodeJS.ReadableStream,
      ) => void,
    ): void;
    contentDisposition?:
      | ((
          req: Express.Request,
          file: Express.Multer.File,
          callback: (error: any, contentDisposition?: string) => void,
        ) => void)
      | string
      | undefined;
    metadata?(
      req: Express.Request,
      file: Express.Multer.File,
      callback: (error: any, metadata?: any) => void,
    ): void;
    cacheControl?:
      | ((
          req: Express.Request,
          file: Express.Multer.File,
          callback: (error: any, cacheControl?: string) => void,
        ) => void)
      | string
      | undefined;
    serverSideEncryption?:
      | ((
          req: Express.Request,
          file: Express.Multer.File,
          callback: (error: any, serverSideEncryption?: string) => void,
        ) => void)
      | string
      | undefined;
  }

  interface S3Storage {
    (options?: Options): import("multer").StorageEngine;

    AUTO_CONTENT_TYPE: (
      req: Express.Request,
      file: Express.Multer.File,
      callback: (
        error: any,
        mime?: string,
        stream?: NodeJS.ReadableStream,
      ) => void,
    ) => void;
    DEFAULT_CONTENT_TYPE: (
      req: Express.Request,
      file: Express.Multer.File,
      callback: (error: any, mime?: string) => void,
    ) => void;
  }

  const S3Storage: S3Storage;

  export = S3Storage;
}
