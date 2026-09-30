import React from "react";
import { companyConfig } from "../config/companyConfig";
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Mail,
  Phone,
  Copy,
  Check,
} from "lucide-react";

export interface InvoiceItem {
  description: string;
  amount: number;
}

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  trackingId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  company?: string;
  projectName: string;
  items: InvoiceItem[];
  subtotal: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
  paymentMethod: string;
  transactionId: string;
  status: "PAID" | "PENDING";
  paidAt: string;
  createdAt: string;
  notes?: string;
}

interface InvoiceModalProps {
  invoice: InvoiceData | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyTrackId = () => {
    navigator.clipboard.writeText(invoice.trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden print:border-none print:shadow-none print:w-full print:max-w-none">
        {/* Modal Controls (Hidden in Print) */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/40 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tax Invoice Document
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              {invoice.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div className="p-6 sm:p-10 space-y-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-white print:text-black print:bg-white print:p-8">
          {/* Header & Company Brand */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                  K
                </div>
                <span className="font-extrabold text-xl tracking-tight">
                  {companyConfig.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600 leading-relaxed max-w-xs">
                {companyConfig.address.street}, {companyConfig.address.city}, {companyConfig.address.state} - {companyConfig.address.zip}, {companyConfig.address.country}
              </p>
              <p className="text-[11px] text-slate-400 print:text-slate-600 mt-1">
                GSTIN: 24AAACK1928K1Z5 • Email: {companyConfig.email}
              </p>
            </div>

            <div className="sm:text-right">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Tax Invoice
              </h2>
              <div className="mt-1 font-mono font-bold text-sm text-blue-600 dark:text-blue-400">
                {invoice.invoiceNumber}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Date: {new Date(invoice.paidAt || invoice.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Connected Tracking ID Banner */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider block">
                Official Project Tracking ID (Use on any device)
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {invoice.trackingId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyTrackId}
                  className="p-1 text-slate-400 hover:text-blue-600 print:hidden"
                  title="Copy Tracking ID"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <a
              href={`/track?id=${invoice.trackingId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm print:hidden"
            >
              <span>Track Live Delivery</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Bill To & Project Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Billed To (Client Details)
              </span>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                {invoice.clientName}
              </div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">
                {invoice.company}
              </div>
              <div className="text-slate-500 mt-1">
                Email: {invoice.clientEmail}
              </div>
              {invoice.clientPhone && (
                <div className="text-slate-500 font-mono">
                  Phone: {invoice.clientPhone}
                </div>
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Project & Payment Summary
              </span>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                {invoice.projectName}
              </div>
              <div className="text-slate-600 dark:text-slate-300 mt-1">
                Payment Channel: <strong className="text-slate-900 dark:text-white">{invoice.paymentMethod}</strong>
              </div>
              <div className="text-slate-500 font-mono text-[11px] mt-0.5">
                Txn Ref: {invoice.transactionId}
              </div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Payment Verified & Cleared</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 text-slate-500 uppercase font-semibold text-[11px]">
                  <th className="py-3 px-4">Item Description</th>
                  <th className="py-3 px-4 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {item.description}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-900 dark:text-white">
                      ₹{item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Breakdown */}
          <div className="flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  ₹{invoice.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>GST ({invoice.gstRate}%):</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  ₹{invoice.gstAmount.toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-black text-slate-900 dark:text-white">
                <span>Total Paid:</span>
                <span className="text-base text-blue-600 dark:text-blue-400">
                  ₹{invoice.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Terms & Stamp */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>
              <p>This is a computer-generated tax receipt. No physical signature is required.</p>
              <p>For questions or milestone deliverables, email support@{companyConfig.email.split("@")[1] || "kinetictech.com"}.</p>
            </div>

            <div className="p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>PAID IN FULL • GST TAX INVOICE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
