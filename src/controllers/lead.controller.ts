import { Request, Response } from "express";
import { Lead } from "../models/lead.model";
import { submitLeadSchema } from "../validators/lead.validator";
import { LeadStatus } from "../types/enum";

export async function submitLead(
  req: Request,
  res: Response
) {
  try {
    const validData = submitLeadSchema.parse(req.body);

    const existingLead = await Lead.findOne({
      $or: [
        { email: validData.email },
        { phone: validData.phone },
      ],
    });

    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: "Lead already exists",
      });
    }

    const tcAcceptedIp =
      (req.headers["x-forwarded-for"] as string) ||
      req.socket.remoteAddress ||
      "unknown";

    const lead = await Lead.create({
      merchantName: validData.merchantName,
      businessName: validData.businessName,

      email: validData.email,
      phone: validData.phone,

      businessCategory: validData.businessCategory,

      estimatedMonthlyVolume:
        validData.estimatedMonthlyVolume,

      status: LeadStatus.NEW,

      isOrganic: true,

      tcAccepted: true,
      tcAcceptedAt: new Date(),
      tcAcceptedIp,
    });

    return res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      data: {
        id: lead._id,
        status: lead.status,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to submit lead",
    });
  }
}