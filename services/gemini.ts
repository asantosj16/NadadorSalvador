
import { GoogleGenAI, Type } from "@google/genai";

const CACHE_KEY = 'lifeguard_pro_weather_v4';
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
      contents: `Obtenha as condições meteorológicas e marítimas ATUAIS para a praia de ${location}, Portugal. 
      Consulte prioritariamente dados do IPMA (ipma.pt).
      Inclua: temperatura do ar, temperatura da água, altura das ondas, velocidade e direção do vento, índice UV e alertas meteorológicos ativos (Amarelo, Laranja, Vermelho).
      Retorne APENAS um JSON válido.`,
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
            riskLevel: { type: Type.STRING, description: "low, moderate, high, extreme" },
            alerts: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, description: "Agitação Marítima, Vento, Chuva, etc." },
                  level: { type: Type.STRING, description: "Amarelo, Laranja, Vermelho" },
                  description: { type: Type.STRING }
                }
              } 
            },
            ipmaIcon: { type: Type.STRING, description: "emoji representing weather like ☀️, ☁️, 🌧️" }
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
      airTemp: "20°C", waterTemp: "16°C", waves: "1.0m", windSpeed: "10km/h", 
      windDir: "N", uvIndex: "4", condition: "Céu Limpo", riskLevel: "low", alerts: [], ipmaIcon: "☀️"
    };
  }
}

export async function getTrainingSchedules() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Pesquise editais oficiais, calendários de cursos de Nadador Salvador e exames de recertificação/revalidação em Portugal para o ano de 2026. Foque no site do ISN (isn.marinha.pt). Retorne um JSON com array 'trainings' contendo: location, entity, type, dates, status, link.",
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
                },
                required: ["location", "entity", "type", "dates", "status", "link"]
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text).trainings || [];
  } catch (error) {
    return [];
  }
}

export async function generateDailyScenario() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Gere um cenário realista de salvamento para um Nadador Salvador em Portugal. Curto e técnico.",
    });
    return response.text;
  } catch (error) {
    return "Cenário: Maré vazante, forte agueiro em frente ao posto. Banhista em pânico.";
  }
}

export async function getLifeguardAdvice(query: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "Age como instrutor ISN senior. Foca em protocolos oficiais portugueses."
      }
    });
    return response.text;
  } catch (error) {
    return "Erro ao contactar o instrutor.";
  }
}
