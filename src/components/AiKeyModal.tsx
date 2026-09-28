'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, Zap, CheckCircle2, ShieldCheck, Save, RotateCcw } from 'lucide-react';
import { getStoredApiKey, saveApiKey } from '@/lib/api';
import { Badge } from './Badge';

interface AiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiKeyModal: React.FC<AiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKeyInput(getStoredApiKey());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    saveApiKey(apiKeyInput);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleResetToDefault = () => {
    saveApiKey('AQ.Ab8RN6IFpC573gt3xA-4WGqiHUsCDEVUPurzZWNxVZ8kXwcozQ');
    setApiKeyInput('AQ.Ab8RN6IFpC573gt3xA-4WGqiHUsCDEVUPurzZWNxVZ8kXwcozQ');
    setSavedSuccess(true);
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md glass-panel border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            {/* Header */}
            <div className="flex justify-between items-start pb-2 border-b border-slate-500/20">
              <div>
                <Badge variant="cyan" size="sm" className="mb-1">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> AI Settings
                </Badge>
                <h3 className="text-xl font-bold">Custom AI API Key Config</h3>
              </div>
              <button onClick={onClose} className="p-2 opacity-70 hover:opacity-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs opacity-80 leading-relaxed">
              Configure your Google Gemini or OpenAI API Key for live dynamic medical AI generation. If no key is set, ArogyaAI seamlessly uses the deterministic clinical triage rules engine.
            </p>

            {savedSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 animate-bounce" /> API Key Saved & Active!
              </div>
            ) : (
              <form onSubmit={handleSaveKey} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-cyan-400 flex items-center gap-1.5">
                    <Key className="w-4 h-4" /> AI API Key:
                  </label>
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="AQ.Ab8RN... or Gemini Key"
                    className="w-full px-3.5 py-3 rounded-xl glass-input text-xs font-mono"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] opacity-70">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Stored locally in browser
                  </span>
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Default Key
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl btn-gradient-glow text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" /> Save & Activate Live API
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
