
import { z } from "zod";

import { UserRole } from "../types/enum";

export const signupSchema = z.object({
  name: z.string().min(2),

  email: z.string().email(),

  phone: z.string().min(10),

  password: z.string().min(6),
  role: z.enum([
  UserRole.MERCHANT,
  UserRole.RESELLER,
  UserRole.MASTER_ADMIN,
  UserRole.SUB_ADMIN,
  UserRole.PG_ADMIN,
]),
 businessName: z.string().optional(), 
});

export const signinSchema = z.object({
  email: z.string().email(),

  password: z.string().min(6),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;