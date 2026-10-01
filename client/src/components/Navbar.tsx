import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCompanyConfig } from "../context/CompanyConfigContext";
import {
  Sun,
  Moon,
  Menu,
  X,
  Code2,
  ArrowRight,
  Sparkles,
  Package,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { config } = useCompanyConfig();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Industries", path: "/industries" },
    { name: "Technologies", path: "/technologies" },
    { name: "Kinetic Store", path: "/store", isStore: true },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Pricing", path: "/pricing" },
    { name: "Track Project", path: "/track" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800"
            : "py-4 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 xl:gap-4">
            {/* Left: Brand Logo (Responsive sizing so it doesn't crowd navigation) */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none rounded-lg p-0.5 flex-shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform overflow-hidden flex-shrink-0">
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
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight tracking-tight whitespace-nowrap">
                  {config.name}
                </span>
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight hidden xl:block whitespace-nowrap">
                  {config.tagline}
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation (Zero overlap, whitespace-nowrap, adaptive padding) */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-shrink">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/70"
                    }`}
                  >
                    {link.isStore ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-blue-500" />
                        <span>{link.name}</span>
                        <span className="text-[9px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                          New
                        </span>
                      </span>
                    ) : (
                      link.name
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-800 focus:outline-none"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>

              {/* Login Link */}
              <Link
                to="/login"
                className="px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                Client Portal
              </Link>

              {/* Primary CTA: Start a Project */}
              <Link
                to="/start-project"
                className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs xl:text-sm font-semibold shadow-sm shadow-blue-600/25 transition-all whitespace-nowrap hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-80" />
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-slate-900 p-6 shadow-2xl flex flex-col justify-between z-50 border-l border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white overflow-hidden flex-shrink-0">
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
                      <Code2 className="w-4 h-4" />
                    )}
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {config.name}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-3 py-2.5 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {link.isStore && <Package className="w-4 h-4 text-blue-500" />}
                        <span>{link.name}</span>
                      </span>
                      {link.isStore && (
                        <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full uppercase">
                          New
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full text-center py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Client Portal Login
              </Link>
              <Link
                to="/start-project"
                className="w-full text-center py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30 hover:bg-blue-700"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
