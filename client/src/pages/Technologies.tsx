import React from "react";
import { Link } from "react-router-dom";
import {
  Code,
  Smartphone,
  Server,
  Database,
  Cloud,
  Cpu,
  CreditCard,
  BarChart,
  HardDrive,
  ArrowRight,
} from "lucide-react";

export const Technologies: React.FC = () => {
  const groups = [
    {
      category: "Frontend Development",
      icon: Code,
      items: [
        { name: "React", desc: "Interactive reactive components and virtual DOM" },
        { name: "TypeScript", desc: "Strict static typing and compile-time correctness" },
        { name: "Next.js", desc: "Server-side rendering and static site generation" },
        { name: "Tailwind CSS", desc: "Utility-first design tokens and responsive layouts" },
        { name: "Vue.js", desc: "Progressive front-end architecture" },
      ],
    },
    {
      category: "Mobile Platforms",
      icon: Smartphone,
      items: [
        { name: "Flutter", desc: "Native compilation for iOS and Android with single codebase" },
        { name: "React Native", desc: "Cross-platform native mobile applications" },
        { name: "Swift / SwiftUI", desc: "Native Apple iOS, iPadOS, and macOS apps" },
        { name: "Kotlin", desc: "Modern native Android development with Jetpack Compose" },
      ],
    },
    {
      category: "Backend & Systems",
      icon: Server,
      items: [
        { name: "Node.js & Express", desc: "Event-driven asynchronous microservices" },
        { name: "Python & FastAPI", desc: "High-performance APIs and machine learning backends" },
        { name: ".NET / C#", desc: "Enterprise Windows services and robust web APIs" },
        { name: "GraphQL", desc: "Declarative API query layer and type definitions" },
      ],
    },
    {
      category: "Databases & Storage",
      icon: Database,
      items: [
        { name: "PostgreSQL", desc: "Rock-solid relational database with ACID compliance" },
        { name: "Prisma ORM", desc: "Type-safe database access and migrations" },
        { name: "Redis", desc: "In-memory caching, pub/sub, and session management" },
        { name: "MongoDB", desc: "Scalable document store for dynamic schemas" },
      ],
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      items: [
        { name: "AWS (Amazon Web Services)", desc: "EC2, ECS, S3, RDS, Lambda, and CloudFront" },
        { name: "Google Cloud Platform", desc: "GCP Compute, Cloud Run, and BigQuery" },
        { name: "Docker & Kubernetes", desc: "Containerization and automated cluster orchestration" },
        { name: "GitHub Actions", desc: "Automated continuous integration and deployment" },
      ],
    },
    {
      category: "AI & Machine Learning",
      icon: Cpu,
      items: [
        { name: "OpenAI API", desc: "GPT-4o, reasoning models, and function calling" },
        { name: "Google Gemini API", desc: "Multimodal understanding and generative reasoning" },
        { name: "LangChain & LlamaIndex", desc: "RAG frameworks and autonomous agent pipelines" },
        { name: "Vector Databases", desc: "Pinecone, PgVector, and Qdrant semantic storage" },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Technology Stack
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          We use battle-tested, high-performance open-source and cloud technologies to build software that stands the test of scale.
        </p>
      </div>

      <div className="space-y-12">
        {groups.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.category}
              className="bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {group.category}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60"
                  >
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Link
          to="/start-project"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-colors"
        >
          <span>Select Your Tech Stack In Configurator</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
