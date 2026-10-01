import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import multer from "multer";

export interface KineticApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string; // "FinTech" | "Healthcare" | "Logistics" | "E-Commerce" | "AI & Tools" | "Enterprise" | "Education"
  icon: string; // URL or static file path
  platform: string[]; // ["Android", "iOS", "Web", "Windows", "macOS"]
  version: string;
  fileUrl?: string; // Direct download path on server, e.g. /uploads/apps/finscale.apk
  fileName?: string;
  fileSize?: string;
  externalDownloadUrl?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  rating: number;
  downloadsCount: number;
  featured: boolean;
  tags: string[];
  techStack: string[];
  screenshots?: string[];
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
}

// Ensure upload directory exists
const uploadsDir = path.join(__dirname, "../../uploads");
const appsUploadDir = path.join(uploadsDir, "apps");
const iconsUploadDir = path.join(uploadsDir, "icons");

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(appsUploadDir)) fs.mkdirSync(appsUploadDir, { recursive: true });
if (!fs.existsSync(iconsUploadDir)) fs.mkdirSync(iconsUploadDir, { recursive: true });

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    if (file.fieldname === "iconFile") {
      cb(null, iconsUploadDir);
    } else {
      cb(null, appsUploadDir);
    }
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitizedBase = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
    cb(null, `${sanitizedBase}-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 150 * 1024 * 1024, // 150MB max app file size
  },
});

// Initial showcase apps built by Kinetic Technology
export const inMemoryApps: KineticApp[] = [
  {
    id: "app_finscale",
    name: "FinScale Wallet & Payments",
    tagline: "Ultra-fast UPI payment gateway, QR scanning & merchant settlement app.",
    description: `FinScale is an enterprise-grade mobile wallet built with React Native and Node.js microservices.
Features include instant peer-to-peer UPI transfers, merchant dynamic QR generation, biometric authorization, multi-bank linking, and real-time transaction ledger with bank-grade encryption.`,
    category: "FinTech",
    icon: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=256&q=80",
    platform: ["Android", "iOS", "Web"],
    version: "v2.4.1",
    fileUrl: "/uploads/apps/finscale-wallet-v2.4.1.apk",
    fileName: "finscale-wallet-v2.4.1.apk",
    fileSize: "42.8 MB",
    liveDemoUrl: "https://staging-finscale.kinetictechnology.com",
    githubUrl: "https://github.com/kinetic-technology/finscale-wallet-core",
    rating: 4.9,
    downloadsCount: 1420,
    featured: true,
    tags: ["UPI", "Wallet", "Payments", "Fintech", "Security"],
    techStack: ["React Native", "TypeScript", "Node.js", "Redis", "PostgreSQL", "Razorpay"],
    screenshots: [
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&q=80",
    ],
    releaseDate: "2026-09-15",
    createdAt: "2026-09-15T10:00:00.000Z",
    updatedAt: "2026-09-28T14:00:00.000Z",
  },
  {
    id: "app_medcore",
    name: "MedCore Telehealth Suite",
    tagline: "HIPAA-compliant doctor consultations, video calls & digital prescription EHR.",
    description: `Comprehensive healthcare platform enabling patients to consult verified physicians via encrypted WebRTC HD video.
Includes AI-assisted appointment booking, integrated pharmacy prescription dispatch, electronic health record (EHR) sync, and multi-speciality clinical notes.`,
    category: "Healthcare",
    icon: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=256&q=80",
    platform: ["Android", "iOS", "Web"],
    version: "v1.8.0",
    fileUrl: "/uploads/apps/medcore-telehealth-v1.8.apk",
    fileName: "medcore-telehealth-v1.8.apk",
    fileSize: "36.4 MB",
    liveDemoUrl: "https://staging-medcore.kinetictechnology.com",
    githubUrl: "https://github.com/kinetic-technology/medcore-telehealth",
    rating: 4.8,
    downloadsCount: 890,
    featured: true,
    tags: ["HIPAA", "Telehealth", "Video Call", "EHR", "Doctor"],
    techStack: ["WebRTC", "React", "Node.js", "Socket.io", "PostgreSQL", "Docker"],
    screenshots: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    ],
    releaseDate: "2026-09-20",
    createdAt: "2026-09-20T12:00:00.000Z",
    updatedAt: "2026-09-29T16:00:00.000Z",
  },
  {
    id: "app_supplyflow",
    name: "SupplyFlow Fleet Dispatch",
    tagline: "Real-time GPS vehicle tracking, automated dispatch & fuel route optimization.",
    description: `Enterprise logistics and fleet telemetry management system.
Tracks delivery vehicles in sub-second intervals, plans optimal multi-stop routes using geospatial routing algorithms, manages driver proof-of-delivery signatures, and monitors vehicle maintenance metrics.`,
    category: "Logistics",
    icon: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=256&q=80",
    platform: ["Android", "Web", "Windows"],
    version: "v3.1.2",
    fileUrl: "/uploads/apps/supplyflow-dispatch-v3.1.apk",
    fileName: "supplyflow-dispatch-v3.1.apk",
    fileSize: "51.2 MB",
    liveDemoUrl: "https://staging-dispatch.kinetictechnology.com",
    githubUrl: "https://github.com/kinetic-technology/supplyflow-dispatch",
    rating: 4.9,
    downloadsCount: 2150,
    featured: true,
    tags: ["Logistics", "GPS", "Fleet", "Dispatch", "Route Planning"],
    techStack: ["Flutter", "Leaflet/Mapbox", "Go/Express", "PostGIS", "WebSockets"],
    releaseDate: "2026-09-10",
    createdAt: "2026-09-10T09:00:00.000Z",
    updatedAt: "2026-09-25T11:00:00.000Z",
  },
  {
    id: "app_omnistore",
    name: "OmniCart Hyperlocal Commerce",
    tagline: "High-speed 10-minute grocery and retail delivery marketplace.",
    description: `Complete full-stack e-commerce marketplace featuring buyer app, merchant inventory dashboard, and delivery rider companion app.
Features real-time inventory locking, UPI & card payments, automated rider dispatch within 5km radius, and live order tracking.`,
    category: "E-Commerce",
    icon: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=256&q=80",
    platform: ["Android", "iOS", "Web"],
    version: "v2.0.4",
    fileUrl: "/uploads/apps/omnicart-market-v2.apk",
    fileName: "omnicart-market-v2.apk",
    fileSize: "45.0 MB",
    liveDemoUrl: "https://omnicart-demo.kinetictechnology.com",
    rating: 4.7,
    downloadsCount: 940,
    featured: false,
    tags: ["E-Commerce", "Hyperlocal", "Cart", "Razorpay", "Retail"],
    techStack: ["Next.js", "React Native", "Tailwind CSS", "PostgreSQL", "Prisma"],
    releaseDate: "2026-09-12",
    createdAt: "2026-09-12T14:00:00.000Z",
    updatedAt: "2026-09-27T10:00:00.000Z",
  },
  {
    id: "app_kineticsentinel",
    name: "Kinetic Sentinel DevSecOps",
    tagline: "Automated vulnerability scanner, API security audit & penetration testing CLI.",
    description: `A developer security companion created by Kinetic Technology's core engineering team.
Scans codebases for leaked credentials, SQL injection vectors, outdated dependencies with known CVEs, misconfigured CORS/TLS headers, and generates interactive audit reports.`,
    category: "AI & Tools",
    icon: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=256&q=80",
    platform: ["Windows", "macOS", "Web"],
    version: "v1.2.0",
    fileUrl: "/uploads/apps/kinetic-sentinel-v1.2.zip",
    fileName: "kinetic-sentinel-v1.2.zip",
    fileSize: "28.3 MB",
    liveDemoUrl: "https://sentinel.kinetictechnology.com",
    githubUrl: "https://github.com/kinetic-technology/kinetic-sentinel",
    rating: 5.0,
    downloadsCount: 3100,
    featured: true,
    tags: ["DevSecOps", "Security", "Scanner", "CLI", "Developer Tools"],
    techStack: ["Node.js", "TypeScript", "Rust", "Docker", "OWASP Rules"],
    releaseDate: "2026-09-01",
    createdAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-30T10:00:00.000Z",
  },
];

// Helper to format file size
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

// GET /api/store
export const getApps = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, platform, featured } = req.query;

    let filtered = [...inMemoryApps];

    if (category && category !== "All") {
      filtered = filtered.filter(
        (app) => app.category.toLowerCase() === String(category).toLowerCase()
      );
    }

    if (platform && platform !== "All") {
      filtered = filtered.filter((app) =>
        app.platform.some((p) => p.toLowerCase() === String(platform).toLowerCase())
      );
    }

    if (featured === "true") {
      filtered = filtered.filter((app) => app.featured);
    }

    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(q) ||
          app.tagline.toLowerCase().includes(q) ||
          app.description.toLowerCase().includes(q) ||
          app.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    res.json({ apps: filtered, total: filtered.length });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch apps" });
  }
};

// GET /api/store/:id
export const getAppById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const app = inMemoryApps.find((a) => a.id === id);

    if (!app) {
      res.status(404).json({ message: "App not found in Kinetic Store" });
      return;
    }

    res.json({ app });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch app details" });
  }
};

// POST /api/store (Admin creates/uploads new app)
export const createApp = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const {
      name,
      tagline,
      description,
      category,
      platform,
      version,
      iconUrl,
      externalDownloadUrl,
      liveDemoUrl,
      githubUrl,
      featured,
      tags,
      techStack,
    } = req.body;

    if (!name || !description) {
      res.status(400).json({ message: "App Name and Description are required" });
      return;
    }

    // Determine icon
    let finalIcon = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=256&q=80";
    if (files && files["iconFile"] && files["iconFile"][0]) {
      finalIcon = `http://localhost:4000/uploads/icons/${files["iconFile"][0].filename}`;
    } else if (iconUrl && iconUrl.trim()) {
      finalIcon = iconUrl.trim();
    }

    // Determine app file upload
    let fileUrl: string | undefined = undefined;
    let fileName: string | undefined = undefined;
    let fileSize: string | undefined = undefined;

    if (files && files["appFile"] && files["appFile"][0]) {
      const appFile = files["appFile"][0];
      fileUrl = `http://localhost:4000/uploads/apps/${appFile.filename}`;
      fileName = appFile.originalname;
      fileSize = formatBytes(appFile.size);
    } else if (externalDownloadUrl && externalDownloadUrl.trim()) {
      fileUrl = externalDownloadUrl.trim();
      fileName = name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-build";
      fileSize = "Cloud Package";
    }

    const parsedPlatforms = platform
      ? Array.isArray(platform)
        ? platform
        : String(platform)
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean)
      : ["Web", "Android"];

    const parsedTags = tags
      ? Array.isArray(tags)
        ? tags
        : String(tags)
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
      : [category || "Software"];

    const parsedTechStack = techStack
      ? Array.isArray(techStack)
        ? techStack
        : String(techStack)
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
      : ["React", "TypeScript", "Node.js"];

    const newApp: KineticApp = {
      id: `app_${Date.now()}`,
      name: name.trim(),
      tagline: tagline ? tagline.trim() : `${name.trim()} by Kinetic Technology`,
      description: description.trim(),
      category: category || "Enterprise",
      icon: finalIcon,
      platform: parsedPlatforms.length > 0 ? parsedPlatforms : ["Android", "Web"],
      version: version ? version.trim() : "v1.0.0",
      fileUrl,
      fileName,
      fileSize,
      externalDownloadUrl: externalDownloadUrl ? externalDownloadUrl.trim() : undefined,
      liveDemoUrl: liveDemoUrl ? liveDemoUrl.trim() : undefined,
      githubUrl: githubUrl ? githubUrl.trim() : undefined,
      rating: 5.0,
      downloadsCount: 0,
      featured: featured === "true" || featured === true,
      tags: parsedTags,
      techStack: parsedTechStack,
      releaseDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    inMemoryApps.unshift(newApp);

    res.status(201).json({
      message: "Application uploaded and published to Kinetic Store successfully",
      app: newApp,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to create application" });
  }
};

// PUT /api/store/:id (Admin updates app)
export const updateApp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const appIndex = inMemoryApps.findIndex((a) => a.id === id);

    if (appIndex === -1) {
      res.status(404).json({ message: "App not found in Kinetic Store" });
      return;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const {
      name,
      tagline,
      description,
      category,
      platform,
      version,
      iconUrl,
      externalDownloadUrl,
      liveDemoUrl,
      githubUrl,
      featured,
      tags,
      techStack,
    } = req.body;

    const currentApp = inMemoryApps[appIndex];

    // Handle new icon if uploaded
    let finalIcon = currentApp.icon;
    if (files && files["iconFile"] && files["iconFile"][0]) {
      finalIcon = `http://localhost:4000/uploads/icons/${files["iconFile"][0].filename}`;
    } else if (iconUrl && iconUrl.trim()) {
      finalIcon = iconUrl.trim();
    }

    // Handle new app file if uploaded
    let fileUrl = currentApp.fileUrl;
    let fileName = currentApp.fileName;
    let fileSize = currentApp.fileSize;

    if (files && files["appFile"] && files["appFile"][0]) {
      const appFile = files["appFile"][0];
      fileUrl = `http://localhost:4000/uploads/apps/${appFile.filename}`;
      fileName = appFile.originalname;
      fileSize = formatBytes(appFile.size);
    } else if (externalDownloadUrl !== undefined) {
      fileUrl = externalDownloadUrl.trim() || fileUrl;
    }

    const updatedApp: KineticApp = {
      ...currentApp,
      name: name !== undefined ? name.trim() : currentApp.name,
      tagline: tagline !== undefined ? tagline.trim() : currentApp.tagline,
      description: description !== undefined ? description.trim() : currentApp.description,
      category: category !== undefined ? category : currentApp.category,
      icon: finalIcon,
      platform: platform
        ? Array.isArray(platform)
          ? platform
          : String(platform).split(",").map((p) => p.trim())
        : currentApp.platform,
      version: version !== undefined ? version.trim() : currentApp.version,
      fileUrl,
      fileName,
      fileSize,
      externalDownloadUrl:
        externalDownloadUrl !== undefined ? externalDownloadUrl.trim() : currentApp.externalDownloadUrl,
      liveDemoUrl: liveDemoUrl !== undefined ? liveDemoUrl.trim() : currentApp.liveDemoUrl,
      githubUrl: githubUrl !== undefined ? githubUrl.trim() : currentApp.githubUrl,
      featured: featured !== undefined ? featured === "true" || featured === true : currentApp.featured,
      tags: tags
        ? Array.isArray(tags)
          ? tags
          : String(tags).split(",").map((t) => t.trim())
        : currentApp.tags,
      techStack: techStack
        ? Array.isArray(techStack)
          ? techStack
          : String(techStack).split(",").map((t) => t.trim())
        : currentApp.techStack,
      updatedAt: new Date().toISOString(),
    };

    inMemoryApps[appIndex] = updatedApp;

    res.json({
      message: "Application updated successfully",
      app: updatedApp,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to update application" });
  }
};

// DELETE /api/store/:id (Admin deletes app)
export const deleteApp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const index = inMemoryApps.findIndex((a) => a.id === id);

    if (index === -1) {
      res.status(404).json({ message: "App not found in Kinetic Store" });
      return;
    }

    const deleted = inMemoryApps.splice(index, 1)[0];
    res.json({ message: `App '${deleted.name}' deleted successfully` });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to delete app" });
  }
};

// POST /api/store/:id/download (Tracks download and returns file link)
export const downloadApp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const app = inMemoryApps.find((a) => a.id === id);

    if (!app) {
      res.status(404).json({ message: "App not found" });
      return;
    }

    app.downloadsCount += 1;

    res.json({
      message: "Download initiated",
      downloadUrl: app.fileUrl || app.externalDownloadUrl || app.liveDemoUrl,
      fileName: app.fileName || `${app.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-package`,
      downloadsCount: app.downloadsCount,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to initiate download" });
  }
};
