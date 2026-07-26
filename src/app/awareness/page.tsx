'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Sparkles,
  Clock,
  User,
  ArrowRight,
  X,
  CheckCircle2,
  Share2,
  Bookmark,
  Lightbulb,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Badge } from '@/components/Badge';
import { MOCK_ARTICLES } from '@/data/mockArticles';
import { HealthArticle } from '@/types';

export default function AwarenessPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<HealthArticle | null>(null);

  // Daily Wellness Tip Generator state
  const [dailyTip, setDailyTip] = useState(
    'Drink 500ml of fresh room-temperature water upon waking up to kickstart gut digestion and hydration.'
  );

  const categories = ['All', 'Wellness', 'Preventive Care', 'Mental Health', 'Nutrition', 'Cardiovascular'];

  const filteredArticles = MOCK_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const generateNewTip = () => {
    const tips = [
      'Take a 5-minute outdoor walk without screens every 90 minutes of continuous coding.',
      'Practice Box Breathing (4s inhale, 4s hold, 4s exhale, 4s hold) to reduce cortisol stress.',
      'Keep your sleeping room temperature around 18-20°C for maximum deep REM sleep quality.',
      'Incorporate 1 tablespoon of extra virgin olive oil daily for vascular inflammation control.',
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setDailyTip(randomTip);
  };

  const featuredArticle = MOCK_ARTICLES.find((a) => a.featured) || MOCK_ARTICLES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="cyan" size="md">
          <BookOpen className="w-4 h-4 text-cyan-400" /> Medical Awareness & Guides
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Health Knowledge Hub
        </h1>
        <p className="text-slate-300 text-sm">
          Evidence-aligned preventive care guides, mental wellness strategies, and clinical takeaways curated for modern lifestyles.
        </p>
      </div>

      {/* DAILY WELLNESS TIP SPOTLIGHT WIDGET */}
      <GlassCard glow className="p-6 border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-400 shrink-0">
            <Lightbulb className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-bold text-purple-400 uppercase tracking-widest">
              Daily Wellness Tip of the Day
            </span>
            <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">{dailyTip}</p>
          </div>
        </div>

        <button
          onClick={generateNewTip}
          className="px-4 py-2.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-semibold whitespace-nowrap shrink-0"
        >
          🎲 Next Tip
        </button>
      </GlassCard>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search health topics, sleep, diet..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Spotlight Card */}
      {selectedCategory === 'All' && !searchQuery && featuredArticle && (
        <div className="relative rounded-3xl overflow-hidden glass-panel border-cyan-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <Badge variant="cyan" size="sm">
              Featured Article
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              {featuredArticle.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {featuredArticle.summary}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" /> {featuredArticle.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" /> {featuredArticle.readTime}
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveArticle(featuredArticle)}
                className="px-6 py-3 rounded-xl btn-gradient-glow text-white font-bold text-xs sm:text-sm flex items-center gap-2"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src={featuredArticle.imageUrl}
              alt={featuredArticle.title}
              className="w-full h-64 rounded-2xl object-cover border border-cyan-500/20 shadow-xl"
            />
          </div>
        </div>
      )}

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <GlassCard key={art.id} hoverEffect className="p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden h-44">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="cyan" size="sm">
                    {art.category}
                  </Badge>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white leading-snug hover:text-cyan-300 transition-colors">
                {art.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{art.summary}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-400" /> {art.readTime}
              </span>

              <button
                onClick={() => setActiveArticle(art)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* ARTICLE READER MODAL */}
      <AnimatePresence>
        {activeArticle && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start pb-4 border-b border-slate-800">
                <div>
                  <Badge variant="cyan" size="sm" className="mb-2">
                    {activeArticle.category}
                  </Badge>
                  <h2 className="text-2xl font-bold text-white">{activeArticle.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">By {activeArticle.author} • {activeArticle.readTime}</p>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-56 rounded-2xl object-cover border border-slate-800"
              />

              {/* Key Takeaways Box */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> AI Clinical Takeaways:
                </h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {activeArticle.keyTakeaways.map((k, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Content */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeArticle.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-xl btn-gradient-glow text-white font-bold text-xs"
                >
                  Close Reader
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
