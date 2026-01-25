/**
 * Serviço de integração com Tempo.pt
 * Web scraping: https://www.tempo.pt
 */

const TEMPO_PT_BASE = 'https://www.tempo.pt';
// Proxy para contornar CORS no browser
const TEMPO_PT_PROXY = 'https://api.allorigins.win/raw?url=';
const CACHE_DURATION = 300000; // 5 minutos - Cache mais agressivo para atualizações reais
const CACHE_KEY_PREFIX = 'tempo_pt_data_';

interface BeachConditions {
  airTemp: string;
  waterTemp: string;
  waves: string;
  windSpeed: string;
  windDir: string;
  uvIndex: string;
  condition: string;
  riskLevel: 'low' | 'medium' | 'high';
  alerts: Array<{ type: string; level: string; description: string }>;
  ipmaIcon: string;
  lastUpdate: string;
}

// Mapeamento de URLs Tempo.pt para localidades
const LOCATION_SLUGS: Record<string, string> = {
  'Lisboa': 'lisboa',
  'Porto': 'porto',
  'Faro': 'faro',
  'Nazaré': 'nazare',
  'Praia do Norte': 'nazare',
  'Praia da Nazaré': 'nazare',
  'Cascais': 'cascais',
  'Carcavelos': 'cascais',
  'Guincho': 'cascais',
  'Peniche': 'peniche',
  'Baleal': 'peniche',
  'Sagres': 'sagres',
  'Viana do Castelo': 'viana-do-castelo',
  'Caminha': 'caminha',
  'Aveiro': 'aveiro',
  'Costa Nova': 'aveiro',
  'Barra': 'aveiro',
  'Figueira da Foz': 'figueira-da-foz',
  'Buarcos': 'figueira-da-foz',
  'Setúbal': 'setubal',
  'Sesimbra': 'sesimbra',
  'Troia': 'setubal',
  'Comporta': 'setubal',
  'Albufeira': 'albufeira',
  'Quarteira': 'quarteira',
  'Vilamoura': 'quarteira',
  'Lagos': 'lagos',
  'Meia Praia': 'lagos',
  'Portimão': 'portimao',
  'Praia da Rocha': 'portimao',
  'Costa da Caparica': 'costa-da-caparica',
  'Fonte da Telha': 'costa-da-caparica',
  'Ericeira': 'ericeira',
  'Ribeira dIlhas': 'ericeira',
  'Espinho': 'espinho',
  'Miramar': 'espinho',
  'Granja': 'espinho',
  'Matosinhos': 'matosinhos',
  'Leça da Palmeira': 'matosinhos',
  'Póvoa de Varzim': 'povoa-de-varzim',
  'Vila do Conde': 'vila-do-conde'
};

// Cache simples
const cache = new Map<string, { data: BeachConditions; timestamp: number }>();

function getFromCache(key: string): BeachConditions | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

