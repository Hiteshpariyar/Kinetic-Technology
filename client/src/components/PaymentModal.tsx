import React, { useState } from "react";
import {
  X,
  CreditCard,
  QrCode,
  Building2,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { InvoiceData } from "./InvoiceModal";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingId?: string;
  projectName?: string;
  defaultAmount?: number;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  company?: string;
  onPaymentSuccess: (invoice: InvoiceData) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  trackingId = "KT-782910",
  projectName = "Custom Engineering Sprint",
  defaultAmount = 45000,
  clientName = "Client Partner",
  clientEmail = "client@example.com",
  clientPhone = "9876543210",
  company = "Independent",
  onPaymentSuccess,
}) => {
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "razorpay" | "bank">("upi");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const gstRate = 18;
  const gstAmount = Math.round((amount * gstRate) / 100);
  const totalPayable = amount + gstAmount;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError("");

    try {
      const methodName =
        paymentMethod === "upi"
          ? "UPI (GPay / PhonePe / Paytm)"
          : paymentMethod === "razorpay"
          ? "Razorpay Gateway (Cards / NetBanking)"
          : "NEFT / RTGS Corporate Transfer";

      const res = await fetch("http://localhost:4000/api/invoices/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackingId,
          clientName,
          clientEmail,
          clientPhone,
          company,
          projectName,
          amount,
          paymentMethod: methodName,
          items: [
            {
              description: `${projectName} - Milestone Engineering Sprint Deliverable`,
              amount,
            },
          ],
        }),
      });

      const data = await res.json();
      if (res.ok && data.invoice) {
        onPaymentSuccess(data.invoice);
        onClose();
      } else {
        setError(data.message || "Payment processing failed. Please try again.");
      }
    } catch {
      setError("Unable to connect to payment gateway. Please check your network.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Project Milestone Checkout
              </h3>
              <p className="text-[11px] text-slate-400">
                Tracking ID: <strong className="font-mono text-blue-600 dark:text-blue-400">{trackingId}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handlePay} className="p-6 space-y-5 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Amount input & Project summary */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-slate-500">Project:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right line-clamp-1 max-w-[200px]">
                {projectName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-500">Milestone Fee:</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  min={1000}
                  step={500}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-24 px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-right text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Select Preferred Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <div
                onClick={() => setPaymentMethod("upi")}
                className={`p-3 rounded-xl border-2 cursor-pointer text-center transition-all ${
                  paymentMethod === "upi"
                    ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                <span className="font-bold text-[11px] block">UPI / QR</span>
                <span className="text-[9px] text-slate-400">Instant Free</span>
              </div>

              <div
                onClick={() => setPaymentMethod("razorpay")}
                className={`p-3 rounded-xl border-2 cursor-pointer text-center transition-all ${
                  paymentMethod === "razorpay"
                    ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                <span className="font-bold text-[11px] block">Cards / EMI</span>
                <span className="text-[9px] text-slate-400">Razorpay</span>
              </div>

              <div
                onClick={() => setPaymentMethod("bank")}
                className={`p-3 rounded-xl border-2 cursor-pointer text-center transition-all ${
                  paymentMethod === "bank"
                    ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <Building2 className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                <span className="font-bold text-[11px] block">NetBanking</span>
                <span className="text-[9px] text-slate-400">NEFT / RTGS</span>
              </div>
            </div>
          </div>

          {/* Conditional Method Details */}
          {paymentMethod === "upi" && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <div className="w-28 h-28 bg-white p-2 rounded-xl mx-auto mb-2 border border-slate-300 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-slate-900" />
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 font-mono font-bold">
                UPI ID: kinetictech@okhdfcbank
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Scan with GPay, PhonePe, Paytm, or enter your VPA.
              </p>
            </div>
          )}

          {paymentMethod === "razorpay" && (
            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-[11px] text-purple-800 dark:text-purple-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Razorpay 256-Bit Encrypted Gateway. Supports Visa, MasterCard, RuPay & NetBanking.</span>
            </div>
          )}

          {paymentMethod === "bank" && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200 space-y-1">
              <div>Bank: <strong>HDFC Bank Ltd.</strong></div>
              <div>Account: <strong>Kinetic Technology Pvt Ltd</strong></div>
              <div>A/C Number: <strong>50200084918290</strong> • IFSC: <strong>HDFC0001842</strong></div>
            </div>
          )}

          {/* Price breakdown */}
          <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px]">
            <div className="flex justify-between text-slate-500">
              <span>Milestone Base:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                ₹{amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>GST (18%):</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                ₹{gstAmount.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
              <span>Total Payable:</span>
              <span className="text-blue-600 dark:text-blue-400">
                ₹{totalPayable.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={processing || amount <= 0}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {processing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing Payment & Generating Invoice...</span>
              </>
            ) : (
              <>
                <span>Complete Payment (₹{totalPayable.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
