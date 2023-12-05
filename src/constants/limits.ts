import type { ManipulateType } from "dayjs";

type DurationType = [number, ManipulateType];

export const RATE_LIMITER_MAX_REQUESTS_PER_WINDOW = 2000000; // per window
export const RATE_LIMITER_WINDOW_MS = 60 * 60 * 1000; // 60 minutes

export const MAX_USER_IMAGE_FILE_SIZE_IN_BYTES = 4000000; // 4MB
export const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const DEFAULT_USER_PICTURE_SIZE = 400;
export const DEFAULT_USER_THUMBNAIL_SIZE = 200;

export const S3_URL_EXPIRES_IN: DurationType = [7, "days"];
