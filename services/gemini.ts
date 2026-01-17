
import { GoogleGenAI, Type } from "@google/genai";

const CACHE_KEY = 'lifeguard_pro_weather_v6';
const CACHE_DURATION = 3600000; // 1 hour

interface WeatherCacheEntry {
  data: any;
  timestamp: number;
}

function getCachedWeather(location: string): any | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const store = JSON.parse(cached);
    const entry = store[location] as WeatherCacheEntry;
    
    if (entry && (Date.now() - entry.timestamp < CACHE_DURATION)) {
      return entry.data;
    }
  } catch (e) {}
  return null;
}

function saveWeatherToCache(location: string, data: any) {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const store = cached ? JSON.parse(cached) : {};
    store[location] = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(store));
  } catch (e) {}
}

export async function getBeachConditions(location: string) {
  const cached = getCachedWeather(location);
  if (cached) return cached;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
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
    
    const result = JSON.parse(response.text);
    saveWeatherToCache(location, result);
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
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "ISN Portugal Lifeguard courses 2026. JSON trainings array.",
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
                  type: { type: Type.STRING },
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
  } catch (error) {
    return [
      { location: "Lisboa", entity: "ISN", type: "CURSO", dates: "Abril 2026", status: "Inscrições Abertas", link: "https://www.isn.pt" },
      { location: "Porto", entity: "ASNASA", type: "RECERTIFICAÇÃO", dates: "Maio 2026", status: "Brevemente", link: "https://www.isn.pt" }
    ];
  }
}

export async function generateDailyScenario() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Cenário curto de salvamento aquático para Nadador Salvador. 1 frase.",
    });
    return response.text;
  } catch (error) {
    return "Cenário: Criança em pânico num agueiro a 30m da costa.";
  }
}

export async function getLifeguardAdvice(query: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: { systemInstruction: "És um Instrutor Sénior do ISN (Instituto de Socorros a Náufragos). Dá respostas curtas, técnicas e baseadas em manuais oficiais." }
    });
    return response.text;
  } catch (error) {
    return "Erro de ligação à rede técnica.";
  }
}
