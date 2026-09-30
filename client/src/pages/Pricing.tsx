import React from "react";
import { Link } from "react-router-dom";
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export const Pricing: React.FC = () => {
  const tiers = [
    {
      name: "MVP Starter",
      tagline: "Ideal for early-stage founders & validation prototypes",
      price: "₹35,000",
      period: "per project",
      features: [
        "1 Target Platform (Web or Mobile)",
        "Core User Authentication & Profiles",
        "Responsive Modern UI (Tailwind CSS)",
        "PostgreSQL / Database Architecture",
        "Production Cloud Deployment (Vercel/AWS)",
        "30 Days Bugfix Warranty",
        "Git Source Code Ownership",
      ],
      popular: false,
    },
    {
      name: "Scale & Growth",
      tagline: "For scaling businesses launching full commercial platforms",
      price: "₹75,000",
      period: "per project",
      features: [
        "Web App + Mobile (iOS & Android)",
        "Advanced Role-Based Access Control",
        "Stripe Billing & Subscription Engine",
        "Third-Party API & Webhook Pipelines",
        "Analytics Dashboard & Metrics Export",
        "Automated CI/CD Pipeline Setup",
        "60 Days Extended Warranty & SLA Support",
      ],
      popular: true,
    },
    {
      name: "Enterprise Architecture",
      tagline: "Dedicated engineering pods for mission-critical systems",
      price: "Custom",
      period: "tailored scope",
      features: [
        "Distributed Microservices & Event Streams",
        "HIPAA / SOC2 / GDPR Compliance Audits",
        "Bespoke High-Fidelity UI/UX & Design System",
        "High-Concurrency Performance Profiling",
        "Dedicated Engineering Pod & PM",
        "Quarterly Pen-Testing & Security Hardening",
        "24/7 Production SLA & Infrastructure Monitoring",
      ],
      popular: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Transparent, Value-Driven Pricing
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          No hidden fees or bloated retainers. All pricing is milestone-based with 100% intellectual property ownership upon completion.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
              t.popular
                ? "bg-white dark:bg-slate-900 border-2 border-blue-600 shadow-xl relative"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
            }`}
          >
            {t.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Most Popular
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {t.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 min-h-[32px]">
                {t.tagline}
              </p>

              <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {t.price}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                  /{t.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/start-project"
              className={`w-full py-3 rounded-xl text-center text-sm font-semibold transition-colors ${
                t.popular
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30"
                  : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200"
              }`}
            >
              Configure This Tier
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            Need an exact custom scope breakdown?
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Our interactive builder calculates prices in real time based on your selected features, platforms, and security constraints.
          </p>
        </div>
        <Link
          to="/start-project"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md flex-shrink-0"
        >
          <Zap className="w-4 h-4" />
          <span>Launch Configurator</span>
        </Link>
      </div>
    </div>
  );
};
