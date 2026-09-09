import { AUTH_CONFIG } from './authConfig';
import { UserProfile } from '../types';

/**
 * UTIS Government Portal Authentication Service
 * 
 * Strict Session Rules:
 * 1. Zero persistent storage: localStorage is strictly purged and never used.
 * 2. Strict sessionStorage lifecycle: closing the browser/tab clears the session.
 * 3. Page Refresh (F5) preserves the active in-tab session without interruption.
 * 4. Password security: passwords are NEVER saved in localStorage, sessionStorage,
 *    cookies, or client variables.
 * 5. Backend synchronization: communicates with the backend REST API for session
 *    validation and invalidation.
 */

class AuthService {
  private currentUser: UserProfile | null = null;
  private token: string | null = null;

  constructor() {
    this.cleanupLegacyStorage();
    this.initSession();
  }

  /**
   * Purges any legacy permanent localStorage left from earlier prototypes
   */
  private cleanupLegacyStorage(): void {
    try {
      localStorage.removeItem('utis_auth_session');
      localStorage.removeItem('utis_user');
      localStorage.removeItem('utis_token');
      localStorage.removeItem('utis_officer_session');
      localStorage.removeItem('utis_remember');
    } catch {
      // Storage access may be restricted in some environments
    }
  }

  /**
   * Initialize session on application boot.
   * Checks sessionStorage for an active tab session.
   * If present, restores officer profile.
   */
  private initSession(): void {
    try {
      const savedUserJson = sessionStorage.getItem(AUTH_CONFIG.SESSION_STORAGE_KEY);
      const savedToken = sessionStorage.getItem(AUTH_CONFIG.SESSION_TOKEN_KEY);

      if (savedUserJson) {
        this.currentUser = JSON.parse(savedUserJson) as UserProfile;
        this.token = savedToken || null;
        // Asynchronously verify with backend if token exists
        if (this.token) {
          this.verifyBackendSession(this.token);
        }
      } else {
        this.clearSession();
      }
    } catch {
      this.clearSession();
    }
  }

  /**
   * Asynchronously verify session token against backend
   */
  private async verifyBackendSession(token: string): Promise<void> {
    try {
      const response = await fetch(`${AUTH_CONFIG.API_BASE}/session`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        // Backend indicated session is invalid or expired
        this.clearSession();
      }
    } catch {
      // Backend may be in offline mode; keep existing tab session
    }
  }

  /**
   * Officer Login
   */
  public async login(
    userIdInput: string,
    passwordInput: string
  ): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
    const cleanUser = (userIdInput || '').trim();
    const cleanPass = (passwordInput || '').trim();

    if (!cleanUser) {
      return {
        success: false,
        error: 'Please enter your username.'
      };
    }

    if (!cleanPass) {
      return {
        success: false,
        error: 'Please enter your password.'
      };
    }

    // 1. Try Backend REST API Authentication first
    try {
      const response = await fetch(`${AUTH_CONFIG.API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const authenticatedUser: UserProfile = {
          ...AUTH_CONFIG.DEFAULT_OFFICER_PROFILE,
          ...(data.user || {})
        };

        this.currentUser = authenticatedUser;
        this.token = data.token || 'utis_sess_' + Date.now();

        try {
          sessionStorage.setItem(
            AUTH_CONFIG.SESSION_STORAGE_KEY,
            JSON.stringify(authenticatedUser)
          );
          sessionStorage.setItem(AUTH_CONFIG.SESSION_TOKEN_KEY, this.token || '');
        } catch {
          // Ignore storage quota errors
        }

        return {
          success: true,
          user: authenticatedUser
        };
      } else if (response.status === 401 || response.status === 400) {
        return {
          success: false,
          error: data.message || 'Invalid username or password. Please try again.'
        };
      }
    } catch {
      // Backend server not running - execute resilient standalone verification
    }

    // 2. Standalone / Prototype Authentication Fallback
    // For SIH Prototype: accepts ANY non-empty username and password
    const initials = cleanUser.length > 1 ? cleanUser.slice(0, 2).toUpperCase() : cleanUser.toUpperCase();
    const authenticatedUser: UserProfile = {
      id: `OFFICER-${Math.floor(1000 + Math.random() * 9000)}`,
      name: cleanUser,
      role: 'transport_officer',
      roleTitle: 'Transport Control Officer',
      department: 'Command & Control Center, Urban Transport Authority',
      badgeId: `GOV-${cleanUser.toUpperCase()}`,
      depotAssigned: 'Swargate Central Command',
      avatarInitials: initials,
      email: `${cleanUser.toLowerCase().replace(/\s+/g, '.')}@transport.gov.in`,
      permissions: ['all']
    };

    this.currentUser = authenticatedUser;
    this.token = 'utis_proto_' + Date.now();

    try {
      sessionStorage.setItem(
        AUTH_CONFIG.SESSION_STORAGE_KEY,
        JSON.stringify(authenticatedUser)
      );
      sessionStorage.setItem(AUTH_CONFIG.SESSION_TOKEN_KEY, this.token || '');
    } catch {
      // Ignore storage errors
    }

    return {
      success: true,
      user: authenticatedUser
    };
  }

  /**
   * Officer Logout: destroys active backend session and clears sessionStorage
   */
  public async logout(): Promise<void> {
    const currentToken = this.token;

    // Invalidate session on backend if token exists
    if (currentToken) {
      try {
        await fetch(`${AUTH_CONFIG.API_BASE}/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`
          },
          body: JSON.stringify({ token: currentToken })
        });
      } catch {
        // Continue clearing local session even if backend call fails
      }
    }

    this.clearSession();
  }

  /**
   * Clear session data from memory and sessionStorage
   */
  public clearSession(): void {
    this.currentUser = null;
    this.token = null;
    try {
      sessionStorage.removeItem(AUTH_CONFIG.SESSION_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_CONFIG.SESSION_TOKEN_KEY);
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Returns current authenticated officer or null
   */
  public getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  /**
   * Returns current session token or null
   */
  public getToken(): string | null {
    return this.token;
  }

  /**
   * Returns true if user is actively authenticated in current session
   */
  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const authService = new AuthService();
