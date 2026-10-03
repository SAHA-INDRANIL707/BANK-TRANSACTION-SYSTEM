/**
 * api.types.ts
 * Domain: API Communication Layer
 * Used on: Every page that fetches real data
 * This file is the ONLY place that knows about HTTP/API shape.
 * All other type files describe domain data, not API wrappers.
 */

/** Standard API success/error response envelope */
export interface ApiResponse<T> {
  /** The actual data payload */
  data: T;

  /** HTTP-like status code — API: response.status */
  status: number;

  /** Human-readable message — API: response.message */
  message: string;

  /** Whether the request was successful */
  success: boolean;
}

/** Paginated list response envelope */
export interface PaginatedResponse<T> {
  /** The list of items */
  data: T[];

  /** Total number of items available */
  total: number;

  /** Current page number (1-indexed) */
  page: number;

  /** Number of items per page */
  limit: number;

  /** Whether more pages exist */
  hasMore: boolean;
}

/** Standard API error shape */
export interface ApiError {
  /** HTTP status code */
  status: number;

  /** Error code for programmatic handling — API: error.code */
  code: string;

  /** Human-readable error message — API: error.message */
  message: string;

  /** Optional field-level validation errors — API: error.fieldErrors */
  fieldErrors?: Record<string, string>;
}

/**
 * Navigation item type used in the bottom nav bar
 * Appears on: All pages (Dashboard, Transfer Step 1/2/3)
 */
export interface NavItem {
  /** Unique key for the nav item */
  key: 'DASHBOARD' | 'ACCOUNTS' | 'FUNDS_TRANSFER' | 'PAY_BILLS' | 'CARDS' | 'STATEMENT';

  /** Display label */
  label: string;

  /** Route path to navigate to */
  href: string;

  /** Whether this item is currently active */
  isActive: boolean;
}
