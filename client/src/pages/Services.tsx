import React from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Smartphone,
  Layers,
  Database,
  Cpu,
  Shield,
  Palette,
  Workflow,
  Terminal,
  Monitor,
  Cloud,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";

export const Services: React.FC = () => {
  const allServices = [
    {
      icon: Globe,
      title: "Website Development",
      description: "High-performance marketing, corporate, and editorial websites engineered for Core Web Vitals, SEO supremacy, and conversion optimization.",
      technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
      startingPrice: "₹25,000",
      timeline: "2 - 4 Weeks",
    },
    {
      icon: Layers,
      title: "Web Application Development",
      description: "Complex, dynamic web platforms featuring interactive state management, multi-role user dashboards, and resilient asynchronous workflows.",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
      startingPrice: "₹45,000",
      timeline: "4 - 8 Weeks",
    },
    {
      icon: Smartphone,
      title: "Android Development",
      description: "High-performance native Android apps built with modern Kotlin, Jetpack Compose, and background synchronization.",
      technologies: ["Kotlin", "Jetpack Compose", "Coroutines", "Room", "Firebase"],
      startingPrice: "₹45,000",
      timeline: "6 - 9 Weeks",
    },
    {
      icon: Smartphone,
      title: "iOS Development",
      description: "Intuitive, pixel-perfect native iOS software built with Swift and SwiftUI adhering strictly to Apple's Human Interface Guidelines.",
      technologies: ["Swift", "SwiftUI", "CoreData", "Combine", "TestFlight"],
      startingPrice: "₹50,000",
      timeline: "6 - 9 Weeks",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Mobile Apps",
      description: "Single codebase, dual native performance. We engineer Flutter and React Native apps that look and feel 100% native across platforms.",
      technologies: ["Flutter", "Dart", "React Native", "Expo", "Redux"],
      startingPrice: "₹55,000",
      timeline: "6 - 10 Weeks",
    },
    {
      icon: Monitor,
      title: "macOS Applications",
      description: "Native macOS desktop software leveraging AppKit and SwiftUI for demanding workflows, menu bar utilities, and creative tools.",
      technologies: ["Swift", "SwiftUI", "AppKit", "Metal", "Electron"],
      startingPrice: "₹50,000",
      timeline: "6 - 10 Weeks",
    },
    {
      icon: Monitor,
      title: "Windows Applications",
      description: "Robust desktop applications built with .NET, WPF, or Electron engineered for enterprise workstations and offline environments.",
      technologies: [".NET", "C#", "WPF", "Electron", "SQLite"],
      startingPrice: "₹50,000",
      timeline: "6 - 10 Weeks",
    },
    {
      icon: Cloud,
      title: "SaaS Product Development",
      description: "End-to-end multi-tenant SaaS architecture including automated tenant isolation, metered billing, self-service onboarding, and Stripe integration.",
      technologies: ["Next.js", "Node.js", "Docker", "Stripe Billing", "PostgreSQL"],
      startingPrice: "₹95,000",
      timeline: "8 - 14 Weeks",
    },
    {
      icon: Database,
      title: "Backend & API Systems",
      description: "High-throughput REST and GraphQL microservice backends with strict API contracts, caching layers, and database migrations.",
      technologies: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
      startingPrice: "₹35,000",
      timeline: "3 - 6 Weeks",
    },
    {
      icon: Shield,
      title: "Admin Dashboard Development",
      description: "Comprehensive operational dashboards, customer support portals, role-based access management, and live audit logging.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "REST", "Prisma"],
      startingPrice: "₹40,000",
      timeline: "4 - 7 Weeks",
    },
    {
      icon: Cpu,
      title: "AI & LLM Integration",
      description: "Integrate generative AI capabilities, vector retrieval (RAG), custom OpenAI/Gemini assistants, and automated data extraction.",
      technologies: ["Python", "OpenAI API", "Gemini API", "Pinecone", "LangChain"],
      startingPrice: "₹40,000",
      timeline: "3 - 6 Weeks",
    },
    {
      icon: Workflow,
      title: "Automation & Integration",
      description: "Custom automated data synchronizations, webhook listeners, ERP/CRM bi-directional pipes, and scheduled cron engines.",
      technologies: ["Node.js", "Python", "Webhooks", "Zapier APIs", "BullMQ"],
      startingPrice: "₹30,000",
      timeline: "2 - 5 Weeks",
    },
    {
      icon: Palette,
      title: "UI/UX Design Systems",
      description: "Design sprints, interactive Figma prototypes, component libraries, typography scale, and comprehensive design tokens.",
      technologies: ["Figma", "Design Systems", "Prototyping", "Tokens", "User Testing"],
      startingPrice: "₹20,000",
      timeline: "2 - 4 Weeks",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineering Services
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          From full-stack web and mobile apps to distributed cloud backends, we build custom software that drives measurable business ROI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allServices.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.title}
              className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-700 transition-all group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {svc.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {svc.description}
                </p>

                <div className="mb-6">
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                    Core Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">
                    Starting From
                  </span>
                  <div className="text-base font-bold text-slate-900 dark:text-white">
                    {svc.startingPrice}
                  </div>
                </div>

                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <span>Configure</span>
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
