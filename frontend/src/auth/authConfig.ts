import { UserProfile } from '../types';

/**
 * UTIS Centralized Government Authentication Configuration
 * Strict session-only storage keys and API endpoints.
 * Zero plaintext passwords or demo accounts.
 */

export const AUTH_CONFIG = {
  // Session storage keys (strictly sessionStorage, never localStorage)
  SESSION_STORAGE_KEY: 'utis_officer_session',
  SESSION_TOKEN_KEY: 'utis_officer_token',

  // Backend API Base URL
  API_BASE: 'http://localhost:5000/api/auth',

  // Standard Authenticated Officer Blueprint (returned upon successful verification)
  DEFAULT_OFFICER_PROFILE: {
    id: 'GOV-OFFICER-01',
    name: 'Officer',
    role: 'transport_officer' as const,
    roleTitle: 'Transport Control Officer',
    department: 'Command & Control Center, Urban Transport Authority',
    badgeId: 'GOV-2026',
    depotAssigned: 'Swargate Central Command',
    avatarInitials: 'OF',
    email: 'officer@transport.gov.in',
    permissions: ['all']
  } as UserProfile
};
