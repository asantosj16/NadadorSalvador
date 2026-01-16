
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Nota: Sempre inicializar a instância dentro da função para garantir a chave API mais recente.
 */

export async function getLifeguardAdvice(query: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Questão técnica de salvamento aquático: ${query}`,
      config: {
        systemInstruction: "Age como um Instrutor Sénior do Instituto de Socorros a Náufragos (ISN). Responde exclusivamente com protocolos oficiais portugueses e normas do ERC. Sê técnico, assertivo e foca-te na segurança máxima da vítima e do socorrista.",
        temperature: 0.3,
      },
    });
    return { text: response.text };
  } catch (error) {
    console.error("Gemini Advice Error:", error);
    return { text: "Lamento, não consegui processar a consulta técnica. Por favor, consulta o manual físico ou contacta a coordenação." };
  }
}

export async function generateDailyScenario() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Gera um cenário breve de emergência numa praia portuguesa para treino mental. Inclui: Condições do Mar, Vítima e Dilema Técnico.",
      config: {
        temperature: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    return "Cenário de rotina: Mar calmo, vento de Norte, vigilância ativa padrão.";
  }
}

export async function getBeachConditions(location: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Forneça as condições meteorológicas e do mar em tempo real para a localização: ${location}. Se for uma praia portuguesa famosa, use dados típicos sazonais realistas.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            airTemp: { type: Type.STRING, description: "Temperatura do ar, ex: 24°C" },
            waterTemp: { type: Type.STRING, description: "Temperatura da água, ex: 18°C" },
            waves: { type: Type.STRING, description: "Altura das ondas, ex: 1.2m" },
            windSpeed: { type: Type.STRING, description: "Velocidade do vento, ex: 15km/h" },
            windDir: { type: Type.STRING, description: "Direção do vento, ex: NW" },
            uvIndex: { type: Type.STRING, description: "Índice UV, ex: Baixo, Moderado, Alto" },
            condition: { type: Type.STRING, description: "Condição do céu, ex: Céu Limpo, Parcialmente Nublado" }
          },
          required: ["airTemp", "waterTemp", "waves", "windSpeed", "windDir", "uvIndex", "condition"],
        }
      }
    });
    
    const text = response.text;
    if (!text) throw new Error("Empty response");
    return JSON.parse(text);
  } catch (error) {
    console.error("Conditions Fetch Error:", error);
    return { 
      airTemp: "22°C", 
      waterTemp: "18°C", 
      waves: "1.0m", 
      windSpeed: "15km/h", 
      windDir: "N", 
      uvIndex: "Moderado", 
      condition: "Céu Limpo" 
    };
  }
}

export async function getTrainingSchedules() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const today = new Date().toLocaleDateString('pt-PT');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Pesquisa no site oficial do ISN (isn.marinha.pt) o "Calendário de Sessões para Recertificação (EEAT-REC) 2026" e cursos de 2025. Fornece uma lista de cursos de Nadador Salvador e exames de revalidação com inscrições abertas. Retorna um array JSON com: location, entity, type (CURSO, EXAME REVALIDAÇÃO ou RECERTIFICAÇÃO 2026), dates, status, link.`,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const jsonMatch = response.text?.match(/\[\s*\{.*\}\s*\]/s);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);
      return { data, sources };
    }
    
    return { 
      data: [
        { location: "Site ISN", entity: "ISN", type: "RECERTIFICAÇÃO 2026", dates: "Calendário EEAT-REC 2026", status: "Publicado", link: "https://isn.marinha.pt/pt/nadador-salvador/Paginas/Exames-de-Nadador-Salvador.aspx" },
        { location: "Sede ISN - Caxias", entity: "ISN", type: "CURSO", dates: "Calendário 2025", status: "Abertas", link: "https://isn.marinha.pt/pt/formacao/Paginas/Calendario-de-Cursos.aspx" }
      ], 
      sources 
    };
  } catch (error) {
    console.error("Training Fetch Error:", error);
    return { data: [], sources: [] };
  }
}
