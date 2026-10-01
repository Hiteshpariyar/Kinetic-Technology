import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { companyConfig } from "../../config/companyConfig";
import { useTheme } from "../../context/ThemeContext";
import { useCompanyConfig } from "../../context/CompanyConfigContext";
import { API_BASE_URL } from "../../utils/api";
import {
  LayoutDashboard,
  Users,
  IndianRupee,
  Layers,
  Code2,
  Building2,
  ShieldAlert,
  Settings,
  Sun,
  Moon,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  Sparkles,
  CheckCircle2,
  Activity,
  Lock,
  Key,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertTriangle,
  ArrowRight,
  Receipt,
  Package,
  Loader2,
} from "lucide-react";

export const AdminLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { config } = useCompanyConfig();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Authentication State Guard
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("kt_admin_authenticated") === "true";
  });
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotNotice, setForgotNotice] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    const cleanId = adminId.trim().toLowerCase();
    // Required Admin Credentials:
    // ID: kinetictechnology.admin.com
    // Password: kinetictechnology@admin307628
    if (
      (cleanId === "kinetictechnology.admin.com" || cleanId === "admin@kinetictech.com") &&
      adminPassword === "kinetictechnology@admin307628"
    ) {
      sessionStorage.setItem("kt_admin_authenticated", "true");
      setIsAuthenticated(true);
      setIsLoggingIn(false);
      return;
    }

    // Also attempt server-side verification
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminId.trim(), password: adminPassword }),
      });

      if (res.ok) {
        sessionStorage.setItem("kt_admin_authenticated", "true");
        setIsAuthenticated(true);
      } else {
        setAuthError("Access Denied: Invalid Administrative ID or Security Key.");
      }
    } catch {
      setAuthError("Access Denied: Invalid Administrative ID or Security Key.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("kt_admin_authenticated");
    setIsAuthenticated(false);
    setAdminPassword("");
  };

  const navItems = [
    { name: "Overview & Analytics", path: "/admin", icon: LayoutDashboard },
    { name: "Project Tracking", path: "/admin/tracking", icon: Activity },
    { name: "Invoices & Payments", path: "/admin/invoices", icon: Receipt },
    { name: "Kinetic Store", path: "/admin/store", icon: Package },
    { name: "Leads & Estimates", path: "/admin/leads", icon: Users },
    { name: "Pricing Engine", path: "/admin/pricing", icon: IndianRupee },
    { name: "Services Catalog", path: "/admin/services", icon: Layers },
    { name: "Technologies", path: "/admin/technologies", icon: Code2 },
    { name: "Industries", path: "/admin/industries", icon: Building2 },
    { name: "Team & Permissions", path: "/admin/team", icon: Users },
    { name: "Audit & Activity Logs", path: "/admin/audit-logs", icon: ShieldAlert },
    { name: "Platform Settings", path: "/admin/settings", icon: Settings },
  ];

  // If not authenticated, render restricted Admin Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between items-center px-4 py-6 sm:py-10 relative overflow-hidden font-sans antialiased transition-colors duration-200">
        {/* Subtle background ambient radial */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[360px] bg-blue-500/[0.04] dark:bg-blue-600/[0.035] blur-[120px] rounded-full" />
        </div>

        {/* Top Header Row with Theme Toggle & Website Back Link */}
        <header className="w-full max-w-5xl flex items-center justify-between z-10 px-2 sm:px-4">
          <Link
            to="/"
            className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors flex items-center gap-1.5"
          >
            ← Return to website
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </header>

        {/* Login Area Container */}
        <main className="w-full max-w-[390px] z-10 my-auto py-4 transition-opacity duration-300 motion-reduce:transition-none">
          {/* Brand & Logo Header */}
          <div className="flex flex-col items-center text-center mb-6">
            {/* Logo */}
            <div className="mb-4">
              {config.logoUrl ? (
                <img
                  src={config.logoUrl}
                  alt={config.name || "Kinetic Technology"}
                  className="w-11 h-11 object-contain rounded-xl shadow-sm border border-slate-200 dark:border-slate-800"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg tracking-wider select-none shadow-sm shadow-blue-500/20">
                  K
                </div>
              )}
            </div>

            {/* Brand Eyebrow */}
            <div className="space-y-0.5">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase">
                Kinetic Technology
              </p>
              <p className="text-[10px] font-medium tracking-[0.14em] text-slate-400 dark:text-slate-500 uppercase">
                Admin Console
              </p>
            </div>

            {/* Main Heading & Description */}
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-2.5">
              Welcome back
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Sign in to access your administration workspace.
            </p>
          </div>

          {/* Login Card (Crisp White in light mode) */}
          <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm">
            {authError && (
              <div
                role="alert"
                className="mb-4 px-3.5 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5"
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-500 mt-0.5" />
                <span className="leading-relaxed">{authError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              {/* Admin ID Field */}
              <div>
                <label
                  htmlFor="adminId"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
                >
                  Admin ID
                </label>
                <input
                  id="adminId"
                  name="adminId"
                  type="text"
                  required
                  autoComplete="username"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="Enter your admin ID"
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-150 shadow-sm"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="adminPassword"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotNotice(!forgotNotice)}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 focus:outline-none font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="adminPassword"
                    name="adminPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-10 pl-3.5 pr-10 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-150 shadow-sm"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors duration-150 focus:outline-none p-0.5"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Discreet Forgot Password Notice */}
              {forgotNotice && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Administrative credentials must be reset through root administration. Contact{" "}
                  <a
                    href={`mailto:${config.email || "support@kinetictech.com"}?subject=Admin%20Password%20Reset%20Request`}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {config.email || "support@kinetictech.com"}
                  </a>
                  .
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full h-10 mt-1 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
          </div>

          {/* Under-Card Context: Protected Administrative Access */}
          <div className="mt-5 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wide">
              Protected administrative access
            </p>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="w-full text-center py-4 text-xs text-slate-400 dark:text-slate-500 z-10">
          © 2026 Kinetic Technology
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 overflow-hidden flex-shrink-0">
                {config.logoUrl ? (
                  <img
                    src={config.logoUrl}
                    alt={config.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <Code2 className="w-5 h-5" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                  {config.name}
                </span>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                  Admin Console
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === "/admin"
                  ? location.pathname === "/admin"
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </span>
            <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
              Live
            </span>
          </Link>

          <div className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                A
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Super Admin
                </span>
                <span className="text-[10px] text-slate-400 truncate">kinetictechnology.admin.com</span>
              </div>
            </div>

            <button
              onClick={handleAdminLogout}
              title="Lock Admin Panel / Sign Out"
              className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search leads, tracking, rules..."
                className="w-full pl-9 pr-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Lock / Logout Button in Header */}
            <button
              onClick={handleAdminLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors border border-rose-200 dark:border-rose-900"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Admin</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