function saveToCache(key: string, data: BeachConditions): void {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Busca dados meteorológicos do Tempo.pt para uma localidade
 */
export async function getIPMAWeatherData(location: string): Promise<BeachConditions> {
  const cacheKey = `${CACHE_KEY_PREFIX}${location}`;
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const logPrefix = `[Tempo.pt] ${location}`;
    const locationSlug = LOCATION_SLUGS[location] || LOCATION_SLUGS['Lisboa'];
    
    // Buscar dados do Tempo.pt (tentar proxy para evitar CORS)
    const weatherUrl = `${TEMPO_PT_BASE}/${locationSlug}.html`;
    const proxyUrl = `${TEMPO_PT_PROXY}${encodeURIComponent(weatherUrl)}`;
    console.log(`${logPrefix} Fetching from: ${weatherUrl} (via proxy)`);

    let html = '';
    const candidates = [proxyUrl, weatherUrl];
    for (const url of candidates) {
      try {
        const response = await fetch(url);
        if (!response.ok) continue;
        html = await response.text();
        if (html) break;
      } catch (e) {
        // continua para próximo candidato
      }
    }

    if (!html) {
      throw new Error('Tempo.pt unavailable (CORS/proxy)');
    }
    
    // Parser dos dados usando regex - MELHORADO para detectar melhor
    const airTempMatch = html.match(/temperatura[^>]*>(\d+)°/i) || 
                        html.match(/ar[^>]*>(\d+)°/i) ||
                        html.match(/(\d{2})°C(?!.*água)/i);
    
    const waterTempMatch = html.match(/temperatura.*água[^>]*>(\d+)°/i) || 
                          html.match(/água[^>]*>(\d+)°/i) ||
                          html.match(/mar[^>]*>(\d+)°/i);
    
    const windSpeedMatch = html.match(/vento[^>]*>(\d+)[\s]*km/i) || 
                          html.match(/(\d{1,3})[\s]*km\/h/);
    
    const windDirMatch = html.match(/vento[^>]*>(N|S|E|W|NE|NW|SE|SW|NO|SO)/i) ||
                        html.match(/direção.*vento[^>]*>(N|S|E|W|NE|NW|SE|SW|NO|SO)/i);
    
    const wavesMatch = html.match(/ondulação[^>]*>(\d+[\.,]?\d*)[\s]*m/i) || 
                      html.match(/onda[^>]*>(\d+[\.,]?\d*)[\s]*m/i) ||
                      html.match(/(\d+[\.,]?\d*)[\s]*m(?!.*tempo)/i);
    
    const uvMatch = html.match(/UV[^>]*>(\d+)/i) || 
                   html.match(/índice.*UV[^>]*(\d+)/i) ||
                   html.match(/uv\s*(?:index)?\s*[:\s]*(\d+)/i);
    
    const conditionMatch = html.match(/<meta[^>]*description[^>]*content="[^"]*tempo[^"]*:\s*([^,"\.]+)/i) ||
                          html.match(/previsão[^>]*>([^<]+)</i) ||
                          html.match(/condição[^>]*>([^<]+)</i);

    // Extrair valores ou usar defaults
    const airTemp = airTempMatch ? `${airTempMatch[1]}°C` : '--';
    const waterTemp = waterTempMatch ? `${waterTempMatch[1]}°C` : '--';
    const windSpeed = windSpeedMatch ? `${windSpeedMatch[1]} km/h` : '--';
    const windDir = windDirMatch ? windDirMatch[1].toUpperCase() : '--';
    const waves = wavesMatch ? `${wavesMatch[1].replace(',', '.')}m` : '--';
    const uvIndex = uvMatch ? uvMatch[1] : '--';
    const condition = conditionMatch ? conditionMatch[1].trim() : 'Dados temporariamente indisponíveis';

    // Determinar ícone baseado na condição
    let ipmaIcon = '☀️';
    const condLower = condition.toLowerCase();
    if (condLower.includes('chuva forte') || condLower.includes('temporal')) {
      ipmaIcon = '⛈️';
    } else if (condLower.includes('chuva') || condLower.includes('chuvisco')) {
      ipmaIcon = '🌧️';
    } else if (condLower.includes('aguaceiro')) {
      ipmaIcon = '🌦️';
    } else if (condLower.includes('trovoada')) {
      ipmaIcon = '⛈️';
    } else if (condLower.includes('nublado') || condLower.includes('nuvens')) {
      ipmaIcon = '☁️';
    } else if (condLower.includes('parcialmente') || condLower.includes('pouco')) {
      ipmaIcon = '⛅';
    } else if (condLower.includes('neve')) {
      ipmaIcon = '🌨️';
    } else if (condLower.includes('nevoeiro') || condLower.includes('fog')) {
      ipmaIcon = '🌫️';
    } else if (condLower.includes('limpo') || condLower.includes('sol')) {
      ipmaIcon = '☀️';
    }

    // Calcular nível de risco
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    const alerts: Array<{ type: string; level: string; description: string }> = [];

    const windSpeedNum = parseInt(windSpeed);
    const wavesNum = parseFloat(waves);

    // Verificar condições de risco
    if (windSpeedNum >= 50) {
      riskLevel = 'high';
      alerts.push({
        type: 'Vento',
        level: 'Alto',
        description: 'Ventos fortes - cuidado nas atividades aquáticas'
      });
    } else if (windSpeedNum >= 30) {
      riskLevel = 'medium';
      alerts.push({
        type: 'Vento',
        level: 'Moderado',
        description: 'Vento moderado a forte'
      });
    }

    if (wavesNum >= 2.5) {
      if (riskLevel === 'low') riskLevel = 'medium';
      if (wavesNum >= 4.0) riskLevel = 'high';
      alerts.push({
        type: 'Ondulação',
        level: wavesNum >= 4.0 ? 'Alto' : 'Moderado',
        description: `Ondas de ${waves} - Mar agitado`
      });
    }

    if (condLower.includes('chuva') || condLower.includes('trovoada') || condLower.includes('temporal')) {
      if (riskLevel === 'low') riskLevel = 'medium';
      alerts.push({
        type: 'Precipitação',
        level: 'Médio',
        description: condition
      });
    }

    const result: BeachConditions = {
      airTemp,
      waterTemp,
      waves,
      windSpeed,
      windDir,
      uvIndex,
      condition,
      riskLevel,
      alerts,
      ipmaIcon,
      lastUpdate: new Date().toLocaleTimeString('pt-PT', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    saveToCache(cacheKey, result);
    console.log(`${logPrefix} Data fetched successfully:`, result);
    return result;

  } catch (error) {
    console.error('Tempo.pt Error:', error);
    const fallbackAlert = {
      type: 'Fallback',
      level: 'info',
      description: 'Dados Tempo.pt indisponíveis, a mostrar valores aproximados.'
    };
    
    // Retornar dados de fallback com aviso
    return {
      airTemp: '20°C',
      waterTemp: '17°C',
      waves: '1.2m',
      windSpeed: '15 km/h',
      windDir: 'N',
      uvIndex: '5',
      condition: 'Céu limpo',
      riskLevel: 'low',
      alerts: [fallbackAlert],
      ipmaIcon: '☀️',
      lastUpdate: new Date().toLocaleTimeString('pt-PT', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  }
}

/**
 * Lista todas as localidades disponíveis
 */
export function getAvailableLocations(): string[] {
  return Object.keys(LOCATION_SLUGS).sort();
}

/**
 * Força atualização dos dados (limpa cache)
 */
export function refreshData(location?: string): void {
  if (location) {
    cache.delete(`${CACHE_KEY_PREFIX}${location}`);
  } else {
    cache.clear();
  }
}
