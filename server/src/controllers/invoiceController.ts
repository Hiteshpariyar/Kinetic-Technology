import { Request, Response } from "express";
import { inMemoryTracking } from "./trackingController";

export interface InvoiceItem {
  description: string;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. INV-2026-94812
  trackingId: string; // e.g. KT-782910
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  company?: string;
  projectName: string;
  items: InvoiceItem[];
  subtotal: number;
  gstRate: number; // 18%
  gstAmount: number;
  totalAmount: number;
  paymentMethod: string; // "Razorpay" | "UPI / QR" | "NetBanking" | "Debit / Credit Card"
  transactionId: string;
  status: "PAID" | "PENDING";
  paidAt: string;
  createdAt: string;
  notes?: string;
}

export const inMemoryInvoices: Invoice[] = [
  {
    id: "inv_1",
    invoiceNumber: "INV-2026-10492",
    trackingId: "KT-782910",
    clientName: "Vikram Malhotra",
    clientEmail: "vikram@finscale.io",
    clientPhone: "9876543210",
    company: "FinScale Payments",
    projectName: "FinScale Mobile Wallet & Payment Gateway",
    items: [
      { description: "Sprint 1 & 2 Milestone: Target iOS & Android Architecture, JWT Auth, Razorpay APIs", amount: 65000 },
      { description: "Kinetic Design System & UI Prototyping", amount: 0 },
      { description: "Kinetic Basic Security Hardening", amount: 0 },
    ],
    subtotal: 65000,
    gstRate: 18,
    gstAmount: 11700,
    totalAmount: 76700,
    paymentMethod: "Razorpay (UPI / Auto-Debit)",
    transactionId: "TXN_RZP_94810283",
    status: "PAID",
    paidAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 38).toISOString(),
    notes: "Milestone payment cleared. All sprint 2 artifacts handover completed.",
  },
  {
    id: "inv_2",
    invoiceNumber: "INV-2026-10493",
    trackingId: "KT-104921",
    clientName: "Dr. Ananya Sharma",
    clientEmail: "ananya@medcore.health",
    clientPhone: "9123456789",
    company: "MedCore Health Systems",
    projectName: "MedCore Telemedicine & EHR Suite",
    items: [
      { description: "Sprint 1 Kickoff Milestone: HIPAA Architecture Spec, WebRTC Sizing, Database Modeling", amount: 45000 },
      { description: "Enterprise Security Audit & Compliance Assessment", amount: 25000 },
    ],
    subtotal: 70000,
    gstRate: 18,
    gstAmount: 12600,
    totalAmount: 82600,
    paymentMethod: "NetBanking (HDFC Bank RTGS)",
    transactionId: "TXN_RTGS_5519280",
    status: "PAID",
    paidAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    notes: "Phase 1 initiation fee verified.",
  },
];

// GET /api/invoices
export const getInvoices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, trackingId } = req.query;

    let filtered = inMemoryInvoices;
    if (trackingId) {
      filtered = filtered.filter(
        (inv) => inv.trackingId.toUpperCase() === String(trackingId).toUpperCase()
      );
    } else if (email) {
      filtered = filtered.filter(
        (inv) => inv.clientEmail.toLowerCase() === String(email).toLowerCase()
      );
    }

    res.json({ invoices: filtered });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch invoices" });
  }
};

// GET /api/invoices/:id
export const getInvoiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const inv = inMemoryInvoices.find(
      (item) => item.id === id || item.invoiceNumber === id
    );

    if (!inv) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    res.json({ invoice: inv });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch invoice" });
  }
};

// POST /api/invoices/pay (Client completes payment -> produces tax invoice + tracking ID)
export const processPaymentAndCreateInvoice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      trackingId,
      clientName,
      clientEmail,
      clientPhone,
      company,
      projectName,
      items,
      amount,
      paymentMethod,
    } = req.body;

    if (!clientName || !clientEmail || !amount) {
      res.status(400).json({ message: "Client name, email, and amount are required" });
      return;
    }

    const subtotal = Number(amount);
    const gstRate = 18;
    const gstAmount = Math.round((subtotal * gstRate) / 100);
    const totalAmount = subtotal + gstAmount;

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const invoiceNumber = `INV-2026-${randomSuffix}`;
    const transactionId = `TXN_KT_${Date.now().toString().slice(-8)}`;
    const finalTrackingId = trackingId || `KT-${Math.floor(100000 + Math.random() * 900000)}`;

    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      invoiceNumber,
      trackingId: finalTrackingId,
      clientName,
      clientEmail,
      clientPhone: clientPhone || "Not specified",
      company: company || "Independent",
      projectName: projectName || "Custom Engineering Sprint",
      items: items && items.length > 0 ? items : [
        { description: `${projectName || "Software Project"} - Sprint Milestone Delivery`, amount: subtotal },
      ],
      subtotal,
      gstRate,
      gstAmount,
      totalAmount,
      paymentMethod: paymentMethod || "UPI / Razorpay Verified",
      transactionId,
      status: "PAID",
      paidAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      notes: "Payment received in full. Milestone delivery unlocked and synchronized with Tracking ID.",
    };

    inMemoryInvoices.unshift(newInvoice);

    // Sync with project tracking system!
    const trackRecord = inMemoryTracking.find(
      (t) => t.trackingId.toUpperCase() === finalTrackingId.toUpperCase()
    );

    if (trackRecord) {
      // Advance to next milestone if at beginning
      if (trackRecord.currentStage < 4) {
        trackRecord.currentStage = Math.min(6, trackRecord.currentStage + 1);
        trackRecord.progressPercent = Math.min(100, trackRecord.progressPercent + 25);
      }
      trackRecord.updatedAt = new Date().toISOString();
      const currentMilestone = trackRecord.milestones.find((m) => m.step === trackRecord.currentStage);
      if (currentMilestone) {
        currentMilestone.note = `Milestone payment of ₹${totalAmount.toLocaleString()} received via ${newInvoice.paymentMethod} (Invoice: ${invoiceNumber}, Txn: ${transactionId}). Active sprint underway.`;
      }
    }

    res.status(201).json({
      message: "Payment processed successfully. Tax invoice generated.",
      invoice: newInvoice,
      trackingId: finalTrackingId,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to process payment and invoice" });
  }
};
