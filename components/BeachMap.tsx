
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

const COLORS = [
  { name: 'Vermelho', value: '#dc2626' },
  { name: 'Laranja', value: '#f97316' },
  { name: 'Dourado', value: '#fbbf24' },
  { name: 'Azul', value: '#2563eb' },
  { name: 'Ciano', value: '#06b6d4' },
  { name: 'Verde', value: '#16a34a' },
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
}

interface BeachMapProps {
  onSelectBeach: (name: string) => void;
  selectedBeach: string;
  currentConditions?: any;
}

const BeachMap: React.FC<BeachMapProps> = ({ onSelectBeach, selectedBeach, currentConditions }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [customizations, setCustomizations] = useState<Record<string, BeachCustomization>>({});

  // Detect weather hazards based on currentConditions
  const hazards = useMemo(() => {
    if (!currentConditions) return [];
    
    const h: Hazard[] = [];
    const windVal = parseFloat(currentConditions.windSpeed) || 0;
    const waveVal = parseFloat(currentConditions.waves) || 0;
    const isStorm = /trovoada|tempestade|chuva forte/i.test(currentConditions.condition);
    const uv = currentConditions.uvIndex?.toLowerCase();

    if (windVal > 30) h.push({ icon: '💨', msg: 'Vento Forte', level: windVal > 45 ? 'extreme' : 'high' });
    if (waveVal > 2.0) h.push({ icon: '🌊', msg: 'Maré Alta', level: waveVal > 3.5 ? 'extreme' : 'high' });
    if (isStorm) h.push({ icon: '⚡', msg: 'Instabilidade', level: 'extreme' });
    if (uv === 'extremo' || uv === 'muito alto') h.push({ icon: '☀️', msg: 'Rad. Extrema', level: 'high' });

    return h;
  }, [currentConditions]);

  const hasExtremeHazard = hazards.some(h => h.level === 'extreme');

  // Load favorites/customizations from local storage
  useEffect(() => {
    const saved = localStorage.getItem('lifeguard_beach_customs');
    if (saved) {
      try {
        setCustomizations(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse beach customizations", e);
      }
    }
  }, []);

  // Save to local storage whenever they change
  const saveCustomizations = (newCustoms: Record<string, BeachCustomization>) => {
    setCustomizations(newCustoms);
    localStorage.setItem('lifeguard_beach_customs', JSON.stringify(newCustoms));
  };

  const currentBeachId = MAJOR_BEACHES.find(b => selectedBeach.toLowerCase().includes(b.name.toLowerCase()))?.id;
  const currentCustom = currentBeachId ? customizations[currentBeachId] : null;

  const toggleFavorite = (id: string) => {
    const beach = customizations[id] || { isFavorite: false, color: '#dc2626', icon: 'dot' };
    saveCustomizations({
      ...customizations,
      [id]: { ...beach, isFavorite: !beach.isFavorite }
    });
  };

  const updateCustom = (id: string, key: keyof BeachCustomization, value: any) => {
    const beach = customizations[id] || { isFavorite: false, color: '#dc2626', icon: 'dot' };
    saveCustomizations({
      ...customizations,
      [id]: { ...beach, [key]: value }
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative w-full bg-slate-100 dark:bg-slate-800/50 rounded-[2.5rem] p-6 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner h-[400px] flex items-center justify-center">
        {/* Hazards Overlay */}
        {hazards.length > 0 && (
          <div className="absolute top-8 right-8 z-20 flex flex-col items-end space-y-2 pointer-events-none">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-500 mb-1">Alertas Ativos</span>
            {hazards.map((h, i) => (
              <div key={i} className={`flex items-center space-x-2 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm border animate-slide-in-right ${h.level === 'extreme' ? 'bg-red-600 text-white border-red-400' : 'bg-orange-500/20 text-orange-600 border-orange-500/30'}`} style={{ animationDelay: `${i * 100}ms` }}>
                <span className="text-sm">{h.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-tighter">{h.msg}</span>
              </div>
            ))}
          </div>
        )}

        <div className="absolute top-8 left-8 z-10">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Centro de Comando</h3>
          <p className="text-sm font-black text-slate-900 dark:text-slate-100">Célula de Monitorização</p>
        </div>

        <svg 
          viewBox="0 0 100 100" 
          className="h-full w-auto drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.08))' }}
        >
          {/* Base Map Shape */}
          <path 
            d="M45,2 L60,2 L62,10 L58,25 L65,40 L60,60 L55,75 L75,85 L80,95 L30,95 L25,85 L20,70 L25,50 L30,30 L38,10 Z" 
            fill="currentColor" 
            className="text-white dark:text-slate-900 stroke-slate-200 dark:stroke-slate-700 stroke-[0.5]"
          />
          
          {/* Sea abstraction */}
          <circle cx="0" cy="50" r="40" className="text-blue-500/5 dark:text-blue-400/5" fill="currentColor" />

          {MAJOR_BEACHES.map((beach) => {
            const isSelected = selectedBeach.toLowerCase().includes(beach.name.toLowerCase());
            const isHovered = hovered === beach.id;
            const custom = customizations[beach.id];
            
            // Markers colors logic
            let markerColor = custom?.color || (custom?.isFavorite ? '#fbbf24' : '#94a3b8');
            if (isSelected) markerColor = hasExtremeHazard ? '#ef4444' : '#ef4444';
            
            const isFav = custom?.isFavorite;
            const isAlertCustom = custom?.icon === 'flag';
            const beachHasHazard = isSelected && hazards.length > 0;

            return (
              <g 
                key={beach.id} 
                onMouseEnter={() => setHovered(beach.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelectBeach(beach.name)}
                className="cursor-pointer group"
              >
                {/* Interaction / Pulse Aura */}
                {(isSelected || isHovered || isAlertCustom || beachHasHazard) && (
                  <circle 
                    cx={beach.x} 
                    cy={beach.y} 
                    r={beachHasHazard ? "6" : "4"} 
                    fill={beachHasHazard ? '#ef4444' : markerColor}
                    className={`opacity-20 ${isSelected || beachHasHazard || isAlertCustom ? 'animate-pulse' : ''}`}
                  />
                )}

                {/* Extreme Weather Indicator */}
                {beachHasHazard && hasExtremeHazard && (
                  <text
                    x={beach.x}
                    y={beach.y - 4}
                    textAnchor="middle"
                    className="select-none animate-bounce"
                    style={{ fontSize: '6px' }}
                  >
                    ⚠️
                  </text>
                )}
                
                {/* Custom Marker */}
                {custom?.icon && custom.icon !== 'dot' ? (
                  <text
                    x={beach.x}
                    y={beach.y + 1.2}
                    textAnchor="middle"
                    className="select-none transition-all duration-300"
                    style={{ 
                      fontSize: (isSelected || isHovered) ? '5px' : (isFav ? '4.5px' : '3.5px'), 
                      fill: markerColor 
                    }}
                  >
                    {ICONS.find(i => i.id === custom.icon)?.char}
                  </text>
                ) : (
                  <circle 
                    cx={beach.x} 
                    cy={beach.y} 
                    r={isSelected ? "2.2" : (isFav ? "1.8" : "1.4")} 
                    fill={markerColor}
                    className="transition-all duration-300 stroke-white dark:stroke-slate-900 stroke-[0.3]"
                  />
                )}

                {/* Name Tag */}
                {(isHovered || isSelected) && (
                  <g transform={`translate(${beach.x + 5}, ${beach.y - 4})`} className="animate-zoom-in">
                    <rect 
                      width="38" 
                      height="10" 
                      rx="2" 
                      className={`${beachHasHazard ? 'fill-red-600' : 'fill-slate-900/90 dark:fill-white/95'}`} 
                    />
                    <text 
                      x="2" 
                      y="6.5" 
                      className={`${beachHasHazard ? 'fill-white' : 'fill-white dark:fill-slate-900'} font-black`} 
                      style={{ fontSize: '3.5px', letterSpacing: '-0.1px' }}
                    >
                      {beach.name.toUpperCase()} {isFav ? '★' : ''}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Advanced Customization Panel */}
      {currentBeachId && (
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 animate-slide-up shadow-xl">
          {hazards.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-2xl flex items-center space-x-4 animate-pulse">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="text-xs font-black text-red-700 dark:text-red-400 uppercase tracking-widest">Aviso de Risco Meteorológico</p>
                <p className="text-sm font-bold text-red-600 dark:text-red-500">Condições adversas detectadas para esta zona de vigilância.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Toggle & Name */}
            <div className="md:col-span-4 space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-1 block">Posto Selecionado</span>
                <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100 truncate">
                  {MAJOR_BEACHES.find(b => b.id === currentBeachId)?.name}
                </h4>
              </div>
              
              <button 
                onClick={() => toggleFavorite(currentBeachId)}
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm transition-all flex items-center justify-center space-x-3 shadow-sm active:scale-[0.98]
                  ${currentCustom?.isFavorite 
                    ? 'bg-yellow-400 text-yellow-900 border-b-4 border-yellow-500' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-b-4 border-slate-200 dark:border-slate-700'}`}
              >
                <span>{currentCustom?.isFavorite ? '★ PRIORIDADE ATIVA' : '☆ MARCAR PRIORIDADE'}</span>
              </button>
            </div>

            {/* Middle Col: Colors */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start">
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-3">Esquema de Cores</span>
              <div className="grid grid-cols-3 gap-3">
                {COLORS.map(c => (
                  <button
                    key={c.value}
                    onClick={() => updateCustom(currentBeachId, 'color', c.value)}
                    className={`w-10 h-10 rounded-xl border-4 transition-all hover:rotate-6 hover:scale-110 shadow-sm
                      ${currentCustom?.color === c.value ? 'border-slate-900 dark:border-white scale-110 shadow-md' : 'border-transparent opacity-80'}`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Right Col: Icons */}
            <div className="md:col-span-4 flex flex-col items-center md:items-end">
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-3">Ícone de Identificação</span>
              <div className="grid grid-cols-3 gap-2">
                {ICONS.map(i => (
                  <button
                    key={i.id}
                    onClick={() => updateCustom(currentBeachId, 'icon', i.id as any)}
                    className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all shadow-sm active:scale-90
                      ${currentCustom?.icon === i.id 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 scale-105' 
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    title={i.label}
                  >
                    <span className="text-xl">{i.char}</span>
                    <span className="text-[7px] font-black uppercase mt-0.5 opacity-60">{i.label}</span>
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
