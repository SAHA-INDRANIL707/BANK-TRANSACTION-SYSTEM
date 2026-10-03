import TransferForm from "@/components/transfer/TransferForm";
import TransactionSummaryPanel from "@/components/transfer/TransactionSummaryPanel";
import DashboardPanelFrame from "@/components/shell/DashboardPanelFrame";
import { mockTransferSummary, mockPrimaryAccount } from "@/lib/mock-data";

export const metadata = {
  title: "Transfer Details — BOI NetBanking",
  description: "Enter transfer details",
};

export default function TransferDetailsPage() {
  return (
    <DashboardPanelFrame
      left={
        <TransferForm
          initialData={{
            fromAccountId: mockPrimaryAccount.accountId,
            fromAccountDisplay: `Savings A/C •••• ${mockPrimaryAccount.maskedNumber}`,
            senderName: mockPrimaryAccount.holderName,
            method: "SELF",
          }}
          availableBalance={mockPrimaryAccount.availableBalance}
        />
      }
      right={<TransactionSummaryPanel summary={mockTransferSummary} />}
    />
  );
}
