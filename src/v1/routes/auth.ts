import express from "express";
import authMiddleware from "../middlewares/auth";
import rotateKeys from "../controllers/auth/rotateKeys";
import refreshToken from "../controllers/auth/refreshToken";
import { AuthStrategy } from "types/graphql";

const authRouter = express.Router();

authRouter.post(
  "/keys/rotate",
  authMiddleware([
    { allow: AuthStrategy.Roles, roles: ["Admin"] },
    {
      allow: AuthStrategy.Permissions,
      permissions: ["RotateSecurityKeys"],
    },
  ]),
  rotateKeys,
);

authRouter.post("/token/refresh", refreshToken);

export default authRouter;
