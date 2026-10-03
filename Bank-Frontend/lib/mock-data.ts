/**
 * mock-data.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * All mock data for the BOI NetBanking frontend.
 * Every field is named EXACTLY as the real API will return it.
 * To connect real API: replace the exported objects with fetch() calls
 * that return the same shape. Components never need to change.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { UserProfile } from "@/types/user.types";
import type { BankAccount, AccountSummary } from "@/types/account.types";
import type { Transaction } from "@/types/transaction.types";
import type { MonthlyAnalytics } from "@/types/analytics.types";
import type {
  TransferOption,
  TransferSummary,
  TransferReceipt,
} from "@/types/transfer.types";
import type { NavItem } from "@/types/api.types";

// ─── User ─────────────────────────────────────────────────────────────────

/** API: GET /api/user/profile */
export const mockUser: UserProfile = {
  name: "Rahul Sharma",              // API: user.name
  userId: "USR-BOI-00491823",        // API: user.id
  lastLoginAt: "09:42 AM IST",       // API: user.lastLoginAt → format on FE
  email: "rahul.sharma@email.com",   // API: user.email
  avatarUrl: undefined,              // API: user.avatarUrl
};

// ─── Accounts ─────────────────────────────────────────────────────────────

/** API: GET /api/accounts → accounts[0] (primary savings) */
export const mockPrimaryAccount: BankAccount = {
  accountId: "ACC-4892",
  maskedNumber: "4892",
  accountType: "SAVINGS",
  availableBalance: 436605.47,       // API: account.availableBalance
  currency: "INR",
  holderName: "Rahul Sharma",
  status: "ACTIVE",
  ifscCode: "BKID0001234",
  branchName: "Andheri West, Mumbai",
};

/** API: GET /api/accounts → accounts[1] (linked advantage account) */
export const mockLinkedAccount: BankAccount = {
  accountId: "ACC-1042",
  maskedNumber: "1042",
  accountType: "ADVANTAGE",
  availableBalance: 85000.0,         // API: account.availableBalance
  currency: "INR",
  holderName: "Rahul Sharma",
  status: "ACTIVE",
  ifscCode: "BKID0001234",
  branchName: "Andheri West, Mumbai",
};

/** Slim list for dropdowns — API: GET /api/accounts?summary=true */
export const mockAccountSummaries: AccountSummary[] = [
  {
    accountId: "ACC-4892",
    maskedNumber: "4892",
    accountType: "SAVINGS",
    availableBalance: 436605.47,
    holderName: "Rahul Sharma",
    currency: "INR",
  },
  {
    accountId: "ACC-1042",
    maskedNumber: "1042",
    accountType: "ADVANTAGE",
    availableBalance: 85000.0,
    holderName: "Rahul Sharma",
    currency: "INR",
  },
];

// ─── Transactions ──────────────────────────────────────────────────────────

/** API: GET /api/transactions?accountId=ACC-4892&limit=5 */
export const mockRecentTransactions: Transaction[] = [
  {
    transactionId: "TXN-10062024-001",
    merchantName: "PVR Cinemas pvt. ltd.",
    transactionDate: "2024-06-10T14:30:00.000Z", // API: txn.transactionDate
    amount: 1020.0,
    currency: "INR",
    type: "DEBIT",
    category: "ENTERTAINMENT",
    description: "Entertainment",
  },
  {
    transactionId: "TXN-05062024-002",
    merchantName: "Salary Sapient Nitro",
    transactionDate: "2024-06-05T09:00:00.000Z",
    amount: 120456.0,
    currency: "INR",
    type: "CREDIT",
    category: "PAYROLL",
    description: "Corporate Payroll",
  },
  {
    transactionId: "TXN-04062024-003",
    merchantName: "Bescom Bangalore",
    transactionDate: "2024-06-04T11:15:00.000Z",
    amount: 943.0,
    currency: "INR",
    type: "DEBIT",
    category: "UTILITY",
    description: "Electricity Utility",
  },
  {
    transactionId: "TXN-03062024-004",
    merchantName: "Credit Card Payment",
    transactionDate: "2024-06-03T08:00:00.000Z",
    amount: 3400.0,
    currency: "INR",
    type: "DEBIT",
    category: "CARD_PAYMENT",
    description: "Bill Desk Auto-Debit",
  },
  {
    transactionId: "TXN-01062024-005",
    merchantName: "Amazon India Marketplace",
    transactionDate: "2024-06-01T16:45:00.000Z",
    amount: 2850.0,
    currency: "INR",
    type: "DEBIT",
    category: "SHOPPING",
    description: "Online Shopping",
  },
];

