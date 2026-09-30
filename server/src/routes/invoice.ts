import { Router } from "express";
import {
  getInvoices,
  getInvoiceById,
  processPaymentAndCreateInvoice,
} from "../controllers/invoiceController";

const router = Router();

router.get("/", getInvoices);
router.get("/:id", getInvoiceById);
router.post("/pay", processPaymentAndCreateInvoice);

export default router;
