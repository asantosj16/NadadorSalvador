
import React, { useState } from 'react';

interface BeachPoint {
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

const FORECAST_POINTS: BeachPoint[] = [
  // Norte
  { id: 'viana', name: 'Praia do Cabedelo', region: 'Viana do Castelo', x: 28, y: 8, condition: 'Limpo', temp: '19°', icon: '☀️', wind: '15km/h N', waves: '1.2m', tide: 'Baixa (14:30)' },
  { id: 'povoa', name: 'Praia da Póvoa', region: 'Póvoa de Varzim', x: 28, y: 15, condition: 'Nuvens', temp: '18°', icon: '⛅', wind: '18km/h NW', waves: '1.8m', tide: 'Enchente' },
  { id: 'porto', name: 'Praia de Matosinhos', region: 'Porto', x: 28, y: 22, condition: 'Nuvens', temp: '18°', icon: '⛅', alert: 'Amarelo', wind: '22km/h NW', waves: '2.5m', tide: 'Enchente' },
  { id: 'espinho', name: 'Praia da Baía', region: 'Espinho', x: 29, y: 28, condition: 'Limpo', temp: '20°', icon: '☀️', wind: '14km/h N', waves: '1.1m', tide: 'Baixa' },
  
  // Centro
  { id: 'aveiro', name: 'Praia da Barra', region: 'Aveiro', x: 30, y: 35, condition: 'Limpo', temp: '20°', icon: '☀️', wind: '12km/h NW', waves: '0.8m', tide: 'Preia-mar' },
  { id: 'figueira', name: 'Praia da Claridade', region: 'Figueira da Foz', x: 28, y: 42, condition: 'Nuvens', temp: '19°', icon: '⛅', wind: '20km/h N', waves: '2.0m', tide: 'Baixa' },
  { id: 'nazare', name: 'Praia da Nazaré', region: 'Nazaré', x: 26, y: 48, condition: 'Vento Forte', temp: '17°', icon: '🌬️', alert: 'Vermelho', wind: '45km/h W', waves: '7.5m', tide: 'Vazante' },
  { id: 'peniche', name: 'Praia de Supertubos', region: 'Peniche', x: 23, y: 55, condition: 'Limpo', temp: '19°', icon: '☀️', wind: '18km/h N', waves: '1.5m', tide: 'Baixa-mar' },
  
  // Lisboa e Setúbal
  { id: 'ericeira', name: 'Praia Ribeira d\'Ilhas', region: 'Ericeira', x: 24, y: 62, condition: 'Limpo', temp: '21°', icon: '☀️', wind: '15km/h N', waves: '1.8m', tide: 'Enchente' },
  { id: 'lisboa', name: 'Praia do Guincho', region: 'Cascais', x: 25, y: 68, condition: 'Limpo', temp: '22°', icon: '☀️', wind: '10km/h NW', waves: '0.5m', tide: 'Enchente' },
  { id: 'caparica', name: 'Praia da Caparica', region: 'Costa da Caparica', x: 27, y: 72, condition: 'Limpo', temp: '23°', icon: '☀️', wind: '12km/h W', waves: '0.6m', tide: 'Baixa' },
  { id: 'setubal', name: 'Praia dos Galapinhos', region: 'Setúbal', x: 32, y: 75, condition: 'Limpo', temp: '24°', icon: '☀️', wind: '5km/h S', waves: '0.2m', tide: 'Preia-mar' },
  
  // Alentejo
  { id: 'sines', name: 'Praia de São Torpes', region: 'Sines', x: 35, y: 80, condition: 'Nuvens', temp: '21°', icon: '⛅', wind: '14km/h W', waves: '1.1m', tide: 'Preia-mar' },
  { id: 'milfontes', name: 'Praia da Franquia', region: 'Vila Nova de Milfontes', x: 38, y: 85, condition: 'Limpo', temp: '22°', icon: '☀️', wind: '10km/h NW', waves: '0.8m', tide: 'Baixa' },
  
  // Algarve
  { id: 'sagres', name: 'Praia do Beliche', region: 'Sagres', x: 45, y: 92, condition: 'Vento', temp: '21°', icon: '🌬️', wind: '30km/h NW', waves: '2.2m', tide: 'Enchente' },
  { id: 'portimao', name: 'Praia da Rocha', region: 'Portimão', x: 55, y: 92, condition: 'Limpo', temp: '24°', icon: '☀️', wind: '8km/h S', waves: '0.4m', tide: 'Baixa-mar' },
  { id: 'faro', name: 'Praia de Faro', region: 'Faro', x: 75, y: 92, condition: 'Limpo', temp: '25°', icon: '☀️', wind: '9km/h SE', waves: '0.3m', tide: 'Enchente' },
  { id: 'tavira', name: 'Praia de Tavira', region: 'Tavira', x: 88, y: 92, condition: 'Limpo', temp: '26°', icon: '☀️', wind: '5km/h E', waves: '0.2m', tide: 'Preia-mar' },

  // Ilhas
  { id: 'madeira', name: 'Porto Moniz', region: 'Madeira', x: 75, y: 15, condition: 'Nuvens', temp: '22°', icon: '⛅', wind: '12km/h NE', waves: '1.5m', tide: 'Preia-mar' },
  { id: 'pdelgada', name: 'Praia de Santa Bárbara', region: 'São Miguel - Açores', x: 75, y: 40, condition: 'Chuva', temp: '19°', icon: '🌧️', wind: '25km/h SW', waves: '3.0m', tide: 'Enchente' },
];

interface BeachMapProps {
  onSelectBeach?: (beach: BeachPoint) => void;
}

const BeachMap: React.FC<BeachMapProps> = ({ onSelectBeach }) => {
  const [activePoint, setActivePoint] = useState<BeachPoint | null>(FORECAST_POINTS.find(p => p.id === 'nazare') || null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getAlertColor = (level?: string) => {
    switch (level) {
      case 'Vermelho': return 'bg-red-600 text-white ring-red-400';
      case 'Laranja': return 'bg-orange-500 text-white ring-orange-300';
      case 'Amarelo': return 'bg-yellow-400 text-slate-900 ring-yellow-200';
      default: return 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white ring-white/20';
    }
  };

  const handlePointClick = (point: BeachPoint) => {
    setActivePoint(point);
    if (onSelectBeach) {
      onSelectBeach(point);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] border border-slate-200 dark:border-slate-800 p-4 md:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8">
        
        <div className="absolute top-8 left-10 hidden md:block z-10">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Vigilância Nacional</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mt-1">
            {hoveredRegion || activePoint?.region || "Portugal Continental e Ilhas"}
          </h3>
        </div>

        {/* Map Area */}
        <div className="relative w-full md:w-2/3 aspect-[4/5] bg-slate-50 dark:bg-slate-950/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-inner flex items-center justify-center p-4">
          
          <svg className="h-[90%] w-auto opacity-10 dark:opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Portugal Mainland */}
            <path 
              d="M30,5 L45,5 L48,12 L42,25 L48,40 L38,50 L42,70 L48,95 L85,95 L90,90 L65,85 L50,80 L40,60 L30,30 L30,5 Z" 
              fill="currentColor" 
              className="text-slate-400 dark:text-white"
            />
            {/* Islands Boxes */}
            <rect x="70" y="10" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" />
            <text x="71" y="24" fontSize="3" className="fill-current text-slate-400">MADEIRA</text>
            <rect x="70" y="35" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" />
            <text x="71" y="49" fontSize="3" className="fill-current text-slate-400">AÇORES</text>
          </svg>

          <div className="absolute inset-0 pointer-events-none grid grid-cols-6 grid-rows-8 opacity-[0.03] dark:opacity-[0.05]">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-slate-900 dark:border-white"></div>
            ))}
          </div>

