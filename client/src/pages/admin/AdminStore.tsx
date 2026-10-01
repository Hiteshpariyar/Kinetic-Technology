import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Plus,
  Search,
  Upload,
  ExternalLink,
  Edit3,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Star,
  Download,
  Eye,
  FileCode2,
  Smartphone,
  Globe,
  Monitor,
  AlertTriangle,
  X,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import { KineticApp } from "../KineticStore";

export const AdminStore: React.FC = () => {
  const [apps, setApps] = useState<KineticApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<KineticApp | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Form Fields
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("FinTech");
  const [version, setVersion] = useState("v1.0.0");
  const [platforms, setPlatforms] = useState<string[]>(["Android", "Web"]);
  const [techStack, setTechStack] = useState("React, TypeScript, Node.js");
  const [tags, setTags] = useState("Software, Cloud");
  const [liveDemoUrl, setLiveDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [externalDownloadUrl, setExternalDownloadUrl] = useState("");
  const [featured, setFeatured] = useState(false);

  // File Upload states
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>("");
  const [iconUrl, setIconUrl] = useState("");
  const [appFile, setAppFile] = useState<File | null>(null);

  const categories = [
    "FinTech",
    "Healthcare",
    "Logistics",
    "E-Commerce",
    "AI & Tools",
    "Enterprise",
    "Education",
  ];

  const availablePlatforms = ["Android", "iOS", "Web", "Windows", "macOS"];

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/store");
      const data = await res.json();
      if (data.apps) {
        setApps(data.apps);
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const openCreateModal = () => {
    setEditingApp(null);
    setName("");
    setTagline("");
    setDescription("");
    setCategory("FinTech");
    setVersion("v1.0.0");
    setPlatforms(["Android", "Web"]);
    setTechStack("React, TypeScript, Node.js");
    setTags("Software, Cloud");
    setLiveDemoUrl("");
    setGithubUrl("");
    setExternalDownloadUrl("");
    setFeatured(false);
    setIconFile(null);
    setIconPreview("");
    setIconUrl("");
    setAppFile(null);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (app: KineticApp) => {
    setEditingApp(app);
    setName(app.name);
    setTagline(app.tagline);
    setDescription(app.description);
    setCategory(app.category);
    setVersion(app.version);
    setPlatforms(app.platform);
    setTechStack(app.techStack.join(", "));
    setTags(app.tags.join(", "));
    setLiveDemoUrl(app.liveDemoUrl || "");
    setGithubUrl(app.githubUrl || "");
    setExternalDownloadUrl(app.externalDownloadUrl || "");
    setFeatured(app.featured);
    setIconFile(null);
    setIconPreview(app.icon);
    setIconUrl(app.icon);
    setAppFile(null);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleAppFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAppFile(e.target.files[0]);
    }
  };

  const togglePlatform = (plat: string) => {
    setPlatforms((prev) =>
      prev.includes(plat) ? prev.filter((p) => p !== plat) : [...prev, plat]
    );
  };

  const handleSaveApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      setFormError("App Name and Description are required");
      return;
    }

    setIsSaving(true);
    setFormError("");

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("tagline", tagline.trim() || `${name.trim()} by Kinetic Technology`);
      formData.append("description", description.trim());
      formData.append("category", category);
      formData.append("version", version.trim() || "v1.0.0");
      formData.append("platform", platforms.join(","));
      formData.append("techStack", techStack);
      formData.append("tags", tags);
      formData.append("featured", String(featured));

      if (liveDemoUrl.trim()) formData.append("liveDemoUrl", liveDemoUrl.trim());
      if (githubUrl.trim()) formData.append("githubUrl", githubUrl.trim());
      if (externalDownloadUrl.trim()) {
        formData.append("externalDownloadUrl", externalDownloadUrl.trim());
      }

      if (iconFile) {
        formData.append("iconFile", iconFile);
      } else if (iconUrl.trim()) {
        formData.append("iconUrl", iconUrl.trim());
      }

      if (appFile) {
        formData.append("appFile", appFile);
      }

      const url = editingApp
        ? `http://localhost:4000/api/store/${editingApp.id}`
        : "http://localhost:4000/api/store";

      const method = editingApp ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setIsModalOpen(false);
        await fetchApps();
      } else {
        setFormError(data.message || "Failed to save application");
      }
    } catch {
      setFormError("Network error while uploading app files. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteApp = async (app: KineticApp) => {
    if (!window.confirm(`Are you sure you want to delete '${app.name}' from Kinetic Store?`)) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/store/${app.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApps((prev) => prev.filter((a) => a.id !== app.id));
      }
    } catch {
      // error handled
    }
  };

  const filteredApps = apps.filter((app) => {
    const matchesCategory =
      selectedCategory === "All" ||
      app.category.toLowerCase() === selectedCategory.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      app.name.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.category.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const totalDownloads = apps.reduce((sum, a) => sum + (a.downloadsCount || 0), 0);

  return (
    <div className="space-y-8">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Kinetic Store Manager
            </h1>
            <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded-full">
              Production App Distribution
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Upload new builds, manage app icons, descriptions, downloadable APKs/packages, and monitor user installs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/store"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Public Store View</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New App</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Apps Published
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {apps.length}
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              Live in store
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total App Downloads
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {totalDownloads.toLocaleString()}
            </div>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
              Across all platforms
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Featured Spotlights
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {apps.filter((a) => a.featured).length}
            </div>
            <span className="text-[11px] text-amber-600 font-medium">
              Highlighted on homepage
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
            <Star className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Storage Engine
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              Active
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Local & CDN Supported
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table Section with Filter & Search */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Search Bar & Category Filter */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps by name, category, or tagline..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium focus:outline-none"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              onClick={fetchApps}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-semibold uppercase">
                <th className="py-3 px-4">App Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Platforms</th>
                <th className="py-3 px-4">Package File</th>
                <th className="py-3 px-4">Downloads</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-blue-500" />
                    Loading applications...
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    No applications found. Click &quot;Upload New App&quot; to add one.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    {/* App icon & name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                          <img
                            src={app.icon}
                            alt={app.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=256&q=80";
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {app.name}
                            </span>
                            {app.featured && (
                              <span className="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold px-1.5 py-0.2 rounded">
                                Featured
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">
                            {app.tagline}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                        {app.category}
                      </span>
                    </td>

                    {/* Platforms */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {app.platform.map((p) => (
                          <span
                            key={p}
                            className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-medium"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Package File */}
                    <td className="py-3.5 px-4">
                      {app.fileUrl || app.fileName ? (
                        <div className="flex flex-col">
                          <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                            {app.fileName || "Uploaded Binary"}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {app.fileSize || "Ready to download"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Cloud Hosted</span>
                      )}
                    </td>

                    {/* Downloads */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {app.downloadsCount.toLocaleString()}
                    </td>

                    {/* Rating */}
                    <td className="py-3.5 px-4">
                      <span className="flex items-center gap-1 font-bold text-amber-500 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{app.rating.toFixed(1)}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(app)}
                          title="Edit Application"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteApp(app)}
                          title="Delete Application"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload / Edit App Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {editingApp ? "Edit Kinetic Store Application" : "Upload & Publish New Application"}
                </h3>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveApp} className="p-6 space-y-4 text-xs">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Basic Details: Name and Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Application Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. FinScale Payments"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Short Tagline *
                  </label>
                  <input
                    type="text"
                    required
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Ultra-fast UPI payments & QR settlements"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              {/* Category and Version */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Build Version
                  </label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="e.g. v2.1.0"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              {/* App Icon Upload Section (Required by user) */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <label className="block font-bold text-slate-900 dark:text-white">
                  Application Icon (Upload File or Enter URL) *
                </label>
                <div className="flex items-center gap-4">
                  {/* Icon preview */}
                  <div className="w-14 h-14 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 overflow-hidden flex items-center justify-center flex-shrink-0">
                    {iconPreview || iconUrl ? (
                      <img
                        src={iconPreview || iconUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIconChange}
                      className="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-950 dark:file:text-blue-300"
                    />
                    <input
                      type="text"
                      value={iconUrl}
                      onChange={(e) => {
                        setIconUrl(e.target.value);
                        if (!iconFile) setIconPreview(e.target.value);
                      }}
                      placeholder="Or paste external image URL (e.g. https://...)"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* App Binary / Package File Upload (Required by user) */}
              <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 space-y-2">
                <label className="block font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Application Package File (APK, ZIP, EXE, Installer)</span>
                  {appFile && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">
                      Selected: {appFile.name} ({(appFile.size / (1024 * 1024)).toFixed(1)} MB)
                    </span>
                  )}
                </label>
                <input
                  type="file"
                  onChange={handleAppFileChange}
                  className="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">Or External URL:</span>
                  <input
                    type="url"
                    value={externalDownloadUrl}
                    onChange={(e) => setExternalDownloadUrl(e.target.value)}
                    placeholder="https://drive.google.com/... or AWS S3 download link"
                    className="flex-1 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
                  />
                </div>
              </div>

              {/* Target Platforms */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Platforms
                </label>
                <div className="flex flex-wrap gap-2">
                  {availablePlatforms.map((p) => {
                    const isSelected = platforms.includes(p);
                    return (
                      <button
                        type="button"
                        key={p}
                        onClick={() => togglePlatform(p)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{p}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description (Required by user) */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Application Description & Features *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the architecture, key user features, security measures, and instructions..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium leading-relaxed"
                />
              </div>

              {/* Live Sandbox & GitHub Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Live Demo Sandbox URL
                  </label>
                  <input
                    type="url"
                    value={liveDemoUrl}
                    onChange={(e) => setLiveDemoUrl(e.target.value)}
                    placeholder="https://staging.domain.com"
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    GitHub / Case Study URL
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              {/* Tech Stack & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    placeholder="e.g. React, Node.js, PostgreSQL"
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. UPI, Payments, Fintech"
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="featured" className="font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                  Feature this application in the Spotlight Carousel on Kinetic Store homepage
                </label>
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/25 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Publishing Build...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>{editingApp ? "Save Changes" : "Publish to Kinetic Store"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
