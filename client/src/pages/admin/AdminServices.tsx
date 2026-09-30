import React, { useState } from "react";
import { Layers, Plus, CheckCircle2, Trash2 } from "lucide-react";

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState([
    { id: "1", name: "Web Application Development", startingPrice: "₹45,000", timeline: "4-8 Weeks", active: true },
    { id: "2", name: "Mobile App Development (iOS & Android)", startingPrice: "₹65,000", timeline: "6-10 Weeks", active: true },
    { id: "3", name: "SaaS Platform Engineering", startingPrice: "₹95,000", timeline: "8-14 Weeks", active: true },
    { id: "4", name: "AI Integration & Automation", startingPrice: "₹40,000", timeline: "3-6 Weeks", active: true },
    { id: "5", name: "Backend & API Systems", startingPrice: "₹35,000", timeline: "3-6 Weeks", active: true },
    { id: "6", name: "Admin Dashboard Development", startingPrice: "₹42,000", timeline: "4-7 Weeks", active: true },
  ]);

  const toggleService = (id: string) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Services Catalog Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage public services offerings, base starting rates, and delivery estimates.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-500 font-semibold uppercase">
              <th className="py-3 px-4">Service Offering</th>
              <th className="py-3 px-4">Starting Price</th>
              <th className="py-3 px-4">Est. Timeline</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Visibility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                  {s.name}
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                  {s.startingPrice}
                </td>
                <td className="py-3.5 px-4 text-slate-500">
                  {s.timeline}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.active ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                    {s.active ? "LIVE" : "DISABLED"}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => toggleService(s.id)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
