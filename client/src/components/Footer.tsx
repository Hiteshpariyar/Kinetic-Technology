import React from "react";
import { Link } from "react-router-dom";
import { companyConfig } from "../config/companyConfig";
import {
  Code2,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">
                {companyConfig.name}
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
              We engineer mission-critical web applications, mobile platforms, enterprise backends, and custom software systems designed to scale seamlessly.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <a href={`mailto:${companyConfig.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {companyConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <a href={`tel:${companyConfig.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {companyConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>
                  {companyConfig.address.city}, {companyConfig.address.state} - {companyConfig.address.country}
                </span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm tracking-wide uppercase mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Web Application Dev
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Mobile Apps (iOS & Android)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  SaaS & Cloud Platforms
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  API & Backend Systems
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  AI Integration & Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm tracking-wide uppercase mb-4">
              Solutions
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/industries" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Fintech & Banking
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Healthcare & HIPAA
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  E-Commerce & Retail
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  How We Deliver
                </Link>
              </li>
              <li>
                <Link to="/start-project" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                  Estimate Calculator
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Portal & Company */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm tracking-wide uppercase mb-4">
              Client Portal
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Client Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Create Client Account
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400">
                  <span>Kinetic Store (Apps)</span>
                  <span className="text-[9px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.2 rounded font-bold uppercase">
                    New
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1">
                  <span>Admin Console</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About Our Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Enterprise-Grade Security & 99.9% Uptime Guarantee</span>
          </div>
          <p>© {currentYear} {companyConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
