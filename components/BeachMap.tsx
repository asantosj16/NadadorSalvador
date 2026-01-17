import React, { useState } from 'react';
import { BeachPoint, FORECAST_POINTS, getAlertColor } from '../data/weatherData';

interface BeachMapProps {
  onSelectBeach?: (beach: BeachPoint) => void;
}

const BeachMap: React.FC<BeachMapProps> = ({ onSelectBeach }) => {
  const [activePoint, setActivePoint] = useState<BeachPoint | null>(FORECAST_POINTS.find(p => p.id === 'nazare') || null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const handlePointClick = (point: BeachPoint) => {
    setActivePoint(point);
    if (onSelectBeach) {
      onSelectBeach(point);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] border border-slate-200 dark:border-slate-800 p-4 md:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8">
        
        <div className="absolute top-4 left-6 hidden md:block z-10">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 rounded-full bg-red-600 animate-pulse"></div>
            <span className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-400">Vigilância</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mt-0.5">
            {hoveredRegion || activePoint?.region || "Portugal"}
          </h3>
        </div>

        {/* Map Area - Google Maps Style */}
        <div className="relative w-full md:w-3/4 aspect-[3/4] bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-50 dark:from-blue-950 dark:via-slate-900 dark:to-blue-950 rounded-[2rem] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xl flex items-center justify-center p-4">
          
          {/* Water effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-200/10 to-blue-300/20 dark:from-transparent dark:via-blue-900/20 dark:to-blue-800/30 pointer-events-none"></div>
          
          <svg className="h-[90%] w-auto opacity-90 dark:opacity-80 pointer-events-none drop-shadow-lg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Portugal Mainland - com sombra */}
            <path 
              d="M30,5 L45,5 L48,12 L42,25 L48,40 L38,50 L42,70 L48,95 L85,95 L90,90 L65,85 L50,80 L40,60 L30,30 L30,5 Z" 
              fill="#f8f9fa" 
              className="dark:fill-slate-700"
              stroke="#cbd5e1"
              strokeWidth="0.3"
            />
            {/* Sombra suave do continente */}
            <path 
              d="M30,5 L45,5 L48,12 L42,25 L48,40 L38,50 L42,70 L48,95 L85,95 L90,90 L65,85 L50,80 L40,60 L30,30 L30,5 Z" 
              fill="none" 
              stroke="#94a3b8"
              strokeWidth="0.5"
              className="dark:stroke-slate-600"
            />
            {/* Islands Boxes - Google Maps Style */}
            <rect x="70" y="10" width="15" height="15" fill="#f8f9fa" className="dark:fill-slate-700" stroke="#cbd5e1" strokeWidth="0.4" />
            <text x="71" y="24" fontSize="3" fill="#64748b" fontWeight="bold" className="dark:fill-slate-400">MADEIRA</text>
            <rect x="70" y="35" width="15" height="15" fill="#f8f9fa" className="dark:fill-slate-700" stroke="#cbd5e1" strokeWidth="0.4" />
            <text x="71" y="49" fontSize="3" fill="#64748b" fontWeight="bold" className="dark:fill-slate-400">AÇORES</text>
          </svg>

          {/* Grid overlay sutil - estilo Google Maps */}
          <div className="absolute inset-0 pointer-events-none grid grid-cols-6 grid-rows-8 opacity-[0.06] dark:opacity-[0.08]">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border-[0.3px] border-blue-300 dark:border-blue-700"></div>
            ))}
          </div>
          
          {/* Compass indicator - Google Maps style */}
          <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center text-xs font-black text-slate-600 dark:text-slate-300">
            <span className="transform -rotate-45">N</span>
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
                  w-9 h-9 md:w-11 md:h-11 rounded-full shadow-2xl border-2 border-white dark:border-slate-900
                  transition-all duration-300 active:scale-90 touch-manipulation
                  ${getAlertColor(point.alert)}
                  ${activePoint?.id === point.id ? 'ring-4 ring-blue-500/40 scale-125 z-30 shadow-xl' : 'hover:scale-110 hover:shadow-2xl'}
                `}
                style={{
                  boxShadow: activePoint?.id === point.id 
                    ? '0 10px 40px rgba(0,0,0,0.3), 0 0 0 4px rgba(59, 130, 246, 0.2)'
                    : '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                <span className="text-base md:text-xl drop-shadow">{point.icon}</span>
                {point.alert && (
                  <span className="absolute -inset-1.5 rounded-full border-2 border-current opacity-60 animate-ping pointer-events-none"></span>
                )}
              </button>
              
              {/* Beach Name Label - Google Maps style */}
              <div className={`
                absolute top-full left-1/2 -translate-x-1/2 mt-2 pointer-events-none transition-all duration-300
                ${activePoint?.id === point.id ? 'opacity-100 scale-110 z-30' : 'opacity-70 group-hover:opacity-100'}
              `}>
                <span className={`
                  whitespace-nowrap text-[7px] md:text-[9px] font-bold tracking-tight px-2 py-1 rounded-lg shadow-lg
                  ${activePoint?.id === point.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100'}
                `}
                style={{
                  boxShadow: activePoint?.id === point.id 
                    ? '0 4px 12px rgba(37, 99, 235, 0.4)'
                    : '0 2px 8px rgba(0,0,0,0.15)'
                }}>
                  {point.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Info Panel - Compacto */}
        <div className={`
          flex-1 flex flex-col justify-center space-y-3 transition-all duration-500
          ${activePoint ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4 pointer-events-none blur-[2px]'}
        `}>
          {activePoint ? (
            <div className="animate-slide-up space-y-3">
              <div className="space-y-0.5 text-center md:text-left">
                <span className="text-[8px] font-black text-red-600 dark:text-red-500 uppercase tracking-wider">Status</span>
                <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tighter leading-none">{activePoint.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{activePoint.region}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Temp', val: activePoint.temp, icon: '🌡️', color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' },
                  { label: 'Ondas', val: activePoint.waves, icon: '🌊', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
                  { label: 'Vento', val: activePoint.wind, icon: '💨', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
                  { label: 'Maré', val: activePoint.tide, icon: '⏳', color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' },
                ].map((stat, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className={`w-6 h-6 rounded-lg ${stat.color} flex items-center justify-center text-sm mb-1.5`}>{stat.icon}</div>
                    <div className="text-[7px] font-black text-slate-400 uppercase tracking-wider mb-0.5">{stat.label}</div>
                    <div className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">{stat.val}</div>
                  </div>
                ))}
              </div>

              {activePoint.alert && (
                <div className={`p-3 rounded-xl border flex items-center space-x-2 animate-pulse-slow ${
                  activePoint.alert === 'Vermelho' ? 'bg-red-600 border-red-400 text-white' : 
                  activePoint.alert === 'Laranja' ? 'bg-orange-500 border-orange-300 text-white' : 
                  'bg-yellow-400 border-yellow-200 text-slate-900'
                }`}>
                  <span className="text-xl">⚠️</span>
                  <div>
                    <h5 className="font-black uppercase text-[8px] tracking-wider leading-none mb-0.5">Aviso {activePoint.alert}</h5>
                    <p className="text-[9px] font-bold leading-tight opacity-90">Condições severas. Vigilância Nv.3</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-4xl mb-2 block animate-bounce-slow">🛰️</span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Selecione uma praia</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeachMap;
