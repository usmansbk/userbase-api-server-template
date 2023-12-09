export const EMAIL_PREFIX = "email";
export const SMS_PREFIX = "sms";
export const AUTH_PREFIX = "auth";
export const VERIFY_PREFIX = "verify";
export const PHONE_PREFIX = "phone";
export const LOGIN_ATTEMPT_PREFIX = "login:attempt";
export const OTP_PREFIX = "otp";

export const VERIFY_EMAIL_OTP_PREFIX = `${VERIFY_PREFIX}:${EMAIL_PREFIX}:${OTP_PREFIX}`;
export const EMAIL_LOGIN_OTP_PREFIX = `${AUTH_PREFIX}:${EMAIL_PREFIX}:${OTP_PREFIX}`;