          {/* Markers */}
          {FORECAST_POINTS.map((point) => (
            <div 
              key={point.id}
              className="absolute z-20 flex flex-col items-center group"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              onMouseEnter={() => setHoveredRegion(point.region)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              <button 
                onClick={() => handlePointClick(point)}
                className={`
                  relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2
                  w-8 h-8 md:w-10 md:h-10 rounded-xl shadow-lg border border-white dark:border-slate-700
                  transition-all duration-300 active:scale-90 touch-manipulation
                  ${getAlertColor(point.alert)}
                  ${activePoint?.id === point.id ? 'ring-4 ring-red-500/20 scale-125 z-30' : 'hover:scale-110'}
                `}
              >
                <span className="text-base md:text-xl">{point.icon}</span>
                {point.alert && (
                  <span className="absolute -inset-1 rounded-xl border border-current opacity-40 animate-ping pointer-events-none"></span>
                )}
              </button>
              
              {/* Beach Name Label */}
              <div className={`
                absolute top-full left-1/2 -translate-x-1/2 mt-1.5 pointer-events-none transition-all duration-300
                ${activePoint?.id === point.id ? 'opacity-100 scale-110 z-30' : 'opacity-60 group-hover:opacity-100'}
              `}>
                <span className={`
                  whitespace-nowrap text-[6px] md:text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded-md shadow-sm border
                  ${activePoint?.id === point.id 
                    ? 'bg-red-600 text-white border-red-400' 
                    : 'bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700'}
                `}>
                  {point.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Info Panel */}
        <div className={`
          flex-1 flex flex-col justify-center space-y-6 transition-all duration-500
          ${activePoint ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4 pointer-events-none blur-[2px]'}
        `}>
          {activePoint ? (
            <div className="animate-slide-up space-y-6">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] font-black text-red-600 dark:text-red-500 uppercase tracking-[0.3em]">Status Tempo Real</span>
                <h4 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tighter leading-none">{activePoint.name}</h4>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{activePoint.region}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Temperatura', val: activePoint.temp, icon: '🌡️', color: 'bg-orange-50 text-orange-600' },
                  { label: 'Ondulação', val: activePoint.waves, icon: '🌊', color: 'bg-blue-50 text-blue-600' },
                  { label: 'Vento', val: activePoint.wind, icon: '💨', color: 'bg-slate-100 text-slate-700' },
                  { label: 'Maré', val: activePoint.tide, icon: '⏳', color: 'bg-indigo-50 text-indigo-600' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-[1.5rem] bg-white dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-800 shadow-sm">
                    <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center text-lg mb-3`}>{stat.icon}</div>
                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</div>
                    <div className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">{stat.val}</div>
                  </div>
                ))}
              </div>

              {activePoint.alert && (
                <div className={`p-5 rounded-[1.8rem] border-2 flex items-center space-x-4 animate-pulse-slow ${
                  activePoint.alert === 'Vermelho' ? 'bg-red-600 border-red-400 text-white' : 
                  activePoint.alert === 'Laranja' ? 'bg-orange-500 border-orange-300 text-white' : 
                  'bg-yellow-400 border-yellow-200 text-slate-900'
                }`}>
                  <span className="text-3xl">⚠️</span>
                  <div>
                    <h5 className="font-black uppercase text-[10px] tracking-widest leading-none mb-1">Aviso {activePoint.alert}</h5>
                    <p className="text-xs font-bold leading-tight opacity-90">Condições severas detetadas. Vigilância Nível 3 obrigatória.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block animate-bounce-slow">🛰️</span>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Selecione uma praia no mapa para monitorização</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeachMap;
