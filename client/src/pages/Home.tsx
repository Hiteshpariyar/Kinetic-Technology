import React from "react";
import { Link } from "react-router-dom";
import { companyConfig } from "../config/companyConfig";
import {
  ArrowRight,
  Sparkles,
  Smartphone,
  Globe,
  Layers,
  Database,
  Cpu,
  Shield,
  Workflow,
  CheckCircle2,
  Clock,
  Code,
  Zap,
} from "lucide-react";

export const Home: React.FC = () => {
  const technologies = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "AI & Backend" },
    { name: "Flutter", category: "Mobile" },
    { name: "React Native", category: "Mobile" },
    { name: "Kotlin", category: "Android" },
    { name: "Swift", category: "iOS" },
    { name: "PostgreSQL", category: "Database" },
    { name: "AWS", category: "Cloud" },
    { name: "Firebase", category: "Cloud" },
    { name: "Electron", category: "Desktop" },
  ];

  const featuredServices = [
    {
      icon: Globe,
      title: "Web Application Development",
      description: "Full-stack scalable web applications engineered with modern reactive architectures and rock-solid APIs.",
      techs: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      timeline: "4 - 8 Weeks",
      startingPrice: "₹45,000",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform iOS and Android applications providing fluid 60fps animations and offline capability.",
      techs: ["Flutter", "React Native", "Swift", "Kotlin"],
      timeline: "6 - 10 Weeks",
      startingPrice: "₹65,000",
    },
    {
      icon: Layers,
      title: "SaaS Platform Engineering",
      description: "Multi-tenant cloud architectures with integrated billing, role access control, and high-concurrency data layers.",
      techs: ["Microservices", "Docker", "Stripe", "Prisma"],
      timeline: "8 - 14 Weeks",
      startingPrice: "₹95,000",
    },
    {
      icon: Cpu,
      title: "AI Integration & Automation",
      description: "LLM workflows, custom retrieval pipelines, intelligent automations, and predictive models built into your core product.",
      techs: ["OpenAI", "LangChain", "Python", "Vector DBs"],
      timeline: "3 - 6 Weeks",
      startingPrice: "₹40,000",
    },
    {
      icon: Database,
      title: "Backend & API Systems",
      description: "High-throughput REST and GraphQL microservices with enterprise data schemas, caching, and rate limiting.",
      techs: ["Node.js", "PostgreSQL", "Redis", "Docker"],
      timeline: "3 - 6 Weeks",
      startingPrice: "₹35,000",
    },
    {
      icon: Shield,
      title: "Admin Dashboards & Portals",
      description: "Comprehensive back-office operational portals, real-time analytics dashboards, and auditing tools.",
      techs: ["React", "Tailwind", "REST", "Prisma"],
      timeline: "4 - 7 Weeks",
      startingPrice: "₹42,000",
    },
  ];

  const workflowSteps = [
    {
      number: "01",
      title: "Tell Us About Your Idea",
      desc: "Share your product goals, technical constraints, and target users through our builder or a direct strategy session.",
    },
    {
      number: "02",
      title: "Configure Your Project",
      desc: "Select target platforms, custom features, security standards, and third-party integrations with transparent pricing.",
    },
    {
      number: "03",
      title: "Get An Estimate",
      desc: "Receive an instantaneous engineering timeline and itemized cost breakdown generated from our dynamic pricing engine.",
    },
    {
      number: "04",
      title: "Sprint-Based Execution",
      desc: "Track weekly build milestones, interactive demo deployments, and full QA testing via your live client dashboard.",
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>High-Velocity Software Development & Consulting</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Build Digital Products That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Move Your Business Forward
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We design and build websites, mobile apps, desktop applications and custom software tailored to your business with engineering precision and transparent pricing.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/start-project"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Zap className="w-5 h-5 text-blue-200" />
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-base border border-slate-300 dark:border-slate-700 transition-colors"
            >
              Explore Services
            </Link>
          </div>

          {/* Tech Stack Marquee Badges */}
          <div className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 max-w-4xl mx-auto">
            <p className="text-xs uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wider mb-5">
              Production-Grade Technologies We Build With
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-default"
                >
                  <span className="text-blue-500 mr-1.5">•</span>
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Software Capabilities
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            From consumer-facing mobile applications to mission-critical distributed systems, we handle every stage of product engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2.5">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {svc.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {svc.techs.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase">
                      Est. Timeline
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      {svc.timeline}
                    </span>
                  </div>
                  <Link
                    to="/start-project"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Configure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View All 13 Development Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-100/60 dark:bg-slate-900/40 py-20 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Clear & Transparent Delivery
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
              How We Turn Ideas Into Production Code
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              No black-box development. Track every milestone, PR, and deployment live from your client portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step) => (
              <div
                key={step.number}
                className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="text-3xl font-black text-blue-600/30 dark:text-blue-400/25 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Configurator Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-blue-200 mb-6 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Interactive Estimate</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to scope your custom project?
            </h2>
            <p className="mt-4 text-blue-100 text-base sm:text-lg leading-relaxed">
              Use our interactive configurator to pick your tech stack, required features, and compliance tiers to see an immediate price breakdown and sprint roadmap.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/start-project"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-blue-800 font-bold hover:bg-blue-50 transition-colors shadow-lg"
              >
                <span>Launch Project Configurator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-semibold border border-white/20 transition-colors"
              >
                Book a Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
