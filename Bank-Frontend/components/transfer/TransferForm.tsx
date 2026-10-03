"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TransferFormData } from "@/types/transfer.types";

interface TransferFormProps {
  initialData?: Partial<TransferFormData>;
  availableBalance: number;
}

export default function TransferForm({
  initialData = {},
  availableBalance,
}: TransferFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<TransferFormData>>({
    fromAccountDisplay: initialData.fromAccountDisplay ?? "Savings A/C •••• 4892",
    senderName: initialData.senderName ?? "Rahul Sharma",
    toAccount: initialData.toAccount ?? "",
    receiverName: initialData.receiverName ?? "",
    amount: initialData.amount ?? 25000,
    method: initialData.method ?? "SELF",
  });

  const handleChange = (field: keyof TransferFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/transfer/success");
  };

  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col justify-between gap-2 h-full">
      {/* Header / Stepper with Back Action */}
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/dashboard/transfer")}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all focus:outline-none"
            aria-label="Back to Transfer Modes"
          >
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs sm:text-sm font-extrabold text-white tracking-tight">Funds Transfer</h2>
              <span className="text-[9px] font-semibold text-blue-200 bg-white/10 border border-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Step 2 of 2
              </span>
            </div>
            <p className="text-[10px] text-blue-200/80">Transfer between your linked BOI accounts</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 bg-white/10 border border-white/20 px-2 py-0.5 rounded-lg">
          <svg className="w-3 h-3 text-blue-200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-[11px] font-bold text-white">To Self Account</span>
        </div>
      </div>

      <form onSubmit={handleProceed} className="flex-1 flex flex-col justify-between gap-1.5">
        {/* Row 1: From Account + Sender Name (read-only) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
          <div className="flex flex-col gap-0.5">
            <label className="text-[9.5px] font-semibold text-blue-200 uppercase tracking-wider">
              From Account
            </label>
            <input
              type="text"
              value={formData.fromAccountDisplay ?? ""}
              readOnly
              className="w-full p-1.5 px-2 rounded-lg bg-white/15 border border-white/25 text-white font-medium text-[11px] focus:outline-none cursor-default"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-[9.5px] font-semibold text-blue-200 uppercase tracking-wider">
              Account Holder
            </label>
            <input
              type="text"
              value={formData.senderName ?? ""}
              readOnly
              className="w-full p-1.5 px-2 rounded-lg bg-white/15 border border-white/25 text-white font-medium text-[11px] focus:outline-none cursor-default"
            />
          </div>
        </div>

        {/* Row 2: To Account + Receiver Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
          <div className="flex flex-col gap-0.5">
            <label className="text-[9.5px] font-semibold text-blue-200 uppercase tracking-wider">
              To Account Number
            </label>
            <input
              type="text"
              placeholder="Advantage A/C •••• 1042"
              value={formData.toAccount ?? ""}
              onChange={(e) => handleChange("toAccount", e.target.value)}
              className="w-full p-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/30 focus:border-white text-white font-medium text-[11px] transition-all focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-[9.5px] font-semibold text-blue-200 uppercase tracking-wider">
              Name of Receiver
            </label>
            <input
              type="text"
              placeholder="Bank of India Linked"
              value={formData.receiverName ?? ""}
              onChange={(e) => handleChange("receiverName", e.target.value)}
              className="w-full p-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/30 focus:border-white text-white font-medium text-[11px] transition-all focus:outline-none"
            />
          </div>
        </div>

        {/* Row 3: Amount Field */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <label className="text-[9.5px] font-semibold text-blue-200 uppercase tracking-wider">
              Amount (₹)
            </label>
            <span className="text-[9.5px] font-medium text-blue-200/80">
              Available: ₹{availableBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-2.5 text-xs font-bold text-blue-200 select-none">₹</span>
            <input
              type="number"
              value={formData.amount ?? ""}
              onChange={(e) => handleChange("amount", Number(e.target.value))}
              placeholder="Enter amount"
              className="w-full p-1.5 pl-6 pr-2.5 rounded-lg bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/30 focus:border-white text-white font-bold text-xs sm:text-sm transition-all focus:outline-none"
            />
          </div>
        </div>

        {/* Proceed CTA */}
        <div className="border-t border-white/10 flex flex-col pt-1.5 gap-0.5">
          <button
            type="submit"
            className="w-full rounded-xl bg-white text-blue-900 font-extrabold text-xs tracking-wide uppercase shadow hover:bg-blue-50 transition-all flex items-center justify-center gap-1.5 group py-2"
          >
            <span>Proceed to Verify &amp; Pay</span>
            <svg className="w-3.5 h-3.5 text-blue-900 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-center text-[9px] text-blue-200/70">
            Step 2 of 3: Verify linked accounts before entering transfer amount
          </p>
        </div>
      </form>
    </div>
  );
}
