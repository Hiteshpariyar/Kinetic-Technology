import React, { useState } from "react";
import { Building2, Plus, Trash2 } from "lucide-react";

export const AdminIndustries: React.FC = () => {
  const [industries, setIndustries] = useState([
    { id: "1", name: "Finance & FinTech", desc: "PCI-compliant payment engines, investment dashboards, KYC onboarding." },
    { id: "2", name: "Healthcare & MedTech", desc: "HIPAA-compliant telemedicine platforms, electronic health records (EHR)." },
    { id: "3", name: "E-Commerce & Retail", desc: "High-concurrency storefronts, omnichannel inventories, checkout flows." },
    { id: "4", name: "Real Estate & PropTech", desc: "Interactive property listing maps, agent management portals, mortgage calculators." },
    { id: "5", name: "Logistics & Supply Chain", desc: "Live GPS fleet tracking, automated route dispatching, warehouse inventory." },
    { id: "6", name: "SaaS & Cloud Platforms", desc: "Multi-tenant B2B platforms, subscription management, telemetry." },
  ]);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setIndustries([...industries, { id: Date.now().toString(), name, desc }]);
    setName("");
    setDesc("");
  };

  const handleDelete = (id: string) => {
    setIndustries(industries.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Industries Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure industry domain verticals supported by Kinetic Technology.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-500 font-semibold uppercase">
                <th className="py-3 px-4">Industry Domain</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {industries.map((ind) => (
                <tr key={ind.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {ind.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {ind.desc}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => handleDelete(ind.id)} className="text-slate-400 hover:text-rose-600 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-fit">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
            Add New Industry
          </h3>
          <form onSubmit={handleAdd} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Industry Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aerospace, Agriculture"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Domain Capabilities Description
              </label>
              <textarea
                rows={3}
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Briefly describe domain software requirements..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition-colors"
            >
              Add Industry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
