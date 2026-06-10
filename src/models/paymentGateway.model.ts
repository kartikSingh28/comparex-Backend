import mongoose, { Schema, Document } from "mongoose";


export interface IPaymentGateway extends Document {
  name: string;
  description?: string;
  mdrUpi?: number;        // separate MDR per payment type
  mdrCards?: number;
  mdrNetbanking?: number;
  mdrWallet?: number;
  tat: string;
  website?: string;
  logo?: string;
  supportedCategories: string[];  // e.g. ["ecommerce", "education"]
  features: string[];             
  affiliateCode?: string;        
  isActive: boolean;
}


const paymentGatewaySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
    },

    mdrRate: {
      type: Number,
      required: true,
    },

    tat: {
      type: String,
      required: true,
    },

    website: {
      type: String,
    },

    logo: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PaymentGateway = mongoose.model<IPaymentGateway>(
  "PaymentGateway",
  paymentGatewaySchema
);