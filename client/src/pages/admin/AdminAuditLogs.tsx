import React from "react";
import { ShieldCheck, ShieldAlert, Key, UserCheck, RefreshCw, FileText } from "lucide-react";

export const AdminAuditLogs: React.FC = () => {
  const logs = [
    {
      id: "log_1",
      event: "PRICING_UPDATED",
      actor: "Super Admin (david.k@kinetictech.com)",
      details: "Updated Kinetic Basic Security tier to Free (₹0)",
      ip: "103.212.144.18",
      timestamp: "Today, 5:45 PM",
      status: "SUCCESS",
    },
    {
      id: "log_2",
      event: "LEAD_STATUS_CHANGED",
      actor: "Project Manager (sarah.j@kinetictech.com)",
      details: "Moved FinScale Payments quote from NEW to QUALIFIED",
      ip: "103.212.144.20",
      timestamp: "Today, 4:10 PM",
      status: "SUCCESS",
    },
    {
      id: "log_3",
      event: "ADMIN_LOGIN",
      actor: "Super Admin (david.k@kinetictech.com)",
      details: "Successful JWT cookie authenticated session initiated",
      ip: "103.212.144.18",
      timestamp: "Today, 3:30 PM",
      status: "SUCCESS",
    },
    {
      id: "log_4",
      event: "NEW_QUOTE_ESTIMATE",
      actor: "Anonymous Visitor",
      details: "Configured estimate for SaaS Multi-Tenant Platform (₹1,25,000)",
      ip: "198.51.100.42",
      timestamp: "Yesterday, 8:20 PM",
      status: "SUCCESS",
    },
    {
      id: "log_5",
      event: "TEAM_MEMBER_INVITED",
      actor: "Super Admin (david.k@kinetictech.com)",
      details: "Invited elena.r@kinetictech.com as QA Lead",
      ip: "103.212.144.18",
      timestamp: "Sep 28, 2026",
      status: "SUCCESS",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Security & Audit Logs
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Immutable event telemetry tracking authentication, administrative changes, and quote requests.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-500 font-semibold uppercase">
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4">Origin IP</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 font-bold font-sans text-slate-900 dark:text-white">
                    {l.event}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-sans">
                    {l.actor}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-sans">
                    {l.details}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{l.ip}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-sans">{l.timestamp}</td>
                  <td className="py-3.5 px-4 text-right font-sans">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
