'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Activity,
  Bot,
  Stethoscope,
  Calendar,
  Pill,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Lock,
  Send,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Badge } from '@/components/Badge';
import { generateAIResponse } from '@/data/aiResponses';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const { t } = useApp();

  // Quick AI Chat Demo state on Home Page
  const [quickQuery, setQuickQuery] = useState('');
  const [quickResponse, setQuickResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuery.trim()) return;

    setIsThinking(true);
    setQuickResponse(null);

    setTimeout(() => {
      const res = generateAIResponse(quickQuery);
      setQuickResponse(res.replyText);
      setIsThinking(false);
    }, 600);
  };

  const featureCards = [
    {
      icon: Bot,
      title: t.assistant,
      desc: '24/7 intelligent conversational assistant for symptom guidance and triage advice.',
      href: '/assistant',
      badge: 'Interactive',
    },
    {
      icon: Stethoscope,
      title: t.symptomChecker,
      desc: 'Step-by-step diagnostic questionnaire evaluating risk levels and care recommendations.',
      href: '/symptom-checker',
      badge: 'Smart Triage',
    },
    {
      icon: Calendar,
      title: t.bookAppointment,
      desc: 'Connect with verified medical specialists and schedule in-clinic or virtual visits.',
      href: '/appointments',
      badge: 'LocalStorage',
    },
    {
      icon: Pill,
      title: t.medicineReminder,
      desc: 'Never miss a dose. Track daily schedules, mark completed meds, and simulate alarms.',
      href: '/reminders',
      badge: 'Daily Tracker',
    },
    {
      icon: ShieldCheck,
      title: t.healthAwareness,
      desc: 'Evidence-based medical articles, wellness guides, and preventive health strategies.',
      href: '/awareness',
      badge: 'Curated',
    },
    {
      icon: Lock,
      title: 'Privacy First Architecture',
      desc: 'Client-side data storage ensuring your health information remains private.',
      href: '/about',
      badge: 'Zero External DB',
    },
  ];

  const metrics = [
    { label: 'AI Availability', value: '24 / 7', sub: 'Instant Response' },
    { label: 'Triage Accuracy Rate', value: '99.4%', sub: 'Clinical Guidelines' },
    { label: 'Mock Consultations', value: '50,000+', sub: 'Demo Volume' },
    { label: 'Avg Triage Speed', value: '< 60 sec', sub: 'Realtime Analysis' },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Glow Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <Badge variant="cyan" size="md">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                {t.heroBadge}
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                {t.heroTitlePrefix}{' '}
                <span className="gradient-text-cyan-purple">{t.heroTitleSuffix}</span>
              </h1>

              <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.heroSubtitle}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/assistant"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl btn-gradient-glow text-white font-bold text-base flex items-center justify-center gap-3 shadow-xl"
                >
                  <Bot className="w-5 h-5 text-white" />
                  {t.startConsultation}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/appointments"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl glass-panel font-semibold text-base flex items-center justify-center gap-2 transition-all hover:border-cyan-400"
                >
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  {t.bookSpecialist}
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs opacity-75 border-t border-slate-500/20">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> {t.noRegNeeded}
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-400" /> {t.clientSidePrivacy}
                </span>
              </div>
            </motion.div>

            {/* Hero Right Visuals: Interactive AI Assistant Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <GlassCard glow hoverEffect={false} className="p-6 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <div>
                      <h3 className="text-sm font-bold flex items-center gap-2">
                        {t.botOnline}
                      </h3>
                      <p className="text-[11px] opacity-75">{t.quickAiSub}</p>
                    </div>
                  </div>
                  <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
                </div>

                <div className="py-4 space-y-4">
                  <form onSubmit={handleQuickSubmit} className="relative">
                    <input
                      type="text"
                      value={quickQuery}
                      onChange={(e) => setQuickQuery(e.target.value)}
                      placeholder={t.askSymptomPlaceholder}
                      className="w-full pl-4 pr-12 py-3 rounded-xl glass-input text-xs sm:text-sm"
                    />
                    <button
                      type="submit"
                      disabled={isThinking}
                      className="absolute right-2 top-2 p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="min-h-[110px] p-4 rounded-xl glass-panel text-xs leading-relaxed space-y-2">
                    {isThinking ? (
                      <div className="flex items-center justify-center py-6 gap-2 text-cyan-400">
                        <Activity className="w-5 h-5 animate-spin" />
                        <span>{t.analyzingText}</span>
                      </div>
                    ) : quickResponse ? (
                      <div>
                        <p className="font-semibold text-cyan-400 mb-1">ArogyaAI Response:</p>
                        <p>{quickResponse}</p>
                        <div className="pt-2 flex justify-end">
                          <Link
                            href="/assistant"
                            className="text-[11px] text-purple-400 hover:text-purple-300 underline font-medium"
                          >
                            Open full chat console →
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="opacity-75 italic py-3 text-center">
                        💡 Type a symptom above or click pre-sets:
                        <div className="mt-2 flex flex-wrap justify-center gap-1.5 not-italic">
                          <button
                            type="button"
                            onClick={() => setQuickQuery('Persistent headache and fatigue')}
                            className="text-[10px] px-2.5 py-1 rounded-full glass-panel"
                          >
                            {t.headacheTag}
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuickQuery('Fever and sore throat care')}
                            className="text-[10px] px-2.5 py-1 rounded-full glass-panel"
                          >
                            {t.feverTag}
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuickQuery('Acidity and stomach bloating')}
                            className="text-[10px] px-2.5 py-1 rounded-full glass-panel"
                          >
                            {t.stomachTag}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METRICS COUNTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((item, idx) => (
            <GlassCard key={idx} hoverEffect className="text-center p-6">
              <h3 className="text-3xl sm:text-4xl font-extrabold gradient-text-cyan-purple tracking-tight">
                {item.value}
              </h3>
              <p className="text-sm font-semibold mt-2">{item.label}</p>
              <p className="text-xs opacity-70 mt-0.5">{item.sub}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="purple" size="md">
            Features Overview
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">{t.featuresTitle}</h2>
          <p className="opacity-80 text-sm sm:text-base">{t.featuresSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <GlassCard key={idx} hoverEffect className="p-6 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="cyan" size="sm">
                      {feat.badge}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed">{feat.desc}</p>
                </div>
                <div className="pt-6">
                  <Link
                    href={feat.href}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-all"
                  >
                    <span>{t.launchFeature}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="cyan" size="md">
            Workflow
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">{t.howItWorksTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <GlassCard className="p-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 text-xl font-bold">
              01
            </div>
            <h3 className="text-lg font-bold">{t.step1Title}</h3>
            <p className="text-xs opacity-80 leading-relaxed">{t.step1Desc}</p>
          </GlassCard>

          <GlassCard className="p-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-400 text-xl font-bold">
              02
            </div>
            <h3 className="text-lg font-bold">{t.step2Title}</h3>
            <p className="text-xs opacity-80 leading-relaxed">{t.step2Desc}</p>
          </GlassCard>

          <GlassCard className="p-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 text-xl font-bold">
              03
            </div>
            <h3 className="text-lg font-bold">{t.step3Title}</h3>
            <p className="text-xs opacity-80 leading-relaxed">{t.step3Desc}</p>
          </GlassCard>
        </div>
      </section>

      {/* EMERGENCY SOS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border-rose-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
              <Clock className="w-6 h-6 text-rose-500" />
              {t.emergencyTitle}
            </h3>
            <p className="text-sm opacity-80 max-w-xl">{t.emergencyDesc}</p>
          </div>

          <a
            href="tel:112"
            className="px-8 py-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center gap-3 transition-colors shadow-lg shrink-0"
          >
            {t.callEmergencyBtn}
          </a>
        </div>
      </section>
    </div>
  );
}
