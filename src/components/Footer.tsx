'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden text-slate-400 text-sm">
      {/* Glow Orbs in Footer */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px]">
                <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center text-cyan-400">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Arogya<span className="gradient-text-cyan-purple">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Virtual Health Assistant platform designed to provide rapid AI symptom triage, smart doctor scheduling, and intuitive medication management.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Anti-Gravity Futuristic Theme</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-cyan-400 transition-colors">AI Health Assistant</Link>
              </li>
              <li>
                <Link href="/symptom-checker" className="hover:text-cyan-400 transition-colors">AI Symptom Checker</Link>
              </li>
              <li>
                <Link href="/appointments" className="hover:text-cyan-400 transition-colors">Book Specialist</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Patient Care
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/reminders" className="hover:text-cyan-400 transition-colors">Medicine Reminders</Link>
              </li>
              <li>
                <Link href="/awareness" className="hover:text-cyan-400 transition-colors">Health Awareness Library</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">About & System Tech</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact & Helplines</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Medical Disclaimer */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Medical Disclaimer</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              ArogyaAI is a demonstration project for educational purposes. Information provided by AI is for triage guidance and does not constitute official medical advice or diagnosis.
            </p>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 ArogyaAI Project. Designed for Internship Demonstration.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Next.js & Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
