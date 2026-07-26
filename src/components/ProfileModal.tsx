'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Calendar,
  Pill,
  Heart,
  Activity,
  Trash2,
  CheckCircle,
  Clock,
  PhoneCall,
  ShieldCheck,
  Edit2,
  Save,
  RotateCcw,
} from 'lucide-react';
import { Appointment, MedicineReminder } from '@/types';
import {
  getAppointmentsFromStorage,
  getRemindersFromStorage,
  deleteAppointmentFromStorage,
  toggleReminderTakenStatus,
  getPatientProfileFromStorage,
  savePatientProfileToStorage,
  PatientProfile,
  DEFAULT_PATIENT_PROFILE,
} from '@/lib/storage';
import { Badge } from './Badge';
import { useApp } from '@/context/AppContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<'appointments' | 'reminders' | 'vitals'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reminders, setReminders] = useState<MedicineReminder[]>([]);
  const [profile, setProfile] = useState<PatientProfile>(DEFAULT_PATIENT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  // Editable Form State
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editBloodType, setEditBloodType] = useState('');
  const [editAge, setEditAge] = useState(21);
  const [editWeight, setEditWeight] = useState('');

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setAppointments(getAppointmentsFromStorage());
        setReminders(getRemindersFromStorage());
        const p = getPatientProfileFromStorage();
        setProfile(p);
        setEditName(p.name);
        setEditEmail(p.email);
        setEditPhone(p.phone);
        setEditBloodType(p.bloodType);
        setEditAge(p.age);
        setEditWeight(p.weight);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PatientProfile = {
      ...profile,
      name: editName || profile.name,
      email: editEmail || profile.email,
      phone: editPhone || profile.phone,
      bloodType: editBloodType || profile.bloodType,
      age: Number(editAge) || profile.age,
      weight: editWeight || profile.weight,
    };
    savePatientProfileToStorage(updated);
    setProfile(updated);
    setIsEditing(false);
  };

  const handleResetProfile = () => {
    savePatientProfileToStorage(DEFAULT_PATIENT_PROFILE);
    setProfile(DEFAULT_PATIENT_PROFILE);
    setEditName(DEFAULT_PATIENT_PROFILE.name);
    setEditEmail(DEFAULT_PATIENT_PROFILE.email);
    setEditPhone(DEFAULT_PATIENT_PROFILE.phone);
    setEditBloodType(DEFAULT_PATIENT_PROFILE.bloodType);
    setEditAge(DEFAULT_PATIENT_PROFILE.age);
    setEditWeight(DEFAULT_PATIENT_PROFILE.weight);
    setIsEditing(false);
  };

  const handleCancelAppointment = (id: string) => {
    const updated = deleteAppointmentFromStorage(id);
    setAppointments(updated);
  };

  const handleToggleReminder = (id: string) => {
    const updated = toggleReminderTakenStatus(id);
    setReminders(updated);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Sliding Right Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg glass-panel border-l border-cyan-500/30 flex flex-col p-6 overflow-y-auto shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-500/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center text-cyan-400">
                    <User className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {profile.name}
                    <Badge variant="cyan" size="sm">
                      {t.profileBadge}
                    </Badge>
                  </h3>
                  <p className="text-xs opacity-70">Patient ID: {profile.patientId}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 glass-panel rounded-lg text-cyan-400 hover:text-white transition-colors"
                  title="Edit Patient Profile"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 opacity-70 hover:opacity-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Editable Profile Form */}
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="my-4 p-4 rounded-xl glass-panel space-y-3 text-xs">
                <h4 className="font-bold text-cyan-400">Edit Patient Details:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="opacity-70">Full Name:</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="opacity-70">Phone:</label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="opacity-70">Blood Type:</label>
                    <input
                      type="text"
                      value={editBloodType}
                      onChange={(e) => setEditBloodType(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="opacity-70">Age:</label>
                    <input
                      type="number"
                      value={editAge}
                      onChange={(e) => setEditAge(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="opacity-70">Weight:</label>
                    <input
                      type="text"
                      value={editWeight}
                      onChange={(e) => setEditWeight(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs"
                    />
                  </div>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleResetProfile}
                    className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Default
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg btn-gradient-glow text-white font-bold text-xs flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </button>
                </div>
              </form>
            ) : (
              /* Health Snapshot Grid */
              <div className="grid grid-cols-3 gap-3 my-5">
                <div className="p-3 rounded-xl glass-panel text-center">
                  <p className="text-xs opacity-70">{t.bloodType}</p>
                  <p className="text-lg font-bold text-cyan-400 mt-1">{profile.bloodType}</p>
                </div>
                <div className="p-3 rounded-xl glass-panel text-center">
                  <p className="text-xs opacity-70">{t.ageWeight}</p>
                  <p className="text-lg font-bold text-purple-400 mt-1">{profile.age} yrs / {profile.weight}</p>
                </div>
                <div className="p-3 rounded-xl glass-panel text-center">
                  <p className="text-xs opacity-70">{t.riskScore}</p>
                  <p className="text-lg font-bold text-emerald-400 mt-1">Optimal</p>
                </div>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-500/20 mb-6 gap-2">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`flex-1 py-2.5 text-xs md:text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'appointments'
                    ? 'border-cyan-400 text-cyan-400 font-bold'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Calendar className="w-4 h-4" />
                {t.appointmentsTab} ({appointments.length})
              </button>
              <button
                onClick={() => setActiveTab('reminders')}
                className={`flex-1 py-2.5 text-xs md:text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'reminders'
                    ? 'border-cyan-400 text-cyan-400 font-bold'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Pill className="w-4 h-4" />
                {t.remindersTab} ({reminders.length})
              </button>
              <button
                onClick={() => setActiveTab('vitals')}
                className={`flex-1 py-2.5 text-xs md:text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'vitals'
                    ? 'border-cyan-400 text-cyan-400 font-bold'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Activity className="w-4 h-4" />
                {t.vitalsTab}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {activeTab === 'appointments' && (
                <div>
                  {appointments.length === 0 ? (
                    <div className="text-center py-10 opacity-60">
                      <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p>No booked appointments found.</p>
                    </div>
                  ) : (
                    appointments.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 rounded-xl glass-panel mb-3 space-y-2 relative"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-base">{app.doctorName}</h4>
                            <p className="text-xs text-cyan-400">{app.doctorSpecialty}</p>
                          </div>
                          <Badge
                            variant={app.status === 'Confirmed' ? 'green' : 'amber'}
                            size="sm"
                          >
                            {app.status}
                          </Badge>
                        </div>
                        <div className="text-xs space-y-1">
                          <p className="flex items-center gap-2 opacity-80">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            {app.date} at {app.timeSlot}
                          </p>
                          <p className="opacity-70 italic">&quot;{app.reason}&quot;</p>
                        </div>
                        <div className="pt-2 flex justify-between items-center border-t border-slate-500/20">
                          <span className="text-[11px] opacity-60">{app.consultationType}</span>
                          <button
                            onClick={() => handleCancelAppointment(app.id)}
                            className="text-xs text-rose-500 hover:text-rose-400 flex items-center gap-1 font-semibold hover:underline"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Cancel
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'reminders' && (
                <div>
                  {reminders.length === 0 ? (
                    <div className="text-center py-10 opacity-60">
                      <Pill className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p>No active medicine reminders.</p>
                    </div>
                  ) : (
                    reminders.map((rem) => (
                      <div
                        key={rem.id}
                        className={`p-4 rounded-xl glass-panel mb-3 transition-all ${
                          rem.takenToday ? 'border-emerald-500/50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-base flex items-center gap-2">
                              {rem.medicationName}
                              <span className="text-xs px-2 py-0.5 rounded glass-panel font-mono">
                                {rem.dosage}
                              </span>
                            </h4>
                            <p className="text-xs opacity-70 mt-0.5">
                              {rem.frequency} • {rem.instructions}
                            </p>
                          </div>
                          <button
                            onClick={() => handleToggleReminder(rem.id)}
                            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                              rem.takenToday
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'glass-panel hover:border-cyan-400'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4" />
                            {rem.takenToday ? 'Taken' : 'Mark Taken'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'vitals' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl glass-panel flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6 text-rose-500 animate-pulse" />
                      <div>
                        <p className="text-xs opacity-70">Heart Rate</p>
                        <p className="text-base font-bold">72 BPM (Normal)</p>
                      </div>
                    </div>
                    <Badge variant="green" size="sm">Stable</Badge>
                  </div>
                  <div className="p-4 rounded-xl glass-panel flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="w-6 h-6 text-cyan-400" />
                      <div>
                        <p className="text-xs opacity-70">Blood Pressure</p>
                        <p className="text-base font-bold">118 / 78 mmHg</p>
                      </div>
                    </div>
                    <Badge variant="cyan" size="sm">Optimal</Badge>
                  </div>
                  <div className="p-4 rounded-xl glass-panel flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-purple-400" />
                      <div>
                        <p className="text-xs opacity-70">SpO2 Oxygen</p>
                        <p className="text-base font-bold">99%</p>
                      </div>
                    </div>
                    <Badge variant="purple" size="sm">Excellent</Badge>
                  </div>
                </div>
              )}
            </div>

            {/* Emergency Hotline Button */}
            <div className="pt-4 border-t border-slate-500/20 mt-auto space-y-2">
              <a
                href="tel:112"
                className="w-full py-3 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-400 font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-rose-600/30"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                24/7 Emergency Medical Line (112)
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
