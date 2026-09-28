'use client';

import React from 'react';
import {
  Activity,
  Code2,
  Database,
  Cpu,
  Zap,
  Users,
  Target,
  Sparkles,
  BookOpen,
  Award,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Badge } from '@/components/Badge';

export default function AboutPage() {
  const systemArchitecture = [
    {
      title: 'Next.js App Router',
      icon: Cpu,
      desc: 'Provides fast server-rendered page loading, optimized routes, and layout persistence across all navigation pages.',
    },
    {
      title: 'Client State & Hooks',
      icon: Code2,
      desc: 'React state hooks (useState, useEffect, useMemo) handle real-time chat updates, diagnostic steps, and doctor filter selections.',
    },
    {
      title: 'LocalStorage Database',
      icon: Database,
      desc: 'Zero-backend persistence storing appointments and daily medicine reminder schedules locally in the browser.',
    },
    {
      title: 'Clinical Triage Engine',
      icon: Activity,
      desc: 'Intelligent keyword matching algorithms analyzing symptom input against medical risk triage levels.',
    },
  ];

  const team = [
    {
      name: 'Utkarsh Sharma',
      role: 'Lead CSE Student Developer',
      spec: 'Full-Stack & AI UI Design',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Dr. Aarav Sharma',
      role: 'Clinical Advisory Lead',
      spec: 'Cardiology & Digital Health',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Dr. Ananya Deshmukh',
      role: 'Medical AI Consultant',
      spec: 'Neuro-Diagnostics & Triage',
      avatar: 'https://images.unsplash.com/photo-1594824813566-78a597c8d9fb?q=80&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="cyan" size="md">
          <Sparkles className="w-4 h-4 text-cyan-400" /> Internship Project Overview
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          About <span className="gradient-text-cyan-purple">ArogyaAI</span>
        </h1>
        <p className="opacity-80 text-base leading-relaxed">
          ArogyaAI is a virtual health assistant prototype engineered to make preliminary healthcare guidance accessible, intuitive, and private for everyone.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard glow className="p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-sm opacity-80 leading-relaxed">
            To empower individuals with immediate, evidence-aligned health insights and seamless specialist appointment scheduling, minimizing panic and optimizing primary care workflows.
          </p>
        </GlassCard>

        <GlassCard glow className="p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">Our Vision</h2>
          <p className="text-sm opacity-80 leading-relaxed">
            A future where virtual health assistants work alongside clinical practitioners, serving as a first line of defense for triage and preventive wellness management.
          </p>
        </GlassCard>
      </div>

      {/* CSE STUDENT TECH EXPLAINER SECTION */}
      <section className="space-y-8">
        <div className="p-8 rounded-3xl glass-panel border-cyan-500/30 space-y-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-500/20">
            <div>
              <Badge variant="purple" size="sm" className="mb-2">
                <BookOpen className="w-3.5 h-3.5" /> Project Viva & Viva Guide
              </Badge>
              <h2 className="text-2xl font-bold">
                Technical Architecture & Code Explanation
              </h2>
              <p className="text-xs opacity-75 mt-1">
                How to explain this project during your second-year CSE presentation.
              </p>
            </div>
            <Award className="w-10 h-10 text-cyan-400 shrink-0 hidden md:block" />
          </div>

          {/* Architecture Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemArchitecture.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl glass-panel space-y-3"
                >
                  <Icon className="w-7 h-7 text-cyan-400" />
                  <h3 className="font-bold text-base">{tech.title}</h3>
                  <p className="text-xs opacity-75 leading-relaxed">{tech.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Key Answers for Evaluation */}
          <div className="space-y-4 pt-4 border-t border-slate-500/20">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
              Quick Q&A for Presentation:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl glass-panel space-y-1">
                <p className="font-semibold">Q: How does the AI Assistant reply without a paid API?</p>
                <p className="opacity-75">
                  It utilizes a deterministic keyword matching algorithm (`generateAIResponse`) that parses medical terms (e.g. fever, headache, chest pain) and returns structured clinical advice and triage scores.
                </p>
              </div>
              <div className="p-4 rounded-xl glass-panel space-y-1">
                <p className="font-semibold">Q: How is data preserved without a database?</p>
                <p className="opacity-75">
                  Appointments and Medicine Reminders are persisted using the browser&apos;s `localStorage` web API wrapped inside safe helper modules (`src/lib/storage.ts`).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE TEAM / ADVISORY */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="cyan" size="md">
            <Users className="w-4 h-4" /> Leadership
          </Badge>
          <h2 className="text-3xl font-bold">Project Contributors & Advisors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((m, idx) => (
            <GlassCard key={idx} hoverEffect className="p-6 text-center space-y-4">
              <img
                src={m.avatar}
                alt={m.name}
                className="w-24 h-24 rounded-2xl mx-auto object-cover border-2 border-cyan-500/30 shadow-lg"
              />
              <div>
                <h3 className="text-lg font-bold">{m.name}</h3>
                <p className="text-xs text-cyan-400 font-medium">{m.role}</p>
                <p className="text-[11px] opacity-75 mt-1">{m.spec}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
