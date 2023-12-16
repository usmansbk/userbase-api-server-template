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
export const BRUTE_FORCE_THRESHOLD = 10;
export const ACCESS_TOKEN_EXPIRES_IN: DurationType = [15, "days"];
export const REFRESH_TOKEN_EXPIRES_IN: DurationType = [7, "days"];
export const ID_TOKEN_EXPIRES_IN: DurationType = [7, "days"];
export const RESET_LOGIN_ATTEMPTS_IN: DurationType = [15, "minutes"];
export const BLOCK_IP_DURATION: DurationType = [30, "days"];
export const LOGIN_OTP_EXPIRES_IN: DurationType = [5, "minutes"];
export const EMAIL_VERIFICATION_TOKEN_EXPIRES_IN: DurationType = [5, "minutes"];
export const PHONE_NUMBER_VERIFICATION_TOKEN_EXPIRES_IN: DurationType = [
  10,
  "minutes",
];
export const PASSWORD_RESET_TOKEN_EXPIRES_IN: DurationType = [5, "minutes"];
export const DELETE_ACCOUNT_TOKEN_EXPIRES_IN: DurationType = [5, "minutes"];
export const PHONE_NUMBER_OTP_EXPIRES_IN: DurationType = [8, "minutes"];

export const MIN_PASSWORD_LENGTH = 10;
export const MAX_PASSWORD_LENGTH = 32;
export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 30;

export const OTP_LENGTH = 6;

// List
export const DEFAULT_LIST_SIZE = 25;
