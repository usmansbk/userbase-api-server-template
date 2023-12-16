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

let clientIds: string[] = [];

/**
 *
 * payload exp field should contain the number of seconds since the epoch
 * This function return a signed token that can only be used for a single client, i.e
 * Example: A token generated from an android app client won't be verified when sent for a iOS app client
 */
function sign(
  payload: JwtPayload & { azp?: string },
  options: SignOptions = {},
) {
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

function signForAllClients(payload: JwtPayload, options: SignOptions = {}) {
  const privateKey =
    process.env.NODE_ENV === "test"
      ? testSecret
      : fs.readFileSync("certs/private.pem");
  const token = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    issuer: process.env.APP_DOMAIN,
    audience: clientIds,
    ...options,
  });

  return token;
}

function verifyForAllClients(token: string, options: VerifyOptions = {}) {
  const publicKey =
    process.env.NODE_ENV === "test"
      ? testSecret
      : fs.readFileSync("certs/public.pem");

  const verified = jwt.verify(token, publicKey, {
    issuer: process.env.APP_DOMAIN,
    audience: clientIds,
    ...options,
  });

  return verified as JwtPayload;
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

  return verified as JwtPayload & { azp?: string };
}

function decode(token: string) {
  return jwt.decode(token) as JwtPayload & { azp?: string };
}

function getAuthTokens(payload: JwtPayload) {
  const accessToken = sign(
    { ...payload },
    {
      expiresIn: dayjs.duration(...ACCESS_TOKEN_EXPIRES_IN).asSeconds(),
    },
  );
  const refreshToken = sign(
    { sub: payload.jti },
    {
      expiresIn: dayjs.duration(...REFRESH_TOKEN_EXPIRES_IN).asSeconds(),
      jwtid: nanoid(),
    },
  );

  return {
    accessToken,
    refreshToken,
  };
}

function setAudience(aud: string) {
  audience = aud;
}

function setClients(ids: string[]) {
  clientIds = ids;
}

const jwtClient = {
  sign,
  verify,
  decode,
  getAuthTokens,
  signForAllClients,
  verifyForAllClients,
  setAudience,
  clientIds,
  setClients,
};

export type JWTClient = typeof jwtClient;

export default jwtClient;
