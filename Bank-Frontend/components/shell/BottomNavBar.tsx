"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types/api.types";

const NAV_ITEMS: NavItem[] = [
  { key: "DASHBOARD",      label: "Dashboard",      href: "/dashboard",           isActive: false },
  { key: "FUNDS_TRANSFER", label: "Funds Transfer", href: "/dashboard/transfer",  isActive: false },
  { key: "PAY_BILLS",      label: "Pay Bills",      href: "/dashboard/bills",     isActive: false },
  { key: "ACCOUNTS",       label: "Accounts",       href: "/dashboard/accounts",  isActive: false },
  { key: "STATEMENT",      label: "Statement",      href: "/dashboard/statement", isActive: false },
];

function NavIcon({ navKey, isActive }: { navKey: NavItem["key"]; isActive: boolean }) {
  const cls = `w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-white drop-shadow-sm" : ""}`;

  switch (navKey) {
    case "DASHBOARD":
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? "2.2" : "1.8"} viewBox="0 0 24 24">
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5" />
        </svg>
      );
    case "ACCOUNTS":
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect width="18" height="15" x="3" y="5" rx="2.5" />
          <circle cx="8.5" cy="11.5" r="2" />
          <path d="M5.5 16.5c0-1.6 1.4-2.5 3-2.5s3 .9 3 2.5" />
          <path d="M14.5 10h4" />
          <path d="M14.5 14h3" />
        </svg>
      );
    case "FUNDS_TRANSFER":
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? "2.2" : "1.8"} viewBox="0 0 24 24">
          <path d="M17 4l4 4-4 4" />
          <path d="M3 8h18" />
          <path d="M7 20l-4-4 4-4" />
          <path d="M21 16H3" />
        </svg>
      );
    case "PAY_BILLS":
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect width="12" height="20" x="6" y="2" rx="2.5" />
          <path d="M12.5 7l-2 4.5h3l-1.5 5.5" />
          <line x1="11" x2="13" y1="19" y2="19" />
        </svg>
      );
    case "CARDS":
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect width="17" height="12" x="4" y="8" rx="2" />
          <path d="M2 13V6a2 2 0 012-2h14" />
          <line x1="4" x2="21" y1="12" y2="12" />
          <circle cx="8" cy="16" r="1" fill="currentColor" />
        </svg>
      );
    case "STATEMENT":
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" x2="13" y1="13" y2="13" />
          <line x1="8" x2="16" y1="17" y2="17" />
          <circle cx="17.5" cy="12.5" r="2.5" />
          <line x1="19.3" x2="21.5" y1="14.3" y2="16.5" />
        </svg>
      );
  }
}

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl px-2 py-1 flex items-center justify-around select-none backdrop-blur-xl transition-all shadow-md lg:h-[54px]">
      {NAV_ITEMS.map((item, index) => {
        const isActive =
          item.key === "DASHBOARD"
            ? pathname === "/dashboard" || pathname === "/dashboard/"
            : pathname === item.href ||
              (item.href === "/dashboard/transfer" && pathname.startsWith("/dashboard/transfer"));

        return (
          <div key={item.key} className="contents">
            {index > 0 && <div className="h-4.5 sm:h-5 w-px bg-white/10 shrink-0" />}
            <Link
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 group flex-1 py-0.5 transition-all min-w-0
                ${isActive
                  ? "scale-105 text-white"
                  : "hover:scale-105 text-white/70 hover:text-white"
                }`}
            >
              <div
                className={`w-4.5 sm:w-5 h-0.5 rounded-full mb-0.5 transition-all duration-300 ${
                  isActive ? "bg-white opacity-100 scale-100" : "bg-transparent opacity-0 scale-75"
                }`}
              />

              <NavIcon navKey={item.key} isActive={isActive} />

              <span
                className={`text-[8.5px] sm:text-[9.5px] tracking-wider uppercase text-center leading-tight truncate max-w-full px-0.5
                  ${isActive ? "font-bold text-white" : "font-semibold"}`}
              >
                {item.label}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
