import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const inMemoryLeads: any[] = [
  {
    id: "lead_101",
    name: "Vikram Malhotra",
    email: "vikram@finscale.io",
    phone: "9876543210",
    company: "FinScale Payments",
    message: "Looking to build a high-throughput mobile wallet for iOS & Android with Stripe and Razorpay integrations.",
    status: "QUALIFIED",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "lead_102",
    name: "Dr. Ananya Sharma",
    email: "ananya@medcore.health",
    phone: "9123456789",
    company: "MedCore Health Systems",
    message: "Need a HIPAA-compliant telemedicine platform with real-time video consults and patient prescription records.",
    status: "NEW",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "lead_103",
    name: "Rohan Patel",
    email: "rohan@realestate360.in",
    phone: "8153013913",
    company: "PropTech 360",
    message: "Configured Quote for: Web Application, Android Application. Features: User Auth, Analytics, Real-Time Chat. Est: $12,500.",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

import { registerNewTracking } from "./trackingController";

export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, company, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ message: "Name, email, and message are required" });
      return;
    }

    // Extract project name or summary from message if present
    let projectName = "Custom Engineering Solution";
    if (message.includes("Configured Quote for:")) {
      projectName = message.split(".")[0].replace("Configured Quote for:", "").trim();
    } else if (message.includes("CLIENT PROJECT DESCRIPTION:")) {
      const firstLine = message.replace("CLIENT PROJECT DESCRIPTION:", "").trim().split("\n")[0];
      projectName = firstLine.length > 50 ? firstLine.substring(0, 50) + "..." : firstLine;
    }

    try {
      const lead = await prisma.lead.create({
        data: {
          name,
          email,
          phone: phone || null,
          company: company || null,
          message,
        },
      });

      const trackingRecord = registerNewTracking({
        leadId: lead.id,
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        projectName,
        projectDescription: message,
      });

      res.status(201).json({
        message: "Lead submitted successfully",
        lead,
        trackingId: trackingRecord.trackingId,
        tracking: trackingRecord,
      });
      return;
    } catch {
      const fallbackLead = {
        id: `lead_${Date.now()}`,
        name,
        email,
        phone: phone || null,
        company: company || null,
        message,
        status: "NEW",
        createdAt: new Date().toISOString(),
      };
      inMemoryLeads.unshift(fallbackLead);

      const trackingRecord = registerNewTracking({
        leadId: fallbackLead.id,
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        projectName,
        projectDescription: message,
      });

      res.status(201).json({
        message: "Lead submitted successfully",
        lead: fallbackLead,
        trackingId: trackingRecord.trackingId,
        tracking: trackingRecord,
      });
      return;
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to process lead" });
  }
};

export const getLeads = async (_req: Request, res: Response): Promise<void> => {
  try {
    try {
      const leads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json({ leads: leads.length > 0 ? leads : inMemoryLeads });
      return;
    } catch {
      res.json({ leads: inMemoryLeads });
      return;
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch leads" });
  }
};

export const updateLeadStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const updated = await prisma.lead.update({
        where: { id },
        data: { status },
      });
      res.json({ message: "Lead updated", lead: updated });
      return;
    } catch {
      const lead = inMemoryLeads.find((l) => l.id === id);
      if (lead) {
        lead.status = status;
        res.json({ message: "Lead updated (Dev Mode)", lead });
        return;
      }
      res.status(404).json({ message: "Lead not found" });
      return;
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to update lead status" });
  }
};

export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    try {
      await prisma.lead.delete({ where: { id } });
      res.json({ message: "Lead deleted successfully" });
      return;
    } catch {
      const idx = inMemoryLeads.findIndex((l) => l.id === id);
      if (idx !== -1) {
        inMemoryLeads.splice(idx, 1);
        res.json({ message: "Lead deleted successfully (Dev Mode)" });
        return;
      }
      res.status(404).json({ message: "Lead not found" });
      return;
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to delete lead" });
  }
};
