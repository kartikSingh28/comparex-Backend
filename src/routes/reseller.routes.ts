import { Router, Request, Response } from "express";
import {
  getMyReferralLink,
  getMyLeads,
  getMyGMV,
  getMyProfile,
} from "../controllers/reseller.controller";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/authorize";

const resellerRouter = Router();

// All routes require auth + RESELLER role
resellerRouter.get("/my-profile", authenticate, authorize("reseller:view-own-leads"), getMyProfile);
resellerRouter.get("/my-link", authenticate, authorize("reseller:view-own-leads"), getMyReferralLink);
resellerRouter.get("/my-leads", authenticate, authorize("reseller:view-own-leads"), getMyLeads);
resellerRouter.get("/my-gmv", authenticate, authorize("reseller:view-gmv"), getMyGMV);

export default resellerRouter;