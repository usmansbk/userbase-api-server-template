import type { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import numeral from "numeral";
import uploader from "@/v1/middlewares/fileUploader";
import {
  MAX_USER_IMAGE_FILE_SIZE_IN_BYTES,
  SUPPORTED_IMAGE_TYPES,
} from "@/constants/limits";

const uploadPicture = (req: Request, res: Response, next: NextFunction) => {
  const upload = uploader({
    supportedMimeTypes: SUPPORTED_IMAGE_TYPES,
    folder: "avatars",
    maxFileSizeInBytes: MAX_USER_IMAGE_FILE_SIZE_IN_BYTES,
  }).single("picture");

  upload(req, res, (err) => {
    const {
      context: { t, prismaClient, currentUser },
      file,
      files,
    } = req;
    (async () => {
      if (err instanceof MulterError) {
        let errorMessage: string | undefined;

        switch (err.code) {
          case "LIMIT_UNEXPECTED_FILE":
            errorMessage = t("UNSUPPORTED_FILE_TYPE", {
              ns: "error",
              supportedMimeTypes: SUPPORTED_IMAGE_TYPES,
            });
            break;
          case "LIMIT_FILE_SIZE":
            errorMessage = t("FILE_SIZE_EXCEEDED", {
              ns: "error",
              size: numeral(MAX_USER_IMAGE_FILE_SIZE_IN_BYTES).format("0b"),
              types: SUPPORTED_IMAGE_TYPES,
            });
            break;
          case "LIMIT_FILE_COUNT":
            errorMessage = t("FILE_LIMIT_EXCEEDED", {
              ns: "error",
              count: (files?.length ?? 0) as number,
            });
            break;
          default:
            next(new Error(t("UPLOAD_FAILED", { ns: "error" })));
            break;
        }
        next(new Error(errorMessage));
      } else if (file) {
        const { key, bucket, size, mimetype, fieldname, originalname } = file;

        const oldPicture = await prismaClient.user
          .findUnique({
            where: {
              id: currentUser!.id,
            },
          })
          .picture();

        if (oldPicture) {
          await prismaClient.userAvatar.delete({
            where: {
              id: oldPicture.id,
            },
          });
        }

        await prismaClient.user.update({
          where: {
            id: currentUser!.id,
          },
          data: {
            picture: {
              create: {
                file: {
                  create: {
                    key,
                    bucket,
                    size,
                    mimetype,
                    fieldname,
                    originalname,
                  },
                },
              },
            },
            pictureLastUpdatedAt: new Date(),
          },
        });

        res.status(201).json({
          success: true,
          data: {
            success: true,
          },
        });
      } else {
        next(new Error(t("UPLOAD_FAILED", { ns: "error" })));
      }
    })();
  });
};

export default uploadPicture;
