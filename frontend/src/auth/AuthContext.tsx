import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { UserProfile } from '../types';
import { authService } from './authService';
import { AUTH_CONFIG } from './authConfig';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (userId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  hasPermission: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getCurrentUser());

  const isAuthenticated = !!user;

  const login = useCallback(async (userId: string, password: string) => {
    const result = await authService.login(userId, password);
    if (result.success && result.user) {
      setUser(result.user);
      return { success: true };
    }
    return {
      success: false,
      error: result.error || 'Invalid username or password. Please try again.'
    };
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const hasPermission = useCallback((_module: string): boolean => {
    // Authenticated command officer has full administrative authority
    return !!user;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AUTH_CONFIG };
