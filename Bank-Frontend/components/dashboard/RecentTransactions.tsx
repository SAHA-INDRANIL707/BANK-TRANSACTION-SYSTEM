import type { Transaction } from "@/types/transaction.types";
import type { TransactionCategory, TransactionType } from "@/types/transaction.types";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

function CategoryIcon({ category }: { category: TransactionCategory }) {
  const cls = "w-3.5 h-3.5";
  switch (category) {
    case "ENTERTAINMENT":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      );
    case "PAYROLL":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      );
    case "UTILITY":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      );
    case "CARD_PAYMENT":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      );
    case "SHOPPING":
    default:
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      );
  }
}

function TypeBadge({ type }: { type: TransactionType }) {
  if (type === "CREDIT") {
    return (
      <span className="inline-flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-200">
        <span>Credited</span>
        <svg className="w-2 h-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M17 7L7 17M7 17H15M7 17V9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-full border border-slate-200">
      <span>Debited</span>
      <svg className="w-2 h-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      </svg>
    </span>
  );
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="glass-white-panel rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col justify-between h-full text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">Recent Transactions</h2>
          <p className="text-[10px] text-slate-500 mt-0.5">Real-time ledger debits &amp; credits</p>
        </div>
        <button
          type="button"
          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 focus:outline-none"
        >
          <span>View All</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Transaction List */}
      <div className="flex flex-col divide-y divide-slate-100 my-0.5 flex-1 justify-around">
        {transactions.map((txn) => (
          <div key={txn.transactionId} className="py-1.5 flex items-center justify-between gap-2 group">
            {/* Left: Icon + Name + Date */}
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center shrink-0 shadow-sm
                  ${txn.type === "CREDIT"
                    ? "bg-blue-100/70 border border-blue-200 text-blue-700"
                    : "bg-blue-50 border border-blue-100 text-blue-600"
                  }`}
              >
                <CategoryIcon category={txn.category} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                  {txn.merchantName}
                </h4>
                <p className="text-[9.5px] text-slate-500 mt-0.5">
                  Date • {formatDate(txn.transactionDate)}
                </p>
              </div>
            </div>

            {/* Right: Amount + Badge */}
            <div className="text-right flex flex-col items-end shrink-0">
              <span
                className={`block text-xs font-extrabold
                  ${txn.type === "CREDIT" ? "text-blue-700" : "text-slate-900"}`}
              >
                {txn.type === "CREDIT" ? "+ " : ""}₹{" "}
                {txn.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
              <TypeBadge type={txn.type} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
        <span className="flex items-center gap-1 font-medium text-slate-600">
          <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          Protected by BOI Shield
        </span>
        <span className="text-slate-400 font-medium text-[9.5px]">All amounts in INR (₹)</span>
      </div>
    </div>
  );
}
