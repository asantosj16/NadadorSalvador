/**
 * Serviço de integração com dados meteorológicos
 * Primeira tentativa: Open-Meteo API (dados de temperatura do ar)
 * Fallback: Tempo.pt web scraping
 */

const OPENMETEO_API = 'https://api.open-meteo.com/v1/forecast';
const TEMPO_PT_BASE = 'https://www.tempo.pt';
const TEMPO_PT_PROXY = 'https://api.allorigins.win/raw?url=';
const CACHE_DURATION = 300000; // 5 minutos
const CACHE_KEY_PREFIX = 'weather_data_';

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

// Mapeamento de URLs Tempo.pt para localidades - COMPLETO E ATUALIZADO
const LOCATION_SLUGS: Record<string, string> = {
  // Norte
  'Viana do Castelo': 'viana-do-castelo',
  'Praia do Cabedelo': 'viana-do-castelo',
  'Caminha': 'caminha',
  'Praia de Caminha': 'caminha',
  'Póvoa de Varzim': 'povoa-de-varzim',
  'Praia da Póvoa': 'povoa-de-varzim',
  'Vila do Conde': 'vila-do-conde',
  'Praia de Argivai': 'vila-do-conde',
  'Porto': 'porto',
  'Praia de Matosinhos': 'porto',
  'Matosinhos': 'porto',
  'Leça da Palmeira': 'porto',
  'Praia de Leça da Palmeira': 'porto',
  'Espinho': 'espinho',
  'Praia da Baía': 'espinho',
  'Praia de Miramar': 'espinho',
  
  // Centro
  'Aveiro': 'aveiro',
  'Praia da Barra': 'aveiro',
  'Costa Nova': 'aveiro',
  'Praia de Costa Nova': 'aveiro',
  'Figueira da Foz': 'figueira-da-foz',
  'Praia da Claridade': 'figueira-da-foz',
  'Buarcos': 'figueira-da-foz',
  'Praia de Buarcos': 'figueira-da-foz',
  'Nazaré': 'nazare',
  'Praia da Nazaré': 'nazare',
  'Praia do Norte': 'nazare',
  'Peniche': 'peniche',
  'Praia de Supertubos': 'peniche',
  'Baleal': 'peniche',
  'Praia de Baleal': 'peniche',
  
  // Lisboa e Setúbal
  'Ericeira': 'ericeira',
  'Praia Ribeira d\'Ilhas': 'ericeira',
  'Praia Central': 'ericeira',
  'Cascais': 'cascais',
  'Praia do Guincho': 'cascais',
  'Guincho': 'cascais',
  'Carcavelos': 'cascais',
  'Praia de Carcavelos': 'cascais',
  'Tamariz': 'cascais',
  'Praia de Tamariz': 'cascais',
  'Costa da Caparica': 'costa-da-caparica',
  'Praia da Caparica': 'costa-da-caparica',
  'Fonte da Telha': 'costa-da-caparica',
  'Praia de Fonte da Telha': 'costa-da-caparica',
  'Sesimbra': 'sesimbra',
  'Praia de Sesimbra': 'sesimbra',
  'Setúbal': 'setubal',
  'Praia dos Galapinhos': 'setubal',
  'Tróia': 'setubal',
  'Praia de Tróia': 'setubal',
  'Troia': 'setubal',
  
  // Alentejo
  'Sines': 'sines',
  'Praia de São Torpes': 'sines',
  'Vila Nova de Milfontes': 'milfontes',
  'Praia da Franquia': 'milfontes',
  'Praia da Moto': 'milfontes',
  
  // Algarve
  'Sagres': 'sagres',
  'Praia do Beliche': 'sagres',
  'Praia do Vau': 'sagres',
  'Portimão': 'portimao',
  'Praia da Rocha': 'portimao',
  'Lagos': 'lagos',
  'Praia de Meia Praia': 'lagos',
  'Meia Praia': 'lagos',
  'Albufeira': 'albufeira',
  'Praia de Albufeira': 'albufeira',
  'Quarteira': 'quarteira',
  'Praia de Quarteira': 'quarteira',
  'Vilamoura': 'quarteira',
  'Praia de Vilamoura': 'quarteira',
  'Faro': 'faro',
  'Praia de Faro': 'faro',
  'Olhão': 'olhao',
  'Praia de Olhão': 'olhao',
  'Tavira': 'tavira',
  'Praia de Tavira': 'tavira',
  
  // Ilhas
  'Madeira': 'madeira',
  'Porto Moniz': 'madeira',
  'Funchal': 'funchal',
  'Praia da Madeira': 'funchal',
  'São Miguel - Açores': 'ponta-delgada',
  'Ponta Delgada': 'ponta-delgada',
  'Praia de Santa Bárbara': 'ponta-delgada',
  'Terceira - Açores': 'terceira',
  'Praia de Turnafe': 'terceira'
};

