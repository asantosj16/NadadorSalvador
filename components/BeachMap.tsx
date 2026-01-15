
import React, { useState } from 'react';

interface BeachPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  x: number; // SVG coordinate
  y: number; // SVG coordinate
}

const MAJOR_BEACHES: BeachPoint[] = [
  { id: 'matosinhos', name: 'Matosinhos', lat: 41.17, lng: -8.69, x: 42, y: 15 },
  { id: 'nazare', name: 'Nazaré', lat: 39.60, lng: -9.07, x: 35, y: 40 },
  { id: 'peniche', name: 'Peniche', lat: 39.35, lng: -9.38, x: 30, y: 45 },
  { id: 'cascais', name: 'Cascais', lat: 38.69, lng: -9.42, x: 28, y: 55 },
  { id: 'caparica', name: 'Costa da Caparica', lat: 38.64, lng: -9.23, x: 32, y: 58 },
  { id: 'sagres', name: 'Sagres', lat: 37.00, lng: -8.94, x: 36, y: 88 },
  { id: 'portimao', name: 'Portimão', lat: 37.12, lng: -8.53, x: 45, y: 86 },
  { id: 'faro', name: 'Faro', lat: 37.01, lng: -7.93, x: 60, y: 88 },
];

interface BeachMapProps {
  onSelectBeach: (name: string) => void;
  selectedBeach: string;
}

const BeachMap: React.FC<BeachMapProps> = ({ onSelectBeach, selectedBeach }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full bg-slate-100 dark:bg-slate-800/50 rounded-[2rem] p-6 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner h-[500px] flex items-center justify-center">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Centro de Comando</h3>
        <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Monitorização da Costa</p>
      </div>

      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-auto drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}
      >
        {/* Simplified Portugal Path */}
        <path 
          d="M45,2 L60,2 L62,10 L58,25 L65,40 L60,60 L55,75 L75,85 L80,95 L30,95 L25,85 L20,70 L25,50 L30,30 L38,10 Z" 
          fill="currentColor" 
          className="text-white dark:text-slate-900 stroke-slate-200 dark:stroke-slate-700 stroke-[0.5]"
        />
        
        {/* Ocean Background accent */}
        <circle cx="0" cy="50" r="40" className="text-blue-500/5 dark:text-blue-400/5" fill="currentColor" />

        {/* Markers */}
        {MAJOR_BEACHES.map((beach) => {
          const isSelected = selectedBeach.toLowerCase().includes(beach.name.toLowerCase());
          const isHovered = hovered === beach.id;

          return (
            <g 
              key={beach.id} 
              onMouseEnter={() => setHovered(beach.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelectBeach(beach.name)}
              className="cursor-pointer group"
            >
              {/* Outer Glow */}
              {(isSelected || isHovered) && (
                <circle 
                  cx={beach.x} 
                  cy={beach.y} 
                  r="4" 
                  className="fill-red-500/20 animate-pulse" 
                />
              )}
              
              {/* Point */}
              <circle 
                cx={beach.x} 
                cy={beach.y} 
                r={isSelected ? "1.5" : "1.2"} 
                className={`${isSelected ? 'fill-red-600' : 'fill-slate-400 dark:fill-slate-500 group-hover:fill-red-500'} transition-all duration-300`}
              />

              {/* Tooltip in SVG (only if hovered or selected) */}
              {(isHovered || isSelected) && (
                <g transform={`translate(${beach.x + 4}, ${beach.y - 2})`}>
                  <rect 
                    width="25" 
                    height="8" 
                    rx="1" 
                    className="fill-slate-900/90 dark:fill-white/90" 
                  />
                  <text 
                    x="2" 
                    y="5.5" 
                    className="fill-white dark:fill-slate-900 font-bold" 
                    style={{ fontSize: '3px' }}
                  >
                    {beach.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      <div className="absolute bottom-6 right-6 flex flex-col items-end space-y-2">
        <div className="flex items-center space-x-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
           <span className="w-2 h-2 bg-red-600 rounded-full"></span>
           <span className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-400 tracking-tighter">Selecionada</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
           <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
           <span className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-400 tracking-tighter">Posto Ativo</span>
        </div>
      </div>
    </div>
  );
};

export default BeachMap;
