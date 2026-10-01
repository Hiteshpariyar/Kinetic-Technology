import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "path";
import authRoutes from "./routes/auth";
import leadRoutes from "./routes/lead";
import estimateRoutes from "./routes/estimate";
import trackingRoutes from "./routes/tracking";
import invoiceRoutes from "./routes/invoice";
import storeRoutes from "./routes/store";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";

const app = express();

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(requestLogger);

// Serve static uploaded files (app icons, binary APKs/ZIPs)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rate limiting (basic)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/estimate", estimateRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/store", storeRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Kinetic Technology API",
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

export default app;
