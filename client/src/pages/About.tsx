import React from "react";
import { Link } from "react-router-dom";
import { companyConfig } from "../config/companyConfig";
import {
  Code2,
  Users,
  Target,
  Award,
  ShieldCheck,
  Cpu,
  ArrowRight,
} from "lucide-react";

export const About: React.FC = () => {
  const values = [
    {
      icon: Code2,
      title: "Clean Code & Architectural Integrity",
      desc: "We write clean, strictly typed, self-documenting code built on proven design patterns that your team can maintain effortlessly.",
    },
    {
      icon: Target,
      title: "Business-Driven Engineering",
      desc: "We don't build tech for tech's sake. Every feature and architectural decision is aligned with user retention and business profitability.",
    },
    {
      icon: ShieldCheck,
      title: "Security & Zero Trust by Default",
      desc: "From encrypted sessions to strict parameter sanitization, security is designed into every layer from day one, never bolted on as an afterthought.",
    },
    {
      icon: Users,
      title: "Radical Transparency",
      desc: "Live access to PRs, staging environments, Jira boards, and sprint burndowns so you always know exactly what is happening.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About {companyConfig.name}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          We are a dedicated software engineering and design collective crafting high-impact digital products for forward-thinking enterprises and ambitious startups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Our mission is to eliminate the friction between innovative product ideas and production reality. We bridge the gap between creative product design and enterprise-scale software engineering.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Whether building an AI-powered automation engine or a cross-platform mobile ecosystem, our teams bring senior engineering rigor to every sprint.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Global Presence & Heritage
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Headquartered at {companyConfig.address.city}, {companyConfig.address.state}, we partner with clients globally across North America, Europe, and Asia.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We operate asynchronous, communicative engineering sprints that guarantee continuous velocity, transparent commits, and zero communication delays.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Our Core Values
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            The principles that guide every line of code we push and every architectural decision we make.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                  {v.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-colors"
        >
          <span>Connect With Our Architecture Team</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
