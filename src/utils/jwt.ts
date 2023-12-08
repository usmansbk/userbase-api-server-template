import fs from "fs";
import { nanoid } from "nanoid";
import jwt, {
  type SignOptions,
  type JwtPayload,
  type VerifyOptions,
} from "jsonwebtoken";
import dayjs from "@/utils/dayjs";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "@/constants/limits";

const testSecret = "secret";
let audience: string;

/**
 *
 * payload exp field should contain the number of seconds since the epoch
 */
function sign(payload: JwtPayload, options: SignOptions = {}) {
  const privateKey =
    process.env.NODE_ENV === "test"
      ? testSecret
      : fs.readFileSync("certs/private.pem");

  const token = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    issuer: process.env.APP_DOMAIN,
    audience,
    ...options,
  });

  return token;
}

function verify(token: string, options: VerifyOptions = {}) {
  const publicKey =
    process.env.NODE_ENV === "test"
      ? testSecret
      : fs.readFileSync("certs/public.pem");

  const verified = jwt.verify(token, publicKey, {
    issuer: process.env.APP_DOMAIN,
    audience,
    ...options,
  });

  return verified as JwtPayload;
}

function decode(token: string) {
  return jwt.decode(token) as JwtPayload;
}

function getAuthTokens(payload: JwtPayload) {
  const jti = nanoid();
  const azp = nanoid(); // Authorized Party allows for multiple device sessions
  const accessToken = sign(
    { ...payload, azp, jti },
    {
      expiresIn: dayjs.duration(...ACCESS_TOKEN_EXPIRES_IN).asSeconds(),
    },
  );
  const refreshToken = sign(
    { sub: jti },
    {
      expiresIn: dayjs.duration(...REFRESH_TOKEN_EXPIRES_IN).asSeconds(),
      jwtid: nanoid(),
    },
  );

  return {
    jti,
    azp,
    accessToken,
    refreshToken,
  };
}

function setAudience(aud: string) {
  audience = aud;
}

const jwtClient = {
  sign,
  verify,
  decode,
  getAuthTokens,
  setAudience,
};

export type JWTClient = typeof jwtClient;

export default jwtClient;
