import { Router } from "express";
import {
  createLead,
  getLeads,
  updateLeadStatus,
  deleteLead,
} from "../controllers/leadController";

const router = Router();

// Public lead submission
router.post("/", createLead);

// Lead management endpoints for admin panel
router.get("/", getLeads);
router.patch("/:id", updateLeadStatus);
router.delete("/:id", deleteLead);

export default router;
