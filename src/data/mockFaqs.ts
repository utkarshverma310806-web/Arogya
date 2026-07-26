import { FAQItem } from '@/types';

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq_1',
    category: 'AI Technology',
    question: 'How accurate is ArogyaAI virtual assistant?',
    answer: 'ArogyaAI uses trained clinical triage algorithms to evaluate reported symptoms and cross-reference them against evidence-based medical guidelines. While it boasts a 99.4% initial triage accuracy for risk stratification, it is designed to assist and guide users, not replace licensed clinical evaluation.',
  },
  {
    id: 'faq_2',
    category: 'AI Technology',
    question: 'Is my personal health data private and secure?',
    answer: 'Yes! ArogyaAI operates with strict privacy-first architecture. In this demo environment, your appointments and medicine reminders remain stored locally in your browser storage (LocalStorage), meaning no sensitive health records are transmitted or stored on external database servers.',
  },
  {
    id: 'faq_3',
    category: 'Appointments',
    question: 'How do virtual AI-assisted consultations work?',
    answer: 'During a virtual appointment, ArogyaAI compiles your pre-consultation symptom history, current vital metrics, and questions, generating a concise clinical summary for your chosen doctor before the session begins, saving valuable consultation time.',
  },
  {
    id: 'faq_4',
    category: 'Appointments',
    question: 'Can I reschedule or cancel a booked appointment?',
    answer: 'Absolutely. You can view all your active appointments anytime by opening your User Profile Drawer (top right corner of the navigation bar) and clicking "Cancel" or selecting a new date slot.',
  },
  {
    id: 'faq_5',
    category: 'Emergency Care',
    question: 'What should I do in a severe medical emergency?',
    answer: 'ArogyaAI is NOT for life-threatening emergencies. If you experience severe chest pain, sudden numbness/paralysis, severe shortness of breath, or uncontrollable bleeding, immediately call your local emergency service (e.g., 112 / 911 / 102) or proceed to the nearest Emergency Room.',
  },
  {
    id: 'faq_6',
    category: 'Medical Privacy',
    question: 'Are medicine reminders synchronized across my devices?',
    answer: 'Currently in this client demo version, medicine reminders are stored securely within your browser storage. You can easily add, check off, or clear medications at any time.',
  },
];
