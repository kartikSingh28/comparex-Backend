import { Router } from "express";
import { signupController, signinController } from "../controllers/auth.controller";
import {authenticate} from "../middlewares/authMiddleware";
import {authorize} from "../middlewares/authorize";

const userRouter = Router();

userRouter.post("/signup", signupController);
userRouter.post("/signin", signinController);

userRouter.get(
  "/test-admin",
  authenticate,
  authorize("admin:manage-users"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin access granted",
    });
  }
);

export default userRouter;