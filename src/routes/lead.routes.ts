import {Router } from "express";
import { submitLead,getAllLeads } from "../controllers/lead.controller";
import {authenticate} from "../middlewares/authMiddleware";
import {authorize} from "../middlewares/authorize";
const leadRouter =Router();


leadRouter.post("/submit",submitLead);
leadRouter.get("/",authenticate,authorize("lead:view-all"),getAllLeads);
export default leadRouter;