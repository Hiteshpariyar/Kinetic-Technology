import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Search,
  Plus,
  Save,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit3,
  Calendar,
  User,
  FolderGit2,
  RefreshCw,
  AlertCircle,
  Eye,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import { API_BASE_URL } from "../../utils/api";

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

export const AdminTracking: React.FC = () => {
  const [records, setRecords] = useState<ProjectTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<ProjectTracking | null>(null);

  // Edit form state
  const [stage, setStage] = useState(1);
  const [progress, setProgress] = useState(15);
  const [estimatedCompletion, setEstimatedCompletion] = useState("");
  const [leadEngineer, setLeadEngineer] = useState("");
  const [liveDemoUrl, setLiveDemoUrl] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [milestoneNote, setMilestoneNote] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  // New Project Modal state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newLeadEngineer, setNewLeadEngineer] = useState("Alex R. (Senior Systems Architect)");
  const [newDescription, setNewDescription] = useState("");

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/tracking`);
      const data = await res.json();
      if (data.trackingRecords) {
        setRecords(data.trackingRecords);
        if (!selectedRecord && data.trackingRecords.length > 0) {
          selectProject(data.trackingRecords[0]);
        }
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectProject = (rec: ProjectTracking) => {
    setSelectedRecord(rec);
    setStage(rec.currentStage);
    setProgress(rec.progressPercent);
    setEstimatedCompletion(rec.estimatedCompletion || "");
    setLeadEngineer(rec.leadEngineer || "");
    setLiveDemoUrl(rec.liveDemoUrl || "");
    setGithubRepo(rec.githubRepo || "");
    const currentMilestone = rec.milestones.find((m) => m.step === rec.currentStage);
    setMilestoneNote(currentMilestone?.note || "");
    setSaveStatus("idle");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord) return;

    setSaveStatus("saving");
    try {
      const res = await fetch(
        `${API_BASE_URL}/tracking/${selectedRecord.trackingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentStage: stage,
            progressPercent: progress,
            estimatedCompletion,
            leadEngineer,
            liveDemoUrl,
            githubRepo,
            milestoneIndex: stage - 1,
            milestoneNote,
          }),
        }
      );

      const data = await res.json();
      if (res.ok && data.tracking) {
        setSaveStatus("saved");
        setSelectedRecord(data.tracking);
        setRecords((prev) =>
          prev.map((r) => (r.trackingId === data.tracking.trackingId ? data.tracking : r))
        );
        setTimeout(() => setSaveStatus("idle"), 2500);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
  };

  const handleCreateNewTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName || !newClientName || !newClientEmail) return;

    try {
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newClientName,
          email: newClientEmail,
          phone: newClientPhone,
          company: newCompany,
          message: `CLIENT PROJECT DESCRIPTION: ${newProjectName}. ${newDescription}`,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsNewModalOpen(false);
        setNewProjectName("");
        setNewClientName("");
        setNewClientEmail("");
        setNewClientPhone("");
        setNewCompany("");
        setNewDescription("");
        await fetchRecords();
        if (data.tracking) {
          selectProject(data.tracking);
        }
      }
    } catch {
      // error handled
    }
  };

  const filteredRecords = records.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.trackingId.toLowerCase().includes(q) ||
      r.clientName.toLowerCase().includes(q) ||
      r.projectName.toLowerCase().includes(q) ||
      (r.company && r.company.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Project Tracking Management
            </h1>
            <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded-full">
              Live Tracking Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Update real-time delivery milestones, progress percentages, sprint engineer notes, and staging builds visible to clients.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Project</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Projects List on Left, Milestone Editor on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Projects List */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracking ID, client, project..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 overflow-y-auto max-h-[620px]">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-blue-500" />
                Loading tracking records...
              </div>
            ) : filteredRecords.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No tracked projects found matching your query.
              </div>
            ) : (
              filteredRecords.map((r) => {
                const isSelected = selectedRecord?.trackingId === r.trackingId;
                return (
                  <div
                    key={r.trackingId}
                    onClick={() => selectProject(r)}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-blue-600"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                        {r.trackingId}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        Stage {r.currentStage}/6 ({r.progressPercent}%)
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {r.projectName}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                      <span>{r.clientName}</span>
                      <span>{r.company || "Independent"}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Project Milestones & Editor */}
        <div className="lg:col-span-8 space-y-6">
          {selectedRecord ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-7 space-y-6">
              {/* Header of Selected Record */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {selectedRecord.trackingId}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      ● Active Sprint
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1.5">
                    {selectedRecord.projectName}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Client: <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedRecord.clientName}</span> ({selectedRecord.clientEmail})
                  </p>
                </div>

                <Link
                  to={`/track?id=${selectedRecord.trackingId}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors self-start sm:self-auto"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Client View</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </Link>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Quick Stage & Progress Lifecycle Buttons */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Quick Stage & Progress Shortcuts:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStage(1);
                        setProgress(0);
                        setLeadEngineer("Pending Developer Assignment");
                        setMilestoneNote("All app information submitted successfully (0%). Ready for developer connection.");
                      }}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        progress === 0
                          ? "bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-800 dark:text-amber-200 font-bold shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-bold">0% App Submitted</div>
                      <div className="text-[10px] text-slate-500 font-normal">Awaiting Developer</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStage(2);
                        setProgress(10);
                        setLeadEngineer("Pending Developer Assignment");
                        setMilestoneNote("Developer connected to workspace & repository (10%).");
                      }}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        progress === 10
                          ? "bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-800 dark:text-blue-200 font-bold shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-bold">10% Dev Connected</div>
                      <div className="text-[10px] text-slate-500 font-normal">Workspace linked</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStage(3);
                        setProgress(15);
                        if (!leadEngineer || leadEngineer.includes("Pending")) {
                          setLeadEngineer("Alex R. (Senior Systems Architect)");
                        }
                        setMilestoneNote("Developer assigned to project (15%). Sprint kickoff initiated.");
                      }}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        progress === 15
                          ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 text-indigo-800 dark:text-indigo-200 font-bold shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-bold">15% Dev Assigned</div>
                      <div className="text-[10px] text-slate-500 font-normal">Lead engineer set</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStage(4);
                        setProgress(50);
                        setMilestoneNote("Active sprint development: UI components, APIs, and database (50%).");
                      }}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        progress === 50
                          ? "bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-800 dark:text-blue-200 font-bold shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-bold">50% Core Engineering</div>
                      <div className="text-[10px] text-slate-500 font-normal">Active Sprints</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStage(5);
                        setProgress(75);
                        setMilestoneNote("Automated integration tests and security pen-testing in progress (75%).");
                      }}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        progress === 75
                          ? "bg-purple-50 dark:bg-purple-950/40 border-purple-400 text-purple-800 dark:text-purple-200 font-bold shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-bold">75% Testing & Security</div>
                      <div className="text-[10px] text-slate-500 font-normal">QA verification</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStage(6);
                        setProgress(100);
                        setMilestoneNote("Production cloud handover and SSL deployment completed (100%).");
                      }}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        progress === 100
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 dark:text-emerald-200 font-bold shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-bold">100% Deployed</div>
                      <div className="text-[10px] text-slate-500 font-normal">Cloud handover</div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Current Stage */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Current Milestone Stage
                    </label>
                    <select
                      value={stage}
                      onChange={(e) => {
                        const newStage = Number(e.target.value);
                        setStage(newStage);
                        if (newStage === 1) setProgress(0);
                        else if (newStage === 2) setProgress(10);
                        else if (newStage === 3) setProgress(15);
                        else if (newStage === 4) setProgress(50);
                        else if (newStage === 5) setProgress(75);
                        else if (newStage === 6) setProgress(100);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={1}>Stage 1: App Information Submitted (0%)</option>
                      <option value={2}>Stage 2: Developer Connected (10%)</option>
                      <option value={3}>Stage 3: Developer Assigned & Sprint Kickoff (15%)</option>
                      <option value={4}>Stage 4: Core Engineering & Sprints (50%)</option>
                      <option value={5}>Stage 5: Automated Testing, Security Audit & Pen-Testing (75%)</option>
                      <option value={6}>Stage 6: Production Deployment & Cloud Handover (100%)</option>
                    </select>
                  </div>

                  {/* Progress Percent Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Overall Progress: {progress}%
                      </label>
                      <span className="text-[11px] text-blue-600 dark:text-blue-400 font-mono font-bold">
                        {progress}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  {/* Estimated Delivery */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Target Completion Date
                    </label>
                    <input
                      type="text"
                      value={estimatedCompletion}
                      onChange={(e) => setEstimatedCompletion(e.target.value)}
                      placeholder="e.g. October 30, 2026"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Lead Engineer */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Assigned Lead Engineer
                    </label>
                    <input
                      type="text"
                      value={leadEngineer}
                      onChange={(e) => setLeadEngineer(e.target.value)}
                      placeholder="e.g. David K. (Principal Architect)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Staging Sandbox URL */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Client Live Staging Sandbox URL
                    </label>
                    <input
                      type="text"
                      value={liveDemoUrl}
                      onChange={(e) => setLiveDemoUrl(e.target.value)}
                      placeholder="https://staging.yourdomain.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Github Repo */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Private Code Repository URL
                    </label>
                    <input
                      type="text"
                      value={githubRepo}
                      onChange={(e) => setGithubRepo(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Technical Sprint Engineer Note */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Current Milestone Sprint Note (Visible on Client Tracker)
                  </label>
                  <textarea
                    rows={3}
                    value={milestoneNote}
                    onChange={(e) => setMilestoneNote(e.target.value)}
                    placeholder="Provide technical progress notes, e.g. 'Sprint 2 backend APIs deployed. Razorpay webhook verified. Ready for staging test.'"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                  />
                </div>

                {/* Save Button & Status Notification */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-xs">
                    {saveStatus === "saved" && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Milestone status updated & synchronized live!
                      </span>
                    )}
                    {saveStatus === "error" && (
                      <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        Failed to update tracking.
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={saveStatus === "saving"}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all disabled:opacity-50"
                  >
                    {saveStatus === "saving" ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Publishing Updates...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save & Update Tracking</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-12 text-center text-xs text-slate-400">
              Select a project from the left panel to edit its tracking.
            </div>
          )}
        </div>
      </div>

      {/* New Project Registration Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Register New Project for Tracking
              </h3>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewTracking} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. NextGen E-Commerce Platform"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. Rajan Mehra"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Company</label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Mehra Retail"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Client Email *</label>
                  <input
                    type="email"
                    required
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Phone Number (10 digits)</label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="9876543210"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Project Description / Requirements</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Key features, scope, and technical stack..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold"
                >
                  Create Tracking Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
