/**
 * transfer.types.ts
 * Domain: Funds Transfer (3-step flow)
 * Used on: Transfer Step 1 (method select), Step 2 (form), Step 3 (receipt)
 * API Endpoints:
 *   POST /api/transfer/initiate
 *   POST /api/transfer/confirm
 *   GET  /api/transfer/:transferId/receipt
 */

/** The two transfer method options shown on Step 1 */
export type TransferMethod = 'SELF' | 'ACCOUNT_NUMBER';

/** The network/rail used for the transfer */
export type TransferRail = 'IMPS' | 'NEFT' | 'RTGS' | 'INTERNAL';

/** Current status of a transfer */
export type TransferStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'FAILED'
  | 'REVERSED';

// ─── Step 1: Method Selection ───────────────────────────────────────────────

/** One selectable transfer mode card (Step 1 UI) */
export interface TransferOption {
  /** Unique key for the option — matches TransferMethod */
  method: TransferMethod;

  /** Card title — e.g. "To Self Account" */
  title: string;

  /** Card description — e.g. "Transfer between your linked BOI accounts" */
  description: string;

  /** Whether this option is currently selected */
  isSelected: boolean;

  /** Whether this option is available (could be disabled e.g. for maintenance) */
  isEnabled: boolean;
}

// ─── Step 2: Transfer Form ───────────────────────────────────────────────────

/** The form data captured on Step 2 */
export interface TransferFormData {
  /** Account ID the money is sent FROM — API: transfer.fromAccountId */
  fromAccountId: string;

  /** Masked display of source account — e.g. "Savings A/C •••• 4892" */
  fromAccountDisplay: string;

  /** Name of the sender/holder — API: transfer.senderName */
  senderName: string;

  /** Account ID the money is sent TO (for SELF transfers) — API: transfer.toAccountId */
  toAccountId?: string;

  /** Account number (for ACCOUNT_NUMBER transfers) — API: transfer.toAccountNumber */
  toAccountNumber?: string;

  /** Masked display of destination account — e.g. "Advantage A/C •••• 1042" */
  toAccountDisplay?: string;

  /** Name of the receiver — API: transfer.receiverName */
  receiverName?: string;

  /** Transfer amount in INR — API: transfer.amount */
  amount: number;

  /** The transfer method chosen in Step 1 */
  method: TransferMethod;

  /** Optional remark/narration — API: transfer.remark */
  remark?: string;
}

// ─── Step 2 & 3: Summary Panel (right panel, shown on both Step 2 and Step 3) ─

/** The live transaction summary shown in the right white panel */
export interface TransferSummary {
  /** Human-readable transfer mode — e.g. "SELF ACCOUNT • INSTANT" */
  transferModeLabel: string;

  /** Masked from-account display */
  fromAccountDisplay: string;

  /** Sender's name */
  senderName: string;

  /** Masked to-account display */
  toAccountDisplay: string;

  /** Receiver name or institution label */
  receiverLabel: string;

  /** Transfer amount in INR — API: summary.amount */
  amount: number;

  /** Charges / taxes in INR (usually 0) — API: summary.charges */
  charges: number;

  /** Balance remaining after the transfer — API: summary.postTransferBalance */
  postTransferBalance: number;

  /** Estimated delivery string — e.g. "Instantaneous (Under 5s)" */
  estimatedDelivery: string;

  /** Whether there are zero fees */
  isZeroFee: boolean;
}

// ─── Step 3: Transfer Receipt ────────────────────────────────────────────────

/** The completed transfer receipt shown after a successful transfer */
export interface TransferReceipt {
  /** UTR / BOI reference number — API: receipt.referenceNumber */
  referenceNumber: string;

  /** The transfer status — API: receipt.status */
  status: TransferStatus;

  /** The amount transferred — API: receipt.amount */
  amount: number;

  /** Currency, always INR */
  currency: 'INR';

  /** Timestamp of when transfer was completed — API: receipt.completedAt (ISO 8601) */
  completedAt: string;

  /** The full summary (reused from Step 2 panel) */
  summary: TransferSummary;
}
