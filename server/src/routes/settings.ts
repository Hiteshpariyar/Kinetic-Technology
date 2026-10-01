import { Router } from "express";
import {
  getSettings,
  updateSettings,
  logoUpload,
} from "../controllers/settingsController";

const router = Router();

router.get("/", getSettings);
router.put("/", logoUpload.single("logoFile"), updateSettings);

export default router;
