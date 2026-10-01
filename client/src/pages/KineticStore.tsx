import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";
import {
  Search,
  Download,
  ExternalLink,
  Smartphone,
  Globe,
  Monitor,
  Sparkles,
  Star,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Package,
  X,
  Code2,
  Calendar,
  Eye,
  FileCode2,
  Tag,
  Filter,
  Flame,
  Info,
} from "lucide-react";

export interface KineticApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  icon: string;
  platform: string[];
  version: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  externalDownloadUrl?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  rating: number;
  downloadsCount: number;
  featured: boolean;
  tags: string[];
  techStack: string[];
  screenshots?: string[];
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
}

export const KineticStore: React.FC = () => {
  const [apps, setApps] = useState<KineticApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [selectedApp, setSelectedApp] = useState<KineticApp | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const categories = [
    "All",
    "FinTech",
    "Healthcare",
    "Logistics",
    "E-Commerce",
    "AI & Tools",
    "Enterprise",
  ];

  const platforms = [
    "All",
    "Android",
    "iOS",
    "Web",
    "Windows",
  ];

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/store`);
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

  const handleDownload = async (app: KineticApp, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDownloadingId(app.id);

    try {
      const res = await fetch(`${API_BASE_URL}/store/${app.id}/download`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.downloadUrl) {
        // Trigger browser download or open download URL
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = data.fileName || `${app.name.toLowerCase().replace(/\s+/g, "-")}-app`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Update local download counter
        setApps((prev) =>
          prev.map((a) => (a.id === app.id ? { ...a, downloadsCount: a.downloadsCount + 1 } : a))
        );
        if (selectedApp?.id === app.id) {
          setSelectedApp((prev) =>
            prev ? { ...prev, downloadsCount: prev.downloadsCount + 1 } : null
          );
        }
      }
    } catch {
      if (app.fileUrl || app.externalDownloadUrl) {
        window.open(app.fileUrl || app.externalDownloadUrl, "_blank");
      }
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
    }
  };

  const filteredApps = apps.filter((app) => {
    const matchesCat =
      selectedCategory === "All" ||
      app.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesPlat =
      selectedPlatform === "All" ||
      app.platform.some((p) => p.toLowerCase() === selectedPlatform.toLowerCase());
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      app.name.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.tags.some((t) => t.toLowerCase().includes(q)) ||
      app.techStack.some((t) => t.toLowerCase().includes(q));

    return matchesCat && matchesPlat && matchesQuery;
  });

  const featuredApps = apps.filter((a) => a.featured);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Package className="w-3.5 h-3.5" />
            <span>Official Application Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Kinetic App Store
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Explore and download production-ready mobile, web, and enterprise applications engineered by Kinetic Technology. Test live interactive staging builds or download verified APKs.
          </p>
        </div>

        {/* Featured App Showcase Carousel / Cards */}
        {featuredApps.length > 0 && selectedCategory === "All" && !searchQuery && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Featured Spotlight Releases</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredApps.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className="group relative bg-gradient-to-br from-white via-white to-blue-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-blue-500/50 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex-shrink-0">
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=256&q=80";
                          }}
                        />
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                          {app.category}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {app.version}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-black text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                        {app.tagline}
                      </p>
                    </div>

                    {/* Platform badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {app.platform.map((p) => (
                        <span
                          key={p}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300"
                        >
                          {p.toLowerCase().includes("android") ? (
                            <Smartphone className="w-2.5 h-2.5 text-emerald-500" />
                          ) : p.toLowerCase().includes("web") ? (
                            <Globe className="w-2.5 h-2.5 text-blue-500" />
                          ) : (
                            <Monitor className="w-2.5 h-2.5 text-purple-500" />
                          )}
                          <span>{p}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{app.rating.toFixed(1)}</span>
                      </span>
                      <span>•</span>
                      <span>{app.downloadsCount.toLocaleString()} installs</span>
                    </div>

                    <button
                      onClick={(e) => handleDownload(app, e)}
                      disabled={downloadingId === app.id}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloadingId === app.id ? "Downloading..." : "Download"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search apps by name, keywords, tech stack (e.g. UPI, Health, React, Flutter)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Platform Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {platforms.map((plat) => (
                <button
                  key={plat}
                  onClick={() => setSelectedPlatform(plat)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedPlatform === plat
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 flex-shrink-0">
              <Filter className="w-3 h-3" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* All Apps Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredApps.length}</strong> applications
            </span>
            {filteredApps.length > 0 && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>All builds scanned & virus-free</span>
              </span>
            )}
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400 text-sm">
              <Package className="w-8 h-8 animate-bounce mx-auto mb-2 text-blue-500" />
              Loading Kinetic Store applications...
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
              <Package className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Applications Found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No apps matched your search criteria. Try selecting &quot;All&quot; categories or searching for a different keyword.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedPlatform("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=256&q=80";
                          }}
                        />
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                          {app.category}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {app.version}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {app.tagline}
                      </p>
                    </div>

                    {/* Platforms and File info */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <div className="flex items-center gap-1.5">
                        {app.platform.slice(0, 3).map((p) => (
                          <span
                            key={p}
                            className="bg-slate-50 dark:bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px] font-medium"
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      {app.fileSize && (
                        <span className="font-mono text-[10px] font-semibold text-slate-500">
                          {app.fileSize}
                        </span>
                      )}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1">
                      {app.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{app.rating.toFixed(1)}</span>
                      </span>
                      <span>•</span>
                      <span>{app.downloadsCount.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {app.liveDemoUrl && (
                        <a
                          href={app.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Open Live Sandbox Demo"
                          className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        onClick={(e) => handleDownload(app, e)}
                        disabled={downloadingId === app.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{downloadingId === app.id ? "Saving..." : "Get App"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Build Request Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-8 sm:p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-xl relative z-10">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-400">
              Need A Bespoke Application?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Want a custom app built for your business?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Use our interactive Project Builder to configure platforms, custom features, and receive an instant estimate with real-time project tracking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10 flex-shrink-0">
            <Link
              to="/start-project"
              className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Build My Custom App</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Detailed App Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8">
              {/* Modal Header */}
              <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 relative">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex-shrink-0">
                    <img
                      src={selectedApp.icon}
                      alt={selectedApp.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                        {selectedApp.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-500">
                        {selectedApp.version}
                      </span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Build</span>
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                      {selectedApp.name}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {selectedApp.tagline}
                    </p>
                  </div>
                </div>

                {/* Metrics bar */}
                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>{selectedApp.rating.toFixed(1)} / 5.0 Rating</span>
                  </div>

                  <span className="text-slate-400">•</span>

                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {selectedApp.downloadsCount.toLocaleString()} Total Downloads
                  </span>

                  <span className="text-slate-400">•</span>

                  <span className="font-mono text-slate-500">
                    {selectedApp.fileSize || "Cloud Package"}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto text-xs sm:text-sm">
                {/* Description */}
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide text-xs">
                    About This Application
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {selectedApp.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide text-xs">
                    Architecture & Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Supported Platforms */}
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide text-xs">
                    Target Platforms & Deployments
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.platform.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {p.toLowerCase().includes("android") ? (
                          <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                        ) : p.toLowerCase().includes("web") ? (
                          <Globe className="w-3.5 h-3.5 text-blue-500" />
                        ) : (
                          <Monitor className="w-3.5 h-3.5 text-purple-500" />
                        )}
                        <span>{p}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {selectedApp.liveDemoUrl && (
                      <a
                        href={selectedApp.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Launch Live Sandbox</span>
                      </a>
                    )}
                    {selectedApp.githubUrl && (
                      <a
                        href={selectedApp.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 hover:underline text-xs"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>View Repository</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleDownload(selectedApp)}
                    disabled={downloadingId === selectedApp.id}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {downloadingId === selectedApp.id
                        ? "Initiating Download..."
                        : `Download ${selectedApp.fileName ? `(${selectedApp.fileSize})` : "Package"}`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
