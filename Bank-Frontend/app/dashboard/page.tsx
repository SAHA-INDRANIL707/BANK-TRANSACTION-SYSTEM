import TrendChart from "@/components/dashboard/TrendChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import DashboardPanelFrame from "@/components/shell/DashboardPanelFrame";
import { mockJuneAnalytics, mockRecentTransactions } from "@/lib/mock-data";

export const metadata = {
  title: "Dashboard — BOI NetBanking",
  description: "Your Bank of India account overview",
};

export default function DashboardPage() {
  return (
    <DashboardPanelFrame
      left={<TrendChart analytics={mockJuneAnalytics} />}
      right={<RecentTransactions transactions={mockRecentTransactions} />}
    />
  );
}
