import { Router } from "express";
import { signupController, signinController } from "../controllers/auth.controller";

const userRouter = Router();

userRouter.post("/signup", signupController);
userRouter.post("/signin", signinController);

export default userRouter;