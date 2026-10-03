/**
 * analytics.types.ts
 * Domain: Financial Analytics & Charts
 * Used on: Dashboard (Trend Chart + Financial Metrics footer)
 * API Endpoint: GET /api/analytics/monthly?accountId=&year=2024&month=6
 */

/** 3-letter month key matching the UI month pills */
export type MonthKey =
  | 'JAN' | 'FEB' | 'MAR' | 'APR'
  | 'MAY' | 'JUN' | 'JUL' | 'AUG'
  | 'SEP' | 'OCT' | 'NOV' | 'DEC';

/** A single data point on the spend/balance trend chart */
export interface ChartDataPoint {
  /** Day of the month (1–31) — API: point.day */
  day: number;

  /** Amount value for that day (spend or balance) — API: point.amount */
  amount: number;
}

/** The 3 financial metric cards below the chart */
export interface MonthlyMetrics {
  /** Total money credited this month — API: metrics.totalIncome */
  totalIncome: number;

  /** Total money debited this month — API: metrics.totalExpenses */
  totalExpenses: number;

  /** Reward points earned this month (displayed as ₹ equivalent) — API: metrics.rewardPoints */
  rewardPoints: number;

  /** Currency, always INR — API: metrics.currency */
  currency: 'INR';
}

/** Full analytics payload for a selected month */
export interface MonthlyAnalytics {
  /** Which month this data belongs to — API: analytics.month */
  month: MonthKey;

  /** Which year this data belongs to — API: analytics.year */
  year: number;

  /** The chart data points for the trend graph — API: analytics.chartData */
  chartData: ChartDataPoint[];

  /** The summary financial metrics — API: analytics.metrics */
  metrics: MonthlyMetrics;
}
