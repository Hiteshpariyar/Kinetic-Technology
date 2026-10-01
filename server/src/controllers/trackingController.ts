import { Request, Response } from "express";

export interface TrackingMilestone {
  step: number;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  completedAt?: string;
  expectedDate?: string;
  note?: string;
}

export interface ProjectTracking {
  id: string;
  trackingId: string; // e.g. KT-782910
  leadId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  company?: string;
  projectName: string;
  projectDescription?: string;
  currentStage: number; // 1 to 6
  currentStageName: string;
  progressPercent: number; // 0 to 100
  estimatedCompletion: string;
  leadEngineer: string;
  githubRepo?: string;
  liveDemoUrl?: string;
  milestones: TrackingMilestone[];
  createdAt: string;
  updatedAt: string;
}

export const defaultMilestones: TrackingMilestone[] = [
  {
    step: 1,
    title: "App Information Submitted",
    description: "App specifications, configured features, and architectural scope submitted by client.",
    status: "in_progress",
    completedAt: "2026-09-25T10:00:00.000Z",
    note: "All app information submitted successfully (0%). Ready for developer connection.",
  },
  {
    step: 2,
    title: "Developer Connected",
    description: "Developer links development workspace, environment, and code repository to project.",
    status: "pending",
    note: "Developer connected to project workspace (10%).",
  },
  {
    step: 3,
    title: "Developer Assigned & Sprint Kickoff",
    description: "Dedicated lead developer assigned to oversee development and architecture sprints.",
    status: "pending",
    note: "Lead developer assigned to project (15%).",
  },
  {
    step: 4,
    title: "Core Engineering & Frontend/Backend Sprints",
    description: "Active sprint development: UI components, backend APIs, database architecture, and business logic.",
    status: "pending",
  },
  {
    step: 5,
    title: "Automated Testing, Security Audit & Pen-Testing",
    description: "End-to-end integration tests, load tests, OWASP top 10 security review, and static code analysis.",
    status: "pending",
  },
  {
    step: 6,
    title: "Production Deployment & Cloud Handover",
    description: "Production launch on AWS/GCP, SSL provisioning, CI/CD pipeline, and full source code handover.",
    status: "pending",
  },
];

