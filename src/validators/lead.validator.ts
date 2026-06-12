import { z } from "zod";

export const submitLeadSchema = z.object({
  merchantName: z.string().min(2),
  businessName: z.string().min(2),

  email: z.string().email(),

  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone must be 10 digits"),

  businessCategory: z.string().min(2),

  estimatedMonthlyVolume: z.coerce.number().optional(),

  tcAccepted: z.boolean().refine(
  (value) => value === true,
  {
    message: "You must accept terms and conditions",
  }
),
});

export type SubmitLeadInput =
  z.infer<typeof submitLeadSchema>;