import React, { useState, useEffect } from 'react';
import { BeachPoint } from '../data/weatherData';
import { getIPMAWeatherData, refreshData } from '../services/ipma';

interface BeachDataPanelProps {
  beach: BeachPoint | null;
}

interface LiveWeatherData {
  airTemp: string;
  waterTemp: string;
  waves: string;
  windSpeed: string;
  windDir: string;
  uvIndex: string;
  condition: string;
  riskLevel: 'low' | 'medium' | 'high';
  alerts: Array<{ type: string; level: string; description: string }>;
  ipmaIcon: string;
  lastUpdate: string;
}

const BeachDataPanel: React.FC<BeachDataPanelProps> = ({ beach }) => {
  const [liveData, setLiveData] = useState<LiveWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchLiveData = async (silent = false) => {
    if (!beach) return;
    
    if (!silent) setLoading(true);
    
    try {
      const data = await getIPMAWeatherData(beach.region);
      setLiveData(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (beach) {
      refreshData(beach.region);
      fetchLiveData();
    }
  };

  // Buscar dados do IPMA quando a praia mudar
  useEffect(() => {
    if (beach) {
      // Limpar dados anteriores e mostrar loading
      setLiveData(null);
      setLoading(true);
      fetchLiveData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beach?.name, beach?.region]); // fetchLiveData recriado a cada render, mas depende de beach

  // Auto-refresh a cada 5 minutos (mais frequente para dados reais)
  useEffect(() => {
    if (!autoRefresh || !beach) return;
    
    const interval = setInterval(() => {
      fetchLiveData(true);
    }, 300000); // 5 minutos

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh, beach?.name]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Tempo.pt Tempo Real</span>
          {autoRefresh && !loading && (
            <div className="flex items-center gap-1 ml-2">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[8px] text-green-500 font-bold uppercase tracking-wider">Auto</span>
            </div>
          )}
        </div>
        {beach && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-2 py-1 rounded-lg text-[8px] font-bold uppercase tracking-wider transition-colors ${
                autoRefresh 
                  ? 'bg-green-600/20 text-green-500 border border-green-500/30' 
                  : 'bg-slate-800/50 text-slate-500 border border-slate-700'
              }`}
              title={autoRefresh ? 'Auto-atualização ativa (5 min)' : 'Auto-atualização desativada'}
            >
              {autoRefresh ? '●' : '○'} Auto
            </button>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 transition-colors disabled:opacity-50"
              title="Atualizar dados agora"
            >
              <span className={`text-sm ${loading ? 'animate-spin' : ''}`}>🔄</span>
            </button>
          </div>
        )}
      </div>

      <div className={`
        flex-1 flex flex-col justify-center space-y-4 transition-all duration-500
        ${beach ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4 pointer-events-none blur-[2px]'}
      `}>
        {beach ? (
          <div className="animate-slide-up space-y-4">
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Praia selecionada</p>
                  <h3 className="text-lg font-black text-slate-900 dark:text-slate-50 leading-tight">{beach.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{beach.region}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl drop-shadow-sm">{liveData?.ipmaIcon || '☀️'}</span>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-200">{liveData?.condition || 'Céu limpo'}</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{liveData?.airTemp?.replace('°C', '°') || '19°'}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="rounded-lg bg-slate-100 dark:bg-slate-800/70 px-3 py-2 border border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Vento</p>
                  <p className="font-semibold">{liveData?.windSpeed || '17km/h'} {liveData?.windDir || 'N'}</p>
                </div>
                <div className="rounded-lg bg-slate-100 dark:bg-slate-800/70 px-3 py-2 border border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Ondas</p>
                  <p className="font-semibold">{liveData?.waves || '1.4m'}</p>
                </div>
                <div className="rounded-lg bg-slate-100 dark:bg-slate-800/70 px-3 py-2 border border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Maré</p>
                  <p className="font-semibold">Enchente</p>
                </div>
              </div>
              {(liveData?.airTemp || liveData?.waterTemp || liveData?.uvIndex) && (
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {liveData?.airTemp && (
                    <div className="rounded-lg bg-orange-100/50 dark:bg-orange-900/30 px-3 py-2 border border-orange-200 dark:border-orange-800">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-orange-600 dark:text-orange-400">Temp Ar</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{liveData.airTemp}</p>
                    </div>
                  )}
                  {liveData?.waterTemp && (
                    <div className="rounded-lg bg-blue-100/50 dark:bg-blue-900/30 px-3 py-2 border border-blue-200 dark:border-blue-800">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">Temp Água</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{liveData.waterTemp}</p>
                    </div>
                  )}
                  {liveData?.uvIndex && (
                    <div className="rounded-lg bg-yellow-100/50 dark:bg-yellow-900/30 px-3 py-2 border border-yellow-200 dark:border-yellow-800">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-yellow-600 dark:text-yellow-400">UV Index</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{liveData.uvIndex}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-1 text-center md:text-left">
              <span className="text-[8px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-wider">
                {loading ? 'A carregar...' : 'Status Meteorológico Tempo.pt'}
              </span>
              <h4 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none">{beach.name}</h4>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{beach.region}</p>
              {liveData?.lastUpdate && (
                <p className="text-[8px] text-slate-500 uppercase tracking-wide">
                  Atualizado: {liveData.lastUpdate}
                </p>
              )}
            </div>

            {liveData?.alerts && liveData.alerts.length > 0 && (
              <div className="space-y-2">
                {liveData.alerts.map((alert, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border flex items-center space-x-3 animate-pulse-slow ${
                    alert.level.toLowerCase().includes('alto') || alert.level === 'red' ? 'bg-red-600/20 border-red-500/40 text-red-300' : 
                    alert.level.toLowerCase().includes('moderado') || alert.level === 'orange' ? 'bg-orange-500/20 border-orange-400/40 text-orange-300' : 
                    'bg-yellow-400/20 border-yellow-300/40 text-yellow-200'
                  }`}>
                    <span className="text-2xl">⚠️</span>
                    <div className="flex-1">
                      <h5 className="font-black uppercase text-[9px] tracking-wider leading-none mb-1">
                        {alert.type} - {alert.level}
                      </h5>
                      <p className="text-[10px] font-bold leading-tight opacity-90">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-[9px]">
                <span className="font-black text-slate-500 uppercase tracking-wider">Condição Atual</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{loading ? '⌛' : (liveData?.ipmaIcon || '☀️')}</span>
                  <span className="font-bold text-slate-300">{loading ? 'A carregar...' : (liveData?.condition || 'Céu limpo')}</span>
                </div>
              </div>
              
              <div className="mt-2 flex items-center justify-between">
                <span className="font-black text-slate-500 uppercase tracking-wider text-[9px]">Nível de Risco</span>
                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider ${
                  liveData?.riskLevel === 'high' ? 'bg-red-600/30 text-red-300 border border-red-500/50' :
                  liveData?.riskLevel === 'medium' ? 'bg-orange-500/30 text-orange-300 border border-orange-400/50' :
                  'bg-green-600/30 text-green-300 border border-green-500/50'
                }`}>
                  {loading ? '⌛ Verificando' : 
                   liveData?.riskLevel === 'high' ? '🔴 Alto' :
                   liveData?.riskLevel === 'medium' ? '🟠 Moderado' :
                   '🟢 Baixo'}
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <label className="flex items-center justify-center space-x-2 text-[9px] text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded"
                />
                <span>Auto-atualizar a cada 5 min</span>
              </label>
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
