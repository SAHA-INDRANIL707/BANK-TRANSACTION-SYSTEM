/**
 * account.types.ts
 * Domain: Bank Accounts
 * Used on: Dashboard (balance banner), Transfer Step 1/2/3 (from/to account selectors)
 * API Endpoint: GET /api/accounts
 */

/** The type of bank account */
export type AccountType = 'SAVINGS' | 'CURRENT' | 'ADVANTAGE' | 'FD' | 'RD';

/** Whether the account is actively usable */
export type AccountStatus = 'ACTIVE' | 'DORMANT' | 'FROZEN' | 'CLOSED';

export interface BankAccount {
  /** Unique account identifier — API: account.id */
  accountId: string;

  /** Last 4 digits of account for display — API: account.maskedNumber */
  maskedNumber: string;

  /** Full account number (only included in secure contexts) — API: account.accountNumber */
  accountNumber?: string;

  /** Type of bank account — API: account.type */
  accountType: AccountType;

  /** Available balance in INR (paise or decimal) — API: account.availableBalance */
  availableBalance: number;

  /** Currency code, always 'INR' for BOI — API: account.currency */
  currency: 'INR';

  /** Name of the account holder — API: account.holderName */
  holderName: string;

  /** Account status — API: account.status */
  status: AccountStatus;

  /** IFSC code of the branch — API: account.ifscCode */
  ifscCode?: string;

  /** Branch name — API: account.branchName */
  branchName?: string;
}

/**
 * Slim version of BankAccount used in dropdowns and transfer forms
 * where we don't need the full account details
 */
export interface AccountSummary {
  accountId: string;
  maskedNumber: string;
  accountType: AccountType;
  availableBalance: number;
  holderName: string;
  currency: 'INR';
}
