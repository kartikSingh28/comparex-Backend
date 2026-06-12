import {Router } from "express";
import { submitLead } from "../controllers/lead.controller";

const leadRouter =Router();


leadRouter.post("/submit",submitLead);
export default leadRouter;