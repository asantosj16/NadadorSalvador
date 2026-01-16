
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
    <div className="flex flex-col space-y-6">
      {/* Alerta Proeminente Refatorado */}
      {hazards.length > 0 && (
        <div className={`
          relative overflow-hidden flex items-center justify-between p-6 rounded-[2rem] border-2 shadow-xl animate-slide-up
          ${hasExtremeHazard 
            ? 'bg-red-600 border-red-400 text-white' 
            : 'bg-orange-500 border-orange-300 text-white'}
        `}>
          {/* Background Animated Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-[pulse_3s_infinite] pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center space-x-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl animate-bounce shadow-inner">
              {hasExtremeHazard ? '🚨' : '⚠️'}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="bg-white text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm">
                  {hasExtremeHazard ? 'Prioridade Máxima' : 'Alerta Ativo'}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Posto: {selectedBeach.split(',')[0]}</span>
              </div>
              <h5 className="font-black text-2xl tracking-tight leading-none mb-1">
                {hasExtremeHazard ? 'CONDIÇÕES CRÍTICAS' : 'VIGILÂNCIA REFORÇADA'}
              </h5>
              <p className="text-sm font-medium opacity-90">
                {hasExtremeHazard 
                  ? 'Interdição recomendada. Risco elevado para a vida humana.' 
                  : 'Atenção redobrada aos banhistas e correntes costeiras.'}
              </p>
            </div>
          </div>
          
          <div className="relative z-10 hidden sm:flex -space-x-3 items-center">
            {hazards.map((h, i) => (
              <div key={i} title={h.msg} className="w-12 h-12 rounded-full bg-white text-slate-900 border-2 border-slate-100 flex items-center justify-center text-2xl shadow-lg transform hover:scale-110 transition-transform cursor-help z-10">
                {h.icon}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`
        relative w-full rounded-[2.5rem] border overflow-hidden shadow-inner h-[480px] flex items-center justify-center transition-all duration-700
        ${hasExtremeHazard ? 'bg-red-50/50 dark:bg-red-900/10 border-red-500' : hasHighHazard ? 'bg-orange-50/50 dark:bg-orange-900/10 border-orange-300' : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'}
      `}>
        {/* Radar Effect for Extreme Weather */}
        {hasExtremeHazard && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle,rgba(239,68,68,0.05)_0%,transparent_70%)] animate-pulse"></div>
          </div>
        )}

        <svg viewBox="0 0 100 100" className="h-[90%] w-auto drop-shadow-2xl">
          <defs>
            <radialGradient id="hazardGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
               <feGaussianBlur stdDeviation="1" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Map Shapes */}
          <path 
            d="M30,0 L0,0 L0,100 L60,100 Q40,50 30,0" 
            fill="currentColor" 
            className={`${hasExtremeHazard ? 'text-blue-900/10' : 'text-blue-500/5'}`} 
          />
          
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
            const markerColor = isSelected ? (hasExtremeHazard ? '#ef4444' : '#f97316') : (isFav ? '#fbbf24' : '#94a3b8');
            const beachHasHazard = isSelected && hazards.length > 0;

            return (
              <g 
                key={beach.id} 
                onMouseEnter={() => setHovered(beach.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelectBeach(beach.name)}
                className="group cursor-pointer pointer-events-auto"
              >
                {/* Hitbox invisível maior */}
                <circle cx={beach.x} cy={beach.y} r="6" fill="transparent" />

                {beachHasHazard && (
                  <circle 
                    cx={beach.x} 
                    cy={beach.y} 
                    r="8" 
                    fill="url(#hazardGradient)"
                    className="animate-[ping_2s_infinite]"
                  />
                )}

                {(isSelected || isHovered) && (
                  <circle cx={beach.x} cy={beach.y} r="3.5" fill={markerColor} className="opacity-10 animate-pulse" />
                )}
                
                <circle 
                  cx={beach.x} 
                  cy={beach.y} 
                  r={isSelected ? "2.5" : (isFav ? "1.8" : "1.4")} 
                  fill={markerColor}
                  strokeWidth="0.5"
                  className="transition-all duration-300 stroke-white dark:stroke-slate-900"
                  filter={isSelected ? "url(#glow)" : ""}
                />

                {/* Indicador de Perigo Reforçado no Marcador */}
                {beachHasHazard && (
                  <g transform={`translate(${beach.x + 2.5}, ${beach.y - 3})`}>
                    <circle r="2.5" fill="#ef4444" className="shadow-lg" />
                    <text
                      textAnchor="middle"
                      dy="0.8"
                      className="select-none fill-white font-black"
                      style={{ fontSize: '3.5px' }}
                    >
                      !
                    </text>
                  </g>
                )}

                {(isHovered || isSelected) && (
                  <g transform={`translate(${beach.x + 4.5}, ${beach.y - 6})`} className="animate-zoom-in pointer-events-none">
                    <rect 
                      width="45" 
                      height={beachHasHazard ? "18" : "12"} 
                      rx="4" 
                      className={`${beachHasHazard ? 'fill-red-600 shadow-2xl' : 'fill-slate-900/95 dark:fill-white/98 shadow-md'}`} 
                    />
                    <text 
                      x="4.5" 
                      y="7.5" 
                      className={`${beachHasHazard ? 'fill-white' : 'fill-white dark:fill-slate-900'} font-black`} 
                      style={{ fontSize: '3.5px', letterSpacing: '0.2px' }}
                    >
                      {beach.name.toUpperCase()} {isFav ? '★' : ''}
                    </text>
                    {beachHasHazard && (
                      <g transform="translate(4.5, 11)">
                        <text className="fill-white/80 font-bold" style={{ fontSize: '2.5px' }}>
                          {hazards[0].msg.toUpperCase()}
                        </text>
                        <text x="0" y="3.5" className="fill-white/60 font-medium" style={{ fontSize: '2px' }}>
                          NÍVEL: {hazards[0].level.toUpperCase()}
                        </text>
                      </g>
                    )}
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legenda Flutuante */}
        <div className="absolute bottom-6 left-6 p-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 text-[8px] font-black uppercase tracking-widest space-y-2 shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-600 border-2 border-white animate-pulse"></span>
            <span>Risco Operacional</span>
          </div>
          <div className="flex items-center space-x-2 opacity-60">
            <span className="w-3 h-3 rounded-full bg-slate-400 border-2 border-white"></span>
            <span>Sem Alerta</span>
          </div>
        </div>
      </div>

      {currentBeachId && (
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl animate-slide-up">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                 <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">Posto de Vigilância</span>
                 {customizations[currentBeachId]?.isFavorite && <span className="bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-[8px] font-black">PREFERIDO</span>}
              </div>
              <h4 className="text-3xl font-black text-slate-900 dark:text-slate-100 flex items-center">
                {MAJOR_BEACHES.find(b => b.id === currentBeachId)?.name}
                {hasExtremeHazard && <span className="ml-3 text-2xl inline-block animate-[bounce_0.5s_infinite]">🚨</span>}
              </h4>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => toggleFavorite(currentBeachId)}
                className={`py-3 px-6 rounded-2xl font-black text-xs transition-all flex items-center space-x-2
                  ${customizations[currentBeachId]?.isFavorite ? 'bg-yellow-400 text-yellow-900 shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}
              >
                <span>{customizations[currentBeachId]?.isFavorite ? '★ NOS MEUS FAVORITOS' : '☆ MARCAR FAVORITO'}</span>
              </button>
              
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                {ICONS.slice(1, 4).map(i => (
                  <button
                    key={i.id}
                    onClick={() => updateCustom(currentBeachId, 'icon', i.id as any)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${customizations[currentBeachId]?.icon === i.id ? 'bg-white dark:bg-slate-700 shadow-sm text-red-600' : 'text-slate-400 hover:text-slate-600'}`}
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
