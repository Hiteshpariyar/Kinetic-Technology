import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  FolderGit2,
  FileText,
  User,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  AlertTriangle,
  Receipt,
  Download,
} from "lucide-react";
import { InvoiceModal, InvoiceData } from "../components/InvoiceModal";

interface TrackingMilestone {
  step: number;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  completedAt?: string;
  expectedDate?: string;
  note?: string;
}

interface ProjectTracking {
  id: string;
  trackingId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  company?: string;
  projectName: string;
  projectDescription?: string;
  currentStage: number;
  currentStageName: string;
  progressPercent: number;
  estimatedCompletion: string;
  leadEngineer: string;
  githubRepo?: string;
  liveDemoUrl?: string;
  milestones: TrackingMilestone[];
  createdAt: string;
  updatedAt: string;
}

export const TrackProject: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlId = searchParams.get("id") || "";

  const [inputTrackId, setInputTrackId] = useState(urlId || "KT-782910");
  const [activeTracking, setActiveTracking] = useState<ProjectTracking | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  // Invoice modal
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);
  const [invoiceLoading, setInvoiceLoading] = useState(false);

  const fetchTracking = async (trackIdToFetch: string) => {
    const clean = trackIdToFetch.trim().toUpperCase();
    if (!clean) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`http://localhost:4000/api/tracking/${clean}`);
      const data = await res.json();

      if (res.ok && data.tracking) {
        setActiveTracking(data.tracking);
        setSearchParams({ id: clean });
      } else {
        setErrorMsg(
          data.message || `No project found with Tracking ID '${clean}'. Please check your ID.`
        );
        setActiveTracking(null);
      }
    } catch {
      setErrorMsg("Network error connecting to tracking API. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const idToUse = urlId ? urlId.trim().toUpperCase() : "KT-782910";
    setInputTrackId(idToUse);
    fetchTracking(idToUse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTrackId.trim()) {
      fetchTracking(inputTrackId.trim());
    }
  };

  const handleCopyId = () => {
    if (activeTracking?.trackingId) {
      navigator.clipboard.writeText(activeTracking.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFetchInvoice = async () => {
    if (!activeTracking?.trackingId) return;
    setInvoiceLoading(true);
    try {
      const res = await fetch(
        `http://localhost:4000/api/invoices?trackingId=${activeTracking.trackingId}`
      );
      const data = await res.json();
      if (data.invoices && data.invoices.length > 0) {
        setSelectedInvoice(data.invoices[0]);
      } else {
        // Fallback default generated invoice for preview
        setSelectedInvoice({
          id: `inv_${Date.now()}`,
          invoiceNumber: `INV-2026-${activeTracking.trackingId.replace("KT-", "")}`,
          trackingId: activeTracking.trackingId,
          clientName: activeTracking.clientName,
          clientEmail: activeTracking.clientEmail,
          clientPhone: activeTracking.clientPhone || "9876543210",
          company: activeTracking.company || "Independent",
          projectName: activeTracking.projectName,
          items: [
            {
              description: `${activeTracking.projectName} - Phase 1 Engineering & Architecture`,
              amount: 65000,
            },
            { description: "Kinetic UI Design & Prototyping", amount: 0 },
            { description: "Kinetic Basic Security Hardening", amount: 0 },
          ],
          subtotal: 65000,
          gstRate: 18,
          gstAmount: 11700,
          totalAmount: 76700,
          paymentMethod: "UPI / Razorpay Verified",
          transactionId: `TXN_KT_${Date.now().toString().slice(-8)}`,
          status: "PAID",
          paidAt: activeTracking.createdAt,
          createdAt: activeTracking.createdAt,
          notes: "Official GST Tax Invoice with embedded Tracking ID for live milestone monitoring.",
        });
      }
    } catch {
      // fallback
    } finally {
      setInvoiceLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Container */}
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header / Intro */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-Time Project Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Flipkart-Style Project Tracking
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Track your custom software development live from inception to cloud deployment across all 6 milestones anytime on any device.
          </p>
        </div>

        {/* Search Bar & Demo Quick Links */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputTrackId}
                onChange={(e) => setInputTrackId(e.target.value.toUpperCase())}
                placeholder="Enter Tracking ID (e.g. KT-782910)"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase tracking-wider"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Locating...</span>
                </>
              ) : (
                <>
                  <span>Track Status</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Links */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick Demo IDs:</span>
            {[
              { id: "KT-782910", name: "FinScale Payments (Stage 3)" },
              { id: "KT-104921", name: "MedCore Health (Stage 2)" },
              { id: "KT-277691", name: "SupplyFlow Logistics (Stage 4)" },
            ].map((demo) => (
              <button
                key={demo.id}
                type="button"
                onClick={() => {
                  setInputTrackId(demo.id);
                  fetchTracking(demo.id);
                }}
                className={`px-2.5 py-1 rounded-lg border font-mono font-semibold transition-colors ${
                  activeTracking?.trackingId === demo.id
                    ? "bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                    : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {demo.id} <span className="font-sans text-[10px] text-slate-400">({demo.name.split(" ")[0]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-500" />
            <div className="flex-1">{errorMsg}</div>
          </div>
        )}

        {/* Active Project Card */}
        {activeTracking && (
          <div className="space-y-6">
            {/* Flipkart-Style Tracking Status Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-transparent border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono text-xs font-bold px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
                        <span>{activeTracking.trackingId}</span>
                        <button
                          onClick={handleCopyId}
                          title="Copy Tracking ID"
                          className="hover:text-blue-900 dark:hover:text-white"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Stage {activeTracking.currentStage} of 6 In Progress
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
                      {activeTracking.projectName}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Client: <span className="font-semibold text-slate-800 dark:text-slate-200">{activeTracking.clientName}</span>
                      {activeTracking.company && ` • ${activeTracking.company}`}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleFetchInvoice}
                      disabled={invoiceLoading}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 shadow-md transition-all"
                    >
                      <Receipt className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                      <span>{invoiceLoading ? "Loading Invoice..." : "View Official Tax Invoice"}</span>
                    </button>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span>Open Full Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Progress bar and metrics */}
                <div className="mt-6 pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Overall Completion
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                        {activeTracking.progressPercent}%
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {activeTracking.currentStage}/6 Milestones
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mt-2">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${activeTracking.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Target Delivery Date
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {activeTracking.estimatedCompletion}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Milestone guaranteed by SLA
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Lead Systems Engineer
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {activeTracking.leadEngineer}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Dedicated technical point of contact
                    </p>
                  </div>
                </div>
              </div>

              {/* Flipkart-Style Vertical Stepper Track Bar */}
              <div className="p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Sprint Milestones & Delivery Stages</span>
                  </h3>
                  <span className="text-xs text-slate-400">Updated in real-time</span>
                </div>

                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                  {activeTracking.milestones.map((m) => {
                    const isCompleted = m.status === "completed" || m.step < activeTracking.currentStage;
                    const isCurrent = m.status === "in_progress" || m.step === activeTracking.currentStage;
                    const isPending = m.status === "pending" && m.step > activeTracking.currentStage;

                    return (
                      <div key={m.step} className="relative group">
                        {/* Step Marker Node */}
                        <div
                          className={`absolute -left-6 sm:-left-8 top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                            isCompleted
                              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                              : isCurrent
                              ? "bg-blue-600 text-white ring-4 ring-blue-500/20 shadow-lg shadow-blue-600/30 animate-pulse"
                              : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : isCurrent ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-white" />
                          ) : (
                            <span className="text-xs font-bold">{m.step}</span>
                          )}
                        </div>

                        {/* Step Content */}
                        <div
                          className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                            isCurrent
                              ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 shadow-sm"
                              : isCompleted
                              ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                              : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-80"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-400">Step {m.step}:</span>
                              <h4
                                className={`text-sm sm:text-base font-bold ${
                                  isCurrent
                                    ? "text-blue-600 dark:text-blue-400"
                                    : isCompleted
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-500 dark:text-slate-400"
                                }`}
                              >
                                {m.title}
                              </h4>
                            </div>

                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full self-start sm:self-auto uppercase tracking-wider ${
                                isCompleted
                                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                                  : isCurrent
                                  ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                                  : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                              }`}
                            >
                              {isCompleted ? "Completed" : isCurrent ? "Active Sprint" : "Pending"}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            {m.description}
                          </p>

                          {/* Technical Sprint Notes / Timestamp */}
                          {m.note && (
                            <div className="mt-3 p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                              <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">
                                Engineer Note:
                              </span>
                              <span>{m.note}</span>
                            </div>
                          )}

                          {m.completedAt && (
                            <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              <span>Verified on: {new Date(m.completedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Staging Links & Repositories */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  {activeTracking.liveDemoUrl && (
                    <a
                      href={activeTracking.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Staging Sandbox</span>
                    </a>
                  )}

                  {activeTracking.githubRepo && (
                    <a
                      href={activeTracking.githubRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 hover:underline"
                    >
                      <FolderGit2 className="w-4 h-4" />
                      <span>Private Code Repository</span>
                    </a>
                  )}
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Secure 256-Bit Encrypted Telemetry</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invoice Modal for Printable Tax Invoice */}
        {selectedInvoice && (
          <InvoiceModal
            invoice={selectedInvoice}
            isOpen={!!selectedInvoice}
            onClose={() => setSelectedInvoice(null)}
          />
        )}
      </div>
    </div>
  );
};
