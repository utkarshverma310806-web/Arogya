'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  PhoneCall,
  MapPin,
  Send,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Badge } from '@/components/Badge';
import { MOCK_FAQS } from '@/data/mockFaqs';
import { useApp } from '@/context/AppContext';

export default function ContactPage() {
  const { t } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Query');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq_1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  const emergencyHelplines = [
    { name: 'National Medical Emergency', number: '112 / 108', note: '24/7 Ambulance & Trauma Care India', badge: 'Urgent' },
    { name: 'Tele-MANAS Mental Health', number: '14416', note: '24/7 National Psychological Counseling', badge: 'Mental Health' },
    { name: 'National Health Helpline', number: '104', note: '24/7 Swasthya Seva & Medical Triage', badge: 'National Helpline' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="cyan" size="md">
          <Mail className="w-4 h-4 text-cyan-400" /> Support & Helplines
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold">{t.contact} ArogyaAI</h1>
        <p className="text-sm opacity-80">
          Reach out to the ArogyaAI clinical demo support team or connect directly with National Health Helpline numbers in India.
        </p>
      </div>

      {/* EMERGENCY HELPLINE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {emergencyHelplines.map((item, i) => (
          <GlassCard key={i} glow className="p-6 border-rose-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <PhoneCall className="w-6 h-6 text-rose-500 animate-pulse" />
              <Badge variant="red" size="sm">
                {item.badge}
              </Badge>
            </div>
            <div>
              <h3 className="font-bold text-base">{item.name}</h3>
              <p className="text-2xl font-extrabold text-rose-500 mt-1">{item.number}</p>
              <p className="text-xs opacity-75 mt-1">{item.note}</p>
            </div>
            <a
              href={`tel:${item.number.split(' ')[0]}`}
              className="w-full py-2.5 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-400 hover:bg-rose-600/30 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              Call Hotline Now
            </a>
          </GlassCard>
        ))}
      </div>

      {/* CONTACT FORM & LOCATIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <GlassCard className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Send Us a Message</h2>
            <p className="text-xs opacity-75">Fill out the form below for queries or project feedback.</p>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2 text-emerald-400">
              <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400 animate-bounce" />
              <h3 className="font-bold text-base">Message Sent Successfully!</h3>
              <p className="text-xs opacity-80">Thank you for reaching out. We will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold">Your Full Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-3.5 py-3 rounded-xl glass-input text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold">Email Address:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full px-3.5 py-3 rounded-xl glass-input text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold">Query Category:</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl glass-input text-xs"
                >
                  <option value="General Query">General Project Inquiry</option>
                  <option value="AI Assistant Feedback">AI Assistant Feedback</option>
                  <option value="Doctor Appointment Issue">Appointment Support</option>
                  <option value="Technical Partnership">Technical Integration</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold">Message:</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you today? Type your query here..."
                  className="w-full px-3.5 py-3 rounded-xl glass-input text-xs"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl btn-gradient-glow text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </GlassCard>

        {/* Location & Operating Hours Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" /> Primary Healthcare Campus
            </h3>
            <div className="text-xs opacity-80 space-y-1.5 leading-relaxed">
              <p className="font-semibold text-cyan-400">ArogyaAI Digital Health Center</p>
              <p>Block B, Sector 62, Innovation Tech Park</p>
              <p>Noida / New Delhi (NCR) - 201309, India</p>
            </div>
            <div className="pt-2 border-t border-slate-500/20 text-xs opacity-75 space-y-1">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" /> Virtual Care: 24 Hours / 7 Days
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" /> support@arogya.ai
              </p>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" /> Privacy Guarantee
            </div>
            <p className="text-xs opacity-80 leading-relaxed">
              All health queries and appointments in ArogyaAI are processed with client-side privacy architecture. No medical data is shared without patient consent.
            </p>
          </GlassCard>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="purple" size="md">
            <HelpCircle className="w-4 h-4" /> FAQ
          </Badge>
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {MOCK_FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <GlassCard
                key={faq.id}
                hoverEffect={false}
                className="p-5 transition-all cursor-pointer"
                onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2.5 py-1 rounded-full glass-panel text-cyan-400 font-semibold">
                      {faq.category}
                    </span>
                    <h3 className="font-bold text-sm">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 opacity-70 transition-transform ${
                      isOpen ? 'rotate-180 text-cyan-400 opacity-100' : ''
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 mt-3 border-t border-slate-500/20 text-xs opacity-80 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
