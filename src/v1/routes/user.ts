import express from "express";
import uploadPicture from "@/v1/controllers/user/uploadPicture";

const userRouter = express.Router();

userRouter.post("/picture", uploadPicture);

export default userRouter;
