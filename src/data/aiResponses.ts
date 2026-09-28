import { DoctorSpecialty } from '@/types';

export interface AIResponseRule {
  keywords: string[];
  replyText: string;
  triageLevel: 'Normal' | 'Mild' | 'Moderate' | 'Urgent';
  suggestions: string[];
  recommendedSpecialist?: DoctorSpecialty;
  homeCareTips?: string[];
}

export const AI_RESPONSE_RULES: AIResponseRule[] = [
  {
    keywords: ['headache', 'migraine', 'head pain', 'temple pain'],
    replyText:
      'I understand you are experiencing a headache. Most acute headaches are tension-related or caused by dehydration, sleep fatigue, or eye strain. However, sudden severe headaches require careful monitoring.',
    triageLevel: 'Mild',
    suggestions: ['How to alleviate tension headache?', 'When is a headache dangerous?', 'Book Neurologist consultation'],
    recommendedSpecialist: 'Neurology',
    homeCareTips: [
      'Drink 500ml of cold water immediately to rule out mild dehydration.',
      'Apply a cool compress across your forehead for 10-15 minutes.',
      'Dim room lighting and rest eyes from digital screens.',
      'If accompanied by neck stiffness, fever, or vision loss, seek urgent care immediately.',
    ],
  },
  {
    keywords: ['fever', 'temperature', 'chills', 'body ache', 'flu'],
    replyText:
      'A fever is your immune system’s natural response to fighting off infections. Body aches, fatigue, and slight chills commonly accompany low-to-moderate fevers.',
    triageLevel: 'Moderate',
    suggestions: ['Fever home care tips', 'Normal body temp ranges', 'Consult General Physician'],
    recommendedSpecialist: 'General Physician',
    homeCareTips: [
      'Monitor body temperature using a digital thermometer every 4 hours.',
      'Stay well-hydrated with electrolytes, warm broths, or water.',
      'Get ample bed rest and wear lightweight cotton clothing.',
      'Seek medical evaluation if fever exceeds 102°F (38.9°C) or lasts more than 3 days.',
    ],
  },
  {
    keywords: ['chest pain', 'heart', 'tightness', 'shortness of breath', 'arm pain'],
    replyText:
      '⚠️ ALERT: Chest tightness or pain radiating to the left arm, neck, or jaw can be a sign of a cardiac event. Please seek immediate emergency medical care!',
    triageLevel: 'Urgent',
    suggestions: ['Call Emergency Helpline (112 / 911)', 'Find nearest Emergency Hospital', 'Speak with Cardiology Specialist'],
    recommendedSpecialist: 'Cardiology',
    homeCareTips: [
      'Stop all physical activity immediately and sit in a comfortable upright position.',
      'Loosen any tight clothing around your neck and chest.',
      'Call emergency hotline (112 / 911 / 102) right away.',
    ],
  },
  {
    keywords: ['cough', 'cold', 'sore throat', 'runny nose', 'congestion'],
    replyText:
      'Upper respiratory symptoms like cough, congestion, and sore throat are frequently caused by common viral infections or seasonal allergies.',
    triageLevel: 'Mild',
    suggestions: ['Sore throat relief tips', 'Difference between allergy & cold', 'Book Pulmonology / GP'],
    recommendedSpecialist: 'Pulmonology',
    homeCareTips: [
      'Gargle with warm saltwater (1/2 tsp salt in 1 cup warm water) 3 times daily.',
      'Inhale steam with warm water or eucalyptus oil for 5-10 minutes.',
      'Stay hydrated with warm lemon-honey tea to soothe throat lining.',
    ],
  },
  {
    keywords: ['skin', 'rash', 'itching', 'acne', 'redness', 'eczema', 'allergy'],
    replyText:
      'Skin rashes, redness, or localized itching can stem from contact dermatitis, seasonal food allergies, dry skin barrier breakdown, or mild eczema flare-ups.',
    triageLevel: 'Mild',
    suggestions: ['How to calm itching skin?', 'Common rash triggers', 'Book Dermatology consultation'],
    recommendedSpecialist: 'Dermatology',
    homeCareTips: [
      'Avoid scratching to prevent secondary skin infections.',
      'Apply a soothing fragrance-free moisturizer or aloe vera gel.',
      'Avoid hot showers; use lukewarm water and mild cleansers.',
    ],
  },
  {
    keywords: ['stomach', 'acidity', 'nausea', 'indigestion', 'bloating', 'diarrhea'],
    replyText:
      'Gastrointestinal discomfort such as acidity, bloating, or mild nausea often occurs after heavy meals, spicy foods, or stress.',
    triageLevel: 'Mild',
    suggestions: ['Diet for sensitive stomach', 'Acidity quick remedies', 'Book General Physician'],
    recommendedSpecialist: 'General Physician',
    homeCareTips: [
      'Eat small, bland meals (BRAT diet: Bananas, Rice, Applesauce, Toast).',
      'Sip warm ginger tea or peppermint tea slowly.',
      'Avoid caffeine, carbonated drinks, and greasy foods for 24-48 hours.',
    ],
  },
  {
    keywords: ['stress', 'anxiety', 'insomnia', 'sleep', 'depressed', 'overwhelmed'],
    replyText:
      'Mental well-being is vital to overall health. Experiencing stress, racing thoughts, or sleep disturbances is common, and proactive coping strategies can bring great relief.',
    triageLevel: 'Mild',
    suggestions: ['Box breathing exercise', 'Sleep hygiene checklist', 'Book Psychiatry / Therapy'],
    recommendedSpecialist: 'Psychiatry',
    homeCareTips: [
      'Try 5 minutes of Box Breathing: Inhale 4s, Hold 4s, Exhale 4s, Hold 4s.',
      'Limit caffeine intake after 2:00 PM.',
      'Engage in a 15-minute daily outdoor walk without phone distractions.',
    ],
  },
];

export const DEFAULT_AI_RESPONSE = {
  replyText:
    'Thank you for reaching out to ArogyaAI. Based on your input, I suggest monitoring your symptoms closely. If you feel unwell or notice worsening discomfort, consulting a qualified medical specialist is recommended.',
  triageLevel: 'Normal' as const,
  suggestions: [
    'Check symptoms with AI Symptom Checker',
    'Book Doctor Appointment',
    'Explore Health Awareness Tips',
  ],
  homeCareTips: [
    'Maintain daily hydration (2-3 liters of water).',
    'Get 7-8 hours of quality sleep nightly.',
    'Log your symptoms in ArogyaAI for clinical reference.',
  ],
};

/**
 * Match user query against predefined response rules
 */
export function generateAIResponse(userQuery: string) {
  const queryLower = userQuery.toLowerCase();
  for (const rule of AI_RESPONSE_RULES) {
    if (rule.keywords.some((kw) => queryLower.includes(kw))) {
      return rule;
    }
  }
  return DEFAULT_AI_RESPONSE;
}
