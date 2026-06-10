import { Router } from "express";
import { createPG, getAllPGs, updatePG, deletePG,getPGById, } from "../controllers/paymentGateway.controller";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/authorize";

const pgRouter = Router();

// Public — no auth needed
pgRouter.get("/", getAllPGs);

// Protected routes
pgRouter.post("/", authenticate, authorize("admin:onboard-pg"), createPG);
pgRouter.patch("/:id", authenticate, authorize("pg:update-profile"), updatePG);
pgRouter.delete("/:id", authenticate, authorize("admin:onboard-pg"), deletePG);
pgRouter.get("/:id", getPGById);

export default pgRouter;