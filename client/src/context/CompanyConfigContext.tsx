import React, { createContext, useContext, useState, useEffect } from "react";
import { companyConfig as initialStaticConfig } from "../config/companyConfig";

export interface CompanyConfigState {
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

interface CompanyConfigContextType {
  config: CompanyConfigState;
  loading: boolean;
  updateConfig: (formData: FormData | Partial<CompanyConfigState>) => Promise<boolean>;
  refreshConfig: () => Promise<void>;
}

const STORAGE_KEY = "kt_company_config";

const defaultConfig: CompanyConfigState = {
  name: initialStaticConfig.name || "Kinetic Technology",
  logoUrl: "",
  tagline: initialStaticConfig.tagline || "Innovative Software Solutions",
  description:
    "We engineer mission-critical web applications, mobile platforms, enterprise backends, and custom software systems designed to scale seamlessly.",
  email: initialStaticConfig.email || "info@kinetictech.com",
  phone: initialStaticConfig.phone || "+91 81530 13913",
  address: {
    street: initialStaticConfig.address?.street || "123 Innovation Blvd",
    city: initialStaticConfig.address?.city || "Tech City",
    state: initialStaticConfig.address?.state || "CA",
    zip: initialStaticConfig.address?.zip || "360001",
    country: initialStaticConfig.address?.country || "INDIA",
  },
  trustBadge: "Enterprise-Grade Security & 99.9% Uptime Guarantee",
  currency: "INR",
  currencySymbol: "₹",
  socialLinks: initialStaticConfig.socialLinks,
};

const CompanyConfigContext = createContext<CompanyConfigContextType>({
  config: defaultConfig,
  loading: false,
  updateConfig: async () => false,
  refreshConfig: async () => {},
});

export const CompanyConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<CompanyConfigState>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return { ...defaultConfig, ...JSON.parse(cached) };
      }
    } catch {
      // fallback
    }
    return defaultConfig;
  });

  const [loading, setLoading] = useState(false);

  const syncStaticConfig = (newCfg: CompanyConfigState) => {
    initialStaticConfig.name = newCfg.name;
    initialStaticConfig.tagline = newCfg.tagline;
    initialStaticConfig.email = newCfg.email;
    initialStaticConfig.phone = newCfg.phone;
    initialStaticConfig.address.city = newCfg.address.city;
    initialStaticConfig.address.state = newCfg.address.state;
    initialStaticConfig.address.country = newCfg.address.country;
    initialStaticConfig.currency = newCfg.currency;
    initialStaticConfig.currencySymbol = newCfg.currencySymbol;
  };

  const refreshConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          const merged = { ...defaultConfig, ...data.settings };
          setConfig(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          syncStaticConfig(merged);
        }
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateConfig = async (
    payload: FormData | Partial<CompanyConfigState>
  ): Promise<boolean> => {
    try {
      let res: Response;
      if (payload instanceof FormData) {
        res = await fetch("http://localhost:4000/api/settings", {
          method: "PUT",
          body: payload,
        });
      } else {
        res = await fetch("http://localhost:4000/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          const updated = { ...config, ...data.settings };
          setConfig(updated);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          syncStaticConfig(updated);
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <CompanyConfigContext.Provider value={{ config, loading, updateConfig, refreshConfig }}>
      {children}
    </CompanyConfigContext.Provider>
  );
};

export const useCompanyConfig = () => useContext(CompanyConfigContext);
