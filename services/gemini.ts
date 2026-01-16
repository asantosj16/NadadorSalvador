
import { GoogleGenAI, Type } from "@google/genai";

// Guideline: Always use a new instance right before the call to ensure the latest API key is used.
// Guideline: Use 'gemini-3-pro-preview' for complex text tasks like safety protocols and advanced reasoning.

export async function getLifeguardAdvice(query: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Questão técnica de salvamento aquático: ${query}`,
      config: {
        systemInstruction: "Age como um Instrutor Sénior do Instituto de Socorros a Náufragos (ISN). Responde exclusivamente com protocolos oficiais portugueses e normas do ERC. Sê técnico, assertivo e foca-te na segurança máxima da vítima e do socorrista.",
        temperature: 0.3, // Temperatura baixa para maior fidelidade técnica
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Advice Error:", error);
    return "Lamento, não consegui processar a consulta técnica. Por favor, consulta o manual físico ou contacta a coordenação.";
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
      contents: `Consulta informações atualizadas a ${today}. Fornece uma lista de 4 locais e datas exatas disponíveis para cursos de Nadador Salvador e exames de revalidação em Portugal. Para cada um, inclui o link oficial para consulta (ex: site do ISN ou capitania). Prioriza eventos com inscrições abertas recentemente. Retorna em JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              location: { type: Type.STRING, description: "Localidade e distrito" },
              entity: { type: Type.STRING, description: "Entidade formadora ou capitania" },
              type: { type: Type.STRING, enum: ["CURSO", "EXAME REVALIDAÇÃO"], description: "Tipo de evento" },
              dates: { type: Type.STRING, description: "Datas específicas" },
              status: { type: Type.STRING, description: "Estado (ex: Inscrições Abertas, Vagas Limitadas)" },
              link: { type: Type.STRING, description: "URL oficial para consulta de vagas" }
            },
            required: ["location", "entity", "type", "dates", "status", "link"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Training Fetch Error:", error);
    return [
      { location: "Lisboa - ISN", entity: "Sede ISN", type: "CURSO", dates: "Próxima semana", status: "Abertas", link: "https://isn.marinha.pt" },
      { location: "Porto - Capitania", entity: "Escola de Autoridade Marítima", type: "EXAME REVALIDAÇÃO", dates: "Agendamento diário", status: "Verificar Disponibilidade", link: "https://www.marinha.pt" }
    ];
  }
}
