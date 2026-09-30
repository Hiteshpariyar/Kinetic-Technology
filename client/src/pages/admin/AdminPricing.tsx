import React, { useState } from "react";
import {
  IndianRupee,
  Plus,
  Save,
  CheckCircle2,
  Sliders,
  Sparkles,
  Shield,
  Layers,
  Globe,
  Smartphone,
  Database,
} from "lucide-react";

interface RuleItem {
  id: string;
  category: "platform" | "feature" | "design" | "security";
  name: string;
  price: number;
  description: string;
  active: boolean;
}

export const AdminPricing: React.FC = () => {
  const [rules, setRules] = useState<RuleItem[]>([
    {
      id: "p_web",
      category: "platform",
      name: "Web Application",
      price: 45000,
      description: "Modern single-page responsive application with React & TypeScript",
      active: true,
    },
    {
      id: "p_ios",
      category: "platform",
      name: "iOS Application",
      price: 55000,
      description: "Native Apple Swift & SwiftUI application with TestFlight pipeline",
      active: true,
    },
    {
      id: "p_android",
      category: "platform",
      name: "Android Application",
      price: 50000,
      description: "Native Kotlin / Jetpack Compose Android mobile app",
      active: true,
    },
    {
      id: "p_saas",
      category: "platform",
      name: "SaaS Multi-Tenant Platform",
      price: 75000,
      description: "Cloud software subscription engine with billing and tenant isolation",
      active: true,
    },
    {
      id: "p_api",
      category: "platform",
      name: "Backend REST/GraphQL API",
      price: 40000,
      description: "High-concurrency microservice database architecture with PostgreSQL",
      active: true,
    },
    {
      id: "f_auth",
      category: "feature",
      name: "User Authentication & RBAC",
      price: 8000,
      description: "Password hashing, JWT sessions, and fine-grained roles",
      active: true,
    },
    {
      id: "f_pay",
      category: "feature",
      name: "Payment Gateway & Invoicing",
      price: 12000,
      description: "Razorpay and Stripe billing, webhooks, and receipts",
      active: true,
    },
    {
      id: "f_chat",
      category: "feature",
      name: "Real-Time Chat & WebSockets",
      price: 15000,
      description: "Live bidirectional messaging channels and event dispatching",
      active: true,
    },
    {
      id: "f_ai",
      category: "feature",
      name: "AI & LLM Integration",
      price: 20000,
      description: "OpenAI/Gemini agent pipeline and vector retrieval",
      active: true,
    },
    {
      id: "d_kinetic",
      category: "design",
      name: "Kinetic Design System",
      price: 0,
      description: "Clean, responsive baseline design system (Free standard tier)",
      active: true,
    },
    {
      id: "d_custom",
      category: "design",
      name: "Bespoke Custom UI/UX",
      price: 15000,
      description: "Full Figma design sprints, interactive prototypes, user testing",
      active: true,
    },
    {
      id: "s_kinetic",
      category: "security",
      name: "Kinetic Basic Security",
      price: 0,
      description: "TLS, CORS, rate limiting, and parameter sanitization (Free standard tier)",
      active: true,
    },
    {
      id: "s_enterprise",
      category: "security",
      name: "Enterprise Compliance (SOC2 / HIPAA)",
      price: 25000,
      description: "Data encryption at rest, complete audit trail, and pen-testing",
      active: true,
    },
  ]);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePriceChange = (id: string, newPrice: number) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, price: newPrice } : r))
    );
  };

  const handleToggleActive = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleSaveMatrix = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Dynamic Pricing Matrix Engine
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure live parameters for the public estimator wizard and customer proposals.
          </p>
        </div>

        <button
          onClick={handleSaveMatrix}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes to Production</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Pricing rules matrix saved and activated live across all calculators!</span>
        </div>
      )}

      {/* Rules categories */}
      {(["platform", "feature", "design", "security"] as const).map((cat) => {
        const catRules = rules.filter((r) => r.category === cat);
        const titles = {
          platform: "1. Target Platforms Base Pricing",
          feature: "2. Functional Modules & Add-Ons",
          design: "3. UI/UX Design System Tiers",
          security: "4. Security & Compliance Standards",
        };

        return (
          <div
            key={cat}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {titles[cat]}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Adjust cost rates or toggle active visibility in the customer wizard.
            </p>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {catRules.map((rule) => (
                <div
                  key={rule.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {rule.name}
                      </span>
                      {rule.price === 0 && (
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                          Free Standard
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {rule.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 font-semibold">₹</span>
                      <input
                        type="number"
                        min={0}
                        step={100}
                        value={rule.price}
                        onChange={(e) =>
                          handlePriceChange(rule.id, Number(e.target.value))
                        }
                        className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                      />
                    </div>

                    <button
                      onClick={() => handleToggleActive(rule.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        rule.active
                          ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      {rule.active ? "Active" : "Disabled"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
