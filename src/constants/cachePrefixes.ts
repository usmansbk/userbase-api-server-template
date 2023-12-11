export const USER_PREFIX = "user";
export const EMAIL_PREFIX = "email";
export const SMS_PREFIX = "sms";
export const AUTH_PREFIX = "auth";
export const VERIFY_PREFIX = "verify";
export const PHONE_PREFIX = "phone";
export const LOGIN_ATTEMPT_PREFIX = "login:attempt";
export const OTP_PREFIX = "otp";
export const DELETE_PREFIX = "delete";
export const RESET_PREFIX = "reset";
export const PASSWORD_PREFIX = "password";

export const PASSWORD_RESET_PREFIX = `${RESET_PREFIX}:${USER_PREFIX}:${PASSWORD_PREFIX}`;
export const DELETE_USER_PREFIX = `${DELETE_PREFIX}:${USER_PREFIX}`;
export const VERIFY_EMAIL_OTP_PREFIX = `${VERIFY_PREFIX}:${EMAIL_PREFIX}:${OTP_PREFIX}`;
export const EMAIL_LOGIN_OTP_PREFIX = `${AUTH_PREFIX}:${EMAIL_PREFIX}:${OTP_PREFIX}`;
export const VERIFY_PHONE_NUMBER_PREFIX = `${VERIFY_PREFIX}:${PHONE_PREFIX}`;
export const PHONE_NUMBER_LOGIN_OTP_PREFIX = `${AUTH_PREFIX}:${PHONE_PREFIX}:${OTP_PREFIX}`;
