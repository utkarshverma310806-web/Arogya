'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  bloodType: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserAccount | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string, phone: string) => boolean;
  logout: () => void;
  loginAsDemoStudent: () => void;
}

const AUTH_USER_KEY = 'arogya_auth_user';

export const DEMO_STUDENT_USER: UserAccount = {
  id: 'usr_demo_101',
  name: 'Rahul Verma',
  email: 'rahul.verma@example.com',
  phone: '+91 98765 43210',
  gender: 'Male',
  bloodType: 'O +',
  createdAt: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(AUTH_USER_KEY);
        if (saved) {
          try {
            setUser(JSON.parse(saved));
          } catch {
            setUser(DEMO_STUDENT_USER);
          }
        } else {
          // Default to Demo Logged-In Student for instant presentation
          setUser(DEMO_STUDENT_USER);
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(DEMO_STUDENT_USER));
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const login = (email: string): boolean => {
    const loggedUser: UserAccount = {
      id: 'usr_' + Math.random().toString(36).substring(2, 8),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      phone: '+91 98765 43210',
      gender: 'Specified',
      bloodType: 'O +',
      createdAt: new Date().toISOString(),
    };
    setUser(loggedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(loggedUser));
    }
    return true;
  };

  const signup = (name: string, email: string, pass: string, phone: string): boolean => {
    const newUser: UserAccount = {
      id: 'usr_' + Math.random().toString(36).substring(2, 8),
      name: name || 'Patient User',
      email,
      phone: phone || '+91 98765 43210',
      gender: 'Specified',
      bloodType: 'B +',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  };

  const loginAsDemoStudent = () => {
    setUser(DEMO_STUDENT_USER);
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(DEMO_STUDENT_USER));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loginAsDemoStudent,
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
