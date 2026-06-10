import {Request,Response} from "express";
import { PaymentGateway } from "../models/paymentGateway.model";

export async function createPG(req: Request, res: Response) {
  try {
    const existingPG = await PaymentGateway.findOne({ name: req.body.name });
    if (existingPG) {
      return res.status(409).json({
        success: false,
        message: "Payment Gateway already exists",
      });
    }

    const pg = await PaymentGateway.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Payment Gateway created successfully",
      data: pg,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create PG",
    });
  }
}
//public get all active pg
export async function getAllPGs(req:Request,res:Response){
    try{
        const pgs= await PaymentGateway.find({
            isActive:true
        });
        return res.status(200).json({
            success:true,
            message:"Payment Gateways fetched",
            data:pgs,
        });
    }catch(error:any){
        return res.status(400).json({
            success:false,
            message:error.message || "Failed to fetch Payment Gateways"
        })
    }
}

//  MASTER_ADMIN / PG_ADMIN — update PG

export async function updatePG(req:Request,res:Response){
    try{
        const pg= await PaymentGateway.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true, runValidators: true,}
            
        );
        if(!pg){
            return res.status(404).json({
                success:false,
                message:"Payment Gateway not found",
            });
        }
        return res.status(200).json({
            success:true,
            message:"Payment Gateway updated",
            data:pg,
        });
    }catch(error:any){
        return res.status(400).json({
            success:false,
            message: error.message || "Failed to update PG",
        });
    }
}

// MASTER_ADMIN only — delete PG
export async function deletePG(req: Request, res: Response) {
  try {
    const pg = await PaymentGateway.findByIdAndDelete(req.params.id);
    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "Payment Gateway not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Payment Gateway deleted",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete PG",
    });
  }
}
export async function getPGById(req: Request, res: Response) {
  try {
    const pg = await PaymentGateway.findById(req.params.id);
    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "Payment Gateway not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Payment Gateway fetched",
      data: pg,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch PG",
    });
  }
}


