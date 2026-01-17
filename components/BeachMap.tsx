
import React from 'react';

interface BeachPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  condition: string;
  temp: string;
  icon: string;
  alert?: 'Amarelo' | 'Laranja' | 'Vermelho';
}

const FORECAST_POINTS: BeachPoint[] = [
  { id: 'viana', name: 'Viana', x: 28, y: 10, condition: 'Limpo', temp: '19°', icon: '☀️' },
  { id: 'porto', name: 'Porto', x: 28, y: 22, condition: 'Nuvens', temp: '18°', icon: '⛅', alert: 'Amarelo' },
  { id: 'aveiro', name: 'Aveiro', x: 30, y: 35, condition: 'Limpo', temp: '20°', icon: '☀️' },
  { id: 'nazare', name: 'Nazaré', x: 26, y: 48, condition: 'Vento', temp: '17°', icon: '🌬️', alert: 'Laranja' },
  { id: 'peniche', name: 'Peniche', x: 23, y: 55, condition: 'Limpo', temp: '19°', icon: '☀️' },
  { id: 'lisboa', name: 'Lisboa', x: 25, y: 68, condition: 'Limpo', temp: '22°', icon: '☀️' },
  { id: 'sines', name: 'Sines', x: 35, y: 80, condition: 'Nuvens', temp: '21°', icon: '⛅' },
  { id: 'portimao', name: 'Portimão', x: 55, y: 92, condition: 'Limpo', temp: '24°', icon: '☀️' },
  { id: 'faro', name: 'Faro', x: 75, y: 92, condition: 'Limpo', temp: '25°', icon: '☀️' },
];

const BeachMap: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] border border-slate-200 dark:border-slate-800 p-4 md:p-8 shadow-inner overflow-hidden relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">Previsão Significativa</h3>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">IPMA Digital Style</p>
          </div>
          <div className="flex gap-1.5">
            <span className="bg-yellow-400/20 text-yellow-700 dark:text-yellow-500 px-2 py-0.5 rounded-full text-[8px] font-black uppercase border border-yellow-400/30">Amarelo</span>
            <span className="bg-orange-400/20 text-orange-700 dark:text-orange-500 px-2 py-0.5 rounded-full text-[8px] font-black uppercase border border-orange-400/30">Laranja</span>
          </div>
        </div>

        {/* Map Container - Optimized for mobile aspect ratio */}
        <div className="relative h-[450px] md:h-[550px] w-full max-w-md mx-auto bg-blue-50/20 dark:bg-slate-950/40 rounded-3xl border border-blue-100 dark:border-slate-800 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M25,5 L40,5 L42,15 L38,25 L45,40 L35,50 L40,70 L45,95 L80,95 L85,90 L60,85 L45,80 L35,60 L25,30 L25,5 Z" fill="currentColor" className="text-slate-400" />
          </svg>

          {FORECAST_POINTS.map((point) => (
            <div 
              key={point.id}
              className="absolute group"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                <div className={`
                  w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white dark:bg-slate-800 shadow-md border-2 flex items-center justify-center text-base md:text-xl relative
                  ${point.alert === 'Laranja' ? 'border-orange-500 shadow-orange-500/20 animate-pulse' : 
                    point.alert === 'Amarelo' ? 'border-yellow-400 shadow-yellow-400/20' : 
                    'border-transparent'}
                `}>
                  {point.icon}
                </div>
                <div className="mt-1 bg-white/95 dark:bg-slate-900/95 px-1.5 py-0.5 rounded shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center">
                  <span className="text-[7px] md:text-[8px] font-black text-slate-800 dark:text-slate-200 uppercase">{point.name}</span>
                  <span className="text-[9px] md:text-[10px] font-black text-red-600 leading-none">{point.temp}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Coastal Warnings HUD - Mobile Optimized */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-3 flex items-center space-x-3">
             <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-xl animate-pulse flex-shrink-0">🌊</div>
             <div className="flex-1 min-w-0">
                <h4 className="text-[9px] font-black uppercase text-orange-600 tracking-widest truncate">Aviso Agitação Marítima</h4>
                <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 leading-tight">Ondas de NO 5-6m. Precaução.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeachMap;
