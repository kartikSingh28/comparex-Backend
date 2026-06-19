import mongoose, { Schema, Document } from "mongoose";
import { KYCStatus } from "../types/enum";

export interface IReseller extends Document{
    userId: mongoose.Types.ObjectId;
  referralCode: string;
  businessName?: string;
  kycStatus: KYCStatus;
  panNumber?: string;
  aadhaarNumber?: string;
  bankAccountNo?: string;
  ifscCode?: string;
  totalGMV: number;
  totalEarned: number;
}

const resellerSchema = new Schema<IReseller>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    referralCode: {
      type: String,
      required: true,
      unique: true,
    },
    businessName: { type: String },
    kycStatus: {
      type: String,
      enum: Object.values(KYCStatus),
      default: KYCStatus.PENDING,
    },
    panNumber: { type: String },
    aadhaarNumber: { type: String },
    bankAccountNo: { type: String },
    ifscCode: { type: String },
    totalGMV: { type: Number, default: 0 },
    totalEarned: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Reseller = mongoose.model<IReseller>("Reseller", resellerSchema);