'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Bot,
  Stethoscope,
  Calendar,
  Pill,
  BookOpen,
  Mail,
  User,
  PhoneCall,
  Menu,
  X,
  Info,
  Sun,
  Moon,
  Globe,
  Zap,
  LogIn,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { ProfileModal } from './ProfileModal';
import { AuthModal } from './AuthModal';
import { AiKeyModal } from './AiKeyModal';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage, t, theme, toggleTheme } = useApp();
  const { user, isAuthenticated, logout } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAiKeyOpen, setIsAiKeyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { name: t.home, href: '/', icon: Activity },
    { name: t.assistant, href: '/assistant', icon: Bot },
    { name: t.symptomChecker, href: '/symptom-checker', icon: Stethoscope },
    { name: t.bookAppointment, href: '/appointments', icon: Calendar },
    { name: t.medicineReminder, href: '/reminders', icon: Pill },
    { name: t.healthAwareness, href: '/awareness', icon: BookOpen },
    { name: t.about, href: '/about', icon: Info },
    { name: t.contact, href: '/contact', icon: Mail },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-cyan-500/15 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 p-[2px] shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                <Activity className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight flex items-center gap-1">
                Arogya<span className="gradient-text-cyan-purple">AI</span>
              </span>
              <span className="block text-[10px] font-medium tracking-widest text-cyan-500 uppercase">
                Virtual Health Assistant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel p-1.5 rounded-full border">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-cyan-400 font-semibold'
                      : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : ''}`} />
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-cyan-500/15 border border-cyan-400/40 -z-10 shadow-[0_0_10px_rgba(0,242,254,0.2)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* AI API Key Config Trigger */}
            <button
              onClick={() => setIsAiKeyOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-bold transition-all"
              title="Configure AI API Key"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Key</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl glass-panel text-xs font-bold transition-all hover:border-cyan-400"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'en' ? 'EN 🇺🇸' : 'HI 🇮🇳'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl glass-panel text-xs font-medium transition-all hover:border-cyan-400"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
            </button>

            {/* Authentication / Profile Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel border border-cyan-500/40 text-xs font-bold hover:border-cyan-400 transition-all"
                >
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="max-w-[80px] truncate">{user?.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-2xl glass-panel border border-cyan-500/30 p-2 shadow-2xl space-y-1 z-50 text-xs"
                    >
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setIsProfileOpen(true);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-500/10 text-cyan-300 font-semibold flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5" /> View Health Vault
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-500/10 text-rose-400 font-semibold flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-gradient-glow text-white text-xs font-bold shadow-md"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login / Sign Up</span>
              </button>
            )}

            {/* SOS Emergency */}
            <a
              href="tel:112"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-400 text-xs font-bold hover:bg-rose-600/30 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>{t.sos}</span>
            </a>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsAiKeyOpen(true)}
              className="p-2 rounded-lg glass-panel text-purple-400 text-xs font-bold"
            >
              <Zap className="w-4 h-4" />
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="p-2 rounded-lg glass-panel text-xs font-bold text-cyan-400"
            >
              {language === 'en' ? 'EN' : 'HI'}
            </button>

            <button
              onClick={() => (isAuthenticated ? setIsProfileOpen(true) : setIsAuthOpen(true))}
              className="p-2 rounded-lg glass-panel text-cyan-400"
            >
              <User className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg glass-panel"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-20 left-0 right-0 z-30 glass-panel p-6 shadow-2xl space-y-3"
          >
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/40'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <AiKeyModal isOpen={isAiKeyOpen} onClose={() => setIsAiKeyOpen(false)} />
    </>
  );
};
