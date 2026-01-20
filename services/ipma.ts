/**
 * Serviço de integração com IPMA (Instituto Português do Mar e da Atmosfera)
 * API pública: https://api.ipma.pt
 */

const IPMA_API_BASE = 'https://api.ipma.pt/open-data';
const CACHE_DURATION = 1800000; // 30 minutos
const CACHE_KEY_PREFIX = 'ipma_data_';

interface IPMALocation {
  id: number;
  name: string;
  lat: number;
  lon: number;
}

interface IPMAWeatherData {
  precipitaProb: string;
  tMin: string;
  tMax: string;
  predWindDir: string;
  idWeatherType: number;
  classWindSpeed: number;
  longitude: string;
  latitude: string;
  forecastDate: string;
}

interface IPMASeaData {
  idPeriod: number;
  globalIdLocal: number;
  latitude: string;
  longitude: string;
  forecastDate: string;
  waveHeight: number;
  wavePeriod: number;
  waveDirection: string;
  seaTemperature: number;
}

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

// Mapeamento de IDs IPMA para localidades
const LOCATION_IDS: Record<string, number> = {
  'Lisboa': 1110600,
  'Porto': 1131200,
  'Faro': 1080500,
  'Nazaré': 1141400,
  'Cascais': 1091100,
  'Peniche': 1141700,
  'Sagres': 1080200,
  'Viana do Castelo': 1160900,
  'Aveiro': 1010500,
  'Figueira da Foz': 1060600,
  'Setúbal': 1151200,
  'Sesimbra': 1151300,
  'Albufeira': 1080100,
  'Lagos': 1080700,
  'Portimão': 1081200,
  'Costa da Caparica': 1090700,
  'Ericeira': 1091600,
  'Espinho': 1130500,
  'Matosinhos': 1131100,
  'Póvoa de Varzim': 1131400
};

// Mapeamento de códigos meteorológicos IPMA
const WEATHER_TYPES: Record<number, { desc: string; icon: string }> = {
  1: { desc: 'Céu limpo', icon: '☀️' },
  2: { desc: 'Céu pouco nublado', icon: '🌤️' },
  3: { desc: 'Céu parcialmente nublado', icon: '⛅' },
  4: { desc: 'Céu muito nublado', icon: '☁️' },
  5: { desc: 'Céu nublado', icon: '☁️' },
  6: { desc: 'Aguaceiros', icon: '🌦️' },
  7: { desc: 'Aguaceiros fracos', icon: '🌧️' },
  8: { desc: 'Aguaceiros fortes', icon: '⛈️' },
  9: { desc: 'Chuva', icon: '🌧️' },
  10: { desc: 'Chuva fraca', icon: '🌧️' },
  11: { desc: 'Chuva forte', icon: '⛈️' },
  12: { desc: 'Período de chuva', icon: '🌧️' },
  13: { desc: 'Aguaceiros fracos', icon: '🌦️' },
  14: { desc: 'Aguaceiros', icon: '🌦️' },
  15: { desc: 'Aguaceiros fortes', icon: '⛈️' },
  16: { desc: 'Trovoada', icon: '⛈️' },
  17: { desc: 'Possibilidade de trovoada', icon: '⛈️' },
  18: { desc: 'Chuva/Neve', icon: '🌨️' },
  19: { desc: 'Neve', icon: '🌨️' },
  20: { desc: 'Nevoeiro', icon: '🌫️' },
  21: { desc: 'Nevoeiro', icon: '🌫️' },
  22: { desc: 'Nevoeiro', icon: '🌫️' },
  23: { desc: 'Nevoeiro', icon: '🌫️' },
  24: { desc: 'Nevoeiro gelado', icon: '🌫️' },
  25: { desc: 'Geada', icon: '❄️' },
  26: { desc: 'Possibilidade de geada', icon: '❄️' },
  27: { desc: 'Granizo', icon: '🧊' }
};