// Coordenadas GPS das praias (latitude, longitude) para Open-Meteo API
const BEACH_COORDINATES: Record<string, { lat: number; lon: number }> = {
  'Viana do Castelo': { lat: 41.6837, lon: -8.8290 },
  'Caminha': { lat: 41.8783, lon: -8.8357 },
  'Póvoa de Varzim': { lat: 41.3814, lon: -8.7619 },
  'Vila do Conde': { lat: 41.3336, lon: -8.7494 },
  'Porto': { lat: 41.1605, lon: -8.6290 },
  'Matosinhos': { lat: 41.1800, lon: -8.6850 },
  'Espinho': { lat: 40.6437, lon: -8.6414 },
  'Aveiro': { lat: 40.6331, lon: -8.6537 },
  'Figueira da Foz': { lat: 40.1341, lon: -8.8641 },
  'Nazaré': { lat: 39.5951, lon: -9.0711 },
  'Peniche': { lat: 39.3581, lon: -9.3816 },
  'Ericeira': { lat: 38.9638, lon: -9.4233 },
  'Cascais': { lat: 38.6821, lon: -9.4208 },
  'Carcavelos': { lat: 38.6944, lon: -9.3458 },
  'Costa da Caparica': { lat: 38.5664, lon: -9.2158 },
  'Sesimbra': { lat: 38.4457, lon: -9.1045 },
  'Setúbal': { lat: 38.5245, lon: -8.8875 },
  'Tróia': { lat: 38.3666, lon: -8.9679 },
  'Sines': { lat: 37.9581, lon: -8.8683 },
  'Milfontes': { lat: 37.7166, lon: -8.7833 },
  'Vila Nova de Milfontes': { lat: 37.7166, lon: -8.7833 },
  'Sagres': { lat: 37.0049, lon: -8.9263 },
  'Portimão': { lat: 37.1410, lon: -8.5300 },
  'Lagos': { lat: 37.0945, lon: -8.6675 },
  'Albufeira': { lat: 37.0808, lon: -8.2507 },
  'Quarteira': { lat: 37.0640, lon: -8.1091 },
  'Vilamoura': { lat: 37.0746, lon: -8.1206 },
  'Faro': { lat: 36.9741, lon: -7.9657 },
  'Olhão': { lat: 37.0233, lon: -7.8449 },
  'Madeira': { lat: 32.7521, lon: -16.9876 },
  'Ponta Delgada': { lat: 37.7412, lon: -25.6756 },
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
 * Busca dados da Open-Meteo API (dados de temperatura do ar)
 */
async function getOpenMeteoData(location: string): Promise<BeachConditions | null> {
  try {
    const coords = BEACH_COORDINATES[location];
    if (!coords) {
      console.log(`[OpenMeteo] Coordenadas não encontradas para ${location}`);
      return null;
    }

    const url = `${OPENMETEO_API}?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=Europe/Lisbon`;
    
    console.log(`[OpenMeteo] Buscando dados para ${location}...`);
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`[OpenMeteo] Erro HTTP: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    if (!data.current) {
      console.log(`[OpenMeteo] Dados inválidos:`, data);
      return null;
    }

    const current = data.current;
    const airTemp = current.temperature_2m ? `${Math.round(current.temperature_2m)}°C` : '--';
    const windSpeed = current.wind_speed_10m ? `${Math.round(current.wind_speed_10m)} km/h` : '--';
    const condition = getWeatherConditionFromCode(current.weather_code || 0);
    const ipmaIcon = getWeatherIconFromCode(current.weather_code || 0);
    
    console.log(`[OpenMeteo] ✓ ${location}: ${airTemp}`);
    
    // Open-Meteo não fornece temp da água ou UV Index
    // Vamos bussar esses dados do Tempo.pt quando necessário
    return {
      airTemp,
      waterTemp: '--',
      waves: '--',
      windSpeed,
      windDir: '--',
      uvIndex: '--',
      condition,
      riskLevel: 'low',
      alerts: [],
      ipmaIcon,
      lastUpdate: new Date().toLocaleTimeString('pt-PT', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  } catch (error) {
    console.error('[OpenMeteo] Erro:', error);
    return null;
  }
}

// Converter WMO codes para condição em português
function getWeatherConditionFromCode(code: number): string {
  if (code === 0 || code === 1) return 'Céu limpo';
  if (code === 2) return 'Parcialmente nublado';
  if (code === 3) return 'Nublado';
  if (code === 45 || code === 48) return 'Nevoeiro';
  if (code === 51 || code === 53 || code === 55) return 'Chuvisco';
  if (code === 61 || code === 63 || code === 65) return 'Chuva';
  if (code === 71 || code === 73 || code === 75) return 'Neve';
  if (code === 77) return 'Grão de neve';
  if (code === 80 || code === 81 || code === 82) return 'Aguaceiro';
  if (code === 85 || code === 86) return 'Aguaceiro de neve';
  if (code === 95 || code === 96 || code === 99) return 'Trovoada';
  return 'Dados disponíveis';
}

// Converter WMO codes para emoji
function getWeatherIconFromCode(code: number): string {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2) return '⛅';
  if (code === 3) return '☁️';
  if (code === 45 || code === 48) return '🌫️';
  if (code === 51 || code === 53 || code === 55) return '🌧️';
  if (code === 61 || code === 63 || code === 65) return '🌧️';
  if (code === 71 || code === 73 || code === 75) return '🌨️';
  if (code === 80 || code === 81 || code === 82) return '🌧️';
  if (code === 95 || code === 96 || code === 99) return '⛈️';
  return '☀️';
}

/**
 * Busca dados meteorológicos do Tempo.pt para uma localidade
 */
/**
 * Busca dados complementares do Tempo.pt (água, ondas, UV)
 */
async function getTempoDataSupplement(location: string): Promise<Partial<BeachConditions> | null> {
  try {
    const locationSlug = LOCATION_SLUGS[location] || location.toLowerCase().replace(/\s+/g, '-');
    const weatherUrl = `${TEMPO_PT_BASE}/${locationSlug}.html`;
    const proxyUrl = `${TEMPO_PT_PROXY}${encodeURIComponent(weatherUrl)}`;
    
    let html = '';
    const candidates = [proxyUrl, weatherUrl];
    for (const url of candidates) {
      try {
        const response = await fetch(url);
        if (!response.ok) continue;
        html = await response.text();
        if (html) break;
      } catch (e) {
        // continua
      }
    }

    if (!html) return null;

    // Buscar dados específicos
    const waterTempMatch = html.match(/água[^<>]*?(\d{1,2})\s*°/i) ||
                          html.match(/mar[^<>]*?(\d{1,2})\s*°/i) ||
                          html.match(/temp.*água[^<>]*?(\d{1,2})/i);
    
    const wavesMatch = html.match(/ondulação[^<>]*?(\d+[\.,]?\d*)\s*m/i) ||
                      html.match(/onda[^<>]*?(\d+[\.,]?\d*)\s*m/i);
    
    const uvMatch = html.match(/UV[^<>]*?(\d{1,2})/i);
    
    const windDirMatch = html.match(/vento[^<>]*?:(N|S|E|W|NE|NW|SE|SW|NO|SO)/i);

    return {
      waterTemp: waterTempMatch ? `${waterTempMatch[1]}°C` : '--',
      waves: wavesMatch ? `${wavesMatch[1].replace(',', '.')}m` : '--',
      uvIndex: uvMatch ? uvMatch[1] : '--',
      windDir: windDirMatch ? windDirMatch[1].toUpperCase() : '--',
    };
  } catch (error) {
    console.error('[Tempo.pt Supplement]', error);
    return null;
  }
}

/**
 * Busca dados completos do Tempo.pt (fallback total)
 */
async function getTempoDataFull(location: string): Promise<BeachConditions | null> {
  try {
    const locationSlug = LOCATION_SLUGS[location] || location.toLowerCase().replace(/\s+/g, '-');
    const weatherUrl = `${TEMPO_PT_BASE}/${locationSlug}.html`;
    const proxyUrl = `${TEMPO_PT_PROXY}${encodeURIComponent(weatherUrl)}`;
    
    let html = '';
    const candidates = [proxyUrl, weatherUrl];
    for (const url of candidates) {
      try {
        const response = await fetch(url);
        if (!response.ok) continue;
        html = await response.text();
        if (html) break;
      } catch (e) {
        // continua
      }
    }

    if (!html) return null;

    // Parser robusto
    const airTempMatch = html.match(/temp[\s-]*ar[^<>]*?(\d{1,2})[\s°]*C/i) ||
                        html.match(/(?:ar|ambiente)[^<>]*?(\d{1,2})\s*°/i) ||
                        html.match(/(\d{1,2})\s*°C\s*(?:ar|ambiente)/i);
    
    const waterTempMatch = html.match(/água[^<>]*?(\d{1,2})\s*°/i) ||
                          html.match(/mar[^<>]*?(\d{1,2})\s*°/i);
    
    const windSpeedMatch = html.match(/vento[^<>]*?(\d{1,3})\s*km\/h/i) ||
                          html.match(/(\d{1,3})\s*km\/h/i);
    
    const windDirMatch = html.match(/vento[^<>]*?:(N|S|E|W|NE|NW|SE|SW|NO|SO)/i) ||
                        html.match(/direção[^<>]*?:(N|S|E|W|NE|NW|SE|SW|NO|SO)/i);
    
    const wavesMatch = html.match(/ondulação[^<>]*?(\d+[\.,]?\d*)\s*m/i) ||
                      html.match(/onda[^<>]*?(\d+[\.,]?\d*)\s*m/i);
    
    const uvMatch = html.match(/UV[^<>]*?(\d{1,2})/i);

    const airTemp = airTempMatch ? `${airTempMatch[1]}°C` : '--';
    const waterTemp = waterTempMatch ? `${waterTempMatch[1]}°C` : '--';
    const windSpeed = windSpeedMatch ? `${windSpeedMatch[1]} km/h` : '--';
    const windDir = windDirMatch ? windDirMatch[1].toUpperCase() : '--';
    const waves = wavesMatch ? `${wavesMatch[1].replace(',', '.')}m` : '--';
    const uvIndex = uvMatch ? uvMatch[1] : '--';
    const condition = 'Dados de Tempo.pt';

    return {
      airTemp,
      waterTemp,
      waves,
      windSpeed,
      windDir,
      uvIndex,
      condition,
      riskLevel: 'low',
      alerts: [],
      ipmaIcon: '☀️',
      lastUpdate: new Date().toLocaleTimeString('pt-PT', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  } catch (error) {
    console.error('[Tempo.pt Full]', error);
    return null;
  }
}

export async function getIPMAWeatherData(location: string): Promise<BeachConditions> {
  const cacheKey = `${CACHE_KEY_PREFIX}${location}`;
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const logPrefix = `[Weather] ${location}`;
    
    // 1. TENTAR OPEN-METEO API (oficial e confiável)
    console.log(`${logPrefix} Tentando Open-Meteo API...`);
    const openMeteoData = await getOpenMeteoData(location);
    if (openMeteoData && openMeteoData.airTemp !== '--') {
      // Agora tentar completar com dados do Tempo.pt (temp água, ondas, UV)
      console.log(`${logPrefix} Open-Meteo sucesso. Tentando complementar com Tempo.pt...`);
      const tempoData = await getTempoDataSupplement(location);
      if (tempoData) {
        // Mesclar dados (Open-Meteo principal + Tempo.pt complementos)
        const merged: BeachConditions = {
          ...openMeteoData,
          waterTemp: tempoData.waterTemp || openMeteoData.waterTemp,
          waves: tempoData.waves || openMeteoData.waves,
          uvIndex: tempoData.uvIndex || openMeteoData.uvIndex,
          windDir: tempoData.windDir || openMeteoData.windDir,
        };
        saveToCache(cacheKey, merged);
        console.log(`${logPrefix} Dados mesclados:`, merged);
        return merged;
      }
      
      // Se Tempo.pt não funciona, retornar apenas Open-Meteo
      saveToCache(cacheKey, openMeteoData);
      console.log(`${logPrefix} Usando apenas Open-Meteo`);
      return openMeteoData;
    }
    
    // 2. FALLBACK: Tempo.pt web scraping completo
    console.log(`${logPrefix} Open-Meteo indisponível. Tentando Tempo.pt completo...`);
    const tempoFullData = await getTempoDataFull(location);
    if (tempoFullData && tempoFullData.airTemp !== '--') {
      saveToCache(cacheKey, tempoFullData);
      console.log(`${logPrefix} Tempo.pt sucesso:`, tempoFullData);
      return tempoFullData;
    }

    // 3. FALLBACK FINAL: Valores aproximados
    console.log(`${logPrefix} Nenhuma API disponível. Usando fallback...`);
    const fallbackAlert = {
      type: 'Fallback',
      level: 'info',
      description: 'APIs indisponíveis, a mostrar valores aproximados.'
    };
    
    const fallback: BeachConditions = {
      airTemp: '18°C',
      waterTemp: '14°C',
      waves: '1.0m',
      windSpeed: '12 km/h',
      windDir: '--',
      uvIndex: '--',
      condition: 'Dados indisponíveis',
      riskLevel: 'low',
      alerts: [fallbackAlert],
      ipmaIcon: '☀️',
      lastUpdate: new Date().toLocaleTimeString('pt-PT', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    saveToCache(cacheKey, fallback);
    return fallback;
    
  } catch (error) {
    console.error(`[Weather] ${location} Critical Error:`, error);
    const fallback: BeachConditions = {
      airTemp: '18°C',
      waterTemp: '14°C',
      waves: '1.0m',
      windSpeed: '12 km/h',
      windDir: '--',
      uvIndex: '--',
      condition: 'Erro ao carregar dados',
      riskLevel: 'low',
      alerts: [{
        type: 'Erro',
        level: 'warning',
        description: 'Erro ao carregar dados meteorológicos'
      }],
      ipmaIcon: '☀️',
      lastUpdate: new Date().toLocaleTimeString('pt-PT', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    return fallback;
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
