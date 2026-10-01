import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Trash2,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  FileText,
  Layers,
  Sparkles,
} from "lucide-react";
import { API_BASE_URL } from "../../utils/api";

export const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  const fetchLeads = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/leads`)
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) setLeads(data.leads);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch {
      // Local state update fallback
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: "DELETE",
      });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
    } catch {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  // Helper to parse lead message and isolate what the client wrote
  const parseLeadMessage = (msg: string) => {
    if (!msg) return { clientWants: "No description provided.", architectureScope: "" };

    // Format 1: "CLIENT PROJECT DESCRIPTION:\n... \n\n--- CONFIGURED SCOPE & ARCHITECTURE ---\n..."
    if (msg.includes("CLIENT PROJECT DESCRIPTION:")) {
      const parts = msg.split("--- CONFIGURED SCOPE & ARCHITECTURE ---");
      const desc = parts[0].replace("CLIENT PROJECT DESCRIPTION:", "").trim();
      const scope = parts[1] ? parts[1].trim() : "";
      return {
        clientWants: desc || "No description provided.",
        architectureScope: scope,
      };
    }

    // Format 2: "... Additional Notes: <client text>"
    if (msg.includes("Additional Notes:")) {
      const parts = msg.split("Additional Notes:");
      const scope = parts[0].trim();
      const desc = parts[1].trim();
      return {
        clientWants: desc || "No description provided.",
        architectureScope: scope,
      };
    }

    // Format 3: "... Notes: <client text>"
    if (msg.includes("Notes:")) {
      const parts = msg.split("Notes:");
      const scope = parts[0].trim();
      const desc = parts[1].trim();
      return {
        clientWants: desc || "No description provided.",
        architectureScope: scope,
      };
    }

    // General fallback: full message is the client's direct request
    return {
      clientWants: msg.trim(),
      architectureScope: "",
    };
  };

  const filteredLeads = leads.filter((l) => {
    const matchesFilter = filter === "ALL" || l.status === filter;
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.company && l.company.toLowerCase().includes(search.toLowerCase())) ||
      (l.phone && l.phone.includes(search)) ||
      (l.message && l.message.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Leads & Estimate Inquiries
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage incoming prospects, review configured scope estimates, and advance leads through the sales pipeline.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, company, description..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {["ALL", "NEW", "CONTACTED", "QUALIFIED", "CLOSED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === st
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table & Details Drawer Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Table Column */}
        <div className={selectedLead ? "lg:col-span-2" : "lg:col-span-3"}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-500 font-semibold uppercase">
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">What Client Wants</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        No inquiries found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((l) => {
                      const isSelected = selectedLead?.id === l.id;
                      const parsed = parseLeadMessage(l.message);
                      return (
                        <tr
                          key={l.id}
                          onClick={() => setSelectedLead(l)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-blue-50/80 dark:bg-blue-950/40"
                              : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 dark:text-white">
                              {l.name}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {l.company || "Independent"} • {new Date(l.createdAt).toLocaleDateString()}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                            <div>{l.email}</div>
                            {l.phone && (
                              <div className="text-slate-400 font-mono text-[11px]">
                                {l.phone}
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="line-clamp-2 text-slate-700 dark:text-slate-300 font-medium">
                              {parsed.clientWants}
                            </div>
                          </td>

                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={l.status || "NEW"}
                              onChange={(e) => handleStatusChange(l.id, e.target.value)}
                              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-lg px-2 py-1 font-semibold focus:outline-none"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="QUALIFIED">QUALIFIED</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>
                          </td>

                          <td
                            className="py-3.5 px-4 text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => handleDelete(l.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selected Lead Details Drawer */}
        {selectedLead && (
          <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl sticky top-20">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Inquiry Details</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600">
                  {selectedLead.status || "NEW"}
                </span>
              </h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-xs text-slate-400 hover:text-slate-600 p-1"
              >
                Close ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Lead Name
                </span>
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  {selectedLead.name}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Contact Information
                </span>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="text-blue-600 hover:underline flex items-center gap-1.5 text-xs font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  <span>{selectedLead.email}</span>
                </a>
                {selectedLead.phone && (
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="text-slate-700 dark:text-slate-300 hover:text-blue-600 flex items-center gap-1.5 mt-1 font-mono text-xs font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{selectedLead.phone}</span>
                  </a>
                )}
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Company / Organization
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedLead.company || "Independent / Not Specified"}
                </span>
              </div>

              {/* What Client Wants / Project Description (PROMINENT HIGHLIGHTED SECTION) */}
              {(() => {
                const parsed = parseLeadMessage(selectedLead.message);
                return (
                  <div className="space-y-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 shadow-sm">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-2">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                        <span>What Client Wants (Project Description)</span>
                      </div>
                      <div className="text-slate-800 dark:text-slate-200 text-xs font-medium leading-relaxed whitespace-pre-wrap">
                        {parsed.clientWants}
                      </div>
                    </div>

                    {parsed.architectureScope && (
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                          Configured Architecture & Estimate
                        </span>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-[11px] whitespace-pre-wrap border border-slate-200 dark:border-slate-700">
                          {parsed.architectureScope}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                <a
                  href={`mailto:${selectedLead.email}?subject=Project Proposal from Kinetic Technology`}
                  className="flex-1 py-2 text-center rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-sm"
                >
                  Send Proposal Email
                </a>
                {selectedLead.phone && (
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="py-2 px-3 text-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800"
                    title="Call Client"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
