import TransferMethodSelect from "@/components/transfer/TransferMethodSelect";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import DashboardPanelFrame from "@/components/shell/DashboardPanelFrame";
import { mockTransferOptions, mockRecentTransactions } from "@/lib/mock-data";

export const metadata = {
  title: "Funds Transfer — BOI NetBanking",
  description: "Transfer funds between your BOI accounts",
};

export default function TransferPage() {
  return (
    <DashboardPanelFrame
      left={<TransferMethodSelect options={mockTransferOptions} />}
      right={<RecentTransactions transactions={mockRecentTransactions} />}
    />
  );
}