export const inMemoryTracking: ProjectTracking[] = [
  {
    id: "track_1",
    trackingId: "KT-782910",
    clientName: "Vikram Malhotra",
    clientEmail: "vikram@finscale.io",
    clientPhone: "9876543210",
    company: "FinScale Payments",
    projectName: "FinScale Mobile Wallet & Payment Gateway",
    projectDescription: "High-throughput mobile wallet for iOS & Android with Stripe and Razorpay integrations.",
    currentStage: 3,
    currentStageName: "Developer Assigned & Sprint Kickoff",
    progressPercent: 15,
    estimatedCompletion: "October 30, 2026",
    leadEngineer: "Alex R. (Senior Systems Architect)",
    githubRepo: "https://github.com/kinetic-technology/finscale-wallet-core",
    liveDemoUrl: "https://staging-finscale.kinetictechnology.com",
    milestones: [
      {
        step: 1,
        title: "App Information Submitted",
        description: "App specifications, configured features, and architectural scope submitted by client.",
        status: "completed",
        completedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        note: "All app information submitted successfully (0%).",
      },
      {
        step: 2,
        title: "Developer Connected",
        description: "Developer links development workspace, environment, and code repository to project.",
        status: "completed",
        completedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        note: "Developer connected to project workspace (10%).",
      },
      {
        step: 3,
        title: "Developer Assigned & Sprint Kickoff",
        description: "Dedicated lead developer assigned to oversee development and architecture sprints.",
        status: "in_progress",
        expectedDate: "2026-10-08T18:00:00.000Z",
        note: "Lead developer Alex R. assigned to project (15%). Sprint planning active.",
      },
      {
        step: 4,
        title: "Core Engineering & Frontend/Backend Sprints",
        description: "Active sprint development: UI components, backend APIs, database architecture, and business logic.",
        status: "pending",
        expectedDate: "2026-10-15T18:00:00.000Z",
      },
      {
        step: 5,
        title: "Automated Testing, Security Audit & Pen-Testing",
        description: "End-to-end integration tests, load tests, OWASP top 10 security review, and static code analysis.",
        status: "pending",
        expectedDate: "2026-10-22T18:00:00.000Z",
      },
      {
        step: 6,
        title: "Production Deployment & Cloud Handover",
        description: "Production launch on AWS/GCP, SSL provisioning, CI/CD pipeline, and full source code handover.",
        status: "pending",
        expectedDate: "2026-10-30T18:00:00.000Z",
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 50).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "track_2",
    trackingId: "KT-104921",
    clientName: "Dr. Ananya Sharma",
    clientEmail: "ananya@medcore.health",
    clientPhone: "9123456789",
    company: "MedCore Health Systems",
    projectName: "MedCore Telemedicine & EHR Suite",
    projectDescription: "HIPAA-compliant telemedicine platform with real-time video consults and patient prescription records.",
    currentStage: 1,
    currentStageName: "App Information Submitted",
    progressPercent: 0,
    estimatedCompletion: "November 15, 2026",
    leadEngineer: "Pending Developer Assignment",
    milestones: [
      {
        step: 1,
        title: "App Information Submitted",
        description: "App specifications, configured features, and architectural scope submitted by client.",
        status: "in_progress",
        completedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        note: "App information submitted successfully (0%). Waiting for developer connection.",
      },
      {
        step: 2,
        title: "Developer Connected",
        description: "Developer links development workspace, environment, and code repository to project.",
        status: "pending",
      },
      {
        step: 3,
        title: "Developer Assigned & Sprint Kickoff",
        description: "Dedicated lead developer assigned to oversee development and architecture sprints.",
        status: "pending",
      },
      {
        step: 4,
        title: "Core Engineering & Frontend/Backend Sprints",
        description: "Active sprint development: UI components, backend APIs, database architecture, and business logic.",
        status: "pending",
      },
      {
        step: 5,
        title: "Automated Testing, Security Audit & Pen-Testing",
        description: "End-to-end integration tests, load tests, OWASP top 10 security review, and static code analysis.",
        status: "pending",
      },
      {
        step: 6,
        title: "Production Deployment & Cloud Handover",
        description: "Production launch on AWS/GCP, SSL provisioning, CI/CD pipeline, and full source code handover.",
        status: "pending",
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "track_3",
    trackingId: "KT-277691",
    clientName: "Rahul Verma",
    clientEmail: "rahul@supplyflow.com",
    clientPhone: "9988776655",
    company: "SupplyFlow Logistics",
    projectName: "Automated Fleet Tracking & Dispatch Engine",
    projectDescription: "GPS tracking, automated driver allocation, and fuel-route optimization engine.",
    currentStage: 2,
    currentStageName: "Developer Connected",
    progressPercent: 10,
    estimatedCompletion: "October 12, 2026",
    leadEngineer: "Pending Developer Assignment",
    githubRepo: "https://github.com/kinetic-technology/supplyflow-dispatch",
    liveDemoUrl: "https://staging-dispatch.kinetictechnology.com",
    milestones: [
      {
        step: 1,
        title: "App Information Submitted",
        description: "App specifications, configured features, and architectural scope submitted by client.",
        status: "completed",
        completedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        note: "All app information submitted successfully (0%).",
      },
      {
        step: 2,
        title: "Developer Connected",
        description: "Developer links development workspace, environment, and code repository to project.",
        status: "in_progress",
        expectedDate: "2026-10-04T18:00:00.000Z",
        note: "Developer connected to workspace & repository (10%). Preparing engineer assignment.",
      },
      {
        step: 3,
        title: "Developer Assigned & Sprint Kickoff",
        description: "Dedicated lead developer assigned to oversee development and architecture sprints.",
        status: "pending",
      },
      {
        step: 4,
        title: "Core Engineering & Frontend/Backend Sprints",
        description: "Active sprint development: UI components, backend APIs, database architecture, and business logic.",
        status: "pending",
      },
      {
        step: 5,
        title: "Automated Testing, Security Audit & Pen-Testing",
        description: "End-to-end integration tests, load tests, OWASP top 10 security review, and static code analysis.",
        status: "pending",
      },
      {
        step: 6,
        title: "Production Deployment & Cloud Handover",
        description: "Production launch on AWS/GCP, SSL provisioning, CI/CD pipeline, and full source code handover.",
        status: "pending",
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
];

// Helper to generate a new tracking ID
export const generateTrackingId = (): string => {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `KT-${digits}`;
};

// Function called by leadController when a quote / lead is submitted
export const registerNewTracking = (options: {
  leadId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  company?: string;
  projectName: string;
  projectDescription?: string;
}): ProjectTracking => {
  const trackingId = generateTrackingId();
  const newTracking: ProjectTracking = {
    id: `track_${Date.now()}`,
    trackingId,
    leadId: options.leadId,
    clientName: options.clientName,
    clientEmail: options.clientEmail,
    clientPhone: options.clientPhone,
    company: options.company,
    projectName: options.projectName || "Custom Software Engineering Project",
    projectDescription: options.projectDescription || "Client custom build configured via Project Builder.",
    currentStage: 1,
    currentStageName: "App Information Submitted",
    progressPercent: 0,
    estimatedCompletion: new Date(Date.now() + 86400000 * 30).toLocaleDateString("en-IN", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    leadEngineer: "Pending Developer Assignment",
    milestones: defaultMilestones.map((m) => {
      if (m.step === 1) {
        return {
          ...m,
          status: "in_progress",
          note: "App information successfully registered (0%). Awaiting developer connection.",
        };
      }
      return { ...m, status: "pending" };
    }),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  inMemoryTracking.unshift(newTracking);
  return newTracking;
};

// GET /api/tracking/:trackId
export const getTrackingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { trackId } = req.params;
    const cleanId = String(trackId).trim().toUpperCase();

    const record = inMemoryTracking.find(
      (t) => t.trackingId.toUpperCase() === cleanId || t.id === cleanId
    );

    if (!record) {
      res.status(404).json({
        message: `Project Tracking ID '${cleanId}' not found. Please verify the tracking ID on your quote or tax invoice.`,
      });
      return;
    }

    res.json({ tracking: record });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to retrieve tracking data" });
  }
};

// GET /api/tracking
export const getAllTracking = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json({ trackingRecords: inMemoryTracking });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch tracking records" });
  }
};

// PATCH /api/tracking/:trackId (Admin updates milestones, stages, percent, notes)
export const updateTracking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { trackId } = req.params;
    const cleanId = String(trackId).trim().toUpperCase();

    const record = inMemoryTracking.find(
      (t) => t.trackingId.toUpperCase() === cleanId || t.id === cleanId
    );

    if (!record) {
      res.status(404).json({ message: "Project tracking record not found" });
      return;
    }

    const {
      currentStage,
      progressPercent,
      estimatedCompletion,
      leadEngineer,
      githubRepo,
      liveDemoUrl,
      milestoneIndex,
      milestoneStatus,
      milestoneNote,
    } = req.body;

    if (currentStage !== undefined) {
      record.currentStage = Number(currentStage);
      const stageMilestone = record.milestones.find((m) => m.step === Number(currentStage));
      if (stageMilestone) {
        record.currentStageName = stageMilestone.title;
      }
    }

    if (progressPercent !== undefined) {
      record.progressPercent = Number(progressPercent);
    }

    if (estimatedCompletion !== undefined) {
      record.estimatedCompletion = estimatedCompletion;
    }

    if (leadEngineer !== undefined) {
      record.leadEngineer = leadEngineer;
    }

    if (githubRepo !== undefined) {
      record.githubRepo = githubRepo;
    }

    if (liveDemoUrl !== undefined) {
      record.liveDemoUrl = liveDemoUrl;
    }

    // Update specific milestone if provided
    if (milestoneIndex !== undefined && record.milestones[milestoneIndex]) {
      if (milestoneStatus) {
        record.milestones[milestoneIndex].status = milestoneStatus;
        if (milestoneStatus === "completed" && !record.milestones[milestoneIndex].completedAt) {
          record.milestones[milestoneIndex].completedAt = new Date().toISOString();
        }
      }
      if (milestoneNote !== undefined) {
        record.milestones[milestoneIndex].note = milestoneNote;
      }
    }

    // Auto-sync milestone statuses based on currentStage
    record.milestones.forEach((m) => {
      if (m.step < record.currentStage) {
        m.status = "completed";
      } else if (m.step === record.currentStage) {
        m.status = "in_progress";
      } else {
        m.status = "pending";
      }
    });

    record.updatedAt = new Date().toISOString();

    res.json({
      message: "Tracking record updated successfully",
      tracking: record,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to update tracking record" });
  }
};
