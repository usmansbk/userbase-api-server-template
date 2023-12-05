import type pino from "pino";

/* eslint-disable @typescript-eslint/no-namespace */
export interface AppContext {
  log: pino.Logger<pino.LoggerOptions>;
}

declare global {
  namespace Express {
    // namespace MulterS3 {
    //   export interface File extends Multer.File {
    //     bucket: string;
    //     key: string;
    //     acl: string;
    //     contentType: string;
    //     contentDisposition: null;
    //     storageClass: string;
    //     serverSideEncryption: null;
    //     metadata: JSON;
    //     location: string;
    //     etag: string;
    //   }
    // }

    export interface Request {
      context: AppContext;
      // file?: MulterS3.File | undefined;
      // files?:
      //   | {
      //       [fieldname: string]: MulterS3.File[];
      //     }
      //   | MulterS3.File[]
      //   | undefined;
    }
  }
}

export default {};