// Classes de velocidade do vento (km/h)
const WIND_SPEED_CLASSES: Record<number, string> = {
  1: '5-10',
  2: '10-20',
  3: '20-30',
  4: '30-40',
  5: '40-50',
  6: '50-60',
  7: '60-70',
  8: '70-80',
  9: '> 80'
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
 * Busca dados meteorológicos do IPMA para uma localidade
 */
export async function getIPMAWeatherData(location: string): Promise<BeachConditions> {
  const cacheKey = `${CACHE_KEY_PREFIX}${location}`;
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const locationId = LOCATION_IDS[location] || LOCATION_IDS['Lisboa'];
    
    // Buscar previsão diária
    const weatherResponse = await fetch(
      `${IPMA_API_BASE}/forecast/meteorology/cities/daily/${locationId}.json`
    );
    
    if (!weatherResponse.ok) {
      throw new Error(`IPMA API error: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();
    const today = weatherData.data[0] as IPMAWeatherData;

    // Buscar dados de UV para a localidade e data corrente
    let uvIndex = 'N/A';
    try {
      const uvResponse = await fetch(`${IPMA_API_BASE}/forecast/meteorology/uv/uv.json`);
      if (uvResponse.ok) {
        const uvData = await uvResponse.json();
        const todayISO = new Date().toISOString().split('T')[0];
        const todayUV = uvData.data?.find((d: { globalIdLocal: number; iUv: number; data?: string; forecastDate?: string }) => 
          Number(d.globalIdLocal) === locationId && (d.forecastDate?.startsWith(todayISO) || d.data?.startsWith(todayISO))
        );
        if (todayUV?.iUv !== undefined && todayUV?.iUv !== null) {
          uvIndex = String(todayUV.iUv);
        }
      }
    } catch (e) {
      console.warn('UV data not available');
    }

    // Buscar dados do mar (temperatura água e ondas)
    let waterTemp = '17°C';
    let waves = '1.0m';
    try {
      // Preferir o local selecionado; fallback para algumas referências costeiras
      const coastalIds = [locationId, 1010500, 1110600, 1080500]; // Aveiro, Lisboa, Faro
      const seaResponse = await fetch(
        `${IPMA_API_BASE}/forecast/oceanography/daily/hp-daily-sea.json`
      );
      
      if (seaResponse.ok) {
        const seaData = await seaResponse.json();
        const todayISO = new Date().toISOString().split('T')[0];
        const todaySeaList = seaData.data?.filter((d: IPMASeaData) => 
          (d.forecastDate || '').startsWith(todayISO)
        ) || [];
        const preferredSea = coastalIds
          .map((id) => todaySeaList.find((d: IPMASeaData) => Number(d.globalIdLocal) === id))
          .find(Boolean) || todaySeaList[0];
        
        if (preferredSea) {
          waterTemp = `${preferredSea.seaTemperature}°C`;
          waves = `${Number(preferredSea.waveHeight).toFixed(1)}m`;
        }
      }
    } catch (e) {
      console.warn('Sea data not available');
    }

    // Determinar temperatura do ar
    const tMax = parseFloat(today.tMax);
    const tMin = parseFloat(today.tMin);
    const tMed = Math.round((tMax + tMin) / 2);
    const airTemp = `${tMed}°C`;

    // Velocidade do vento
    const windSpeed = WIND_SPEED_CLASSES[today.classWindSpeed] || '10-20';

    // Tipo de tempo
    const weatherType = WEATHER_TYPES[today.idWeatherType] || WEATHER_TYPES[1];

    // Calcular nível de risco
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    const alerts: Array<{ type: string; level: string; description: string }> = [];

    // Verificar condições de risco
    if (today.classWindSpeed >= 6) {
      riskLevel = 'high';
      alerts.push({
        type: 'Vento',
        level: 'Alto',
        description: 'Ventos fortes - cuidado nas atividades aquáticas'
      });
    } else if (today.classWindSpeed >= 4) {
      riskLevel = 'medium';
      alerts.push({
        type: 'Vento',
        level: 'Moderado',
        description: 'Vento moderado a forte'
      });
    }

    if ([9, 10, 11, 12, 16, 17].includes(today.idWeatherType)) {
      if (riskLevel === 'low') riskLevel = 'medium';
      alerts.push({
        type: 'Precipitação',
        level: 'Médio',
        description: weatherType.desc
      });
    }

    // Buscar avisos meteorológicos
    try {
      const warningsResponse = await fetch(`${IPMA_API_BASE}/warnings/warnings_www.json`);
      if (warningsResponse.ok) {
        const warningsData = await warningsResponse.json();
        if (warningsData.data && Array.isArray(warningsData.data) && warningsData.data.length > 0) {
          const relevantWarning = warningsData.data.find((w: { idAreaAviso: string; awarenessLevelID: string; awarenessTypeName: string }) => 
            w.idAreaAviso && String(w.idAreaAviso).startsWith(String(locationId).substring(0, 4))
          );
          
          if (relevantWarning) {
            riskLevel = 'high';
            alerts.push({
              type: 'Aviso Meteorológico',
              level: relevantWarning.awarenessLevelID || 'yellow',
              description: relevantWarning.awarenessTypeName || 'Condições adversas previstas'
            });
          }
        }
      }
    } catch (e) {
      console.warn('Warnings data not available');
    }

    const result: BeachConditions = {
      airTemp,
      waterTemp,
      waves,
      windSpeed: `${windSpeed} km/h`,
      windDir: today.predWindDir || 'N',
      uvIndex: String(uvIndex),
      condition: weatherType.desc,
      riskLevel,
      alerts,
      ipmaIcon: weatherType.icon,
      lastUpdate: new Date().toLocaleTimeString('pt-PT', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    saveToCache(cacheKey, result);
    return result;

  } catch (error) {
    console.error('IPMA API Error:', error);
    
    // Retornar dados de fallback
    return {
      airTemp: '20°C',
      waterTemp: '17°C',
      waves: '1.2m',
      windSpeed: '15 km/h',
      windDir: 'N',
      uvIndex: '5',
      condition: 'Céu limpo',
      riskLevel: 'low',
      alerts: [],
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
  return Object.keys(LOCATION_IDS).sort();
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
