// ==========================================
// ArogyaAI Type Definitions
// Beginner-Friendly Interfaces for Next.js & React
// ==========================================

export type DoctorSpecialty =
  | 'Cardiology'
  | 'Neurology'
  | 'General Physician'
  | 'Pediatrics'
  | 'Dermatology'
  | 'Orthopedics'
  | 'Psychiatry'
  | 'Pulmonology';

export interface Doctor {
  id: string;
  name: string;
  specialty: DoctorSpecialty;
  qualification: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  consultationFee: number;
  availableDays: string[];
  availableSlots: string[];
  avatarUrl: string;
  location: string;
  bio: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  timeSlot: string;
  consultationType: 'Virtual AI Assisted' | 'In-Clinic Specialist';
  reason: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface MedicineReminder {
  id: string;
  medicationName: string;
  dosage: string; // e.g. "500 mg" or "1 tablet"
  frequency: 'Once Daily' | 'Twice Daily' | 'Thrice Daily' | 'As Needed';
  timeOfDay: string[]; // e.g. ["08:00 AM", "08:00 PM"]
  takenToday: boolean;
  instructions: 'Before Food' | 'After Food' | 'With Water' | 'Before Bedtime';
  startDate: string;
  notes?: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Wellness' | 'Preventive Care' | 'Mental Health' | 'Nutrition' | 'Cardiovascular';
  summary: string;
  content: string[];
  keyTakeaways: string[];
  author: string;
  readTime: string;
  publishDate: string;
  imageUrl: string;
  featured?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'AI Technology' | 'Appointments' | 'Medical Privacy' | 'Emergency Care';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  triageLevel?: 'Normal' | 'Mild' | 'Moderate' | 'Urgent';
  suggestions?: string[];
  disclaimer?: boolean;
}

export interface SymptomCheckerResult {
  triageLevel: 'Low Risk' | 'Moderate Attention' | 'High Urgency / Seek Care';
  summary: string;
  potentialCauses: string[];
  homeRemedies: string[];
  recommendedSpecialist: DoctorSpecialty;
  warningSigns: string[];
}
