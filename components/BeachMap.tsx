
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
          relative overflow-hidden flex items-center justify-between p-6 rounded-[2.5rem] border-2 shadow-2xl animate-slide-up
          ${hasExtremeHazard ? 'bg-red-600 border-red-400 text-white shadow-red-500/20' : 'bg-orange-500 border-orange-300 text-white shadow-orange-500/20'}
        `}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-[pulse_3s_infinite] pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center space-x-4 md:space-x-6">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl md:text-4xl animate-bounce shadow-inner shrink-0 border border-white/30">
              {hasExtremeHazard ? '🚨' : '⚠️'}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="bg-white text-black text-[8px] md:text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  {hasExtremeHazard ? 'Crítico' : 'Aviso'}
                </span>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-80 truncate max-w-[120px]">
                  Posto: {selectedBeach.split(',')[0]}
                </span>
              </div>
              <h5 className="font-black text-xl md:text-2xl tracking-tight leading-none mb-0.5">
                {hasExtremeHazard ? 'RISCO EXTREMO' : 'VIGILÂNCIA REFORÇADA'}
              </h5>
              <p className="text-xs md:text-sm font-medium opacity-95 line-clamp-1">
                {hazards[0].msg} - {hasExtremeHazard ? 'Risco elevado para a vida.' : 'Cuidado redobrado.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SVG Map Container */}
      <div className={`
        relative w-full rounded-[3rem] border overflow-hidden shadow-[inset_0_2px_20px_rgba(0,0,0,0.05)] h-[450px] md:h-[580px] flex items-center justify-center transition-all duration-700
        ${hasExtremeHazard ? 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50' : 'bg-[#e0f2fe] dark:bg-slate-900/80 border-slate-200 dark:border-slate-800'}
      `}>
        {/* Subtle Water Texture Effect */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/waves.png')]"></div>

        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid meet" 
          className="h-full w-full max-w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)] select-none transition-transform duration-500"
        >
          <defs>
            <filter id="markerShadow" x="-50%" y="-50%" width="200%" height="200%">
               <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" />
               <feOffset dx="0" dy="0.5" result="offsetblur" />
               <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3" />
               </feComponentTransfer>
               <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
               </feMerge>
            </filter>
            <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
               <feGaussianBlur stdDeviation="0.4" result="blur" />
               <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
               </feMerge>
            </filter>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="1" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Ocean Background Area */}
          <path 
            d="M0,0 L100,0 L100,100 L0,100 Z" 
            className="fill-blue-50/20 dark:fill-blue-900/5 transition-colors duration-700"
          />
          
          {/* Portugal Shoreline Simplified - Adjusted for better visual balance */}
          <path 
            d="M45,2 L62,2 L64,12 L60,28 L68,42 L62,65 L58,78 L78,88 L82,98 L28,98 L22,88 L18,72 L22,52 L28,32 L38,12 Z" 
            className="fill-white dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-700 stroke-[0.3] transition-colors duration-500 shadow-xl"
          />

          {MAJOR_BEACHES.map((beach) => {
            const isSelected = selectedBeach.toLowerCase().includes(beach.name.toLowerCase());
            const isHovered = hovered === beach.id;
            const custom = customizations[beach.id];
            const isFav = custom?.isFavorite;
            
            // Refined Color Palette
            const markerColor = isSelected 
              ? (hasExtremeHazard ? '#dc2626' : '#f97316') 
              : (isFav ? '#fbbf24' : '#334155');
            
            const showTooltip = isHovered || isSelected;
            const markerScale = isHovered ? 1.4 : isSelected ? 1.25 : 1;

            return (
              <g 
                key={beach.id} 
                onMouseEnter={() => setHovered(beach.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelectBeach(beach.name)}
                className="cursor-pointer group"
                style={{ transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
              >
                {/* Interaction Hitbox */}
                <circle cx={beach.x} cy={beach.y} r="6" fill="transparent" />

                {/* Outer Glow / Pulse */}
                {(isSelected || isHovered) && (
                  <circle 
                    cx={beach.x} 
                    cy={beach.y} 
                    r={isSelected ? "5" : "4.5"} 
                    fill="none"
                    stroke={markerColor}
                    strokeWidth="0.5"
                    strokeOpacity={isHovered ? "0.6" : "0.3"}
                    className={isSelected ? "animate-ping" : ""}
                    style={{ transformOrigin: `${beach.x}px ${beach.y}px`, transition: 'all 0.4s ease' }}
                  />
                )}

                {/* Marker Shadow */}
                <circle 
                  cx={beach.x} 
                  cy={beach.y + 0.4} 
                  r={2.4 * markerScale} 
                  fill="rgba(0,0,0,0.1)" 
                  style={{ transition: 'all 0.3s ease' }}
                />
                
                {/* Multi-layered Marker Core */}
                <g transform={`scale(${markerScale})`} style={{ transformOrigin: `${beach.x}px ${beach.y}px`, transition: 'all 0.3s ease' }}>
                  {/* Base Circle */}
                  <circle 
                    cx={beach.x} 
                    cy={beach.y} 
                    r="2.2" 
                    fill="white"
                    stroke={markerColor}
                    strokeWidth="0.8"
                    filter="url(#markerShadow)"
                  />
                  {/* Inner Dot */}
                  <circle 
                    cx={beach.x} 
                    cy={beach.y} 
                    r="0.8" 
                    fill={markerColor}
                  />
                </g>

                {/* Special Status Icons */}
                {isFav && !isSelected && !isHovered && (
                  <text 
                    x={beach.x + 1.4} 
                    y={beach.y - 1.4} 
                    className="fill-yellow-500 font-black animate-pulse" 
                    style={{ fontSize: '3.5px' }}
                  >
                    ★
                  </text>
                )}

                {/* Tooltip Label */}
                {showTooltip && (
                  <g 
                    transform={`translate(${beach.x}, ${beach.y - 6})`} 
                    className="animate-zoom-in"
                  >
                    <rect 
                      x="-20" 
                      y="-7" 
                      width="40" 
                      height="8.5" 
                      rx="2.5" 
                      className={`${isSelected && hasExtremeHazard ? 'fill-red-600' : 'fill-slate-900/90 dark:fill-white/95'} shadow-2xl`} 
                    />
                    {/* Tooltip Tip */}
                    <path d="M-2,1.5 L0,4 L2,1.5 Z" className={`${isSelected && hasExtremeHazard ? 'fill-red-600' : 'fill-slate-900/90 dark:fill-white/95'}`} />
                    
                    <text 
                      x="0" 
                      y="-1.5" 
                      textAnchor="middle"
                      className={`${isSelected && hasExtremeHazard ? 'fill-white' : 'fill-white dark:fill-slate-900'} font-black uppercase`} 
                      style={{ fontSize: '3.2px', letterSpacing: '0.4px', filter: 'url(#textGlow)' }}
                    >
                      {beach.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend Panel - Floating Aesthetic */}
        <div className="absolute bottom-6 left-6 p-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-[1.5rem] border border-white/20 dark:border-slate-800/50 text-[10px] font-black uppercase tracking-widest space-y-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hidden md:block">
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-white border-2 border-orange-500"></span>
            <span className="text-slate-700 dark:text-slate-300">Posto Ativo</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-white border-2 border-red-600"></span>
            <span className="text-slate-700 dark:text-slate-300">Risco Crítico</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-white border-2 border-yellow-400"></span>
            <span className="text-slate-700 dark:text-slate-300">Favorita</span>
          </div>
        </div>
      </div>

      {/* Detail Card Overlay Aesthetic */}
      {currentBeachId && (
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 border border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-slide-up relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform">
             <span className="text-9xl">🌊</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="w-full text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                 <span className="text-[11px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.2em]">Coordenadas de Turno</span>
                 {customizations[currentBeachId]?.isFavorite && (
                   <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-2 py-0.5 rounded-full text-[9px] font-black border border-yellow-200 dark:border-yellow-800">⭐ FAVORITA</span>
                 )}
              </div>
              <h4 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter flex items-center justify-center md:justify-start gap-4">
                {MAJOR_BEACHES.find(b => b.id === currentBeachId)?.name}
                {hasExtremeHazard && <span className="text-2xl animate-pulse">🚩</span>}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-bold text-sm tracking-wide">Monitorização técnica em curso.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => toggleFavorite(currentBeachId)}
                className={`py-4 px-8 rounded-2xl font-black text-xs transition-all flex items-center space-x-3 shadow-lg active:scale-95
                  ${customizations[currentBeachId]?.isFavorite 
                    ? 'bg-yellow-400 text-yellow-950 hover:bg-yellow-500 shadow-yellow-500/20' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-slate-200/10'}`}
              >
                <span>{customizations[currentBeachId]?.isFavorite ? '★ NAS FAVORITAS' : '☆ MARCAR FAVORITA'}</span>
              </button>
              
              <div className="flex bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-md">
                {ICONS.slice(1, 4).map(i => (
                  <button
                    key={i.id}
                    onClick={() => updateCustom(currentBeachId, 'icon', i.id as any)}
                    title={i.label}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${customizations[currentBeachId]?.icon === i.id ? 'bg-white dark:bg-slate-700 shadow-md text-red-600 ring-2 ring-red-500/10' : 'text-slate-400 hover:text-slate-600'}`}
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
