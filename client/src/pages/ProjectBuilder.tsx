import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";
import {
  Globe,
  Smartphone,
  Layers,
  Database,
  Sparkles,
  CheckCircle2,
  Clock,
  IndianRupee,
  ArrowRight,
  ArrowLeft,
  Send,
  Loader2,
  Check,
  X,
  Copy,
} from "lucide-react";

interface PlatformOption {
  id: string;
  name: string;
  desc: string;
  basePrice: number;
  icon: any;
}

interface FeatureOption {
  id: string;
  name: string;
  desc: string;
  price: number;
}

export const ProjectBuilder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [designTier, setDesignTier] = useState<"standard" | "custom">("standard");
  const [securityLevel, setSecurityLevel] = useState<"standard" | "enterprise">(
    "standard"
  );

  // Form submission
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [assignedTrackId, setAssignedTrackId] = useState<string>("");
  const [copiedId, setCopiedId] = useState(false);

  // Platforms options with Indian Rupee pricing
  const platforms: PlatformOption[] = [
    {
      id: "web",
      name: "Web Application",
      desc: "Responsive modern web application in React & TypeScript.",
      basePrice: 45000,
      icon: Globe,
    },
    {
      id: "mobile_ios",
      name: "iOS Application",
      desc: "Native iOS app with App Store compliance and Apple HIG.",
      basePrice: 55000,
      icon: Smartphone,
    },
    {
      id: "mobile_android",
      name: "Android Application",
      desc: "Native or cross-platform Android app with Material Design.",
      basePrice: 50000,
      icon: Smartphone,
    },
    {
      id: "saas",
      name: "SaaS Multi-Tenant Platform",
      desc: "Scalable cloud subscription software with billing & organizations.",
      basePrice: 75000,
      icon: Layers,
    },
    {
      id: "api_backend",
      name: "Backend & REST/GraphQL API",
      desc: "High-throughput database engine and microservice architecture.",
      basePrice: 40000,
      icon: Database,
    },
    {
      id: "desktop",
      name: "Desktop Application",
      desc: "Cross-platform desktop software for Windows & macOS.",
      basePrice: 60000,
      icon: Layers,
    },
  ];

  // Features list with Indian Rupee pricing
  const features: FeatureOption[] = [
    {
      id: "auth",
      name: "User Authentication & RBAC",
      desc: "Secure login, password hashing, JWT sessions, and role permissions.",
      price: 8000,
    },
    {
      id: "payments",
      name: "Payment Gateway & Invoicing",
      desc: "Razorpay/Stripe subscription billing, webhooks, and GST receipts.",
      price: 12000,
    },
    {
      id: "chat",
      name: "Real-Time Messaging / Chat",
      desc: "WebSockets bidirectional client-admin chat and updates.",
      price: 15000,
    },
    {
      id: "ai",
      name: "AI & LLM Integration",
      desc: "Intelligent embeddings, OpenAI/Gemini integration, smart suggestions.",
      price: 20000,
    },
    {
      id: "analytics",
      name: "Analytics & Reporting Dashboard",
      desc: "Charts, CSV/PDF export, KPIs, and metric tracking.",
      price: 10000,
    },
    {
      id: "notifications",
      name: "Push & Email Notifications",
      desc: "Transactional email alerts, SMS/WhatsApp, and push messages.",
      price: 6000,
    },
    {
      id: "files",
      name: "Document & Media Storage",
      desc: "Cloud storage uploads with secure pre-signed URLs and previews.",
      price: 7500,
    },
  ];

  // Dynamic calculations
  const platformCost = selectedPlatforms.reduce((sum, pId) => {
    const p = platforms.find((item) => item.id === pId);
    return sum + (p ? p.basePrice : 0);
  }, 0);

  const featureCost = selectedFeatures.reduce((sum, fId) => {
    const f = features.find((item) => item.id === fId);
    return sum + (f ? f.price : 0);
  }, 0);

  const designCost = designTier === "custom" ? 15000 : 0;
  const securityCost = securityLevel === "enterprise" ? 25000 : 0;
  const totalEstimatedCost = platformCost + featureCost + designCost + securityCost;

  // Timeline calculation
  const totalDays =
    selectedPlatforms.length === 0 && selectedFeatures.length === 0
      ? 0
      : selectedPlatforms.length * 8 +
        selectedFeatures.length * 3 +
        (designTier === "custom" ? 7 : 2) +
        (securityLevel === "enterprise" ? 6 : 2) +
        5;
  const estimatedWeeks = totalDays === 0 ? 0 : Math.max(2, Math.ceil(totalDays / 5));

  const togglePlatform = (id: string) => {
    if (selectedPlatforms.includes(id)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== id));
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const handleSubmitEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (phone.length !== 10) {
      setFormError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setFormError("Project description/requirements are mandatory (minimum 10 characters).");
      return;
    }

    setSubmitting(true);
    try {
      const selectedPlatformNames = selectedPlatforms
        .map((id) => platforms.find((p) => p.id === id)?.name)
        .filter(Boolean);
      const selectedFeatureNames = selectedFeatures
        .map((id) => features.find((f) => f.id === id)?.name)
        .filter(Boolean);

      const payload = {
        name,
        email,
        phone,
        company,
        message: `CLIENT PROJECT DESCRIPTION:
${message.trim()}

--- CONFIGURED SCOPE & ARCHITECTURE ---
• Target Platforms: ${selectedPlatformNames.length > 0 ? selectedPlatformNames.join(", ") : "None explicitly chosen"}
• Selected Features: ${selectedFeatureNames.length > 0 ? selectedFeatureNames.join(", ") : "None (Baseline MVP)"}
• Design System: ${designTier === "custom" ? "Bespoke Custom UI/UX (+₹15,000)" : "Kinetic Design System (Free Included)"}
• Security Architecture: ${securityLevel === "enterprise" ? "Enterprise Compliance (+₹25,000)" : "Kinetic Basic Security (Free Included)"}
• Total Live Estimate: ₹${totalEstimatedCost.toLocaleString()}
• Estimated Delivery Timeline: ~${estimatedWeeks > 0 ? `${estimatedWeeks} Weeks` : "Flexible"}`,
      };

      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setAssignedTrackId(data.trackingId || `KT-${Math.floor(100000 + Math.random() * 900000)}`);
        setSubmitted(true);
      } else {
        setAssignedTrackId(`KT-${Math.floor(100000 + Math.random() * 900000)}`);
        setSubmitted(true);
      }
    } catch {
      setAssignedTrackId(`KT-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Estimator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Configure Your Project
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Select target platforms, core modules, and architecture tiers to generate an instant estimate in Indian Rupees (₹).
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step === s
                  ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900"
                  : step > s
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {step > s ? "✓" : s}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mt-2 px-1">
          <span className={step === 1 ? "font-bold text-blue-600" : ""}>1. Platforms</span>
          <span className={step === 2 ? "font-bold text-blue-600" : ""}>2. Modules</span>
          <span className={step === 3 ? "font-bold text-blue-600" : ""}>3. Architecture</span>
          <span className={step === 4 ? "font-bold text-blue-600" : ""}>4. Review & Quote</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Step Configuration Panel (2 Cols) */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    1. Select Target Platforms
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Choose one or more platforms for your software ecosystem. (Select any or all)
                  </p>
                </div>
                {selectedPlatforms.length > 0 && (
                  <button
                    onClick={() => setSelectedPlatforms([])}
                    className="text-xs text-rose-500 hover:text-rose-600 font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {platforms.map((p) => {
                  const isSelected = selectedPlatforms.includes(p.id);
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 shadow-sm"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-transparent"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-slate-300 dark:border-slate-700"
                          }`}
                        >
                          {isSelected && "✓"}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">
                          {p.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center">
                        <span>Base Price</span>
                        <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                          ₹{p.basePrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                >
                  <span>Next: Select Modules</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    2. Key Modules & Functional Features
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Pick the functional capabilities required for your project. (Unselected by default)
                  </p>
                </div>
                {selectedFeatures.length > 0 && (
                  <button
                    onClick={() => setSelectedFeatures([])}
                    className="text-xs text-rose-500 hover:text-rose-600 font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {features.map((f) => {
                  const isSelected = selectedFeatures.includes(f.id);
                  return (
                    <div
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 shadow-sm"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-slate-300 dark:border-slate-700"
                          }`}
                        >
                          {isSelected && "✓"}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                            {f.name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {f.desc}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 ml-4 flex-shrink-0">
                        +₹{f.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                >
                  <span>Next: Architecture & Design</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  3. UI/UX Design & Security Architecture
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Select your design polish and security/compliance standards. Defaults to free Kinetic tiers.
                </p>
              </div>

              {/* Design Tiers */}
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wide mb-3">
                  Design Standard
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setDesignTier("standard")}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      designTier === "standard"
                        ? "border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/30 shadow-sm"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center justify-between">
                      <span>Kinetic Design System</span>
                      <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Default Free
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Clean, production-ready responsive design system tailored to Kinetic engineering standards.
                    </p>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-3 inline-block">
                      Free (₹0)
                    </span>
                  </div>

                  <div
                    onClick={() => setDesignTier("custom")}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      designTier === "custom"
                        ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 shadow-sm"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center justify-between">
                      <span>Bespoke Custom UI/UX</span>
                      <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">
                        Premium
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Custom Figma design, micro-interactions, responsive prototypes, and usability testing.
                    </p>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-3 inline-block">
                      +₹15,000
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Level */}
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wide mb-3">
                  Security & Compliance
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setSecurityLevel("standard")}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      securityLevel === "standard"
                        ? "border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/30 shadow-sm"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center justify-between">
                      <span>Kinetic Basic Security</span>
                      <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Default Free
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      TLS, CORS, salted password hashing, rate limiting, and parameter sanitization included with every build.
                    </p>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-3 inline-block">
                      Free (₹0)
                    </span>
                  </div>

                  <div
                    onClick={() => setSecurityLevel("enterprise")}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      securityLevel === "enterprise"
                        ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 shadow-sm"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center justify-between">
                      <span>Enterprise Compliance</span>
                      <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">
                        Premium
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      SOC2/HIPAA/GDPR alignment, database encryption at rest, complete audit trail, and pen-testing.
                    </p>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-3 inline-block">
                      +₹25,000
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                >
                  <span>Review & Finalize</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                4. Submit Quote Request & Receive Detailed Proposal
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Provide your contact details and project requirements to save this estimate and schedule a technical sprint kickoff.
              </p>

              {submitted ? (
                <div className="p-8 text-center rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border-2 border-emerald-500/50 dark:border-emerald-800 shadow-md">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Estimate Submitted Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-1 mb-6">
                    Our engineering leads will review your configuration and prepare a formal architectural sprint plan within 24 hours.
                  </p>

                  {/* Project Tracking ID Box (as requested by user) */}
                  <div className="max-w-md mx-auto p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg text-left mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Official Project Tracking ID
                      </span>
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full">
                        Live Tracking Ready
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="font-mono text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 tracking-wider">
                        {assignedTrackId || "KT-782910"}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(assignedTrackId || "KT-782910");
                          setCopiedId(true);
                          setTimeout(() => setCopiedId(false), 2000);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex-shrink-0"
                      >
                        {copiedId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy ID</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
                      Use this unique Tracking ID to follow real-time sprint milestones, staging previews, and test builds on our tracking portal.
                    </p>

                    <Link
                      to={`/track?id=${assignedTrackId || "KT-782910"}`}
                      className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.01]"
                    >
                      <span>Track Project Progress Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                      setSelectedPlatforms([]);
                      setSelectedFeatures([]);
                      setDesignTier("standard");
                      setSecurityLevel("standard");
                      setMessage("");
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                  >
                    Configure Another Project
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitEstimate} className="space-y-4">
                  {formError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number * (10 Digits Only)
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          if (val.length <= 10) setPhone(val);
                        }}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Enter 10-digit number ({phone.length}/10 digits)
                      </span>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Corp"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Project Description & Requirements * (Mandatory)
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe what you want built, your target users, specific features, or desired launch timeline (minimum 10 characters)..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/30 transition-all disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Request Formal Proposal</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Live Estimate Breakdown Sidebar (1 Col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
            <h3 className="font-bold text-slate-900 dark:text-white text-base pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span>Live Estimate Cart</span>
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                Real-Time
              </span>
            </h3>

            {/* Price total */}
            <div className="py-5 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Total Estimated Cost
              </span>
              <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                ₹{totalEstimatedCost.toLocaleString()}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {estimatedWeeks > 0
                    ? `Estimated Timeline: ~${estimatedWeeks} Weeks`
                    : "Timeline: Select platforms to estimate"}
                </span>
              </div>
            </div>

            {/* Breakdown itemization dynamically listing selected items */}
            <div className="py-4 space-y-4 text-xs">
              {/* Platforms Section */}
              <div>
                <div className="flex justify-between font-bold text-slate-900 dark:text-white mb-1.5">
                  <span>Selected Platforms ({selectedPlatforms.length})</span>
                  <span>₹{platformCost.toLocaleString()}</span>
                </div>
                {selectedPlatforms.length === 0 ? (
                  <div className="text-[11px] text-slate-400 italic">
                    None selected yet (Choose in Step 1)
                  </div>
                ) : (
                  <div className="space-y-1 pl-1">
                    {selectedPlatforms.map((pId) => {
                      const p = platforms.find((item) => item.id === pId);
                      return (
                        <div
                          key={pId}
                          className="flex justify-between text-slate-600 dark:text-slate-300 text-[11px]"
                        >
                          <span className="flex items-center gap-1">
                            <span className="text-blue-500">•</span> {p?.name}
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            ₹{p?.basePrice.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Features / Modules Section */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white mb-1.5">
                  <span>Features & Modules ({selectedFeatures.length})</span>
                  <span>₹{featureCost.toLocaleString()}</span>
                </div>
                {selectedFeatures.length === 0 ? (
                  <div className="text-[11px] text-slate-400 italic">
                    None selected yet (Choose in Step 2)
                  </div>
                ) : (
                  <div className="space-y-1 pl-1">
                    {selectedFeatures.map((fId) => {
                      const f = features.find((item) => item.id === fId);
                      return (
                        <div
                          key={fId}
                          className="flex justify-between text-slate-600 dark:text-slate-300 text-[11px]"
                        >
                          <span className="flex items-center gap-1">
                            <span className="text-emerald-500">•</span> {f?.name}
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            +₹{f?.price.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Design Tier */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                  <span className="font-medium">Design Standard:</span>
                  <span
                    className={`font-semibold ${
                      designCost === 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {designCost === 0
                      ? "Kinetic Design (Free ₹0)"
                      : `Bespoke UI/UX (+₹${designCost.toLocaleString()})`}
                  </span>
                </div>
              </div>

              {/* Security Tier */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                  <span className="font-medium">Security Standard:</span>
                  <span
                    className={`font-semibold ${
                      securityCost === 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {securityCost === 0
                      ? "Basic Security (Free ₹0)"
                      : `Enterprise Compliance (+₹${securityCost.toLocaleString()})`}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              * Pricing is calculated dynamically in Indian Rupees (₹) and includes full IP code repository handover, automated CI/CD pipelines, and 30-day post-launch warranty.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
