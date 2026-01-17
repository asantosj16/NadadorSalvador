
import { GoogleGenAI, Type } from "@google/genai";
import { PORTUGAL_TRAININGS } from "../data/trainings";

const CACHE_KEY_WEATHER = 'lifeguard_pro_weather_v7';
const CACHE_KEY_TRAINING = 'lifeguard_pro_training_v7';
const CACHE_KEY_SCENARIO = 'lifeguard_pro_scenario_v7';
const CACHE_DURATION = 3600000; // 1 hour

interface CacheEntry {
  data: any;
  timestamp: number;
}

function getFromCache(key: string, subKey: string): any | null {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const store = JSON.parse(cached);
    const entry = store[subKey] as CacheEntry;
    
    if (entry && (Date.now() - entry.timestamp < CACHE_DURATION)) {
      return entry.data;
    }
  } catch (e) {
    console.warn("Cache read error:", e);
  }
  return null;
}

function saveToCache(key: string, subKey: string, data: any) {
  try {
    const cached = localStorage.getItem(key);
    const store = cached ? JSON.parse(cached) : {};
    store[subKey] = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(store));
  } catch (e) {
    console.warn("Cache write error:", e);
  }
}

/**
 * Exponential backoff wrapper for Gemini API calls
 */
async function callGeminiWithRetry(fn: () => Promise<any>, maxRetries = 3) {
  let delay = 1000;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      const isRateLimit = error?.message?.includes('429') || error?.status === 429;
      if (isRateLimit && i < maxRetries - 1) {
        console.warn(`Rate limit hit, retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }
      throw error;
    }
  }
}

export async function getBeachConditions(location: string) {
  const cached = getFromCache(CACHE_KEY_WEATHER, location);
  if (cached) return cached;

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('API Key not configured');
      throw new Error('API Key missing');
    }
    const ai = new GoogleGenAI({ apiKey });
    const result = await callGeminiWithRetry(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: `Context: Lifeguard App. Data for ${location}, Portugal. Shortest JSON response.`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              airTemp: { type: Type.STRING },
              waterTemp: { type: Type.STRING },
              waves: { type: Type.STRING },
              windSpeed: { type: Type.STRING },
              windDir: { type: Type.STRING },
              uvIndex: { type: Type.STRING },
              condition: { type: Type.STRING },
              riskLevel: { type: Type.STRING },
              alerts: { 
                type: Type.ARRAY, 
                items: { 
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING },
                    level: { type: Type.STRING },
                    description: { type: Type.STRING }
                  }
                } 
              },
              ipmaIcon: { type: Type.STRING }
            },
            required: ["airTemp", "waterTemp", "waves", "windSpeed", "windDir", "uvIndex", "condition", "riskLevel", "alerts", "ipmaIcon"],
          }
        }
      });
      return JSON.parse(response.text);
    });

    saveToCache(CACHE_KEY_WEATHER, location, result);
    return result;
  } catch (error) {
    console.error("Gemini Weather Error:", error);
    return {
      airTemp: "21°C", waterTemp: "17°C", waves: "1.2m", windSpeed: "12km/h", 
      windDir: "N", uvIndex: "5", condition: "Céu Limpo", riskLevel: "low", alerts: [], ipmaIcon: "☀️"
    };
  }
}

export async function getTrainingSchedules() {
  const cached = getFromCache(CACHE_KEY_TRAINING, 'global_schedules');
  if (cached) return cached;

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('API Key not configured');
      throw new Error('API Key missing');
    }
    const ai = new GoogleGenAI({ apiKey });
    const trainings = await callGeminiWithRetry(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: "Find ALL active lifeguard courses (Nadador Salvador), revalidation exams, and recertifications in Portugal for 2025 and 2026. Include ISN, ANSA, ASNASA, and private entities. Provide an exhaustive list as JSON.",
        config: { 
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              trainings: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    location: { type: Type.STRING },
                    entity: { type: Type.STRING },
                    type: { type: Type.STRING, enum: ["CURSO", "EXAME REVALIDAÇÃO", "RECERTIFICAÇÃO"] },
                    dates: { type: Type.STRING },
                    status: { type: Type.STRING },
                    link: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });
      return JSON.parse(response.text).trainings || [];
    });

    saveToCache(CACHE_KEY_TRAINING, 'global_schedules', trainings);
    return trainings;
  } catch (error) {
    console.error("Gemini Training Error:", error);
    // Retorna dados completos de formações em Portugal
    return PORTUGAL_TRAININGS;
  }
}

export async function generateDailyScenario() {
  const cached = getFromCache(CACHE_KEY_SCENARIO, 'daily_scenario');
  if (cached) return cached;

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('API Key not configured');
      throw new Error('API Key missing');
    }
    const ai = new GoogleGenAI({ apiKey });
    const text = await callGeminiWithRetry(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: "Cenário curto de salvamento aquático para Nadador Salvador. 1 frase.",
      });
      return response.text;
    });

    saveToCache(CACHE_KEY_SCENARIO, 'daily_scenario', text);
    return text;
  } catch (error) {
    console.error("Gemini Scenario Error:", error);
    return "Cenário: Criança em pânico num agueiro a 30m da costa.";
  }
}

export async function getLifeguardAdvice(query: string) {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('API Key not configured');
      throw new Error('API Key missing');
    }
    const ai = new GoogleGenAI({ apiKey });
    return await callGeminiWithRetry(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: query,
        config: { systemInstruction: "És um Instrutor Sénior do ISN (Instituto de Socorros a Náufragos). Dá respostas curtas, técnicas e baseadas em manuais oficiais." }
      });
      return response.text;
    });
  } catch (error) {
    console.error("Gemini Advice Error:", error);
    return "Erro de ligação à rede técnica ou limite de pedidos excedido. Por favor, tente novamente mais tarde.";
  }
}
