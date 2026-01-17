/**
 * Dados Meteorológicos das Praias de Portugal
 * Centralização de todas as informações de clima, ondas, vento e marés
 */

export interface BeachPoint {
  id: string;
  name: string;
  region: string;
  x: number;
  y: number;
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
    x: 28, 
    y: 8, 
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
    x: 28, 
    y: 15, 
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
    x: 28, 
    y: 22, 
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
    x: 29, 
    y: 28, 
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
    x: 30, 
    y: 35, 
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
    x: 28, 
    y: 42, 
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
    x: 26, 
    y: 48, 
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
    x: 23, 
    y: 55, 
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
    x: 24, 
    y: 62, 
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
    x: 25, 
    y: 68, 
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
    x: 27, 
    y: 72, 
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
    x: 32, 
    y: 75, 
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
    x: 35, 
    y: 80, 
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
    x: 38, 
    y: 85, 
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
    x: 45, 
    y: 92, 
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
    x: 55, 
    y: 92, 
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
    x: 75, 
    y: 92, 
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
    x: 88, 
    y: 92, 
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
    x: 75, 
    y: 15, 
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
    x: 75, 
    y: 40, 
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
