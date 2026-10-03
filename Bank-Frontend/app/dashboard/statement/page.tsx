import DashboardPanelFrame from "@/components/shell/DashboardPanelFrame";

export const metadata = { title: "Statement — BOI NetBanking" };

function ComingSoonPanel({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-3 h-full">
      <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white">
        {icon}
      </div>
      <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{title}</h2>
      <p className="text-xs text-blue-200/70 text-center max-w-xs">
        Download PDF statements, tax certificates, and account summaries.
      </p>
      <span className="text-[10px] font-semibold text-blue-200 bg-white/10 border border-white/20 px-3 py-0.5 rounded-full uppercase tracking-wider">
        Coming Soon
      </span>
    </div>
  );
}

export default function StatementPage() {
  return (
    <DashboardPanelFrame
      left={
        <ComingSoonPanel
          title="Account Statements"
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" x2="13" y1="13" y2="13" />
              <line x1="8" x2="16" y1="17" y2="17" />
              <circle cx="17.5" cy="12.5" r="2.5" />
              <line x1="19.3" x2="21.5" y1="14.3" y2="16.5" />
            </svg>
          }
        />
      }
      right={
        <div className="glass-white-panel rounded-2xl sm:rounded-3xl p-6 flex items-center justify-center h-full">
          <p className="text-slate-400 text-sm font-medium">Statement filters and exports will appear here</p>
        </div>
      }
    />
  );
}
