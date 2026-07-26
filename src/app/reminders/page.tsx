'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pill,
  Plus,
  CheckCircle2,
  Clock,
  Trash2,
  BellRing,
  Volume2,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Badge } from '@/components/Badge';
import { MedicineReminder } from '@/types';
import {
  getRemindersFromStorage,
  saveReminderToStorage,
  toggleReminderTakenStatus,
  deleteReminderFromStorage,
} from '@/lib/storage';
import { generateId } from '@/lib/utils';

export default function MedicineReminderPage() {
  const [reminders, setReminders] = useState<MedicineReminder[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [alarmActive, setAlarmActive] = useState<MedicineReminder | null>(null);

  // Form State
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('500 mg');
  const [frequency, setFrequency] = useState<'Once Daily' | 'Twice Daily' | 'Thrice Daily' | 'As Needed'>(
    'Once Daily'
  );
  const [instructions, setInstructions] = useState<'Before Food' | 'After Food' | 'With Water' | 'Before Bedtime'>(
    'After Food'
  );
  const [timeOfDay, setTimeOfDay] = useState('09:00 AM');
  const [notes, setNotes] = useState('');

  // Load reminders safely on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setReminders(getRemindersFromStorage());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicationName.trim()) return;

    const newReminder: MedicineReminder = {
      id: generateId(),
      medicationName,
      dosage,
      frequency,
      timeOfDay: [timeOfDay],
      takenToday: false,
      instructions,
      startDate: new Date().toISOString().slice(0, 10),
      notes: notes || 'Take regularly as prescribed.',
    };

    const updated = saveReminderToStorage(newReminder);
    setReminders(updated);

    setMedicationName('');
    setIsAddModalOpen(false);
  };

  const handleToggleTaken = (id: string) => {
    const updated = toggleReminderTakenStatus(id);
    setReminders(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteReminderFromStorage(id);
    setReminders(updated);
  };

  const triggerSimulatedAlarm = (med: MedicineReminder) => {
    setAlarmActive(med);
  };

  const totalMeds = reminders.length;
  const takenMeds = reminders.filter((r) => r.takenToday).length;
  const progressPercent = totalMeds > 0 ? Math.round((takenMeds / totalMeds) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <Badge variant="cyan" size="md">
            <Pill className="w-4 h-4 text-cyan-400" /> Daily Medication Vault
          </Badge>
          <h1 className="text-3xl font-extrabold">
            Medicine Reminder Manager
          </h1>
          <p className="text-xs sm:text-sm opacity-80">
            Client-side medication schedules stored locally with real-time status toggles.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 rounded-xl btn-gradient-glow text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Medicine
        </button>
      </div>

      {/* Daily Progress Tracker Banner */}
      <GlassCard glow className="p-6 border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl font-bold flex items-center justify-center md:justify-start gap-2">
            Daily Adherence Progress
            <Badge variant={progressPercent === 100 ? 'green' : 'cyan'} size="sm">
              {progressPercent}% Complete
            </Badge>
          </h2>
          <p className="text-xs opacity-80">
            {takenMeds} of {totalMeds} prescribed doses taken today.
          </p>
        </div>

        <div className="w-full md:w-72 space-y-2">
          <div className="h-3 w-full rounded-full glass-panel overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
            />
          </div>
          <div className="flex justify-between text-[11px] opacity-70">
            <span>0 Doses</span>
            <span>Target: 100%</span>
          </div>
        </div>
      </GlassCard>

      {/* Reminders List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          Active Medication Schedules ({reminders.length})
        </h2>

        {reminders.length === 0 ? (
          <GlassCard className="p-12 text-center opacity-60 space-y-3">
            <Pill className="w-12 h-12 mx-auto opacity-40" />
            <p className="text-sm font-medium">No medicine reminders configured.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl glass-panel text-cyan-400 text-xs font-semibold"
            >
              + Create First Schedule
            </button>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reminders.map((rem) => (
              <GlassCard
                key={rem.id}
                hoverEffect
                className={`p-5 flex flex-col justify-between ${
                  rem.takenToday ? 'border-emerald-500/40 bg-emerald-950/10' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base">{rem.medicationName}</h3>
                        <span className="text-xs px-2 py-0.5 rounded glass-panel text-cyan-400 font-medium">
                          {rem.dosage}
                        </span>
                      </div>
                      <p className="text-xs opacity-75">
                        {rem.frequency} • {rem.instructions}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleTaken(rem.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        rem.takenToday
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'glass-panel hover:border-cyan-400'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {rem.takenToday ? 'Completed' : 'Mark Taken'}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl glass-panel text-xs space-y-1">
                    <p className="opacity-80 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Scheduled Time: <span className="font-semibold">{rem.timeOfDay.join(', ')}</span>
                    </p>
                    {rem.notes && <p className="opacity-70 italic">&quot;{rem.notes}&quot;</p>}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-500/20 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => triggerSimulatedAlarm(rem)}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                  >
                    <BellRing className="w-3.5 h-3.5 animate-bounce" /> Simulate Alarm
                  </button>

                  <button
                    onClick={() => handleDelete(rem.id)}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* ADD REMINDER MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md glass-panel border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-500/20">
                <h3 className="font-bold text-lg">Add Medicine Schedule</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="opacity-70 hover:opacity-100">
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddReminder} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold">Medication Name:</label>
                  <input
                    type="text"
                    value={medicationName}
                    onChange={(e) => setMedicationName(e.target.value)}
                    placeholder="e.g. Paracetamol, Metformin..."
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="font-semibold">Dosage:</label>
                    <input
                      type="text"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      placeholder="e.g. 500 mg, 1 tablet"
                      className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold">Frequency:</label>
                    <select
                      value={frequency}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setFrequency(e.target.value as 'Once Daily' | 'Twice Daily' | 'Thrice Daily' | 'As Needed')
                      }
                      className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                    >
                      <option value="Once Daily">Once Daily</option>
                      <option value="Twice Daily">Twice Daily</option>
                      <option value="Thrice Daily">Thrice Daily</option>
                      <option value="As Needed">As Needed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="font-semibold">Instructions:</label>
                    <select
                      value={instructions}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setInstructions(e.target.value as 'Before Food' | 'After Food' | 'With Water' | 'Before Bedtime')
                      }
                      className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                    >
                      <option value="After Food">After Food</option>
                      <option value="Before Food">Before Food</option>
                      <option value="With Water">With Water</option>
                      <option value="Before Bedtime">Before Bedtime</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold">Target Time:</label>
                    <input
                      type="text"
                      value={timeOfDay}
                      onChange={(e) => setTimeOfDay(e.target.value)}
                      placeholder="e.g. 08:00 AM"
                      className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold">Notes / Prescribing Doctor:</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Take after breakfast with water"
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl glass-panel text-slate-300"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 rounded-xl btn-gradient-glow text-white font-bold">
                    Save Reminder
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SIMULATED ALARM NOTIFICATION TOAST */}
      <AnimatePresence>
        {alarmActive && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 p-6 rounded-2xl glass-panel border-2 border-amber-400 shadow-2xl max-w-sm space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 animate-bounce">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base">Medication Alarm Ringing!</h4>
                <p className="text-xs text-amber-400 font-semibold">{alarmActive.medicationName} ({alarmActive.dosage})</p>
              </div>
            </div>
            <p className="text-xs opacity-80">
              It is time to take your dose ({alarmActive.instructions}).
            </p>
            <button
              onClick={() => {
                handleToggleTaken(alarmActive.id);
                setAlarmActive(null);
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg"
            >
              Take Medication Now & Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
