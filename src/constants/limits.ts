import type { ManipulateType } from "dayjs";

type DurationType = [number, ManipulateType];

// API Rate limiter
export const RATE_LIMITER_MAX_REQUESTS_PER_WINDOW = 20000; // per window
export const RATE_LIMITER_WINDOW_MS = 60 * 60 * 1000; // 60 minutes

// File Uploads
export const MAX_USER_IMAGE_FILE_SIZE_IN_BYTES = 4000000; // 4MB
export const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
export const DEFAULT_USER_PICTURE_SIZE = 400;
export const DEFAULT_USER_THUMBNAIL_SIZE = 200;
export const S3_URL_EXPIRES_IN: DurationType = [7, "days"];

// Auth
export const MAX_LOGIN_ATTEMPT = 5;
export const ACCESS_TOKEN_EXPIRES_IN: DurationType = [15, "minutes"];
export const REFRESH_TOKEN_EXPIRES_IN: DurationType = [7, "days"];
export const ID_TOKEN_EXPIRES_IN: DurationType = [7, "days"];
export const MIN_PASSWORD_LENGTH = 10;
export const MAX_PASSWORD_LENGTH = 32;
