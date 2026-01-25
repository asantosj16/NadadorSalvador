import React, { useState, useEffect } from 'react';
import { BeachPoint } from '../data/weatherData';
import { getIPMAWeatherData } from '../services/ipma';

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
    <div className="flex flex-col space-y-3">
      <div className={`
        flex flex-col space-y-4 transition-all duration-500
        ${beach ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4 pointer-events-none blur-[2px]'}
      `}>
        {beach ? (
          <div className="animate-slide-up space-y-4">
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
