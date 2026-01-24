/**
 * Dados Meteorológicos das Praias de Portugal
 * Centralização de todas as informações de clima, ondas, vento e marés
 */

export interface BeachPoint {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  condition: string;
  temp: string;
  icon: string;
  alert?: 'Amarelo' | 'Laranja' | 'Vermelho';
  wind: string;
  waves: string;
  tide: string;
}

/**
 * Dados meteorológicos de todas as praias monitorizadas em Portugal
 */
export const FORECAST_POINTS: BeachPoint[] = [
  // Norte
  { 
    id: 'viana', 
    name: 'Praia do Cabedelo', 
    region: 'Viana do Castelo', 
    lat: 41.681, 
    lng: -8.833, 
    condition: 'Limpo', 
    temp: '19°', 
    icon: '☀️', 
    wind: '15km/h N', 
    waves: '1.2m', 
    tide: 'Baixa (14:30)' 
  },
  { 
    id: 'povoa', 
    name: 'Praia da Póvoa', 
    region: 'Póvoa de Varzim', 
    lat: 41.383, 
    lng: -8.761, 
    condition: 'Nuvens', 
    temp: '18°', 
    icon: '⛅', 
    wind: '18km/h NW', 
    waves: '1.8m', 
    tide: 'Enchente' 
  },
  { 
    id: 'porto', 
    name: 'Praia de Matosinhos', 
    region: 'Porto', 
    lat: 41.182, 
    lng: -8.689, 
    condition: 'Nuvens', 
    temp: '18°', 
    icon: '⛅', 
    alert: 'Amarelo', 
    wind: '22km/h NW', 
    waves: '2.5m', 
    tide: 'Enchente' 
  },
  { 
    id: 'espinho', 
    name: 'Praia da Baía', 
    region: 'Espinho', 
    lat: 41.007, 
    lng: -8.641, 
    condition: 'Limpo', 
    temp: '20°', 
    icon: '☀️', 
    wind: '14km/h N', 
    waves: '1.1m', 
    tide: 'Baixa' 
  },
  
  // Centro
  { 
    id: 'aveiro', 
    name: 'Praia da Barra', 
    region: 'Aveiro', 
    lat: 40.639, 
    lng: -8.745, 
    condition: 'Limpo', 
    temp: '20°', 
    icon: '☀️', 
    wind: '12km/h NW', 
    waves: '0.8m', 
    tide: 'Preia-mar' 
  },
  { 
    id: 'figueira', 
    name: 'Praia da Claridade', 
    region: 'Figueira da Foz', 
    lat: 40.15, 
    lng: -8.871, 
    condition: 'Nuvens', 
    temp: '19°', 
    icon: '⛅', 
    wind: '20km/h N', 
    waves: '2.0m', 
    tide: 'Baixa' 
  },
  { 
    id: 'nazare', 
    name: 'Praia da Nazaré', 
    region: 'Nazaré', 
    lat: 39.602, 
    lng: -9.07, 
    condition: 'Vento Forte', 
    temp: '17°', 
    icon: '🌬️', 
    alert: 'Vermelho', 
    wind: '45km/h W', 
    waves: '7.5m', 
    tide: 'Vazante' 
  },
  { 
    id: 'peniche', 
    name: 'Praia de Supertubos', 
    region: 'Peniche', 
    lat: 39.352, 
    lng: -9.381, 
    condition: 'Limpo', 
    temp: '19°', 
    icon: '☀️', 
    wind: '18km/h N', 
    waves: '1.5m', 
    tide: 'Baixa-mar' 
  },
  
  // Lisboa e Setúbal
  { 
    id: 'ericeira', 
    name: 'Praia Ribeira d\'Ilhas', 
    region: 'Ericeira', 
    lat: 38.993, 
    lng: -9.416, 
    condition: 'Limpo', 
    temp: '21°', 
    icon: '☀️', 
    wind: '15km/h N', 
    waves: '1.8m', 
    tide: 'Enchente' 
  },
  { 
    id: 'lisboa', 
    name: 'Praia do Guincho', 
    region: 'Cascais', 
    lat: 38.729, 
    lng: -9.489, 
    condition: 'Limpo', 
    temp: '22°', 
    icon: '☀️', 
    wind: '10km/h NW', 
    waves: '0.5m', 
    tide: 'Enchente' 
  },
  { 
    id: 'caparica', 
    name: 'Praia da Caparica', 
    region: 'Costa da Caparica', 
    lat: 38.642, 
    lng: -9.236, 
    condition: 'Limpo', 
    temp: '23°', 
    icon: '☀️', 
    wind: '12km/h W', 
    waves: '0.6m', 
    tide: 'Baixa' 
  },
  { 
    id: 'setubal', 
    name: 'Praia dos Galapinhos', 
    region: 'Setúbal', 
    lat: 38.481, 
    lng: -8.993, 
    condition: 'Limpo', 
    temp: '24°', 
    icon: '☀️', 
    wind: '5km/h S', 
    waves: '0.2m', 
    tide: 'Preia-mar' 
  },
  
  // Alentejo
  { 
    id: 'sines', 
    name: 'Praia de São Torpes', 
    region: 'Sines', 
    lat: 37.935, 
    lng: -8.799, 
    condition: 'Nuvens', 
    temp: '21°', 
    icon: '⛅', 
    wind: '14km/h W', 
    waves: '1.1m', 
    tide: 'Preia-mar' 
  },
  { 
    id: 'milfontes', 
    name: 'Praia da Franquia', 
    region: 'Vila Nova de Milfontes', 
    lat: 37.724, 
    lng: -8.794, 
    condition: 'Limpo', 
    temp: '22°', 
    icon: '☀️', 
    wind: '10km/h NW', 
    waves: '0.8m', 
    tide: 'Baixa' 
  },
  
  // Algarve
  { 
    id: 'sagres', 
    name: 'Praia do Beliche', 
    region: 'Sagres', 
    lat: 37.028, 
    lng: -8.958, 
    condition: 'Vento', 
    temp: '21°', 
    icon: '🌬️', 
    wind: '30km/h NW', 
    waves: '2.2m', 
    tide: 'Enchente' 
  },
  { 
    id: 'portimao', 
    name: 'Praia da Rocha', 
    region: 'Portimão', 
    lat: 37.116, 
    lng: -8.535, 
    condition: 'Limpo', 
    temp: '24°', 
    icon: '☀️', 
    wind: '8km/h S', 
    waves: '0.4m', 
    tide: 'Baixa-mar' 
  },
  { 
    id: 'faro', 
    name: 'Praia de Faro', 
    region: 'Faro', 
    lat: 36.99, 
    lng: -7.997, 
    condition: 'Limpo', 
    temp: '25°', 
    icon: '☀️', 
    wind: '9km/h SE', 
    waves: '0.3m', 
    tide: 'Enchente' 
  },
  { 
    id: 'tavira', 
    name: 'Praia de Tavira', 
    region: 'Tavira', 
    lat: 37.106, 
    lng: -7.65, 
    condition: 'Limpo', 
    temp: '26°', 
    icon: '☀️', 
    wind: '5km/h E', 
    waves: '0.2m', 
    tide: 'Preia-mar' 
  },

  // Ilhas
  { 
    id: 'madeira', 
    name: 'Porto Moniz', 
    region: 'Madeira', 
    lat: 32.867, 
    lng: -17.17, 
    condition: 'Nuvens', 
    temp: '22°', 
    icon: '⛅', 
    wind: '12km/h NE', 
    waves: '1.5m', 
    tide: 'Preia-mar' 
  },
  { 
    id: 'pdelgada', 
    name: 'Praia de Santa Bárbara', 
    region: 'São Miguel - Açores', 
    lat: 37.78, 
    lng: -25.476, 
    condition: 'Chuva', 
    temp: '19°', 
    icon: '🌧️', 
    wind: '25km/h SW', 
    waves: '3.0m', 
    tide: 'Enchente' 
  },
];

/**
 * Obter dados meteorológicos por ID de praia
 */
export const getBeachById = (id: string): BeachPoint | undefined => {
  return FORECAST_POINTS.find(point => point.id === id);
};

/**
 * Obter praias por região
 */
export const getBeachesByRegion = (region: string): BeachPoint[] => {
  return FORECAST_POINTS.filter(point => point.region === region);
};

/**
 * Obter praias com alertas ativos
 */
export const getBeachesWithAlerts = (): BeachPoint[] => {
  return FORECAST_POINTS.filter(point => point.alert !== undefined);
};

/**
 * Obter níveis de alerta
 */
export const getAlertColor = (level?: string): string => {
  switch (level) {
    case 'Vermelho': 
      return 'bg-red-600 text-white ring-red-400';
    case 'Laranja': 
      return 'bg-orange-500 text-white ring-orange-300';
    case 'Amarelo': 
      return 'bg-yellow-400 text-slate-900 ring-yellow-200';
    default: 
      return 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white ring-white/20';
  }
};
