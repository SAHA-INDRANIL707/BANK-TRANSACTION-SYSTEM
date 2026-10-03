import DashboardHeader from "@/components/shell/DashboardHeader";
import WelcomeBanner from "@/components/shell/WelcomeBanner";
import BottomNavBar from "@/components/shell/BottomNavBar";
import { FadeSlide } from "@/components/ui/fade-slide";
import { mockUser, mockPrimaryAccount } from "@/lib/mock-data";

/**
 * Dashboard Shell Layout
 * ─────────────────────────────────────────────────────────────────────────────
 * Page entrance animation: each section fades + slides up in sequence.
 * Stagger order: Header (0s) → WelcomeBanner (0.08s) → Grid (0.18s)
 * This only plays on first load/login. Feature tab switches use the
 * per-panel featureFadeSlideIn animation in DashboardPanelFrame instead.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="boi-bg min-h-screen flex flex-col justify-between relative selection:bg-blue-500 selection:text-white">
      {/* Atmospheric Ambient Spheres */}
      <div className="ambient-sphere sphere-1" aria-hidden="true" />
      <div className="ambient-sphere sphere-2" aria-hidden="true" />

      {/* Header — appears first */}
      <FadeSlide delay={0} y={-14}>
        <DashboardHeader />
      </FadeSlide>

      {/* Main Content Layout */}
      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-1 flex-1 relative z-10 flex flex-col justify-between gap-2 sm:gap-2.5">
        {/* Welcome & Balance Banner — appears second */}
        <FadeSlide delay={0.18} y={16}>
          <WelcomeBanner user={mockUser} account={mockPrimaryAccount} />
        </FadeSlide>

        {/* 12-Column Grid — appears third (panels + nav together) */}
        <FadeSlide delay={0.34} y={22} className="flex-1 flex flex-col min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[345px_54px] gap-y-3.5 sm:gap-y-4 gap-x-6 sm:gap-x-7 lg:gap-x-8 xl:gap-x-10 flex-1 items-start lg:items-stretch mb-2">
            {children}

            {/* Bottom Nav Bar Wrapper */}
            <div className="lg:col-span-7 lg:row-start-2 order-2 lg:order-none">
              <BottomNavBar />
            </div>
          </div>
        </FadeSlide>
      </main>
    </div>
  );
}
