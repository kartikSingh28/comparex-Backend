import mongoose, { Schema, Document } from "mongoose";
import { LeadStatus } from "../types/enum";

export interface ILead extends Document {
  merchantName: string;
  businessName: string;

  email: string;
  phone: string;

  businessCategory: string;
  estimatedMonthlyVolume?: number;

  status: LeadStatus;

  isOrganic: boolean;

  resellerId?: mongoose.Types.ObjectId;

  assignedPgId?: mongoose.Types.ObjectId;
  assignedBySubAdminId?: mongoose.Types.ObjectId;

  tcAccepted: boolean;
  tcAcceptedAt?: Date;
  tcAcceptedIp: string;

  remarks?: string;
}

const leadSchema = new Schema<ILead>(
  {
    merchantName: {
      type: String,
      required: true,
      trim: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    businessCategory: {
      type: String,
      required: true,
    },

    estimatedMonthlyVolume: {
      type: Number,
    },

    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.NEW,
    },

    isOrganic: {
      type: Boolean,
      default: true,
    },

    resellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    assignedPgId: {
      type: Schema.Types.ObjectId,
      ref: "PaymentGateway",
    },

    assignedBySubAdminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    tcAccepted: {
      type: Boolean,
      required: true,
    },

    tcAcceptedAt: {
      type: Date,
    },

    tcAcceptedIp: {
      type: String,
      required: true,
    },

    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Lead = mongoose.model<ILead>(
  "Lead",
  leadSchema
);