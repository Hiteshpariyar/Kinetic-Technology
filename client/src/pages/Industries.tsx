import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  ShoppingCart,
  HeartPulse,
  GraduationCap,
  Banknote,
  Truck,
  Utensils,
  Plane,
  Dumbbell,
  Film,
  Users,
  Layers,
  Store,
  Briefcase,
  Sliders,
  ArrowRight,
} from "lucide-react";

export const Industries: React.FC = () => {
  const industries = [
    {
      icon: Banknote,
      name: "Finance & FinTech",
      desc: "PCI-compliant payment engines, investment dashboards, KYC onboarding, and ledger systems.",
    },
    {
      icon: HeartPulse,
      name: "Healthcare & MedTech",
      desc: "HIPAA-compliant telemedicine platforms, electronic health records (EHR), and patient portals.",
    },
    {
      icon: ShoppingCart,
      name: "E-Commerce & Retail",
      desc: "High-concurrency storefronts, omnichannel inventories, checkout flows, and ERP integrations.",
    },
    {
      icon: Building2,
      name: "Real Estate & PropTech",
      desc: "Interactive property listing maps, agent management portals, mortgage calculators, and virtual tours.",
    },
    {
      icon: Truck,
      name: "Logistics & Supply Chain",
      desc: "Live GPS fleet tracking, automated route dispatching, warehouse inventory, and carrier integrations.",
    },
    {
      icon: GraduationCap,
      name: "Education & EdTech",
      desc: "Learning Management Systems (LMS), live classroom streaming, assignment grading, and student analytics.",
    },
    {
      icon: Layers,
      name: "SaaS & Cloud Platforms",
      desc: "Multi-tenant B2B platforms, subscription management, telemetry, and automated customer onboarding.",
    },
    {
      icon: Utensils,
      name: "Food & Restaurant",
      desc: "Point-of-sale integrations, online ordering systems, kitchen display units, and delivery trackers.",
    },
    {
      icon: Plane,
      name: "Travel & Hospitality",
      desc: "Real-time reservation engines, hotel property management, itinerary builders, and booking engines.",
    },
    {
      icon: Dumbbell,
      name: "Fitness & Wellness",
      desc: "Workout tracking apps, biometric sync with Apple Health & Google Fit, membership billing.",
    },
    {
      icon: Film,
      name: "Entertainment & Media",
      desc: "Video streaming platforms, digital rights management (DRM), social feeds, and ticketing systems.",
    },
    {
      icon: Users,
      name: "Social & Community",
      desc: "Real-time messaging, community feeds, moderation tools, notifications, and engagement analytics.",
    },
    {
      icon: Store,
      name: "Retail & Omnichannel",
      desc: "POS synchronization, customer loyalty programs, multi-store inventory, and barcode scanning.",
    },
    {
      icon: Briefcase,
      name: "Professional Services",
      desc: "Legal & accounting portals, client billing systems, document signature workflows, and task tracking.",
    },
    {
      icon: Sliders,
      name: "Custom Industry Domain",
      desc: "Unique proprietary workflows, custom hardware interop, and specialized industry software requirements.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Industry Solutions
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          We combine domain-specific regulatory expertise with cutting-edge engineering to build tailored software for leading global industries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((ind) => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.name}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                  {ind.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ind.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700"
                >
                  <span>Build For {ind.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
