import { generateAIResponse } from '@/data/aiResponses';

const API_KEY_STORAGE_KEY = 'arogya_ai_custom_api_key';

// Default provided API Key fallback if configured
const DEFAULT_API_KEY = 'AQ.Ab8RN6IFpC573gt3xA-4WGqiHUsCDEVUPurzZWNxVZ8kXwcozQ';

/**
 * Get stored AI API Key (custom user key or default key)
 */
export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return DEFAULT_API_KEY;
  const customKey = localStorage.getItem(API_KEY_STORAGE_KEY);
  return customKey || DEFAULT_API_KEY;
}

/**
 * Save custom AI API Key to LocalStorage
 */
export function saveApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  if (key.trim()) {
    localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
}

/**
 * Fetch AI Response:
 * Tries live Gemini REST API call first.
 * If API key is missing or request fails, falls back seamlessly to clinical rules engine.
 */
export async function fetchAIResponse(query: string, customKey?: string) {
  const apiKey = customKey || getStoredApiKey();

  if (apiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are ArogyaAI, an empathetic and professional Virtual Health Assistant in India. Provide concise, clear medical guidance, symptoms analysis, home care tips, and advice on when to consult a specialist doctor. User question: "${query}"`,
                },
              ],
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const candidateText =
          data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

        if (candidateText) {
          return {
            replyText: candidateText,
            triageLevel: 'Mild' as const,
            suggestions: [
              'Consult General Physician',
              'Check symptoms with Symptom Checker',
              'Book Specialist Appointment',
            ],
            isLiveApi: true,
          };
        }
      }
    } catch (error) {
      console.warn('Live Gemini API call failed, falling back to Clinical Rules Engine:', error);
    }
  }

  // Fallback to deterministic Clinical Rules Engine
  const fallback = generateAIResponse(query);
  return {
    ...fallback,
    isLiveApi: false,
  };
}
