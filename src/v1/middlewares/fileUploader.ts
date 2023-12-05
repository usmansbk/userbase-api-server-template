import multer from "multer";
import multerS3, { AUTO_CONTENT_TYPE } from "multer-s3";
import { nanoid } from "nanoid";
import s3 from "@/config/s3";
import ValidationError from "@/utils/errors/ValidationError";

interface UploadConfig {
  supportedMimeTypes: string[];
  folder: string;
  maxFileSizeInBytes?: number;
}

const fileUploader = ({
  supportedMimeTypes,
  folder,
  maxFileSizeInBytes,
}: UploadConfig) =>
  multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET,
      contentType: AUTO_CONTENT_TYPE,
      metadata(req, file, cb) {
        cb(null, {
          fieldName: file.fieldname,
          fileName: file.filename,
          userId: req.context.currentUser?.id,
        });
      },
      key(req, file, cb) {
        cb(null, `${folder}/${nanoid()}`);
      },
    }),
    fileFilter(req, file, cb) {
      const {
        context: { t },
      } = req;

      if (!supportedMimeTypes.includes(file.mimetype)) {
        cb(
          new ValidationError(
            t("UNSUPPORTED_FILE_TYPE", { ns: "error", supportedMimeTypes }),
          ),
        );
      } else {
        cb(null, true);
      }
    },
    limits: {
      fileSize: maxFileSizeInBytes,
    },
  });

export default fileUploader;
