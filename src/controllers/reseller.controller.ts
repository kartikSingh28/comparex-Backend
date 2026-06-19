import { Response } from "express";
import { AuthenticatedRequest } from "../types/interface";
import { Reseller } from "../models/reseller.model";
import { Lead } from "../models/lead.model";
import { LeadStatus } from "../types/enum";

// GET my referral link
export async function getMyReferralLink(req: AuthenticatedRequest, res: Response) {
  try {
    const reseller = await Reseller.findOne({ userId: req.user?.userId });

    if (!reseller) {
      return res.status(404).json({
        success: false,
        message: "Reseller profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Referral link fetched",
      data: {
        referralCode: reseller.referralCode,
        referralLink: `${process.env.FRONTEND_URL}/apply?ref=${reseller.referralCode}`,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch referral link",
    });
  }
}

// GET my referred leads
export async function getMyLeads(req: AuthenticatedRequest, res: Response) {
  try {
    const reseller = await Reseller.findOne({ userId: req.user?.userId });

    if (!reseller) {
      return res.status(404).json({
        success: false,
        message: "Reseller profile not found",
      });
    }

    const leads = await Lead.find({ resellerId: reseller._id })
      .populate("assignedPgId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch leads",
    });
  }
}

// GET my GMV — only LIVE leads count
export async function getMyGMV(req: AuthenticatedRequest, res: Response) {
  try {
    const reseller = await Reseller.findOne({ userId: req.user?.userId });

    if (!reseller) {
      return res.status(404).json({
        success: false,
        message: "Reseller profile not found",
      });
    }

    const liveLeads = await Lead.find({
      resellerId: reseller._id,
      status: LeadStatus.LIVE,
    });

    const totalGMV = liveLeads.reduce(
      (sum, lead) => sum + (lead.estimatedMonthlyVolume || 0),
      0
    );

    return res.status(200).json({
      success: true,
      data: {
        totalGMV,
        liveLeadsCount: liveLeads.length,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch GMV",
    });
  }
}

// GET my profile
export async function getMyProfile(req: AuthenticatedRequest, res: Response) {
  try {
    const reseller = await Reseller.findOne({ userId: req.user?.userId })
      .populate("userId", "name email phone");

    if (!reseller) {
      return res.status(404).json({
        success: false,
        message: "Reseller profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: reseller,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch profile",
    });
  }
}