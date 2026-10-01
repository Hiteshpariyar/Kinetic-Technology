import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Public Pages
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Industries } from "./pages/Industries";
import { Technologies } from "./pages/Technologies";
import { HowItWorks } from "./pages/HowItWorks";
import { Pricing } from "./pages/Pricing";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { ProjectBuilder } from "./pages/ProjectBuilder";
import { TrackProject } from "./pages/TrackProject";
import { KineticStore } from "./pages/KineticStore";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

// Client Portal
import { ClientDashboard } from "./pages/ClientDashboard";

// Admin Panel
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminOverview } from "./pages/admin/AdminOverview";
import { AdminTracking } from "./pages/admin/AdminTracking";
import { AdminInvoices } from "./pages/admin/AdminInvoices";
import { AdminStore } from "./pages/admin/AdminStore";
import { AdminLeads } from "./pages/admin/AdminLeads";
import { AdminPricing } from "./pages/admin/AdminPricing";
import { AdminServices } from "./pages/admin/AdminServices";
import { AdminTechnologies } from "./pages/admin/AdminTechnologies";
import { AdminIndustries } from "./pages/admin/AdminIndustries";
import { AdminTeam } from "./pages/admin/AdminTeam";
import { AdminAuditLogs } from "./pages/admin/AdminAuditLogs";
import { AdminSettings } from "./pages/admin/AdminSettings";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Admin Suite Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="tracking" element={<AdminTracking />} />
            <Route path="invoices" element={<AdminInvoices />} />
            <Route path="store" element={<AdminStore />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="technologies" element={<AdminTechnologies />} />
            <Route path="industries" element={<AdminIndustries />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="audit-logs" element={<AdminAuditLogs />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Public & Client Portal Routes */}
          <Route
            path="/*"
            element={
              <PublicLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/industries" element={<Industries />} />
                  <Route path="/technologies" element={<Technologies />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/store" element={<KineticStore />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/start-project" element={<ProjectBuilder />} />
                  <Route path="/track" element={<TrackProject />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<ClientDashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </PublicLayout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
