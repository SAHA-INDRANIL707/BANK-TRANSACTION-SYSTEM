import DashboardPanelFrame from "@/components/shell/DashboardPanelFrame";

export const metadata = { title: "Pay Bills — BOI NetBanking" };

function ComingSoonPanel({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-3 h-full">
      <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white">
        {icon}
      </div>
      <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{title}</h2>
      <p className="text-xs text-blue-200/70 text-center max-w-xs">
        Bill payments, recharges, and utility scheduling.
      </p>
      <span className="text-[10px] font-semibold text-blue-200 bg-white/10 border border-white/20 px-3 py-0.5 rounded-full uppercase tracking-wider">
        Coming Soon
      </span>
    </div>
  );
}

export default function BillsPage() {
  return (
    <DashboardPanelFrame
      left={
        <ComingSoonPanel
          title="Pay Bills"
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect width="12" height="20" x="6" y="2" rx="2.5" />
              <path d="M12.5 7l-2 4.5h3l-1.5 5.5" />
              <line x1="11" x2="13" y1="19" y2="19" />
            </svg>
          }
        />
      }
      right={
        <div className="glass-white-panel rounded-2xl sm:rounded-3xl p-6 flex items-center justify-center h-full">
          <p className="text-slate-400 text-sm font-medium">Biller history will appear here</p>
        </div>
      }
    />
  );
}
