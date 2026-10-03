"use client";

import type { UserProfile } from "@/types/user.types";
import type { BankAccount } from "@/types/account.types";
import { NumberTicker } from "@/components/ui/number-ticker";

interface WelcomeBannerProps {
  user: UserProfile;
  account: BankAccount;
}

export default function WelcomeBanner({ user, account }: WelcomeBannerProps) {
  return (
    <section className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2.5 sm:gap-3 py-0.5">
      {/* Left: Welcome + Account Info */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white tracking-tight leading-tight">
          Welcome, {user.name}
        </h1>
        <p className="text-[11px] sm:text-xs text-blue-200/80 mt-0.5 flex flex-wrap items-center gap-1.5">
          <span>
            {account.accountType === "SAVINGS" ? "Savings" : account.accountType} A/C ••••{" "}
            {account.maskedNumber}
          </span>
          <span className="text-blue-300/40">•</span>
          <span>Last logged in today at {user.lastLoginAt}</span>
        </p>
      </div>

      {/* Right: Available Balance */}
      <div className="sm:text-right">
        <span className="block text-[9px] sm:text-[10px] font-semibold text-blue-200/90 tracking-widest uppercase">
          Available Balance
        </span>
        <div className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white tracking-tight mt-0.5 flex items-baseline sm:justify-end gap-1 leading-tight">
          <span className="text-base sm:text-lg lg:text-xl font-semibold text-blue-300">₹</span>
          <NumberTicker
            value={account.availableBalance}
            decimalPlaces={2}
            delay={0.1}
            className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white tracking-tight"
          />
        </div>
        <div className="mt-0.5 flex items-center sm:justify-end gap-1 text-[10px] sm:text-[11px] font-medium text-blue-200/90">
          <svg className="w-3 h-3 text-blue-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </svg>
          <span>Active Balance • Ready to transfer</span>
        </div>
      </div>
    </section>
  );
}
