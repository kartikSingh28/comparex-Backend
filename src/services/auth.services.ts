
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"
import { Reseller } from "../models/reseller.model";
import { User } from "../models/user.model";
import { SignupInput, SigninInput } from "../validators/auth.validator"

import { UserRole } from "../types/enum";

export const generateToken = (
  userId: string,
  role: UserRole
) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};

export const signup = async (
  data: SignupInput
) => {
  
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });
  if (data.role === UserRole.RESELLER) {
  const referralCode = "REF" + uuidv4().slice(0, 8).toUpperCase();
  await Reseller.create({
    userId: user._id,
    referralCode,
    businessName: data.businessName,
  });
}

  const token = generateToken(
    user._id.toString(),
    user.role
  );

  const userObject = user.toObject();

  const {
    password,
    ...safeUser
  } = userObject;

  return {
    user: safeUser,
    token,
  };
};

export const signin = async (
  data: SigninInput
) => {
  const user = await User.findOne({
    email: data.email,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }
  if (!user.isActive) throw new Error("Account deactivated. Contact support.");

  const isPasswordMatched =
    await bcrypt.compare(
      data.password,
      user.password
    );

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(
    user._id.toString(),
    user.role
  );

  const userObject = user.toObject();

  const {
    password,
    ...safeUser
  } = userObject;

  return {
    user: safeUser,
    token,
  };
};