// ─── Analytics ────────────────────────────────────────────────────────────

/** API: GET /api/analytics/monthly?accountId=ACC-4892&year=2024&month=6 */
export const mockJuneAnalytics: MonthlyAnalytics = {
  month: "JUN",
  year: 2024,
  chartData: [
    // API: analytics.chartData — day/amount pairs for the trend curve
    { day: 1,  amount: 6900 },
    { day: 5,  amount: 4200 },
    { day: 8,  amount: 3100 },
    { day: 10, amount: 5500 },
    { day: 13, amount: 8200 },
    { day: 15, amount: 6400 },
    { day: 18, amount: 4800 },
    { day: 20, amount: 7200 },
    { day: 22, amount: 5100 },
    { day: 25, amount: 6600 },
    { day: 28, amount: 4200 },
    { day: 30, amount: 5500 },
  ],
  metrics: {
    totalIncome: 120456,    // API: metrics.totalIncome
    totalExpenses: 35456,   // API: metrics.totalExpenses
    rewardPoints: 35456,    // API: metrics.rewardPoints (displayed as ₹ equivalent)
    currency: "INR",
  },
};

// ─── Transfer ─────────────────────────────────────────────────────────────

/** Step 1: transfer method options */
export const mockTransferOptions: TransferOption[] = [
  {
    method: "SELF",
    title: "To Self Account",
    description: "Transfer between your linked BOI savings & current accounts",
    isSelected: true,
    isEnabled: true,
  },
  {
    method: "ACCOUNT_NUMBER",
    title: "To Account Number",
    description: "Transfer instantly via IMPS / NEFT / RTGS to any bank account",
    isSelected: false,
    isEnabled: true,
  },
];

/** Step 2 & 3: transaction summary panel data */
export const mockTransferSummary: TransferSummary = {
  transferModeLabel: "SELF ACCOUNT • INSTANT",
  fromAccountDisplay: "Savings A/C •••• 4892",
  senderName: "Rahul Sharma",
  toAccountDisplay: "Advantage A/C •••• 1042",
  receiverLabel: "Bank of India Linked",
  amount: 25000.0,             // API: summary.amount
  charges: 0.0,                // API: summary.charges
  postTransferBalance: 411605.47, // API: summary.postTransferBalance
  estimatedDelivery: "Instantaneous (Under 5s)",
  isZeroFee: true,
};

/** Step 3: completed transfer receipt */
export const mockTransferReceipt: TransferReceipt = {
  referenceNumber: "BOI202406159823412",  // API: receipt.referenceNumber (UTR)
  status: "SUCCESS",
  amount: 25000.0,
  currency: "INR",
  completedAt: "2024-06-15T10:32:00.000Z", // API: receipt.completedAt
  summary: mockTransferSummary,
};

// ─── Navigation ───────────────────────────────────────────────────────────

/** Bottom nav items — active state is set dynamically based on current route */
export const mockNavItems: NavItem[] = [
  { key: "DASHBOARD",      label: "Dashboard",      href: "/dashboard",           isActive: false },
  { key: "FUNDS_TRANSFER", label: "Funds Transfer", href: "/dashboard/transfer",  isActive: false },
  { key: "PAY_BILLS",      label: "Pay Bills",      href: "/dashboard/bills",     isActive: false },
  { key: "ACCOUNTS",       label: "Accounts",       href: "/dashboard/accounts",  isActive: false },
  { key: "STATEMENT",      label: "Statement",      href: "/dashboard/statement", isActive: false },
];
