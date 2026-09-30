// server/src/routes/estimate.ts
import { Router } from "express";
import { calculatePrice, calculateTimeline } from "../controllers/estimateController";
import { requireAuth, requireRole } from "../middleware/authenticate";

const router = Router();

// Public endpoint – price calculation (no auth, but could be limited later)
router.post("/price", calculatePrice);

// Authenticated endpoint – timeline calculation (only for logged‑in clients/admins)
router.post("/timeline", requireAuth, requireRole(["Client", "Admin", "Super Admin", "Project Manager"]), calculateTimeline);

export default router;
