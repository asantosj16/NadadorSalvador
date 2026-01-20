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
    <div className="h-full animate-fade-in">
      <div className="relative h-full w-full aspect-[4/5] bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-50 dark:from-blue-950 dark:via-slate-900 dark:to-blue-950 rounded-[2rem] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xl flex items-center justify-center p-4">
        
        <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
            <span className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-400">Vigilância</span>
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-slate-100 tracking-tighter mt-0.5">
            {hoveredRegion || activePoint?.region || "Portugal"}
          </h3>
        </div>
        
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
              absolute top-1/2 right-full -translate-y-1/2 mr-3 pointer-events-none transition-all duration-300
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
    </div>
  );
};

export default BeachMap;
