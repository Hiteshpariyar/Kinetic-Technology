import { Router } from "express";
import {
  getApps,
  getAppById,
  createApp,
  updateApp,
  deleteApp,
  downloadApp,
  upload,
} from "../controllers/storeController";

const router = Router();

// Public routes
router.get("/", getApps);
router.get("/:id", getAppById);
router.post("/:id/download", downloadApp);

// Admin routes (with file upload fields for icon and app build package)
router.post(
  "/",
  upload.fields([
    { name: "iconFile", maxCount: 1 },
    { name: "appFile", maxCount: 1 },
  ]),
  createApp
);

router.put(
  "/:id",
  upload.fields([
    { name: "iconFile", maxCount: 1 },
    { name: "appFile", maxCount: 1 },
  ]),
  updateApp
);

router.delete("/:id", deleteApp);

export default router;
