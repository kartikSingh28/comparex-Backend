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

export async function getAllLeads(req:Request,res:Response){
    try{
        const leads= await Lead.find()
        .populate("assignedPgId","name")
        .sort({createdAt:-1});

        return res.status(200).json({
            success:true,
            count:leads.length,
            data:leads,
        });
    }catch(error:any){
        return res.status(500).json({
            success:false,
            message:error.message || "Failed to fetch leads",
        });
    }
}

//qualify leads only master_admin,sub_admin

export async function qualifyLeads(req:Request,res:Response){
try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const allowedStatuses: LeadStatus[] = [
      LeadStatus.IN_REVIEW,
      LeadStatus.QUALIFIED,
      LeadStatus.REJECTED,
    ];

    if (!allowedStatuses.includes(status as LeadStatus)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed values: IN_REVIEW, QUALIFIED, REJECTED",
      });
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    lead.status = status as LeadStatus;

    if (remarks) {
      lead.remarks = remarks;
    }

    await lead.save();

    return res.status(200).json({
      success: true,
      message: `Lead marked as ${status}`,
      data: lead,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to qualify lead",
    });
  }
}
