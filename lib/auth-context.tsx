'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from './types';
import { initialProfile } from './mock-data';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, password?: string, targetRole?: string) => Promise<boolean>;
  logout: () => void;
  updateTargetRole: (newRole: string) => void;
  updateWeeklyHours: (hours: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(initialProfile);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('skillgraph_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        setUser(initialProfile);
      }
    }
  }, []);

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('skillgraph_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('skillgraph_user');
    }
  };

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate auth latency / Cognito authentication
    await new Promise((r) => setTimeout(r, 600));
    const loggedUser: UserProfile = {
      ...initialProfile,
      email,
      name: email.split('@')[0] || 'Somnath',
      updatedAt: new Date().toISOString(),
    };
    saveUser(loggedUser);
    setIsLoading(false);
    return true;
  };

  const register = async (name: string, email: string, _password?: string, targetRole?: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const newUser: UserProfile = {
      ...initialProfile,
      name,
      email,
      targetRole: targetRole || 'Cloud Security Engineer',
      careerReadiness: 45, // Starting baseline
      updatedAt: new Date().toISOString(),
    };
    saveUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    saveUser(null);
  };

  const updateTargetRole = (newRole: string) => {
    if (!user) return;
    const updated = {
      ...user,
      targetRole: newRole,
      updatedAt: new Date().toISOString(),
    };
    saveUser(updated);
  };

  const updateWeeklyHours = (hours: number) => {
    if (!user) return;
    const updated = {
      ...user,
      weeklyHoursCommitment: hours,
      updatedAt: new Date().toISOString(),
    };
    saveUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateTargetRole,
        updateWeeklyHours,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
