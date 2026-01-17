
import React from 'react';

interface BeachPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  risk: 'low' | 'moderate' | 'high' | 'extreme';
  status: string;
}

const BEACHES: BeachPoint[] = [
  { id: '1', name: 'Nazaré (Praia do Norte)', x: 32, y: 15, risk: 'extreme', status: 'Swell de 15m - Ondas Gigantes' },
  { id: '2', name: 'Peniche (Supertubos)', x: 28, y: 28, risk: 'high', status: 'Correntes Fortes' },
  { id: '3', name: 'Guincho', x: 22, y: 45, risk: 'high', status: 'Vento Norte Intenso' },
  { id: '4', name: 'Carcavelos', x: 40, y: 55, risk: 'low', status: 'Banhos Autorizados' },
  { id: '5', name: 'Costa da Caparica', x: 42, y: 65, risk: 'moderate', status: 'Agueiros em Formação' },
  { id: '6', name: 'Praia da Rocha', x: 65, y: 85, risk: 'low', status: 'Mar Calmo' },
  { id: '7', name: 'Sagres (Beliche)', x: 15, y: 88, risk: 'moderate', status: 'Correntes de Maré' },
  { id: '8', name: 'Matosinhos', x: 30, y: 5, risk: 'low', status: 'Vigilância Ativa' },
  { id: '9', name: 'Figueira da Foz', x: 35, y: 12, risk: 'moderate', status: 'Bandeira Amarela' },
  { id: '10', name: 'Ericeira (Ribeira)', x: 25, y: 35, risk: 'high', status: 'Rochas Expostas' },
];

