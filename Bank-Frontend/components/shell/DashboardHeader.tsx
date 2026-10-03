"use client";

import Link from "next/link";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function DashboardHeader() {
  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-2.5 sm:pt-3 pb-1 flex items-center relative z-10 justify-between">
      {/* BOI Logo + Brand */}
      <div className="flex items-center gap-2 sm:gap-2.5 select-none">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-white flex items-center justify-center shadow-md text-blue-600 shrink-0">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-base sm:text-lg font-extrabold tracking-wider text-white uppercase drop-shadow-sm">
              BOI
            </span>
            <span className="text-blue-200 font-light text-xs sm:text-sm">|</span>
            <span className="text-xs sm:text-sm font-bold tracking-wide text-white">
              Bank of India
            </span>
          </div>
          <span className="text-[8px] sm:text-[9.5px] text-blue-100 font-semibold tracking-widest uppercase">
            Relationship Beyond Banking
          </span>
        </div>
      </div>

      {/* Right Controls: Profile + Logout */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Profile Icon Button */}
        <Link
          href="/dashboard"
          aria-label="User Profile"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/25 backdrop-blur-xl transition-all shadow-md flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-md group-hover:scale-105 transition-transform">
            <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </Link>

        {/* Logout Button */}
        <Link
          href="/"
          aria-label="Logout"
          title="Logout"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/25 backdrop-blur-xl transition-all shadow-md flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <RiLogoutBoxRLine className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70 group-hover:text-white transition-colors" />
        </Link>
      </div>
    </header>
  );
}
