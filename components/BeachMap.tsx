
import React, { useState, useEffect, useMemo } from 'react';

interface BeachCustomization {
  isFavorite: boolean;
  color: string;
  icon: 'dot' | 'lifebuoy' | 'flag' | 'star' | 'binoculars' | 'radio';
}

interface BeachPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  x: number; // SVG coordinate (0-100)
  y: number; // SVG coordinate (0-100)
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

const ICONS = [
  { id: 'dot', label: 'Ponto', char: '●' },
  { id: 'lifebuoy', label: 'Bóia', char: '🛟' },
  { id: 'flag', label: 'Alerta', char: '🚩' },
  { id: 'star', label: 'Estrela', char: '⭐' },
  { id: 'binoculars', label: 'Vigilância', char: '🧐' },
  { id: 'radio', label: 'Comunicações', char: '📻' },
];

interface Hazard {
  icon: string;
  msg: string;
  level: 'moderate' | 'high' | 'extreme';
  type: 'wind' | 'wave' | 'storm' | 'uv';
}

interface BeachMapProps {
  onSelectBeach: (name: string) => void;
  selectedBeach: string;
  currentConditions?: {
    airTemp: string;
    waterTemp: string;
    waves: string;
    windSpeed: string;
    windDir: string;
    uvIndex: string;
    condition: string;
  };
}

