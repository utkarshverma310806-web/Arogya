'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, Phone, Eye, EyeOff, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Badge } from './Badge';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { login, signup, loginAsDemoStudent } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
    onClose();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    signup(name, email, password, phone);
    onClose();
  };

  const handleDemoLogin = () => {
    loginAsDemoStudent();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md glass-panel border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-2 border-b border-slate-500/20">
              <div>
                <Badge variant="cyan" size="sm" className="mb-1">
                  ArogyaAI Patient Auth
                </Badge>
                <h3 className="text-xl font-bold">
                  {mode === 'login' ? 'Welcome Back' : 'Create Patient Account'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 opacity-70 hover:opacity-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Login / Sign Up Tabs */}
            <div className="flex rounded-xl glass-panel p-1 border">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'login'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" /> Login
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'signup'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" /> Sign Up
              </button>
            </div>

            {/* Login Form */}
            {mode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold">Email Address:</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold">Password:</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl glass-input text-xs"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 opacity-60 hover:opacity-100"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl btn-gradient-glow text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <LogIn className="w-4 h-4" /> Sign In to Portal
                </button>
              </form>
            )}

            {/* Sign Up Form */}
            {mode === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold">Full Name:</label>
                  <div className="relative">
                    <User className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Verma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">Email Address:</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">Phone (+91):</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">Password:</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl glass-input text-xs"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 opacity-60 hover:opacity-100"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl btn-gradient-glow text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <UserPlus className="w-4 h-4" /> Create Account
                </button>
              </form>
            )}

            {/* Quick 1-Click Demo Login */}
            <div className="pt-3 border-t border-slate-500/20 text-center">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-purple-400" /> 1-Click Demo Student Login
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
