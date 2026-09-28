'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  Star,
  MapPin,
  CheckCircle2,
  X,
  User,
  Mail,
  Phone,
  Video,
  Building2,
  Filter,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Badge } from '@/components/Badge';
import { MOCK_DOCTORS } from '@/data/mockDoctors';
import { Doctor, Appointment } from '@/types';
import { saveAppointmentToStorage } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

export default function AppointmentsPage() {
  const { t } = useApp();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);

  // Booking Form State with Indian default values
  const [patientName, setPatientName] = useState('Rahul Verma');
  const [patientEmail, setPatientEmail] = useState('rahul.verma@example.com');
  const [patientPhone, setPatientPhone] = useState('+91 98765 43210');
  const [bookingDate, setBookingDate] = useState('2026-07-30');
  const [timeSlot, setTimeSlot] = useState('');
  const [consultationType, setConsultationType] = useState<'Virtual AI Assisted' | 'In-Clinic Specialist'>(
    'Virtual AI Assisted'
  );
  const [reason, setReason] = useState('');

  // Confirmation Modal State
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  const specialties: string[] = [
    'All',
    'Cardiology',
    'Neurology',
    'General Physician',
    'Pediatrics',
    'Dermatology',
    'Orthopedics',
  ];

  const filteredDoctors =
    selectedSpecialty === 'All'
      ? MOCK_DOCTORS
      : MOCK_DOCTORS.filter((d) => d.specialty === selectedSpecialty);

  const handleOpenBooking = (doc: Doctor) => {
    setActiveDoctor(doc);
    setTimeSlot(doc.availableSlots[0] || '10:00 AM');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDoctor || !timeSlot || !bookingDate || !patientName) return;

    const newApp: Appointment = {
      id: generateId(),
      doctorId: activeDoctor.id,
      doctorName: activeDoctor.name,
      doctorSpecialty: activeDoctor.specialty,
      patientName,
      patientEmail,
      patientPhone,
      date: bookingDate,
      timeSlot,
      consultationType,
      reason: reason || 'General medical consultation.',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    saveAppointmentToStorage(newApp);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setConfirmedAppointment(newApp);
    setActiveDoctor(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="purple" size="md">
          <Calendar className="w-4 h-4 text-purple-400" /> Specialist Directory
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold">{t.bookAppointment}</h1>
        <p className="text-sm opacity-80">
          Book appointments with top specialists across AIIMS, Fortis, Max, and Apollo hospitals with Indian Rupee (₹) pricing.
        </p>
      </div>

      {/* Specialty Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs opacity-70 flex items-center gap-1 shrink-0 pr-2 border-r border-slate-500/20">
          <Filter className="w-3.5 h-3.5" /> Specialty:
        </span>
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSpecialty === spec
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                : 'glass-panel opacity-75 hover:opacity-100'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctors Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <GlassCard key={doc.id} hoverEffect className="p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <img
                  src={doc.avatarUrl}
                  alt={doc.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-500/30 shrink-0"
                />
                <div className="space-y-1">
                  <Badge variant="cyan" size="sm">
                    {doc.specialty}
                  </Badge>
                  <h3 className="text-lg font-bold leading-snug">{doc.name}</h3>
                  <p className="text-xs opacity-75">{doc.qualification}</p>
                  <div className="flex items-center gap-2 text-xs pt-1">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {doc.rating}
                    </span>
                    <span className="opacity-60">({doc.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs opacity-80 line-clamp-2 leading-relaxed">{doc.bio}</p>

              <div className="space-y-1.5 text-xs opacity-80 pt-2 border-t border-slate-500/20">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{doc.location}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>{doc.experienceYears} Yrs Exp • <strong className="text-cyan-400">₹{doc.consultationFee}</strong> Fee</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => handleOpenBooking(doc)}
              className="w-full py-3 rounded-xl btn-gradient-glow text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" /> Book Appointment
            </button>
          </GlassCard>
        ))}
      </div>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {activeDoctor && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDoctor(null)}
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg glass-panel border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-500/20">
                <div className="flex items-center gap-3">
                  <img
                    src={activeDoctor.avatarUrl}
                    alt={activeDoctor.name}
                    className="w-12 h-12 rounded-xl object-cover border border-cyan-400/40"
                  />
                  <div>
                    <h3 className="font-bold text-base">{activeDoctor.name}</h3>
                    <p className="text-xs text-cyan-400">{activeDoctor.specialty} • Fee: ₹{activeDoctor.consultationFee}</p>
                  </div>
                </div>
                <button onClick={() => setActiveDoctor(null)} className="p-2 opacity-75 hover:opacity-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-cyan-400">Consultation Mode:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setConsultationType('Virtual AI Assisted')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                        consultationType === 'Virtual AI Assisted'
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400 font-bold'
                          : 'glass-panel opacity-75'
                      }`}
                    >
                      <Video className="w-4 h-4" /> Telehealth Video
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultationType('In-Clinic Specialist')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                        consultationType === 'In-Clinic Specialist'
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400 font-bold'
                          : 'glass-panel opacity-75'
                      }`}
                    >
                      <Building2 className="w-4 h-4" /> In-Clinic Hospital
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-cyan-400">Date:</label>
                    <input
                      type="date"
                      value={bookingDate}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-cyan-400">Time Slot:</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                      required
                    >
                      {activeDoctor.availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-500/20">
                  <div className="space-y-1.5">
                    <label className="font-semibold">Patient Name:</label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1.5">
                      <label className="font-semibold">Email:</label>
                      <input
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold">Phone Number (+91):</label>
                      <input
                        type="text"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold">Reason for Consultation:</label>
                    <textarea
                      rows={2}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Briefly describe health concerns..."
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveDoctor(null)}
                    className="px-4 py-2.5 rounded-xl glass-panel text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl btn-gradient-glow text-white font-bold"
                  >
                    Confirm & Save Pass
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CONFIRMED DIGITAL APPOINTMENT TICKET MODAL */}
      <AnimatePresence>
        {confirmedAppointment && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmedAppointment(null)}
              className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md glass-panel border-emerald-500/40 rounded-3xl p-6 shadow-2xl text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 mx-auto flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold">Appointment Confirmed!</h3>
                <p className="text-xs opacity-75">Digital pass saved to Profile Drawer.</p>
              </div>

              <div className="p-4 rounded-2xl glass-panel text-left space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-500/20">
                  <span className="font-bold text-cyan-400">{confirmedAppointment.doctorName}</span>
                  <Badge variant="green" size="sm">
                    {confirmedAppointment.status}
                  </Badge>
                </div>

                <div className="space-y-1 opacity-90">
                  <p><strong>Specialty:</strong> {confirmedAppointment.doctorSpecialty}</p>
                  <p><strong>Date & Time:</strong> {confirmedAppointment.date} at {confirmedAppointment.timeSlot}</p>
                  <p><strong>Mode:</strong> {confirmedAppointment.consultationType}</p>
                  <p><strong>Patient:</strong> {confirmedAppointment.patientName} ({confirmedAppointment.patientPhone})</p>
                  <p className="text-[11px] opacity-60 pt-1">Booking Ref: #{confirmedAppointment.id}</p>
                </div>
              </div>

              <button
                onClick={() => setConfirmedAppointment(null)}
                className="w-full py-3 rounded-xl btn-gradient-glow text-white font-bold text-xs"
              >
                Close Ticket View
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
