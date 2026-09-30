import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ClipboardList,
  Code2,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: ClipboardList,
      title: "Discovery & Architecture Alignment",
      subtitle: "Week 1",
      desc: "We dive deep into your business objectives, target audience personas, compliance constraints, and system integrations. We translate your concept into concrete technical specs and high-fidelity wireframes.",
      deliverables: ["Product Specification Document", "System Architecture Blueprint", "Figma Interactive Wireframes"],
    },
    {
      step: "02",
      icon: Code2,
      title: "Agile Sprint Development",
      subtitle: "Weeks 2 - 8+",
      desc: "We build in rapid two-week agile sprints. Every sprint produces testable software deployed to your staging environment, backed by comprehensive unit tests and automated CI/CD pipelines.",
      deliverables: ["Bi-weekly staging deployments", "Live progress tracker in Client Portal", "Pull Request code reviews"],
    },
    {
      step: "03",
      icon: ShieldCheck,
      title: "Quality Assurance & Security Audits",
      subtitle: "Pre-Launch Sprint",
      desc: "Our QA engineers execute end-to-end regression suites, cross-browser/device testing, performance profiling, and automated vulnerability vulnerability scans (OWASP Top 10).",
      deliverables: ["Security Audit Report", "Load & stress test benchmarks", "UAT (User Acceptance Testing) sign-off"],
    },
    {
      step: "04",
      icon: Rocket,
      title: "Production Deployment & Handover",
      subtitle: "Launch Week",
      desc: "Zero-downtime production deployment to your cloud environment (AWS, GCP, or Azure). Complete Git repository handover, admin training, and 30 days of included post-launch warranty support.",
      deliverables: ["Production Cloud Infrastructure", "Full Git source code & docs", "30-Day post-launch warranty"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How It Works
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Our engineering delivery model is transparent, disciplined, and milestone-driven.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-10">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.step}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex-shrink-0 flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20">
                {st.step}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {st.title}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                    {st.subtitle}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {st.desc}
                </p>

                <div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                    Key Deliverables
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {st.deliverables.map((d) => (
                      <span
                        key={d}
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Link
          to="/start-project"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-colors"
        >
          <span>Scope Your Milestone Roadmap Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
