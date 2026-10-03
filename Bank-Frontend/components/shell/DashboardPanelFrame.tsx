"use client";

import { usePathname } from "next/navigation";

interface DashboardPanelFrameProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

/**
 * DashboardPanelFrame
 * ─────────────────────────────────────────────────────────────────────────────
 * Locks the Left and Right panels to compact constant dimensions on desktop.
 * Smoothly renders newly selected features with silky entrance animation.
 * Left Panel:  locked to 345px height.
 * Right Panel: locked to 423px height.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function DashboardPanelFrame({ left, right }: DashboardPanelFrameProps) {
  const pathname = usePathname();

  return (
    <>
      {/* CONSTANT COMPACT LEFT PANEL CONTAINER (345px) */}
      <div className="lg:col-span-7 lg:row-start-1 order-1 lg:order-none w-full lg:h-[345px] lg:max-h-[345px] flex flex-col min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl">
        <div key={`feature-left-${pathname}`} className="h-full w-full flex flex-col min-h-0 animate-feature-fade">
          {left}
        </div>
      </div>

      {/* CONSTANT COMPACT RIGHT PANEL CONTAINER (423px) — stays persistent and static */}
      <div className="lg:col-span-5 lg:row-start-1 lg:row-span-2 order-3 lg:order-none w-full lg:h-[423px] lg:max-h-[423px] flex flex-col min-h-0">
        {right}
      </div>
    </>
  );
}
