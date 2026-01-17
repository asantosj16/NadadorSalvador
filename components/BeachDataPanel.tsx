import React from 'react';
import { BeachPoint } from '../data/weatherData';

interface BeachDataPanelProps {
  beach: BeachPoint | null;
}

const BeachDataPanel: React.FC<BeachDataPanelProps> = ({ beach }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Dados da Praia</span>
      </div>

      <div className={`
        flex-1 flex flex-col justify-center space-y-4 transition-all duration-500
        ${beach ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4 pointer-events-none blur-[2px]'}
      `}>
        {beach ? (
          <div className="animate-slide-up space-y-4">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[8px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-wider">Status Meteorológico</span>
              <h4 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none">{beach.name}</h4>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{beach.region}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Temp', val: beach.temp, icon: '🌡️', color: 'from-orange-500 to-orange-600' },
                { label: 'Ondas', val: beach.waves, icon: '🌊', color: 'from-blue-500 to-blue-600' },
                { label: 'Vento', val: beach.wind, icon: '💨', color: 'from-slate-400 to-slate-500' },
                { label: 'Maré', val: beach.tide, icon: '⏳', color: 'from-indigo-500 to-indigo-600' },
              ].map((stat, i) => (
                <div key={i} className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800 shadow-inner">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg mb-2 shadow-lg`}>
                    <span className="drop-shadow">{stat.icon}</span>
                  </div>
                  <div className="text-[8px] font-black text-slate-500 uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-base font-black text-white tracking-tight">{stat.val}</div>
                </div>
              ))}
            </div>

            {beach.alert && (
              <div className={`p-4 rounded-2xl border flex items-center space-x-3 animate-pulse-slow ${
                beach.alert === 'Vermelho' ? 'bg-red-600/20 border-red-500/40 text-red-300' : 
                beach.alert === 'Laranja' ? 'bg-orange-500/20 border-orange-400/40 text-orange-300' : 
                'bg-yellow-400/20 border-yellow-300/40 text-yellow-200'
              }`}>
                <span className="text-2xl">⚠️</span>
                <div>
                  <h5 className="font-black uppercase text-[9px] tracking-wider leading-none mb-1">Aviso {beach.alert}</h5>
                  <p className="text-[10px] font-bold leading-tight opacity-90">Condições severas. Vigilância Nv.3</p>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-[9px]">
                <span className="font-black text-slate-500 uppercase tracking-wider">Condição</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{beach.icon}</span>
                  <span className="font-bold text-slate-300">{beach.condition}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="text-5xl mb-3 block animate-bounce-slow">🛰️</span>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-wide">Selecione uma praia no mapa</p>
            <p className="text-[9px] text-slate-600 mt-2">Clique em qualquer marcador</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeachDataPanel;
