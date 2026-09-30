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
    title: "Project Inception & Requirements Confirmed",
    description: "Technical scope, tech stack choice, architecture design, and milestone agreement finalized.",
    status: "completed",
    completedAt: "2026-09-25T10:00:00.000Z",
    note: "All architectural requirements documented and signed off. Team allocation completed.",
  },
  {
    step: 2,
    title: "Architecture & High-Fidelity UI/UX Prototyping",
    description: "System design specs, database schema, API contracts, and responsive UI components created.",
    status: "completed",
    completedAt: "2026-09-28T14:30:00.000Z",
    note: "Design tokens and interactive Figma components approved by client.",
  },
  {
    step: 3,
    title: "Core Engineering & Frontend/Backend Sprints",
    description: "Active sprint development: React frontend, Node/Express backend, database, and business logic.",
    status: "in_progress",
    expectedDate: "2026-10-08T18:00:00.000Z",
    note: "Sprint 2 backend APIs and database migration active. Real-time telemetry integrated.",
  },
  {
    step: 4,
    title: "Automated Testing, Security Audit & Pen-Testing",
    description: "End-to-end integration tests, load tests, OWASP top 10 security review, and static code analysis.",
    status: "pending",
    expectedDate: "2026-10-15T18:00:00.000Z",
    note: "Scheduled upon completion of sprint 3.",
  },
  {
    step: 5,
    title: "Client Staging Preview & User Acceptance",
    description: "Deployment to isolated staging environment for interactive client testing and sign-off.",
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
    currentStageName: "Core Engineering & Frontend/Backend Sprints",
    progressPercent: 50,
    estimatedCompletion: "October 30, 2026",
    leadEngineer: "David K. (Principal Architect)",
    githubRepo: "https://github.com/kinetic-technology/finscale-wallet-core",
    liveDemoUrl: "https://staging-finscale.kinetictechnology.com",
    milestones: [
      {
        step: 1,
        title: "Project Inception & Requirements Confirmed",
        description: "Technical scope, tech stack choice, architecture design, and milestone agreement finalized.",
        status: "completed",
        completedAt: new Date(Date.now() - 3600000 * 120).toISOString(),
        note: "All architectural requirements documented and signed off. Team allocation completed.",
      },
      {
        step: 2,
        title: "Architecture & High-Fidelity UI/UX Prototyping",
        description: "System design specs, database schema, API contracts, and responsive UI components created.",
        status: "completed",
        completedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        note: "Design tokens and interactive Figma components approved by client.",
      },
      {
        step: 3,
        title: "Core Engineering & Frontend/Backend Sprints",
        description: "Active sprint development: React frontend, Node/Express backend, database, and business logic.",
        status: "in_progress",
        expectedDate: "2026-10-08T18:00:00.000Z",
        note: "Sprint 2 backend APIs and database migration active. Real-time telemetry integrated.",
      },
      {
        step: 4,
        title: "Automated Testing, Security Audit & Pen-Testing",
        description: "End-to-end integration tests, load tests, OWASP top 10 security review, and static code analysis.",
        status: "pending",
        expectedDate: "2026-10-15T18:00:00.000Z",
        note: "Scheduled upon completion of sprint 3.",
      },
      {
        step: 5,
        title: "Client Staging Preview & User Acceptance",
        description: "Deployment to isolated staging environment for interactive client testing and sign-off.",
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
    createdAt: new Date(Date.now() - 3600000 * 140).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
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
    currentStage: 2,
    currentStageName: "Architecture & High-Fidelity UI/UX Prototyping",
    progressPercent: 30,
    estimatedCompletion: "November 15, 2026",
    leadEngineer: "Sarah M. (Lead Systems Engineer)",
    githubRepo: "https://github.com/kinetic-technology/medcore-telehealth",
    liveDemoUrl: "https://staging-medcore.kinetictechnology.com",
    milestones: [
      {
        step: 1,
        title: "Project Inception & Requirements Confirmed",
        description: "Technical scope, tech stack choice, architecture design, and milestone agreement finalized.",
        status: "completed",
        completedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
        note: "HIPAA compliance framework mapped.",
      },
      {
        step: 2,
        title: "Architecture & High-Fidelity UI/UX Prototyping",
        description: "System design specs, database schema, API contracts, and responsive UI components created.",
        status: "in_progress",
        expectedDate: "2026-10-05T18:00:00.000Z",
        note: "WebRTC audio-video architecture and doctor dashboard mockup under client review.",
      },
      {
        step: 3,
        title: "Core Engineering & Frontend/Backend Sprints",
        description: "Active sprint development: React frontend, Node/Express backend, database, and business logic.",
        status: "pending",
        expectedDate: "2026-10-20T18:00:00.000Z",
      },
      {
        step: 4,
        title: "Automated Testing, Security Audit & Pen-Testing",
        description: "End-to-end integration tests, load tests, OWASP top 10 security review, and static code analysis.",
        status: "pending",
        expectedDate: "2026-10-28T18:00:00.000Z",
      },
      {
        step: 5,
        title: "Client Staging Preview & User Acceptance",
        description: "Deployment to isolated staging environment for interactive client testing and sign-off.",
        status: "pending",
        expectedDate: "2026-11-05T18:00:00.000Z",
      },
      {
        step: 6,
        title: "Production Deployment & Cloud Handover",
        description: "Production launch on AWS/GCP, SSL provisioning, CI/CD pipeline, and full source code handover.",
        status: "pending",
        expectedDate: "2026-11-15T18:00:00.000Z",
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 80).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
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
    currentStage: 4,
    currentStageName: "Automated Testing, Security Audit & Pen-Testing",
    progressPercent: 75,
    estimatedCompletion: "October 12, 2026",
    leadEngineer: "Alex R. (Senior DevOps & Cloud)",
    githubRepo: "https://github.com/kinetic-technology/supplyflow-dispatch",
    liveDemoUrl: "https://staging-dispatch.kinetictechnology.com",
    milestones: [
      {
        step: 1,
        title: "Project Inception & Requirements Confirmed",
        description: "Technical scope, tech stack choice, architecture design, and milestone agreement finalized.",
        status: "completed",
        completedAt: new Date(Date.now() - 3600000 * 200).toISOString(),
      },
      {
        step: 2,
        title: "Architecture & High-Fidelity UI/UX Prototyping",
        description: "System design specs, database schema, API contracts, and responsive UI components created.",
        status: "completed",
        completedAt: new Date(Date.now() - 3600000 * 150).toISOString(),
      },
      {
        step: 3,
        title: "Core Engineering & Frontend/Backend Sprints",
        description: "Active sprint development: React frontend, Node/Express backend, database, and business logic.",
        status: "completed",
        completedAt: new Date(Date.now() - 3600000 * 30).toISOString(),
        note: "All telemetry ingestion sockets and GPS websocket handlers tested.",
      },
      {
        step: 4,
        title: "Automated Testing, Security Audit & Pen-Testing",
        description: "End-to-end integration tests, load tests, OWASP top 10 security review, and static code analysis.",
        status: "in_progress",
        expectedDate: "2026-10-06T18:00:00.000Z",
        note: "High-volume load test: 10,000 concurrent ping simulation underway.",
      },
      {
        step: 5,
        title: "Client Staging Preview & User Acceptance",
        description: "Deployment to isolated staging environment for interactive client testing and sign-off.",
        status: "pending",
        expectedDate: "2026-10-09T18:00:00.000Z",
      },
      {
        step: 6,
        title: "Production Deployment & Cloud Handover",
        description: "Production launch on AWS/GCP, SSL provisioning, CI/CD pipeline, and full source code handover.",
        status: "pending",
        expectedDate: "2026-10-12T18:00:00.000Z",
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 220).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
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
    currentStageName: "Project Inception & Requirements Confirmed",
    progressPercent: 15,
    estimatedCompletion: new Date(Date.now() + 86400000 * 30).toLocaleDateString("en-IN", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    leadEngineer: "Alex R. (Senior Systems Architect)",
    milestones: defaultMilestones.map((m) => {
      if (m.step === 1) {
        return {
          ...m,
          status: "in_progress",
          note: "Quote received and registered. Lead architect reviewing requirements.",
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
