import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import pgRouter from "./routes/pg.routes";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ success: true, message: "Comparex API is running" });
});

app.use("/api/pg", pgRouter);

export default app;