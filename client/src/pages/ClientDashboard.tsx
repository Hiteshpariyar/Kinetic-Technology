import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { companyConfig } from "../config/companyConfig";
import {
  Code2,
  FolderGit2,
  Clock,
  CheckCircle2,
  FileText,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  PlusCircle,
  Send,
  LogOut,
  Sparkles,
  Layers,
  CreditCard,
  IndianRupee,
  Download,
  Printer,
  Copy,
  Check,
  Activity,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { InvoiceModal, InvoiceData } from "../components/InvoiceModal";
import { PaymentModal } from "../components/PaymentModal";

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
  projectName: string;
  projectDescription?: string;
  currentStage: number;
  currentStageName: string;
  progressPercent: number;
  estimatedCompletion: string;
  githubRepo?: string;
  liveDemoUrl?: string;
  milestones: TrackingMilestone[];
  createdAt: string;
  updatedAt: string;
}

export const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "tracking" | "invoices" | "messages" | "documents"
  >("tracking");

  // Live data from backend
  const [tracking, setTracking] = useState<ProjectTracking | null>(null);
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Modals state
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [copiedTrackId, setCopiedTrackId] = useState(false);

  // Messaging state
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Engineering Lead (David K.)",
      text: "Sprint 2 completed on schedule. Staging API endpoints for User Auth and Razorpay billing are live for review.",
      time: "Yesterday, 4:30 PM",
      isTeam: true,
    },
    {
      id: 2,
      sender: "You",
      text: "Thanks David! Testing the staging build now. Looks very crisp and fast.",
      time: "Yesterday, 5:15 PM",
      isTeam: false,
    },
    {
      id: 3,
      sender: "Engineering Lead (David K.)",
      text: "Great! Milestone payment was verified and invoice generated. Sprint 3 active now.",
      time: "Today, 10:00 AM",
      isTeam: true,
    },
  ]);

  const fetchClientData = async () => {
    setLoadingData(true);
    try {
      // 1. Fetch tracking records
      const trackRes = await fetch("http://localhost:4000/api/tracking");
      const trackData = await trackRes.json();
      if (trackData.trackingRecords && trackData.trackingRecords.length > 0) {
        setTracking(trackData.trackingRecords[0]);
      }

      // 2. Fetch invoices
      const invRes = await fetch("http://localhost:4000/api/invoices");
      const invData = await invRes.json();
      if (invData.invoices) {
        setInvoices(invData.invoices);
      }
    } catch {
      // fallback handled gracefully
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "You",
        text: newMessage,
        time: "Just now",
        isTeam: false,
      },
    ]);
    setNewMessage("");
  };

  const handleCopyTrackId = () => {
    if (!tracking) return;
    navigator.clipboard.writeText(tracking.trackingId);
    setCopiedTrackId(true);
    setTimeout(() => setCopiedTrackId(false), 2000);
  };

  const handlePaymentSuccess = (newInvoice: InvoiceData) => {
    setInvoices((prev) => [newInvoice, ...prev]);
    setSelectedInvoice(newInvoice);
    fetchClientData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Client Portal
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              Active Client Partner
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome back! Monitor live Flipkart-style sprint milestones, review tax invoices, and track your software delivery anytime on any device.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {tracking && (
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span>Make Milestone Payment</span>
            </button>
          )}

          <Link
            to="/start-project"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Scope</span>
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Active Project
          </span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
            {tracking?.projectName || "Custom Software Suite"}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-mono font-bold flex items-center gap-1">
            <span>ID: {tracking?.trackingId || "KT-782910"}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Milestone Progress
          </span>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            Stage {tracking?.currentStage || 3} of 6
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {tracking?.progressPercent || 48}% Completed
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Paid Invoices
          </span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {invoices.length} Invoices
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">
            Tax Receipts Ready
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Estimated Handover
          </span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {tracking?.estimatedCompletion || "~3-4 Weeks"}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Continuous CI/CD Delivery
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab("tracking")}
          className={`pb-4 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === "tracking"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Live Project Tracking</span>
        </button>

        <button
          onClick={() => setActiveTab("invoices")}
          className={`pb-4 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === "invoices"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Invoices & Billing ({invoices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`pb-4 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === "messages"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Engineering Pod Chat</span>
        </button>

        <button
          onClick={() => setActiveTab("documents")}
          className={`pb-4 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === "documents"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Artifacts & Staging Links</span>
        </button>
      </div>

      {/* Tab 1: Live Flipkart-Style Project Tracking */}
      {activeTab === "tracking" && (
        <div className="space-y-6">
          {tracking ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
              {/* Project Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-sm font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded-lg border border-blue-200 dark:border-blue-900">
                      {tracking.trackingId}
                    </span>
                    <button
                      onClick={handleCopyTrackId}
                      className="p-1 rounded text-slate-400 hover:text-slate-600"
                      title="Copy Tracking ID"
                    >
                      {copiedTrackId ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={`/track?id=${tracking.trackingId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 ml-2"
                    >
                      <span>Track On Any Device</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {tracking.projectName}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Current Milestone: <strong>{tracking.currentStageName}</strong> ({tracking.progressPercent}% Complete)
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Next Sprint</span>
                  </button>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-500"
                    style={{ width: `${tracking.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Flipkart-Style Vertical Milestone Timeline */}
              <div className="relative pl-6 sm:pl-8 space-y-6 pt-2">
                {tracking.milestones.map((m, idx) => {
                  const isCompleted = m.status === "completed";
                  const isInProgress = m.status === "in_progress";
                  const isLast = idx === tracking.milestones.length - 1;

                  return (
                    <div key={m.step} className="relative">
                      {!isLast && (
                        <div
                          className={`absolute left-[-24px] sm:left-[-32px] top-6 bottom-[-28px] w-0.5 transition-colors ${
                            isCompleted
                              ? "bg-emerald-500"
                              : "bg-slate-200 dark:bg-slate-800"
                          }`}
                        />
                      )}

                      <div
                        className={`absolute left-[-36px] sm:left-[-44px] top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                          isCompleted
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                            : isInProgress
                            ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950 animate-pulse"
                            : "bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-400"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                        ) : isInProgress ? (
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">
                            {m.step}
                          </span>
                        )}
                      </div>

                      <div
                        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                          isInProgress
                            ? "bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 shadow-sm"
                            : isCompleted
                            ? "bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800"
                            : "bg-transparent border-dashed border-slate-200 dark:border-slate-800 opacity-60"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4
                            className={`font-bold text-sm ${
                              isCompleted
                                ? "text-slate-900 dark:text-white"
                                : isInProgress
                                ? "text-blue-600 dark:text-blue-400 font-extrabold"
                                : "text-slate-500"
                            }`}
                          >
                            {m.step}. {m.title}
                          </h4>
                          <span className="text-xs font-semibold text-slate-500">
                            {m.completedAt ? `✓ ${m.completedAt}` : m.expectedDate}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {m.description}
                        </p>

                        {m.note && (
                          <div className="mt-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <MessageSquare className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <strong className="text-blue-600 dark:text-blue-400 text-[10px] uppercase block">
                                Sprint Update Note:
                              </strong>
                              <span>{m.note}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <Activity className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 dark:text-white">
                No Active Project Found
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Start a project or submit a scope quote to receive your tracking ID.
              </p>
              <Link
                to="/start-project"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
              >
                Configure Project
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Invoices & Payments */}
      {activeTab === "invoices" && (
        <div className="space-y-6">
          {/* Quick Pay / Milestone Invoice Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next Milestone Due</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Sprint 3 Milestone Payment
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-lg">
                Complete milestone settlement to lock in production deployment sprints and receive an official GST Tax Invoice with your embedded Tracking ID.
              </p>
            </div>

            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-blue-600 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 flex-shrink-0"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay Milestone (₹45,000)</span>
            </button>
          </div>

          {/* Invoices List Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Tax Invoices & Payment History
                </h3>
                <p className="text-xs text-slate-500">
                  All official invoices contain your Project Tracking ID to track deliverables anytime on any device.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-slate-500 font-semibold uppercase text-[11px]">
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Project / Milestone</th>
                    <th className="py-3 px-4">Tracking ID</th>
                    <th className="py-3 px-4">Amount Paid</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Invoice Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {invoices.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No invoices generated yet.
                      </td>
                    </tr>
                  ) : (
                    invoices.map((inv) => (
                      <tr
                        key={inv.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="py-4 px-4 font-mono font-bold text-slate-900 dark:text-white">
                          {inv.invoiceNumber}
                        </td>
                        <td className="py-4 px-4 text-slate-500">
                          {new Date(inv.paidAt || inv.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          <div className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                            {inv.projectName}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {inv.paymentMethod}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <a
                            href={`/track?id=${inv.trackingId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          >
                            <span>{inv.trackingId}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                          ₹{inv.totalAmount.toLocaleString()}
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View / Print</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Messaging */}
      {activeTab === "messages" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[520px]">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                ENG
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Sprint Engineering Pod
                </h3>
                <span className="text-[11px] text-emerald-500 flex items-center gap-1">
                  ● Lead Architect & PM Online
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.isTeam ? "items-start" : "items-end"
                }`}
              >
                <span className="text-[10px] text-slate-400 mb-1 px-1">
                  {m.sender} • {m.time}
                </span>
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                    m.isTeam
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm"
                      : "bg-blue-600 text-white rounded-tr-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message or request a milestone review..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Specifications & Documents */}
      {activeTab === "documents" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Specifications, Schemas & Deliverable Artifacts
            </h2>
            <p className="text-xs text-slate-500">
              Access your staging prototypes, GitHub repos, and architectural blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white">
                    Full Architecture Blueprint V2.pdf
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    2.4 MB • Updated Sprint 2
                  </span>
                </div>
              </div>
              <button
                onClick={() => alert("Downloading Architecture Blueprint V2.pdf")}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Download
              </button>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Layers className="w-6 h-6 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white">
                    Figma Interactive Prototypes
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    Cloud Design Tokens
                  </span>
                </div>
              </div>
              <a
                href={tracking?.liveDemoUrl || "#figma"}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Open</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code2 className="w-6 h-6 text-emerald-600" />
                <div>
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white">
                    Private GitHub Codebase
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    Full IP Ownership
                  </span>
                </div>
              </div>
              <a
                href={tracking?.githubRepo || "https://github.com"}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                <div>
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white">
                    QA & Pen-Testing Security Report
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    OWASP Top 10 Verified
                  </span>
                </div>
              </div>
              <button
                onClick={() => alert("Downloading QA & Security Report.pdf")}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Viewer Modal */}
      <InvoiceModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />

      {/* Payment Checkout Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        trackingId={tracking?.trackingId || "KT-782910"}
        projectName={tracking?.projectName || "Kinetic Cloud Platform"}
        defaultAmount={45000}
        clientName={tracking?.clientName || "Vikram Malhotra"}
        clientEmail={tracking?.clientEmail || "vikram@finscale.io"}
        clientPhone={tracking?.clientPhone || "9876543210"}
        company={tracking?.projectDescription || "FinScale Payments"}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};
