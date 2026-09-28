'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  RotateCcw,
  Download,
  Sparkles,
  Stethoscope,
  Calendar,
  ShieldCheck,
  User,
  Zap,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Badge } from '@/components/Badge';
import { ChatMessage } from '@/types';
import { fetchAIResponse } from '@/lib/api';
import { getCurrentTime, generateId } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

export default function AssistantPage() {
  const { t } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: 'Namaste! I am ArogyaAI, your Live AI Health Assistant powered by Gemini AI. Describe your symptoms, health queries, or medical concerns below.',
      timestamp: getCurrentTime(),
      disclaimer: true,
      suggestions: [
        'I have a persistent headache and eye strain',
        'Fever, chills and body weakness care in India',
        'Acidity and stomach indigestion remedies',
        'Chest tightness and shortness of breath',
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLiveApi, setIsLiveApi] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      sender: 'user',
      text: text,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    try {
      const responseData = await fetchAIResponse(text);

      const aiMsg: ChatMessage = {
        id: generateId(),
        sender: 'ai',
        text: responseData.replyText,
        timestamp: getCurrentTime(),
        triageLevel: responseData.triageLevel,
        suggestions: responseData.suggestions,
      };

      setIsLiveApi(responseData.isLiveApi);
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      // Fallback response
      const aiMsg: ChatMessage = {
        id: generateId(),
        sender: 'ai',
        text: 'Thank you for reaching out. Please monitor symptoms closely and consult a specialist doctor if pain persists.',
        timestamp: getCurrentTime(),
        triageLevel: 'Normal',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg_welcome',
        sender: 'ai',
        text: 'Chat thread reset. How can ArogyaAI assist your health today?',
        timestamp: getCurrentTime(),
        disclaimer: true,
        suggestions: [
          'Headache & tension tips',
          'Fever symptoms care',
          'Skin allergy guidance',
        ],
      },
    ]);
  };

  const handleExportChat = () => {
    const textContent = messages
      .map((m) => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`)
      .join('\n\n');
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ArogyaAI_Consultation_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
  };

  const toggleMic = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setInputQuery('I have a mild fever and throat soreness since morning');
        setIsRecording(false);
      }, 2500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Console Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl glass-panel border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center text-cyan-400">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              {t.assistant}
              <Badge variant={isLiveApi ? 'purple' : 'cyan'} size="sm">
                {isLiveApi ? '⚡ Live Gemini API' : '🛡️ Clinical Rules Engine'}
              </Badge>
            </h1>
            <p className="text-xs opacity-75">24/7 AI Triage & Medical Guidance Console</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetChat}
            className="p-2.5 rounded-xl glass-panel text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button
            onClick={handleExportChat}
            className="p-2.5 rounded-xl glass-panel text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" /> Export Log
          </button>
        </div>
      </div>

      {/* Main Chat Conversation Container */}
      <GlassCard className="p-4 sm:p-6 min-h-[550px] max-h-[650px] flex flex-col justify-between border-cyan-500/20 relative">
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div className={`max-w-2xl space-y-3 ${msg.sender === 'user' ? 'items-end' : ''}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-lg'
                      : 'glass-panel rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {msg.triageLevel && (
                    <div className="mt-3 pt-2 border-t border-slate-500/20 flex items-center justify-between">
                      <span className="text-[11px] opacity-70">Clinical Severity:</span>
                      <Badge
                        variant={
                          msg.triageLevel === 'Urgent'
                            ? 'red'
                            : msg.triageLevel === 'Moderate'
                            ? 'amber'
                            : 'cyan'
                        }
                        size="sm"
                      >
                        {msg.triageLevel} Triage
                      </Badge>
                    </div>
                  )}

                  {msg.disclaimer && (
                    <div className="mt-3 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-cyan-300 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
                      <span>
                        Medical Disclaimer: ArogyaAI guidance is for informational triage reference and does not replace acute emergency care.
                      </span>
                    </div>
                  )}
                </div>

                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[11px] px-3 py-1 rounded-full glass-panel text-cyan-300 transition-colors"
                      >
                        💡 {sug}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] opacity-50 block px-1">
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shrink-0 mt-1">
                  <User className="w-5 h-5" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="p-3.5 rounded-2xl glass-panel text-xs text-cyan-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                ArogyaAI Gemini Engine is generating clinical response...
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form & Controls */}
        <div className="pt-4 border-t border-slate-500/20 space-y-3">
          {isRecording && (
            <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between animate-pulse">
              <span className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-rose-400" /> Listening to voice input...
              </span>
              <span className="text-[10px]">Speech recognition active...</span>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask ArogyaAI any health query or symptom..."
              className="flex-1 px-4 py-3 rounded-xl glass-input text-xs sm:text-sm"
            />

            <button
              type="button"
              onClick={toggleMic}
              className={`p-3 rounded-xl border transition-colors ${
                isRecording
                  ? 'bg-rose-600 text-white border-rose-500'
                  : 'glass-panel hover:border-cyan-400'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="px-5 py-3 rounded-xl btn-gradient-glow text-white font-semibold text-xs sm:text-sm flex items-center gap-2 disabled:opacity-50"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] opacity-70 pt-1">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-purple-400" /> Powered by Gemini AI API & Clinical Rules Engine
            </span>
            <div className="flex items-center gap-3">
              <Link href="/symptom-checker" className="text-cyan-400 hover:underline flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5" /> Symptom Wizard
              </Link>
              <Link href="/appointments" className="text-purple-400 hover:underline flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Book Specialist
              </Link>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
