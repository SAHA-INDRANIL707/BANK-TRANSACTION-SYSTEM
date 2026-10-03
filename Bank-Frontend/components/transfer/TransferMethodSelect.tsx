"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TransferOption } from "@/types/transfer.types";

interface TransferMethodSelectProps {
  options: TransferOption[];
}

export default function TransferMethodSelect({ options: initialOptions }: TransferMethodSelectProps) {
  const router = useRouter();
  const [options, setOptions] = useState(initialOptions);

  const selectMethod = (method: TransferOption["method"]) => {
    setOptions((prev) =>
      prev.map((o) => ({ ...o, isSelected: o.method === method }))
    );
  };

  const selectedMethod = options.find((o) => o.isSelected)?.method ?? "SELF";

  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col justify-between gap-2 h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-sm shrink-0">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 4l4 4-4 4" />
              <path d="M3 8h18" />
              <path d="M7 20l-4-4 4-4" />
              <path d="M21 16H3" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">Funds Transfer</h2>
            <p className="text-[10px] text-blue-200/80">
              Select transfer mode to initiate seamless fund remittance
            </p>
          </div>
        </div>
        <span className="text-[9.5px] font-semibold text-blue-200 bg-white/10 border border-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
          Instant 24x7
        </span>
      </div>

      {/* Method Selection */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-semibold text-blue-200 tracking-wider uppercase">
          Transfer Method
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {options.map((option) => (
            <button
              key={option.method}
              onClick={() => selectMethod(option.method)}
              disabled={!option.isEnabled}
              className={`flex flex-col text-left p-2.5 sm:p-3 rounded-xl transition-all group focus:outline-none
                ${option.isSelected
                  ? "bg-white/20 border-2 border-white text-white shadow-md"
                  : "bg-white/5 border border-white/15 hover:bg-white/10 text-white"
                } ${!option.isEnabled ? "opacity-40 cursor-not-allowed" : ""}`}
              type="button"
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-sm
                    ${option.isSelected
                      ? "bg-white text-blue-700"
                      : "bg-white/10 border border-white/20 text-white"
                    }`}
                >
                  {option.method === "SELF" ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z" />
                    </svg>
                  )}
                </div>
                <span
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold shadow
                    ${option.isSelected
                      ? "bg-white text-blue-700"
                      : "border border-white/30 text-transparent"
                    }`}
                >
                  ✓
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                {option.title}
              </span>
              <span className="text-[10px] text-blue-100/90 mt-0.5 leading-snug">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-2 border-t border-white/10 flex flex-col gap-1.5">
        <button
          onClick={() => router.push(`/dashboard/transfer/details?method=${selectedMethod.toLowerCase()}`)}
          className="w-full py-2 rounded-xl bg-white text-blue-900 font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow hover:bg-blue-50 transition-all flex items-center justify-center gap-1.5 group"
          type="button"
        >
          <span>Proceed to Transfer Details</span>
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-900 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p className="text-center text-[9.5px] text-blue-200/70">
          Step 1 of 2: Select transfer method to specify account details
        </p>
      </div>
    </div>
  );
}
