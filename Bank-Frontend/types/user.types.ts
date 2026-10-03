/**
 * user.types.ts
 * Domain: Authentication & User Identity
 * Used on: All pages (header, welcome banner)
 * API Endpoint: GET /api/auth/user or GET /api/user/profile
 */

export interface UserProfile {
  /** User's full name — API: user.name */
  name: string;

  /** User's unique ID — API: user.id */
  userId: string;

  /** Formatted last login timestamp — API: user.lastLoginAt (ISO 8601, format on FE) */
  lastLoginAt: string;

  /** User's primary email address — API: user.email */
  email: string;

  /** Optional avatar/profile picture URL — API: user.avatarUrl */
  avatarUrl?: string;
}

export interface AuthSession {
  /** The authenticated user's profile */
  user: UserProfile;

  /** JWT or session token — API: session.token */
  token: string;

  /** Token expiry — API: session.expiresAt (ISO 8601) */
  expiresAt: string;

  /** Whether this session is still valid */
  isAuthenticated: boolean;
}
