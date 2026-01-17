
import { GoogleGenAI, Type } from "@google/genai";

const CACHE_KEY = 'lifeguard_pro_weather_v3';
const CACHE_DURATION = 30 * 60 * 1000; 

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
    if (entry) return { ...entry.data, isStale: true };
  } catch (e) {
    console.error("Erro cache:", e);
  }
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
  if (cached && !cached.isStale) return cached;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Obtenha as condições meteorológicas e marítimas EM TEMPO REAL para a praia de ${location}, Portugal. 
      Verifique riscos de: trovoada, ventos >40km/h, ondas >2.5m, índice UV Extremo.
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
            alerts: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["airTemp", "waterTemp", "waves", "windSpeed", "windDir", "uvIndex", "condition", "riskLevel", "alerts"],
        }
      }
    });
    
    const text = response.text;
    if (!text) throw new Error("Empty API Response");
    
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const result = { 
      data: JSON.parse(text),
      sources: sources.filter(s => s.web).map(s => ({ uri: s.web?.uri, title: s.web?.title }))
    };

    saveWeatherToCache(location, result);
    return result;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (cached) return { ...cached, isStale: true, error: "quota" };
    return { 
      data: {
        airTemp: "22°C", waterTemp: "18°C", waves: "1.2m", windSpeed: "15km/h", 
        windDir: "NW", uvIndex: "6", condition: "Sem dados", riskLevel: "low", alerts: ["⚠️ Sistema offline / Quota excedida"]
      },
      sources: []
    };
  }
}

export async function generateDailyScenario() {
  const sessionKey = 'daily_scenario_session';
  const cached = sessionStorage.getItem(sessionKey);
  if (cached) return cached;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Gera um cenário breve de emergência técnica para Nadador Salvador (praia em Portugal). Foca-te num dilema de salvamento.",
    });
    const scenario = response.text || "Cenário de rotina: vigilância ativa.";
    sessionStorage.setItem(sessionKey, scenario);
    return scenario;
  } catch (error) {
    return "Cenário: Mar de levante, forte corrente de retorno. Banhista em pânico a 50m.";
  }
}

export async function getLifeguardAdvice(query: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "Age como instrutor ISN. Responde com protocolos oficiais portugueses.",
        temperature: 0.2
      }
    });
    return response.text;
  } catch (error) {
    return "Consulte o manual técnico. Erro de ligação ao assistente.";
  }
}

export async function getTrainingSchedules() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Pesquise os editais oficiais abertos e calendários para cursos de Nadador Salvador, exames de revalidação e recertificações anuais em Portugal para o ano de 2026. Consulte o site do ISN (isn.marinha.pt) e delegações marítimas. Retorne um JSON com os campos: location, entity, type (CURSO, EXAME REVALIDAÇÃO, RECERTIFICAÇÃO), dates, status, link.",
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
          },
          required: ["trainings"]
        }
      }
    });
    
    let data = [];
    try {
      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        data = parsed.trainings || [];
      }
    } catch (e) {
      console.error("Parse Error in getTrainingSchedules:", e);
    }

    return { 
      data: data,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] 
    };
  } catch (error) {
    console.error("Error fetching training schedules:", error);
    return { data: [], sources: [] };
  }
}
