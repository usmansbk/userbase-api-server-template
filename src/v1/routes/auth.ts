import express from "express";
import authMiddleware from "../middlewares/auth";
import rotateKeys from "../controllers/auth/rotateKeys";

const authRouter = express.Router();

authRouter.post(
  "/keys/rotate",
  authMiddleware([
    { allow: "roles", roles: ["Admin"] },
    { allow: "permissions", permissions: ["RotateKeys"] },
  ]),
  rotateKeys,
);

export default authRouter;
