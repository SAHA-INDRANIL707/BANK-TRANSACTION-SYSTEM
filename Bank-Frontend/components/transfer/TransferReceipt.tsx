"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TransferReceipt } from "@/types/transfer.types";

interface TransferReceiptProps {
  receipt: TransferReceipt;
}

export default function TransferReceiptView({ receipt }: TransferReceiptProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(receipt.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col justify-between gap-2 h-full">
      {/* Success Badge & Amount */}
      <div className="flex flex-col items-center text-center pt-0.5 pb-0.5">
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center shadow border-2 border-emerald-200 text-emerald-600 mb-1">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 border border-white/25 text-blue-100 text-[9px] font-semibold uppercase tracking-wider mb-0.5">
          <span>Transfer Completed</span>
        </div>

        <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
          Transfer Successful!
        </h2>
        <p className="text-[10px] text-blue-200/90 max-w-xs">
          Funds credited instantly to the beneficiary account.
        </p>

        <div className="mt-1 flex items-baseline justify-center gap-1">
          <span className="text-base font-semibold text-blue-200">₹</span>
          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {receipt.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Reference Number Box */}
      <div className="bg-white/10 border border-white/20 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-2 backdrop-blur-xl shadow-inner">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6.5 h-6.5 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-sm shrink-0">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[8.5px] text-blue-200/80 font-semibold uppercase tracking-wider">
              Transaction Ref / UTR
            </span>
            <span className="font-mono font-bold text-white text-[11px] sm:text-xs tracking-wider select-all truncate">
              {receipt.referenceNumber}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={copyRef}
          className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-semibold tracking-wide transition-all shadow-sm focus:outline-none shrink-0"
        >
          {copied ? (
            <span className="text-emerald-300 font-bold">Copied!</span>
          ) : (
            <>
              <svg className="w-3 h-3 text-blue-200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Done CTA */}
      <div className="pt-1.5 border-t border-white/10 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-full py-1.5 sm:py-2 rounded-xl bg-white text-blue-900 font-extrabold text-xs tracking-wide uppercase shadow hover:bg-blue-50 transition-all flex items-center justify-center gap-1.5 group"
        >
          <span>Return to Dashboard</span>
          <svg className="w-3.5 h-3.5 text-blue-900 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
