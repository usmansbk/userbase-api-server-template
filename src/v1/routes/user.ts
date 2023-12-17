import express from "express";
import authMiddleware from "../middlewares/auth";
import uploadCurrentUserPicture from "@/v1/controllers/user/uploadCurrentUserPicture";
import uploadUserPicture from "../controllers/user/uploadUserPicture";
import { AuthStrategy } from "types/graphql";

const userRouter = express.Router();

userRouter.post("/picture", uploadCurrentUserPicture);
userRouter.post(
  "/:id/picture",
  authMiddleware([
    { allow: AuthStrategy.Roles, roles: ["Admin"] },
    {
      allow: AuthStrategy.Permissions,
      permissions: ["CreateUserAvatar", "UpdateUserAvatar"],
    },
  ]),
  uploadUserPicture,
);

export default userRouter;
