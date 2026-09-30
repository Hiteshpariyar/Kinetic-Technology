import { Router } from "express";
import {
  getTrackingById,
  getAllTracking,
  updateTracking,
} from "../controllers/trackingController";

const router = Router();

// Public route to track project by ID
router.get("/:trackId", getTrackingById);

// Admin routes to view all tracking and update milestones
router.get("/", getAllTracking);
router.patch("/:trackId", updateTracking);

export default router;

