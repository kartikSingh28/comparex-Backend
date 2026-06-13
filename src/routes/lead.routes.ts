import {Router } from "express";
import { submitLead,getAllLeads,qualifyLeads,assignLeads } from "../controllers/lead.controller";
import {authenticate} from "../middlewares/authMiddleware";
import {authorize} from "../middlewares/authorize";
const leadRouter =Router();


leadRouter.post("/submit",submitLead);
leadRouter.get("/",authenticate,authorize("lead:view-all"),getAllLeads);
leadRouter.patch(
  "/:id/qualify",
  authenticate,
  authorize("lead:qualify"),
  qualifyLeads
);

leadRouter.patch(
  "/:id/assign",
  authenticate,
  authorize("lead:assign-to-pg"),
  assignLeads
);
export default leadRouter;