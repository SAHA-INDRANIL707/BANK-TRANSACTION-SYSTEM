import TransferReceiptView from "@/components/transfer/TransferReceipt";
import TransactionSummaryPanel from "@/components/transfer/TransactionSummaryPanel";
import DashboardPanelFrame from "@/components/shell/DashboardPanelFrame";
import { mockTransferReceipt, mockTransferSummary } from "@/lib/mock-data";

export const metadata = {
  title: "Transfer Successful — BOI NetBanking",
  description: "Your transfer has been completed successfully",
};

export default function TransferSuccessPage() {
  return (
    <DashboardPanelFrame
      left={<TransferReceiptView receipt={mockTransferReceipt} />}
      right={<TransactionSummaryPanel summary={mockTransferSummary} />}
    />
  );
}
