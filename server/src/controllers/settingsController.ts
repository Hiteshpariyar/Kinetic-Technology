import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import multer from "multer";

export interface CompanySettings {
  name: string;
  logoUrl: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  trustBadge: string;
  currency: string;
  currencySymbol: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const defaultSettings: CompanySettings = {
  name: "Kinetic Technology",
  logoUrl: "", // empty means use default </> icon badge
  tagline: "Innovative Software Solutions",
  description:
    "We engineer mission-critical web applications, mobile platforms, enterprise backends, and custom software systems designed to scale seamlessly.",
  email: "info@kinetictech.com",
  phone: "+91 81530 13913",
  address: {
    street: "123 Innovation Blvd",
    city: "Tech City",
    state: "CA",
    zip: "360001",
    country: "INDIA",
  },
  trustBadge: "Enterprise-Grade Security & 99.9% Uptime Guarantee",
  currency: "INR",
  currencySymbol: "₹",
  socialLinks: {
    twitter: "https://twitter.com/kinetictech",
    linkedin: "https://linkedin.com/company/kinetictech",
    github: "https://github.com/kinetictech",
  },
};

// Persistence file
const dataDir = path.join(__dirname, "../../data");
const settingsFilePath = path.join(dataDir, "settings.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Load persisted settings or fallback
let currentSettings: CompanySettings = { ...defaultSettings };
if (fs.existsSync(settingsFilePath)) {
  try {
    const raw = fs.readFileSync(settingsFilePath, "utf-8");
    currentSettings = { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    currentSettings = { ...defaultSettings };
  }
} else {
  try {
    fs.writeFileSync(settingsFilePath, JSON.stringify(defaultSettings, null, 2));
  } catch {
    // fallback
  }
}

// Upload configuration for Logo
const iconsUploadDir = path.join(__dirname, "../../uploads/icons");
if (!fs.existsSync(iconsUploadDir)) {
  fs.mkdirSync(iconsUploadDir, { recursive: true });
}

const logoStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, iconsUploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitizedBase = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");
    cb(null, `company-logo-${Date.now()}${ext}`);
  },
});

export const logoUpload = multer({
  storage: logoStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// GET /api/settings
export const getSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json({ settings: currentSettings });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch platform settings" });
  }
};

// PUT /api/settings
export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      logoUrl,
      tagline,
      description,
      email,
      phone,
      city,
      state,
      country,
      street,
      zip,
      trustBadge,
      currency,
      currencySymbol,
    } = req.body;

    let finalLogoUrl = currentSettings.logoUrl;

    // If logo file was uploaded
    if (req.file) {
      finalLogoUrl = `http://localhost:4000/uploads/icons/${req.file.filename}`;
    } else if (logoUrl !== undefined) {
      finalLogoUrl = logoUrl.trim();
    }

    currentSettings = {
      ...currentSettings,
      name: name !== undefined ? name.trim() : currentSettings.name,
      logoUrl: finalLogoUrl,
      tagline: tagline !== undefined ? tagline.trim() : currentSettings.tagline,
      description: description !== undefined ? description.trim() : currentSettings.description,
      email: email !== undefined ? email.trim() : currentSettings.email,
      phone: phone !== undefined ? phone.trim() : currentSettings.phone,
      address: {
        street: street !== undefined ? street.trim() : currentSettings.address.street,
        city: city !== undefined ? city.trim() : currentSettings.address.city,
        state: state !== undefined ? state.trim() : currentSettings.address.state,
        zip: zip !== undefined ? zip.trim() : currentSettings.address.zip,
        country: country !== undefined ? country.trim() : currentSettings.address.country,
      },
      trustBadge: trustBadge !== undefined ? trustBadge.trim() : currentSettings.trustBadge,
      currency: currency !== undefined ? currency.trim() : currentSettings.currency,
      currencySymbol: currencySymbol !== undefined ? currencySymbol.trim() : currentSettings.currencySymbol,
    };

    // Save to disk for durability
    try {
      fs.writeFileSync(settingsFilePath, JSON.stringify(currentSettings, null, 2));
    } catch {
      // fallback
    }

    res.json({
      message: "Platform settings updated successfully",
      settings: currentSettings,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to update platform settings" });
  }
};
