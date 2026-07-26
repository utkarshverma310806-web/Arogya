import { Appointment, MedicineReminder } from '@/types';

// Storage keys
const APPOINTMENTS_KEY = 'arogya_ai_appointments';
const REMINDERS_KEY = 'arogya_ai_medicine_reminders';
const PATIENT_PROFILE_KEY = 'arogya_ai_patient_profile';

export interface PatientProfile {
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  age: number;
  weight: string;
  patientId: string;
}

export const DEFAULT_PATIENT_PROFILE: PatientProfile = {
  name: 'Rahul Verma',
  email: 'rahul.verma@example.com',
  phone: '+91 98765 43210',
  bloodType: 'O +',
  age: 21,
  weight: '68 kg',
  patientId: '#ARG-2026-9842',
};

/**
 * Get Patient Profile from LocalStorage
 */
export function getPatientProfileFromStorage(): PatientProfile {
  if (typeof window === 'undefined') return DEFAULT_PATIENT_PROFILE;
  try {
    const item = localStorage.getItem(PATIENT_PROFILE_KEY);
    if (!item) {
      localStorage.setItem(PATIENT_PROFILE_KEY, JSON.stringify(DEFAULT_PATIENT_PROFILE));
      return DEFAULT_PATIENT_PROFILE;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error('Failed to read profile:', error);
    return DEFAULT_PATIENT_PROFILE;
  }
}

/**
 * Save Patient Profile to LocalStorage
 */
export function savePatientProfileToStorage(profile: PatientProfile): PatientProfile {
  if (typeof window === 'undefined') return DEFAULT_PATIENT_PROFILE;
  try {
    localStorage.setItem(PATIENT_PROFILE_KEY, JSON.stringify(profile));
    return profile;
  } catch (error) {
    console.error('Failed to save profile:', error);
    return DEFAULT_PATIENT_PROFILE;
  }
}

// Initial Mock Appointments
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'arg_demo_app1',
    doctorId: 'doc_1',
    doctorName: 'Dr. Aarav Sharma',
    doctorSpecialty: 'Cardiology',
    patientName: 'Rahul Verma',
    patientEmail: 'rahul.verma@example.com',
    patientPhone: '+91 98765 43210',
    date: '2026-07-30',
    timeSlot: '10:30 AM',
    consultationType: 'Virtual AI Assisted',
    reason: 'Routine cardiac checkup and ECG analysis review.',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'arg_demo_app2',
    doctorId: 'doc_3',
    doctorName: 'Dr. Kavya Reddi',
    doctorSpecialty: 'Dermatology',
    patientName: 'Rahul Verma',
    patientEmail: 'rahul.verma@example.com',
    patientPhone: '+91 98765 43210',
    date: '2026-08-05',
    timeSlot: '02:00 PM',
    consultationType: 'In-Clinic Specialist',
    reason: 'Skin allergy consultation and rash assessment.',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  },
];

// Initial Mock Medicine Reminders
const INITIAL_REMINDERS: MedicineReminder[] = [
  {
    id: 'rem_1',
    medicationName: 'Amoxicillin 500',
    dosage: '1 Tablet',
    frequency: 'Twice Daily',
    timeOfDay: ['08:00 AM', '08:00 PM'],
    takenToday: true,
    instructions: 'After Food',
    startDate: '2026-07-20',
    notes: 'Complete full 7-day antibiotic course as prescribed by doctor.',
  },
  {
    id: 'rem_2',
    medicationName: 'Vitamin D3 (60k IU)',
    dosage: '1 Capsule',
    frequency: 'Once Daily',
    timeOfDay: ['09:00 AM'],
    takenToday: false,
    instructions: 'With Water',
    startDate: '2026-07-01',
    notes: 'Take morning time after breakfast for bone strength.',
  },
  {
    id: 'rem_3',
    medicationName: 'Pantocid 40',
    dosage: '1 Tablet',
    frequency: 'Once Daily',
    timeOfDay: ['07:30 AM'],
    takenToday: false,
    instructions: 'Before Food',
    startDate: '2026-06-15',
    notes: 'Take early morning empty stomach for acidity control.',
  },
];

export function getAppointmentsFromStorage(): Appointment[] {
  if (typeof window === 'undefined') return INITIAL_APPOINTMENTS;
  try {
    const item = localStorage.getItem(APPOINTMENTS_KEY);
    if (!item) {
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error('Failed to read appointments:', error);
    return INITIAL_APPOINTMENTS;
  }
}

export function saveAppointmentToStorage(appointment: Appointment): Appointment[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getAppointmentsFromStorage();
    const updated = [appointment, ...existing];
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save appointment:', error);
    return [];
  }
}

export function deleteAppointmentFromStorage(id: string): Appointment[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getAppointmentsFromStorage();
    const updated = existing.filter((app) => app.id !== id);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to delete appointment:', error);
    return [];
  }
}

export function getRemindersFromStorage(): MedicineReminder[] {
  if (typeof window === 'undefined') return INITIAL_REMINDERS;
  try {
    const item = localStorage.getItem(REMINDERS_KEY);
    if (!item) {
      localStorage.setItem(REMINDERS_KEY, JSON.stringify(INITIAL_REMINDERS));
      return INITIAL_REMINDERS;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error('Failed to read reminders:', error);
    return INITIAL_REMINDERS;
  }
}

export function saveReminderToStorage(reminder: MedicineReminder): MedicineReminder[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getRemindersFromStorage();
    const updated = [reminder, ...existing];
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save reminder:', error);
    return [];
  }
}

export function toggleReminderTakenStatus(id: string): MedicineReminder[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getRemindersFromStorage();
    const updated = existing.map((rem) =>
      rem.id === id ? { ...rem, takenToday: !rem.takenToday } : rem
    );
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to toggle reminder status:', error);
    return [];
  }
}

export function deleteReminderFromStorage(id: string): MedicineReminder[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getRemindersFromStorage();
    const updated = existing.filter((rem) => rem.id !== id);
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to delete reminder:', error);
    return [];
  }
}
