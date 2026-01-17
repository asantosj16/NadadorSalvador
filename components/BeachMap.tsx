
import React, { useState, useEffect } from 'react';

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
  { id: 'viana', name: 'Praia do Cabedelo', region: 'Norte', x: 28, y: 12, condition: 'Limpo', temp: '19°', icon: '☀️', wind: '15km/h N', waves: '1.2m', tide: 'Baixa (14:30)' },
  { id: 'porto', name: 'Matosinhos', region: 'Porto', x: 28, y: 22, condition: 'Nuvens', temp: '18°', icon: '⛅', alert: 'Amarelo', wind: '22km/h NW', waves: '2.5m', tide: 'Enchente' },
  { id: 'aveiro', name: 'Praia da Barra', region: 'Centro', x: 30, y: 35, condition: 'Limpo', temp: '20°', icon: '☀️', wind: '12km/h NW', waves: '0.8m', tide: 'Preia-mar' },
  { id: 'nazare', name: 'Praia do Norte', region: 'Oeste', x: 26, y: 48, condition: 'Vento Forte', temp: '17°', icon: '🌬️', alert: 'Vermelho', wind: '45km/h W', waves: '7.5m', tide: 'Vazante' },
  { id: 'peniche', name: 'Supertubos', region: 'Oeste', x: 23, y: 55, condition: 'Limpo', temp: '19°', icon: '☀️', wind: '18km/h N', waves: '1.5m', tide: 'Baixa-mar' },
  { id: 'lisboa', name: 'Guincho', region: 'Lisboa', x: 25, y: 68, condition: 'Limpo', temp: '22°', icon: '☀️', wind: '10km/h NW', waves: '0.5m', tide: 'Enchente' },
  { id: 'sines', name: 'Praia de S. Torpes', region: 'Alentejo', x: 35, y: 80, condition: 'Nuvens', temp: '21°', icon: '⛅', wind: '14km/h W', waves: '1.1m', tide: 'Preia-mar' },
  { id: 'portimao', name: 'Praia da Rocha', region: 'Algarve', x: 55, y: 92, condition: 'Limpo', temp: '24°', icon: '☀️', wind: '8km/h S', waves: '0.4m', tide: 'Baixa-mar' },
  { id: 'faro', name: 'Ilha de Faro', region: 'Algarve', x: 75, y: 92, condition: 'Limpo', temp: '25°', icon: '☀️', wind: '9km/h SE', waves: '0.3m', tide: 'Enchente' },
];

const BeachMap: React.FC = () => {
  const [activePoint, setActivePoint] = useState<BeachPoint | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getAlertColor = (level?: string) => {
    switch (level) {
      case 'Vermelho': return 'bg-red-600 text-white ring-red-400';
      case 'Laranja': return 'bg-orange-500 text-white ring-orange-300';
      case 'Amarelo': return 'bg-yellow-400 text-slate-900 ring-yellow-200';
      default: return 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white ring-white/20';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Interactive Map Container */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] border border-slate-200 dark:border-slate-800 p-4 md:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8">
        
        {/* Region Indicator - Desktop Only */}
        <div className="absolute top-8 left-10 hidden md:block">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Vigilância Regional Ativa</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mt-1">
            {hoveredRegion || activePoint?.region || "Costa Portuguesa"}
          </h3>
        </div>

        {/* Map Area */}
        <div className="relative w-full md:w-2/3 aspect-[4/5] bg-slate-50 dark:bg-slate-950/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-inner flex items-center justify-center p-4">
          
          {/* Detailed SVG Path for Interaction */}
          <svg className="h-full w-auto opacity-10 dark:opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <path 
              d="M30,5 L45,5 L48,12 L42,25 L48,40 L38,50 L42,70 L48,95 L85,95 L90,90 L65,85 L50,80 L40,60 L30,30 L30,5 Z" 
              fill="currentColor" 
              className="text-slate-400 dark:text-white"
            />
          </svg>

          {/* Grid Lines for technical look */}
          <div className="absolute inset-0 pointer-events-none grid grid-cols-6 grid-rows-8 opacity-[0.03] dark:opacity-[0.05]">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-slate-900 dark:border-white"></div>
            ))}
          </div>

          {/* Markers */}
          {FORECAST_POINTS.map((point) => (
            <div 
              key={point.id}
              className="absolute z-20"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              onMouseEnter={() => setHoveredRegion(point.region)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              <button 
                onClick={() => setActivePoint(activePoint?.id === point.id ? null : point)}
                className={`
                  group relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2
                  w-10 h-10 md:w-12 md:h-12 rounded-2xl shadow-lg border-2 border-white dark:border-slate-700
                  transition-all duration-300 active:scale-90 touch-manipulation
                  ${getAlertColor(point.alert)}
                  ${activePoint?.id === point.id ? 'ring-8 ring-red-500/20 scale-110 z-30' : 'hover:scale-110'}
                `}
              >
                <span className="text-xl md:text-2xl">{point.icon}</span>
                
                {/* Alert Pulse Effect */}
                {point.alert && (
                  <span className="absolute -inset-1 rounded-2xl border-2 border-current opacity-40 animate-ping pointer-events-none"></span>
                )}
                
                {/* Visual Connector Line - Hidden on Mobile */}
                {activePoint?.id === point.id && (
                  <div className="hidden md:block absolute left-1/2 top-1/2 w-[300px] h-px bg-gradient-to-r from-red-500 to-transparent origin-left rotate-[15deg] pointer-events-none -z-10 opacity-30"></div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar Info Panel / Drawer on Mobile */}
        <div className={`
          flex-1 flex flex-col justify-center space-y-6 transition-all duration-500
          ${activePoint ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4 pointer-events-none blur-[2px]'}
        `}>
          {activePoint ? (
            <div className="animate-slide-up space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-red-600 dark:text-red-500 uppercase tracking-[0.3em]">Status Tempo Real</span>
                <h4 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tighter leading-none">{activePoint.name}</h4>
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

      {/* Extreme Alert Banner - Fixed high visibility UI */}
      <div className="relative group overflow-hidden bg-red-600 dark:bg-red-700 rounded-[2.5rem] p-6 shadow-2xl shadow-red-500/20 border-4 border-white/20">
        <div className="absolute top-0 left-0 w-2 h-full bg-white/20 animate-pulse"></div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl md:text-5xl animate-pulse">⚡</div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white text-red-600 rounded-full flex items-center justify-center font-black text-xs">!</div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
              <span className="bg-white text-red-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">ALERTA EXTREMO</span>
              <span className="bg-black/20 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">DISTRITO: LEIRIA</span>
            </div>
            <h4 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-none mb-2">AGITAÇÃO MARÍTIMA SEVERA</h4>
            <p className="text-white/90 font-bold text-xs md:text-sm max-w-2xl">Vagas de 7 metros detetadas em Nazaré. Proibida a entrada de banhistas e embarcações de pesca no canal. Ativar plano de contingência regional.</p>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center px-6 border-l border-white/10">
            <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Ref: IPMA-V3-2026</span>
            <span className="text-xl font-black text-white">LIVE 🔴</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeachMap;
