import { HealthArticle } from '@/types';

export const MOCK_ARTICLES: HealthArticle[] = [
  {
    id: 'art_1',
    title: 'Understanding Circadian Rhythm & Optimizing Sleep Quality',
    slug: 'understanding-circadian-rhythm',
    category: 'Wellness',
    summary: 'Discover how artificial light, sleep timing, and digital blue screens impact your deep sleep cycles and daytime cognitive efficiency.',
    content: [
      'Your body operates on a natural 24-hour internal clock known as the circadian rhythm, governed by the suprachiasmatic nucleus in the brain.',
      'Exposure to bright artificial light late at night suppresses melatonin production, making it difficult to achieve restorative REM sleep.',
      'Practicing blue-light hygiene, keeping room temperatures around 18-20°C, and setting consistent wake times can improve daily mental clarity by up to 40%.'
    ],
    keyTakeaways: [
      'Maintain a consistent wake-up time even on weekends.',
      'Stop screen exposure 60 minutes before bedtime.',
      'Get 15-30 minutes of natural sunlight exposure within 1 hour of waking up.'
    ],
    author: 'Dr. Elena Rostova (Neurology)',
    readTime: '4 min read',
    publishDate: 'July 24, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'art_2',
    title: 'Preventive Cardiac Health: Simple Habits for a Strong Heart',
    slug: 'preventive-cardiac-health-habits',
    category: 'Cardiovascular',
    summary: 'Cardiovascular wellness is built on daily micro-decisions: hydration, aerobic movement, sodium awareness, and stress mitigation.',
    content: [
      'Cardiovascular diseases remain the leading global health challenge, yet over 80% of early cardiac events can be prevented with targeted lifestyle adjustments.',
      'Aerobic activity such as brisk walking, cycling, or swimming for 150 minutes a week reduces resting blood pressure and strengthens heart muscle efficiency.',
      'Monitoring early warning indicators like unexplained shortness of breath or elevated resting heart rate allows for timely preventive intervention.'
    ],
    keyTakeaways: [
      'Aim for 150 minutes of moderate aerobic exercise per week.',
      'Limit dietary sodium to under 2,000 mg per day.',
      'Schedule annual ECG and lipid profile checkups after age 30.'
    ],
    author: 'Dr. Aarav Sharma (Cardiology)',
    readTime: '5 min read',
    publishDate: 'July 20, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'art_3',
    title: 'The Anti-Inflammatory Diet: Foods That Boost Immunity',
    slug: 'anti-inflammatory-diet-guide',
    category: 'Nutrition',
    summary: 'Learn which rich antioxidant foods lower systemic cellular inflammation and improve gut microbiome biodiversity.',
    content: [
      'Chronic inflammation is linked to metabolic syndrome, joint stiffness, and immune exhaustion.',
      'Incorporating colorful berries, dark leafy greens, cold-water omega-3 rich fish, and fermented foods helps reduce inflammatory markers like C-reactive protein (CRP).'
    ],
    keyTakeaways: [
      'Include 5 servings of colorful fruits and vegetables daily.',
      'Use extra virgin olive oil as your primary culinary fat.',
      'Reduce processed sugar consumption.'
    ],
    author: 'ArogyaAI Clinical Nutrition Team',
    readTime: '3 min read',
    publishDate: 'July 18, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'art_4',
    title: 'Digital Eye Strain & Computer Vision Syndrome: Prevention Tips',
    slug: 'digital-eye-strain-prevention',
    category: 'Preventive Care',
    summary: 'Essential ergonomics, the 20-20-20 rule, and ambient lighting strategies for software developers and remote professionals.',
    content: [
      'Staring at high-resolution monitors for prolonged hours reduces natural blink rates from 15 times a minute down to just 5 to 7 times.',
      'This leads to dry eye syndrome, tension headaches, and accommodation fatigue in the ocular muscles.'
    ],
    keyTakeaways: [
      'Follow the 20-20-20 rule: Every 20 minutes, look at an object 20 feet away for 20 seconds.',
      'Position monitor screens 20-24 inches away from eyes at slightly below eye level.',
      'Use lubricating artificial tears if experiencing persistent dry eyes.'
    ],
    author: 'Dr. Vikramaditya Roy',
    readTime: '4 min read',
    publishDate: 'July 15, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'art_5',
    title: 'Mindfulness & Cortisol Control in High-Stress Environments',
    slug: 'mindfulness-cortisol-control',
    category: 'Mental Health',
    summary: 'Practical 5-minute breathing techniques to active parasympathetic nervous system response during intense work routines.',
    content: [
      'Elevated cortisol levels sustained over long periods disrupt sleep, elevate blood pressure, and impair immune cell production.',
      'Box breathing (4s inhale, 4s hold, 4s exhale, 4s hold) rapidly resets the vagus nerve and restores calm physiological focus.'
    ],
    keyTakeaways: [
      'Practice 4-7-8 or Box Breathing during high-stress moments.',
      'Take structured 5-minute mental disconnect breaks every 90 minutes.',
      'Stay hydrated to reduce physiological stress triggers.'
    ],
    author: 'ArogyaAI Mental Wellness Board',
    readTime: '3 min read',
    publishDate: 'July 10, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
    featured: false,
  },
];