const BeachMap: React.FC<BeachMapProps> = ({ onSelectBeach, selectedBeach, currentConditions }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [customizations, setCustomizations] = useState<Record<string, BeachCustomization>>({});

  const hazards = useMemo(() => {
    if (!currentConditions) return [];
    
    const h: Hazard[] = [];
    const windVal = parseFloat(currentConditions.windSpeed) || 0;
    const waveVal = parseFloat(currentConditions.waves) || 0;
    const condition = currentConditions.condition.toLowerCase();
    const uv = currentConditions.uvIndex?.toLowerCase();

    if (windVal > 45) h.push({ icon: '🌪️', msg: 'Vento Extremo', level: 'extreme', type: 'wind' });
    else if (windVal > 25) h.push({ icon: '💨', msg: 'Vento Forte', level: 'high', type: 'wind' });

    if (waveVal > 4.0) h.push({ icon: '🌊', msg: 'Ondulação Crítica', level: 'extreme', type: 'wave' });
    else if (waveVal > 2.0) h.push({ icon: '🌊', msg: 'Ondulação Forte', level: 'high', type: 'wave' });

    if (condition.includes('trovoada') || condition.includes('raios')) 
      h.push({ icon: '⚡', msg: 'Risco de Raios', level: 'extreme', type: 'storm' });
    else if (condition.includes('tempestade') || condition.includes('chuva forte'))
      h.push({ icon: '⛈️', msg: 'Tempestade', level: 'high', type: 'storm' });

    if (uv.includes('extremo')) h.push({ icon: '☀️', msg: 'UV Extremo', level: 'extreme', type: 'uv' });
    else if (uv.includes('muito alto') || uv.includes('alto')) h.push({ icon: '☀️', msg: 'UV Elevado', level: 'high', type: 'uv' });

    return h;
  }, [currentConditions]);

  const hasExtremeHazard = hazards.length > 0 && hazards.some(h => h.level === 'extreme');

  useEffect(() => {
    const saved = localStorage.getItem('lifeguard_beach_customs');
    if (saved) {
      try { setCustomizations(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveCustomizations = (newCustoms: Record<string, BeachCustomization>) => {
    setCustomizations(newCustoms);
    localStorage.setItem('lifeguard_beach_customs', JSON.stringify(newCustoms));
  };

  const currentBeachId = MAJOR_BEACHES.find(b => selectedBeach.toLowerCase().includes(b.name.toLowerCase()))?.id;

  const toggleFavorite = (id: string) => {
    const beach = customizations[id] || { isFavorite: false, color: '#dc2626', icon: 'dot' };
    saveCustomizations({ ...customizations, [id]: { ...beach, isFavorite: !beach.isFavorite } });
  };

  const updateCustom = (id: string, key: keyof BeachCustomization, value: any) => {
    const beach = customizations[id] || { isFavorite: false, color: '#dc2626', icon: 'dot' };
    saveCustomizations({ ...customizations, [id]: { ...beach, [key]: value } });
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Alerta de Condições */}
      {hazards.length > 0 && (
        <div className={`
          relative overflow-hidden flex items-center justify-between p-5 md:p-6 rounded-[2rem] border-2 shadow-2xl animate-slide-up
          ${hasExtremeHazard ? 'bg-red-600 border-red-400 text-white shadow-red-500/20' : 'bg-orange-500 border-orange-300 text-white shadow-orange-500/20'}
        `}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-[pulse_3s_infinite] pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center space-x-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl md:text-4xl animate-bounce shadow-inner shrink-0 border border-white/20">
              {hasExtremeHazard ? '🚨' : '⚠️'}
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="bg-white text-black text-[8px] md:text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  {hasExtremeHazard ? 'Crítico' : 'Aviso'}
                </span>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-80 truncate">
                  Posto: {selectedBeach.split(',')[0]}
                </span>
              </div>
              <h5 className="font-black text-lg md:text-2xl tracking-tight leading-none mb-0.5 truncate">
                {hasExtremeHazard ? 'RISCO EXTREMO' : 'VIGILÂNCIA REFORÇADA'}
              </h5>
              <p className="text-[10px] md:text-sm font-medium opacity-95 line-clamp-1">
                {hazards[0].msg} - {hasExtremeHazard ? 'Perigo para a vida.' : 'Cuidado redobrado.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SVG Map Container */}
      <div className={`
        relative w-full rounded-[2.5rem] border overflow-hidden shadow-[inset_0_2px_15px_rgba(0,0,0,0.05)] h-[420px] md:h-[580px] flex items-center justify-center transition-all duration-700
        ${hasExtremeHazard ? 'bg-red-50/40 dark:bg-red-950/20 border-red-300 dark:border-red-900/50' : 'bg-[#f0f9ff] dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'}
      `}>
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#334155 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid meet" 
          className="h-full w-full max-w-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)] select-none"
        >
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="0.4" />
              <feOffset dx="0" dy="0.2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Ocean Background Area */}
          <path 
            d="M35,0 L0,0 L0,100 L60,100 Q45,50 35,0" 
            className="fill-[url(#oceanGrad)] transition-colors duration-700"
          />
          
          {/* Portugal Shoreline Simplified */}
          <path 
            d="M45,2 L62,2 L64,12 L60,28 L68,42 L62,65 L58,78 L78,88 L82,98 L28,98 L22,88 L18,72 L22,52 L28,32 L38,12 Z" 
            className="fill-white dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-700 stroke-[0.3] transition-colors duration-500"
          />

          {MAJOR_BEACHES.map((beach) => {
            const isSelected = selectedBeach.toLowerCase().includes(beach.name.toLowerCase());
            const isHovered = hovered === beach.id;
            const custom = customizations[beach.id];
            const isFav = custom?.isFavorite;
            
            // Aesthetic palette refinement
            const markerColor = isSelected 
              ? (hasExtremeHazard ? '#dc2626' : '#f97316') 
              : (isFav ? '#fbbf24' : '#64748b');
            
            const showTooltip = isHovered || isSelected;
            const scale = isHovered ? 1.4 : isSelected ? 1.25 : 1;

            return (
              <g 
                key={beach.id} 
                onMouseEnter={() => setHovered(beach.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelectBeach(beach.name)}
                className="cursor-pointer group"
                style={{ transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                {/* Hitbox - Optimized for touch devices */}
                <circle cx={beach.x} cy={beach.y} r="7" fill="transparent" />

                {/* Outer Ring / Pulse */}
                {(isSelected || isHovered) && (
                  <circle 
                    cx={beach.x} 
                    cy={beach.y} 
                    r={isSelected ? "5" : "4"} 
                    fill="none"
                    stroke={markerColor}
                    strokeWidth="0.4"
                    strokeOpacity={isHovered ? "0.6" : "0.3"}
                    className={isSelected ? "animate-ping" : ""}
                    style={{ transformOrigin: `${beach.x}px ${beach.y}px`, transition: 'r 0.3s ease' }}
                  />
                )}

                {/* Marker Shadow */}
                <circle 
                  cx={beach.x} 
                  cy={beach.y + 0.3} 
                  r={2 * scale} 
                  fill="rgba(0,0,0,0.1)" 
                  style={{ transition: 'r 0.3s ease' }}
                />
                
                {/* Marker Main Body */}
                <g transform={`scale(${scale})`} style={{ transformOrigin: `${beach.x}px ${beach.y}px`, transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                  <circle 
                    cx={beach.x} 
                    cy={beach.y} 
                    r="2.2" 
                    fill="white"
                    stroke={markerColor}
                    strokeWidth="0.8"
                    filter="url(#shadow)"
                  />
                  <circle 
                    cx={beach.x} 
                    cy={beach.y} 
                    r="0.8" 
                    fill={markerColor}
                  />
                </g>

                {/* Mini Favorite Indicator */}
                {isFav && !isSelected && !isHovered && (
                  <text 
                    x={beach.x + 1.2} 
                    y={beach.y - 1.2} 
                    className="fill-yellow-500 font-black animate-pulse" 
                    style={{ fontSize: '3.5px' }}
                  >
                    ★
                  </text>
                )}

                {/* Tooltip Label */}
                {showTooltip && (
                  <g 
                    transform={`translate(${beach.x}, ${beach.y - 5.5})`} 
                    className="animate-zoom-in"
                  >
                    <rect 
                      x="-18" 
                      y="-7" 
                      width="36" 
                      height="8.5" 
                      rx="2.5" 
                      className={`${isSelected && hasExtremeHazard ? 'fill-red-600' : 'fill-slate-900/95 dark:fill-white'} shadow-2xl`} 
                    />
                    {/* Tooltip Tail */}
                    <path d="M-2,1.5 L0,3.5 L2,1.5 Z" className={`${isSelected && hasExtremeHazard ? 'fill-red-600' : 'fill-slate-900/95 dark:fill-white'}`} />
                    
                    <text 
                      x="0" 
                      y="-1.5" 
                      textAnchor="middle"
                      className={`${isSelected && hasExtremeHazard ? 'fill-white' : 'fill-white dark:fill-slate-900'} font-black uppercase tracking-widest`} 
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

        {/* Legend - Optimized for Mobile visibility */}
        <div className="absolute bottom-5 left-5 p-3 md:p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/20 text-[8px] md:text-[10px] font-black uppercase tracking-widest space-y-2 shadow-xl hidden sm:block">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white border-2 border-orange-500"></span>
            <span className="text-slate-600 dark:text-slate-400">Posto Ativo</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white border-2 border-red-600"></span>
            <span className="text-slate-600 dark:text-slate-400">Alerta Crítico</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white border-2 border-yellow-400"></span>
            <span className="text-slate-600 dark:text-slate-400">Favorita</span>
          </div>
        </div>
      </div>

      {/* Selected Beach Card - Refined aesthetic */}
      {currentBeachId && (
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 border border-slate-100 dark:border-slate-800 shadow-2xl animate-slide-up relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform">
             <span className="text-9xl">⚓</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="w-full text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                 <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.2em]">Coordenadas de Turno</span>
                 {customizations[currentBeachId]?.isFavorite && (
                   <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-2 py-0.5 rounded-full text-[9px] font-black border border-yellow-200 dark:border-yellow-800 animate-pulse">⭐ FAVORITA</span>
                 )}
              </div>
              <h4 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter flex items-center justify-center md:justify-start gap-3">
                {MAJOR_BEACHES.find(b => b.id === currentBeachId)?.name}
                {hasExtremeHazard && <span className="text-2xl animate-pulse">🚩</span>}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-bold text-sm tracking-wide">Monitorização técnica em curso.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => toggleFavorite(currentBeachId)}
                className={`py-3.5 px-6 rounded-2xl font-black text-xs transition-all flex items-center space-x-2 shadow-lg active:scale-95
                  ${customizations[currentBeachId]?.isFavorite ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                <span>{customizations[currentBeachId]?.isFavorite ? '★ NAS FAVORITAS' : '☆ MARCAR FAVORITA'}</span>
              </button>
              
              <div className="flex bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-md">
                {ICONS.slice(1, 4).map(i => (
                  <button
                    key={i.id}
                    onClick={() => updateCustom(currentBeachId, 'icon', i.id as any)}
                    title={i.label}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${customizations[currentBeachId]?.icon === i.id ? 'bg-white dark:bg-slate-700 shadow-md text-red-600 ring-2 ring-red-500/10' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <span className="text-2xl">{i.char}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeachMap;
