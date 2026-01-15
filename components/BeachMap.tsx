
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

    // Regras de Alerta Meteorológico
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

  const hasExtremeHazard = hazards.some(h => h.level === 'extreme');
  const hasHighHazard = hazards.some(h => h.level === 'high');

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
    <div className="flex flex-col space-y-4">
      {/* Alerta Global de Perigo */}
      {hazards.length > 0 && (
        <div className={`
          flex items-center justify-between p-4 rounded-3xl border-2 animate-slide-up
          ${hasExtremeHazard ? 'bg-red-50 dark:bg-red-950/30 border-red-500 text-red-900 dark:text-red-100' : 'bg-orange-50 dark:bg-orange-950/30 border-orange-400 text-orange-900 dark:text-orange-100'}
        `}>
          <div className="flex items-center space-x-4">
            <span className="text-3xl animate-pulse">{hasExtremeHazard ? '🚫' : '⚠️'}</span>
            <div>
              <p className="font-black uppercase tracking-widest text-[10px]">Alerta Meteorológico: {selectedBeach.split(',')[0]}</p>
              <h5 className="font-bold text-lg">{hasExtremeHazard ? 'Condições Extremas - Interditar Banhos' : 'Aviso de Segurança - Vigilância Redobrada'}</h5>
            </div>
          </div>
          <div className="flex -space-x-2">
            {hazards.map((h, i) => (
              <span key={i} title={h.msg} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-current flex items-center justify-center text-xl shadow-sm z-10">
                {h.icon}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={`
        relative w-full rounded-[2.5rem] border overflow-hidden shadow-inner h-[480px] flex items-center justify-center transition-all duration-700
        ${hasExtremeHazard ? 'bg-red-50/50 dark:bg-red-900/10 border-red-500' : hasHighHazard ? 'bg-orange-50/50 dark:bg-orange-900/10 border-orange-300' : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'}
      `}>
        {/* Radar Effect Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-300 dark:border-slate-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-300 dark:border-slate-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-slate-300 dark:border-slate-600 rounded-full"></div>
        </div>

        {/* Hazard Dashboard Floating */}
        <div className="absolute top-6 right-6 z-20 flex flex-col items-end space-y-2 pointer-events-none">
          {hazards.map((h, i) => (
            <div key={i} className={`
              flex items-center space-x-3 px-4 py-2 rounded-2xl backdrop-blur-xl shadow-lg border animate-slide-in-right
              ${h.level === 'extreme' ? 'bg-red-600 text-white border-red-400' : 'bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'}
            `} style={{ animationDelay: `${i * 150}ms` }}>
              <span className="text-xl">{h.icon}</span>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase opacity-70 tracking-widest">{h.level === 'extreme' ? 'Crítico' : 'Aviso'}</span>
                <span className="text-xs font-black leading-none">{h.msg}</span>
              </div>
            </div>
          ))}
        </div>

        <svg viewBox="0 0 100 100" className="h-[90%] w-auto drop-shadow-2xl">
          {/* Sea */}
          <path 
            d="M30,0 L0,0 L0,100 L60,100 Q40,50 30,0" 
            fill="currentColor" 
            className={`${hasExtremeHazard ? 'text-blue-900/10' : 'text-blue-500/5'}`} 
          />
          
          {/* Portugal Map Outline */}
          <path 
            d="M45,2 L60,2 L62,10 L58,25 L65,40 L60,60 L55,75 L75,85 L80,95 L30,95 L25,85 L20,70 L25,50 L30,30 L38,10 Z" 
            fill="currentColor" 
            className="text-white dark:text-slate-900 stroke-slate-200 dark:stroke-slate-700 stroke-[0.3]"
          />

          {MAJOR_BEACHES.map((beach) => {
            const isSelected = selectedBeach.toLowerCase().includes(beach.name.toLowerCase());
            const isHovered = hovered === beach.id;
            const custom = customizations[beach.id];
            
            const isFav = custom?.isFavorite;
            const markerColor = isSelected ? (hasExtremeHazard ? '#ef4444' : '#dc2626') : (isFav ? '#fbbf24' : '#94a3b8');
            const beachHasHazard = isSelected && hazards.length > 0;

            return (
              <g 
                key={beach.id} 
                onMouseEnter={() => setHovered(beach.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelectBeach(beach.name)}
                className="cursor-pointer group"
              >
                {/* Visual Aura for Hazard */}
                {beachHasHazard && (
                  <>
                    <circle 
                      cx={beach.x} 
                      cy={beach.y} 
                      r="8" 
                      fill="#ef4444"
                      className="opacity-20 animate-ping"
                    />
                    <circle 
                      cx={beach.x} 
                      cy={beach.y} 
                      r="5" 
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="0.5"
                      className="opacity-40 animate-pulse"
                    />
                  </>
                )}

                {/* Marker Glow */}
                {(isSelected || isHovered) && (
                  <circle cx={beach.x} cy={beach.y} r="3.5" fill={markerColor} className="opacity-10 animate-pulse" />
                )}
                
                {/* Marker Body */}
                <circle 
                  cx={beach.x} 
                  cy={beach.y} 
                  r={isSelected ? "2.2" : (isFav ? "1.8" : "1.4")} 
                  fill={markerColor}
                  className="transition-all duration-300 stroke-white dark:stroke-slate-900 stroke-[0.3]"
                />

                {/* Specific Warning Icon for Selected Hazard */}
                {beachHasHazard && (
                  <text
                    x={beach.x + 2}
                    y={beach.y - 2.5}
                    textAnchor="middle"
                    className="select-none fill-red-600 animate-bounce font-bold"
                    style={{ fontSize: '4.5px' }}
                  >
                    ⚠
                  </text>
                )}

                {/* Tooltip on Map */}
                {(isHovered || isSelected) && (
                  <g transform={`translate(${beach.x + 4}, ${beach.y - 5})`} className="animate-zoom-in pointer-events-none">
                    <rect 
                      width="40" 
                      height={beachHasHazard ? "14" : "10"} 
                      rx="3" 
                      className={`${beachHasHazard ? 'fill-red-600' : 'fill-slate-900/90 dark:fill-white/95'}`} 
                    />
                    <text 
                      x="4" 
                      y="6.5" 
                      className={`${beachHasHazard ? 'fill-white' : 'fill-white dark:fill-slate-900'} font-black`} 
                      style={{ fontSize: '3px', letterSpacing: '0.1px' }}
                    >
                      {beach.name.toUpperCase()} {isFav ? '★' : ''}
                    </text>
                    {beachHasHazard && (
                      <text x="4" y="10.5" className="fill-white/80 font-bold" style={{ fontSize: '2px' }}>
                        {hazards[0].msg.toUpperCase()}
                      </text>
                    )}
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-6 left-6 p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/20 text-[8px] font-black uppercase tracking-widest space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span>Risco Meteorológico Crítico</span>
          </div>
          <div className="flex items-center space-x-2 opacity-60">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>Posto de Vigilância Normal</span>
          </div>
        </div>
      </div>

      {/* Detail Controls */}
      {currentBeachId && (
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl animate-slide-up">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-1 block">Localização Operacional</span>
              <h4 className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {MAJOR_BEACHES.find(b => b.id === currentBeachId)?.name}
                {hasExtremeHazard && <span className="ml-3 text-xl inline-block animate-bounce">🚨</span>}
              </h4>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => toggleFavorite(currentBeachId)}
                className={`py-3 px-6 rounded-2xl font-black text-xs transition-all flex items-center space-x-2
                  ${customizations[currentBeachId]?.isFavorite ? 'bg-yellow-400 text-yellow-900 shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
              >
                <span>{customizations[currentBeachId]?.isFavorite ? '★ FAVORITO' : '☆ MARCAR'}</span>
              </button>
              
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                {ICONS.slice(1, 4).map(i => (
                  <button
                    key={i.id}
                    onClick={() => updateCustom(currentBeachId, 'icon', i.id as any)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${customizations[currentBeachId]?.icon === i.id ? 'bg-white dark:bg-slate-700 shadow-sm text-red-600' : 'text-slate-400'}`}
                  >
                    <span className="text-lg">{i.char}</span>
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
