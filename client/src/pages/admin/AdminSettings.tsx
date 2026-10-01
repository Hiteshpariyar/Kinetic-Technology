import React, { useState, useEffect } from "react";
import { useCompanyConfig } from "../../context/CompanyConfigContext";
import {
  Save,
  CheckCircle2,
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  ShieldCheck,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Code2,
  RefreshCw,
  Eye,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export const AdminSettings: React.FC = () => {
  const { config, updateConfig, refreshConfig } = useCompanyConfig();

  // Form State initialized from live config
  const [name, setName] = useState(config.name);
  const [tagline, setTagline] = useState(config.tagline);
  const [description, setDescription] = useState(config.description);
  const [email, setEmail] = useState(config.email);
  const [phone, setPhone] = useState(config.phone);
  const [street, setStreet] = useState(config.address.street);
  const [city, setCity] = useState(config.address.city);
  const [state, setState] = useState(config.address.state);
  const [country, setCountry] = useState(config.address.country);
  const [trustBadge, setTrustBadge] = useState(config.trustBadge);
  const [currency, setCurrency] = useState(config.currency);

  // Logo upload state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>(config.logoUrl || "");
  const [logoUrl, setLogoUrl] = useState(config.logoUrl || "");

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Keep form in sync when context config updates
  useEffect(() => {
    setName(config.name);
    setTagline(config.tagline);
    setDescription(config.description);
    setEmail(config.email);
    setPhone(config.phone);
    setStreet(config.address.street);
    setCity(config.address.city);
    setState(config.address.state);
    setCountry(config.address.country);
    setTrustBadge(config.trustBadge);
    setCurrency(config.currency);
    setLogoPreview(config.logoUrl || "");
    setLogoUrl(config.logoUrl || "");
  }, [config]);

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
      setLogoUrl("");
    }
  };

  const handleResetLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
    setLogoUrl("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Company Name is required");
      return;
    }

    setSaving(true);
    setErrorMsg("");
    setSavedSuccess(false);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("tagline", tagline.trim());
      formData.append("description", description.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("street", street.trim());
      formData.append("city", city.trim());
      formData.append("state", state.trim());
      formData.append("country", country.trim());
      formData.append("trustBadge", trustBadge.trim());
      formData.append("currency", currency);
      formData.append("currencySymbol", currency === "INR" ? "₹" : "$");

      if (logoFile) {
        formData.append("logoFile", logoFile);
      } else {
        formData.append("logoUrl", logoUrl.trim());
      }

      const success = await updateConfig(formData);
      if (success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      } else {
        setErrorMsg("Failed to update platform settings. Please check server connection.");
      }
    } catch {
      setErrorMsg("Error saving settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Platform & Company Settings
            </h1>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full">
              Live Brand Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Update company logo, company name, footer bio, corporate contact details, and trust guarantees live across the entire website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refreshConfig()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reload Settings</span>
        </button>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2.5 shadow-sm">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500" />
          <span>
            Platform brand configuration updated successfully! Changes are live across Navbar, Footer, and Public Pages.
          </span>
        </div>
      )}

      {/* Error Notification */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: Brand Identity & Logo */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Brand Identity & Logo Configuration
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">Updates Header & Footer Logos</span>
          </div>

          {/* Logo Upload & Customizer */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <label className="block text-xs font-bold text-slate-900 dark:text-white">
              Company Logo (Upload Custom Image or Use Default Icon)
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {/* Logo Preview Avatar */}
              <div className="relative group w-20 h-20 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0 shadow-md">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Company Logo Preview"
                    className="w-full h-full object-cover"
                    onError={() => setLogoPreview("")}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                    <Code2 className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Upload controls */}
              <div className="flex-1 space-y-2 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm shadow-blue-500/25">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Logo File (PNG / JPG / SVG)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileChange}
                      className="hidden"
                    />
                  </label>

                  {logoPreview && (
                    <button
                      type="button"
                      onClick={handleResetLogo}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Use Default Icon (&lt;/&gt;)</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400">Or Image URL:</span>
                  <input
                    type="url"
                    value={logoUrl}
                    onChange={(e) => {
                      setLogoUrl(e.target.value);
                      if (!logoFile) setLogoPreview(e.target.value);
                    }}
                    placeholder="https://yourdomain.com/logo.png"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Company Name & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kinetic Technology"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Corporate Tagline / Subtitle
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Innovative Software Solutions"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Footer & Public Section (Exactly matching user's image) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Footer Section & Public Information
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">Controls Footer Bio & Contact</span>
          </div>

          {/* Description / Bio Text */}
          <div className="text-xs">
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Company Mission / Bio Description (Shown in Footer) *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="We engineer mission-critical web applications, mobile platforms, enterprise backends..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Contact Details: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Corporate Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@kinetictech.com"
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Corporate Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 81530 13913"
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Tech City"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                State / Province
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="CA"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Country *
              </label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="INDIA"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Trust Guarantee Badge */}
          <div className="text-xs">
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Footer Security & Trust Guarantee Badge
            </label>
            <div className="relative">
              <ShieldCheck className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={trustBadge}
                onChange={(e) => setTrustBadge(e.target.value)}
                placeholder="Enterprise-Grade Security & 99.9% Uptime Guarantee"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Live Preview of Footer Section (Exactly as in screenshot) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Live Footer Section Preview (Real-Time Render)
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Updates dynamically</span>
          </div>

          {/* Rendered Footer Card matching user's image */}
          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 max-w-lg space-y-5">
            {/* Logo and Name */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 overflow-hidden flex-shrink-0">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={() => setLogoPreview("")}
                  />
                ) : (
                  <Code2 className="w-6 h-6" />
                )}
              </div>
              <h4 className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">
                {name || "Kinetic Technology"}
              </h4>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {description ||
                "We engineer mission-critical web applications, mobile platforms, enterprise backends, and custom software systems designed to scale seamlessly."}
            </p>

            {/* Contact entries */}
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-1">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {email || "info@kinetictech.com"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="font-medium">{phone || "+91 81530 13913"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>
                  {city || "Tech City"}, {state || "CA"} - {country || "INDIA"}
                </span>
              </div>
            </div>

            {/* Guarantee badge */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{trustBadge || "Enterprise-Grade Security & 99.9% Uptime Guarantee"}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving Platform Settings...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Apply Platform Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
