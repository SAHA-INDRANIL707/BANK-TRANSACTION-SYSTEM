/**
 * transaction.types.ts
 * Domain: Transactions & Ledger
 * Used on: Dashboard (Recent Transactions panel), future Statement page
 * API Endpoint: GET /api/transactions?accountId=&limit=5&page=1
 */

/** Whether money left or entered the account */
export type TransactionType = 'DEBIT' | 'CREDIT';

/** Category for grouping and icon selection on the UI */
export type TransactionCategory =
  | 'ENTERTAINMENT'
  | 'PAYROLL'
  | 'UTILITY'
  | 'CARD_PAYMENT'
  | 'SHOPPING'
  | 'TRANSFER'
  | 'FOOD'
  | 'TRAVEL'
  | 'INVESTMENT'
  | 'OTHER';

export interface Transaction {
  /** Unique transaction ID — API: txn.id */
  transactionId: string;

  /** Merchant or sender/receiver name — API: txn.merchantName */
  merchantName: string;

  /** Date of transaction as ISO 8601 string — API: txn.transactionDate */
  transactionDate: string;

  /** Amount in INR (always positive) — API: txn.amount */
  amount: number;

  /** Currency, always INR — API: txn.currency */
  currency: 'INR';

  /** Whether it was a debit or credit — API: txn.type */
  type: TransactionType;

  /** Category for icon & grouping — API: txn.category */
  category: TransactionCategory;

  /** Optional short description — API: txn.description */
  description?: string;

  /** UTR / Reference number for transfers — API: txn.referenceNumber */
  referenceNumber?: string;

  /** Account balance after this transaction — API: txn.runningBalance */
  runningBalance?: number;
}

/** Paginated response wrapper for transaction list */
export interface TransactionListResponse {
  /** Array of transactions — API: response.data */
  transactions: Transaction[];

  /** Total number of transactions available — API: response.total */
  total: number;

  /** Current page — API: response.page */
  page: number;

  /** Items per page — API: response.limit */
  limit: number;

  /** Whether there are more pages — API: response.hasMore */
  hasMore: boolean;
}