const BeachMap: React.FC = () => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'extreme': return 'bg-rose-600 text-white ring-4 ring-rose-500/50 shadow-[0_0_40px_rgba(225,29,72,0.6)]';
      case 'high': return 'bg-orange-500 text-white ring-4 ring-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.4)]';
      case 'moderate': return 'bg-yellow-400 text-slate-900 ring-4 ring-yellow-400/20 shadow-[0_0_20px_rgba(250,204,21,0.3)]';
      default: return 'bg-emerald-500 text-white ring-4 ring-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
    }
  };

  const extremeBeaches = BEACHES.filter(b => b.risk === 'extreme');

  return (
    <div className="space-y-6 animate-fade-in">
      <style>{`
        @keyframes radar-scan {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes alert-pulse {
          0%, 100% { border-color: rgba(225, 29, 72, 1); box-shadow: 0 0 30px rgba(225, 29, 72, 0.4); }
          50% { border-color: rgba(255, 255, 255, 0.8); box-shadow: 0 0 60px rgba(225, 29, 72, 0.7); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .radar-sweep {
          animation: radar-scan 10s linear infinite;
        }
        .animate-alert-border {
          animation: alert-pulse 2s infinite ease-in-out;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
      `}</style>

      {/* Alerta Crítico Proeminente - Ultra High Fidelity */}
      {extremeBeaches.length > 0 && (
        <div className="relative overflow-hidden bg-rose-950/40 backdrop-blur-3xl border-2 border-rose-500 p-5 md:p-8 rounded-[2.5rem] shadow-2xl animate-alert-border">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="relative flex-shrink-0">
               <div className="absolute inset-0 bg-rose-500 rounded-full animate-pulse-ring opacity-40"></div>
               <div className="w-16 h-16 md:w-20 md:h-20 bg-rose-600 rounded-2xl flex items-center justify-center text-4xl shadow-2xl border border-rose-400/50">
                🛑
               </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-md bg-rose-500 text-white text-[9px] font-black uppercase tracking-[0.2em] mb-2">Protocolo de Emergência Nível 5</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-rose-50 dark:text-rose-50 leading-none">
                ALERTA: {extremeBeaches[0].name.split(' (')[0].toUpperCase()}
              </h2>
              <p className="text-rose-200/70 font-bold uppercase tracking-[0.1em] text-[10px] md:text-xs mt-1">
                {extremeBeaches[0].status}
              </p>
            </div>
            
            <div className="flex flex-col gap-2 w-full md:w-auto">
               <button className="w-full md:w-auto bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 border border-rose-400/30">
                Relatar Incidente
               </button>
               <p className="text-[8px] text-center md:text-right text-rose-400 font-black uppercase tracking-widest opacity-60">Feed SAR Sincronizado</p>
            </div>
          </div>
        </div>
      )}

      {/* Tactical Naval Dashboard - Refined for High Resolution */}
      <div className="bg-[#030712] rounded-[3.5rem] h-[400px] md:h-[600px] relative overflow-hidden border-2 md:border-4 border-slate-800/80 shadow-[0_40px_100px_rgba(0,0,0,0.8)] group">
        
        {/* Radar Sweep Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] pointer-events-none opacity-10 radar-sweep">
          <div className="w-1/2 h-1/2 bg-gradient-to-tr from-blue-500/40 to-transparent origin-bottom-right"></div>
        </div>

        {/* Tactical Overlays (Finer Lines) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 border-[0.25px] border-slate-600/30 grid grid-cols-24 grid-rows-24"></div>
          {[200, 400, 600, 800].map(size => (
            <div key={size} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-slate-700/20 rounded-full" style={{ width: size, height: size }}></div>
          ))}
        </div>

        {/* Coastal Map Base (Decompressed Colors) */}
        <div className="absolute inset-0 bg-[#020617]">
          {/* Landmass */}
          <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-[#0f172a] shadow-[15px_0_50px_rgba(0,0,0,0.5)] border-r border-slate-800/50">
             <div className="absolute right-0 top-0 bottom-0 w-24 bg-slate-800/20 skew-x-[-10deg] translate-x-12"></div>
          </div>
          {/* Deep Ocean */}
          <div className="absolute right-0 top-0 bottom-0 w-[60%] bg-[radial-gradient(circle_at_20%_50%,_#111827_0%,_#020617_100%)]"></div>
        </div>

        {/* Refined Glassmorphism Markers */}
        {BEACHES.map((beach) => (
          <div 
            key={beach.id}
            className="absolute transition-all hover:z-50"
            style={{ left: `${beach.x}%`, top: `${beach.y}%` }}
          >
            <div className="relative group/marker flex flex-col items-center">
              {/* Conditional Alert Ripple */}
              {beach.risk === 'extreme' && (
                <div className="absolute inset-0 rounded-full animate-pulse-ring bg-rose-500 pointer-events-none"></div>
              )}
              
              <button className={`
                relative w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center 
                border-2 border-white/20 backdrop-blur-md transition-all 
                group-hover/marker:scale-125 group-hover/marker:-translate-y-2 shadow-2xl
                ${getRiskColor(beach.risk)}
              `}>
                <span className={`text-xl md:text-3xl transition-transform group-hover/marker:scale-110 ${beach.risk === 'extreme' ? 'animate-bounce' : ''}`}>
                  {beach.risk === 'extreme' ? '⚠' : beach.risk === 'high' ? '🚩' : beach.risk === 'moderate' ? '⚠️' : '📍'}
                </span>
              </button>

              {/* Advanced Tooltip - Refined Layout */}
              <div className="absolute bottom-full mb-6 w-56 md:w-64 bg-[#0f172a]/95 backdrop-blur-2xl p-5 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-slate-700/50 opacity-0 group-hover/marker:opacity-100 transition-all pointer-events-none translate-y-4 group-hover/marker:translate-y-0 text-center">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-1">Ponto de Vigilância</span>
                <h4 className="font-black text-slate-100 text-sm md:text-base uppercase tracking-tighter leading-tight mb-3 px-2">{beach.name}</h4>
                
                <div className="h-px bg-slate-800 mb-3 w-3/4 mx-auto"></div>
                
                <p className="text-[10px] text-slate-400 font-bold leading-tight uppercase tracking-tight mb-3">
                  {beach.status}
                </p>
                
                <div className={`text-[8px] font-black py-1 px-3 rounded-full inline-block border-2 ${
                   beach.risk === 'extreme' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                   beach.risk === 'high' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                   'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                 }`}>
                  RISCO {beach.risk.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Tactical Legend - Refined for High DPI */}
        <div className="absolute bottom-8 right-8 hidden md:block bg-slate-900/80 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-slate-800/80 shadow-2xl space-y-3 min-w-[200px]">
          <h5 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4 border-b border-slate-800 pb-2">LEGENDA TÉCNICA</h5>
          {[
            { l: 'CRÍTICO / INTERDITO', c: 'bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.8)]' },
            { l: 'RISCO ELEVADO', c: 'bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]' },
            { l: 'ATENÇÃO MODERADA', c: 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' },
            { l: 'VIGILÂNCIA PADRÃO', c: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' },
          ].map((item) => (
            <div key={item.l} className="flex items-center space-x-4 group cursor-default">
              <span className={`w-3 h-3 rounded-full transition-all group-hover:scale-125 ${item.c}`}></span>
              <span className="text-[8px] font-black uppercase text-slate-400 tracking-tight group-hover:text-slate-200 transition-colors">{item.l}</span>
            </div>
          ))}
        </div>

        {/* HUD Data Elements (Cyberpunk Minimalist) */}
        <div className="absolute top-8 left-8 flex flex-col space-y-3 pointer-events-none opacity-60 scale-75 md:scale-100 origin-top-left">
           <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl backdrop-blur-md">
              <div className="text-[9px] font-black text-slate-400 tracking-[0.2em] font-mono">NODE: CO_P0122_PT</div>
              <div className="text-[9px] font-black text-blue-400 tracking-[0.2em] font-mono mt-1">SAT_RELAY: ACTIVE</div>
           </div>
           <div className="flex items-center space-x-2 ml-1">
              <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-ping"></span>
              <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest">LIVE DATA FEED</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BeachMap;
