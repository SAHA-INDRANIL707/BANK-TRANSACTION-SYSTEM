import type { TransferSummary } from "@/types/transfer.types";

interface TransactionSummaryPanelProps {
  summary: TransferSummary;
}

function inr(amount: number): string {
  return `₹ ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

export default function TransactionSummaryPanel({ summary }: TransactionSummaryPanelProps) {
  return (
    <div className="glass-white-panel rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col justify-between h-full text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">Transaction Summary</h2>
          <p className="text-[10px] text-slate-500 mt-0.5">Verification &amp; Security review</p>
        </div>
        {summary.isZeroFee && (
          <span className="text-[8.5px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
            ZERO FEE
          </span>
        )}
      </div>

      {/* Summary Rows */}
      <div className="flex flex-col divide-y divide-slate-100 my-0.5 flex-1 justify-around text-[11px] sm:text-xs">
        <div className="py-1.5 flex items-center justify-between gap-2">
          <span className="text-slate-500 font-medium">Transfer Mode</span>
          <span className="font-bold text-slate-800 tracking-wide text-right">{summary.transferModeLabel}</span>
        </div>
        <div className="py-1.5 flex items-center justify-between gap-2">
          <span className="text-slate-500 font-medium">From Account</span>
          <span className="font-semibold text-slate-800 text-right">
            {summary.fromAccountDisplay}
            <span className="block text-[9.5px] font-normal text-slate-400">{summary.senderName}</span>
          </span>
        </div>
        <div className="py-1.5 flex items-center justify-between gap-2">
          <span className="text-slate-500 font-medium">To Account</span>
          <span className="font-semibold text-slate-800 text-right">
            {summary.toAccountDisplay}
            <span className="block text-[9.5px] font-normal text-slate-400">{summary.receiverLabel}</span>
          </span>
        </div>
        <div className="py-1.5 flex items-center justify-between gap-2">
          <span className="text-slate-500 font-medium">Transfer Amount</span>
          <span className="font-extrabold text-blue-900 text-xs sm:text-sm">{inr(summary.amount)}</span>
        </div>
        <div className="py-1.5 flex items-center justify-between gap-2">
          <span className="text-slate-500 font-medium">Charges / Taxes</span>
          <span className="font-semibold text-blue-700">
            {inr(summary.charges)} {summary.isZeroFee ? "(Free)" : ""}
          </span>
        </div>
        <div className="py-1.5 flex items-center justify-between gap-2">
          <span className="text-slate-500 font-medium">Post-Transfer Balance</span>
          <span className="font-bold text-slate-800">{inr(summary.postTransferBalance)}</span>
        </div>
        <div className="py-1.5 flex items-center justify-between gap-2">
          <span className="text-slate-500 font-medium">Estimated Delivery</span>
          <span className="font-semibold text-slate-800 text-right">{summary.estimatedDelivery}</span>
        </div>
      </div>

      {/* Info Tip */}
      <div className="p-1.5 sm:p-2 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-1.5 my-0.5">
        <svg className="w-3 h-3 text-blue-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <line x1="12" y1="16" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-[10px] text-slate-600 leading-snug">
          <span className="font-bold text-slate-800">Instant Credit:</span> Transfers between your linked BOI accounts reflect immediately without OTP.
        </p>
      </div>

      {/* Footer */}
      <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
        <span className="flex items-center gap-1 font-medium text-slate-600">
          <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          Protected by BOI Shield
        </span>
        <span className="text-slate-400 font-medium text-[9.5px]">256-Bit Encrypted Banking</span>
      </div>
    </div>
  );
}
