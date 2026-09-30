// shared/types.ts

export type UserRole = "Client" | "Admin" | "Super Admin" | "Project Manager" | "Developer";

export interface User {
  id: string;
  email: string;
  name?: string | null;
  roleId: string;
  role?: Role;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Role {
  id: string;
  name: string;
  description?: string | null;
  permissions?: Permission[];
}

export interface Permission {
  id: string;
  action: string;
  resource: string;
  roleId: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message: string;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED";
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PricingRule {
  id: string;
  category: "platform" | "feature" | "integration" | "design" | "security";
  name: string;
  price: number;
  description?: string | null;
  active: boolean;
}

export interface PricingPayload {
  platformIds?: string[];
  featureIds?: string[];
  integrationIds?: string[];
  design?: boolean;
  securityLevel?: string;
}

export interface PricingBreakdown {
  baseCost: number;
  platformCost: number;
  featureCost: number;
  integrationCost: number;
  designCost: number;
  securityCost: number;
  total: number;
}

export interface TimelinePayload {
  platformIds?: string[];
  featureIds?: string[];
  integrationIds?: string[];
  design?: boolean;
}

export interface TimelineBreakdown {
  discoveryDays: number;
  designDays: number;
  developmentDays: number;
  testingDays: number;
  totalDays: number;
  estimatedWeeks: number;
}

export interface Estimate {
  id: string;
  title: string;
  userId?: string | null;
  config: Record<string, any>;
  totalPrice: number;
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CompanyConfig {
  name: string;
  logoUrl: string;
  tagline: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  socialLinks: Record<string, string>;
  theme: {
    primary: string;
    secondary: string;
  };
  currency: string;
  defaultSettings: {
    language: string;
    timezone: string;
  };
}
