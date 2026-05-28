import { Request, Response } from "express";
import { signup, signin } from "../services/auth.services";
import { signupSchema, signinSchema } from "../validators/auth.validator";

export async function signupController(req: Request, res: Response) {
  try {
    const validData = signupSchema.parse(req.body);

    const result = await signup(validData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Signup failed",
    });
  }
}

export async function signinController(req: Request, res: Response) {
  try {
    const validData = signinSchema.parse(req.body);

    const result = await signin(validData);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Signin failed",
    });
  }
}