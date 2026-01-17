
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.tsx';
import ManualView from './components/ManualView.tsx';
import QuizView from './components/QuizView.tsx';
import AssistantView from './components/AssistantView.tsx';
import TrainingLocations from './components/TrainingLocations.tsx';
import BeachMap from './components/BeachMap.tsx';
import { TIPS, MANUALS, BEACH_FLAGS } from './constants.tsx';
import { TrainingItem } from './types.ts';
import { generateDailyScenario, getBeachConditions, getTrainingSchedules } from './services/gemini.ts';

const EmergencyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const contacts = [
    { name: 'Emergência Nacional', number: '112', description: 'Número único de emergência' },
    { name: 'MRCC Lisboa (Marinha)', number: '214 401 919', description: 'Busca e Salvamento' },
    { name: 'VHF Marítimo', number: 'CH 16', description: 'Canal de Socorro' },
  ];
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-lg animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl animate-zoom-in border border-slate-200 dark:border-slate-800">
        <div className="bg-red-600 p-10 text-white text-center">
          <div className="text-6xl mb-4">🚨</div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Emergência</h2>
          <p className="text-red-100 text-sm font-bold opacity-80 uppercase tracking-widest mt-2">Canais de Socorro Prioritários</p>
        </div>
        <div className="p-6 space-y-3">
          {contacts.map((contact) => (
            <a key={contact.name} href={`tel:${contact.number.replace(/\s/g, '')}`} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-red-500 group transition-all">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600">{contact.name}</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">{contact.description}</p>
              </div>
              <span className="text-xl font-black text-red-600">{contact.number}</span>
            </a>
          ))}
        </div>
        <button onClick={onClose} className="w-full p-6 text-slate-400 font-black uppercase tracking-widest text-xs border-t border-slate-100 dark:border-slate-800">Fechar Janela</button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [dailyScenario, setDailyScenario] = useState<string | null>(null);
  const [loadingScenario, setLoadingScenario] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  
  const [location, setLocation] = useState('Cascais, Portugal');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
  const [trainingData, setTrainingData] = useState<TrainingItem[]>([]);
  const [trainingSources, setTrainingSources] = useState<any[]>([]);
  const [loadingTraining, setLoadingTraining] = useState(false);

  const [conditions, setConditions] = useState({
    airTemp: '22°C',
    waterTemp: '17°C',
    waves: '1.2m',
    windSpeed: '15km/h',
    windDir: 'N',
    uvIndex: '5',
    condition: 'Céu Limpo',
    riskLevel: 'low',
    alerts: [] as string[]
  });

  const [notification, setNotification] = useState<{message: string, type: 'error' | 'warning'} | null>(null);

  const fetchData = useCallback(async (loc: string) => {
    setIsSyncing(true);
    try {
      const result = await getBeachConditions(loc);
      setConditions(result.data);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

      const risk = result.data.riskLevel?.toLowerCase();
      if (risk === 'extreme' || risk === 'high') {
        setNotification({ 
          message: `ALERTA CRÍTICO: Risco ${risk.toUpperCase()} detetado em ${loc.split(',')[0]}!`, 
          type: 'error' 
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const fetchTrainingData = useCallback(async () => {
    setLoadingTraining(true);
    try {
      const result = await getTrainingSchedules();
      setTrainingData(result.data);
      setTrainingSources(result.sources);
    } catch (e) {
      console.error("Error loading trainings:", e);
    } finally {
      setLoadingTraining(false);
    }
  }, []);

  const loadScenario = useCallback(async () => {
    setLoadingScenario(true);
    const scenario = await generateDailyScenario();
    setDailyScenario(scenario);
    setLoadingScenario(false);
  }, []);

  useEffect(() => {
    // Hour interval for weather sync
    const interval = setInterval(() => { fetchData(location); }, 3600000);
    return () => clearInterval(interval);
  }, [location, fetchData]);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (currentTab === 'home' && !lastUpdated) {
      fetchData(location);
      loadScenario();
    }
    if (currentTab === 'training' && trainingData.length === 0) {
      fetchTrainingData();
    }
  }, [currentTab, fetchData, loadScenario, fetchTrainingData, location, lastUpdated, trainingData.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(searchQuery);
      fetchData(searchQuery);
      setSearchQuery('');
    }
  };

  const renderHome = () => (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Risk Map Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter uppercase">Monitorização Costeira</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Estados de Perigo em Tempo Real</p>
        </div>
        <BeachMap />
      </section>

      {/* Main Condition Dashboard - Real Time Data Display */}
      <section className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-8 md:p-14 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-10">
            <div className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700">
              <span className={`w-2.5 h-2.5 rounded-full ${isSyncing ? 'bg-blue-500 animate-ping' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`}></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sincronização Ativa</span>
            </div>
            <div className="flex items-center space-x-2 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
               <span>🕒 Atualizado: {lastUpdated}</span>
            </div>
          </div>

          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mb-4 leading-none group-hover:translate-x-1 transition-transform">{location.split(',')[0]}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-xl text-lg font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{conditions.condition}</span>
                <span className="opacity-20 text-2xl font-black hidden sm:inline">•</span>
                <div className={`flex items-center px-4 py-1.5 rounded-xl border-2 font-black uppercase tracking-widest text-sm ${
                   conditions.riskLevel === 'extreme' ? 'bg-rose-500/10 text-rose-600 border-rose-600/20' : 
                   conditions.riskLevel === 'high' ? 'bg-orange-500/10 text-orange-600 border-orange-600/20' : 
                   conditions.riskLevel === 'moderate' ? 'bg-yellow-400/10 text-yellow-600 border-yellow-600/20' : 
                   'bg-emerald-500/10 text-emerald-600 border-emerald-600/20'
                 }`}>
                  Nível de Risco: {conditions.riskLevel === 'low' ? 'Baixo' : conditions.riskLevel === 'moderate' ? 'Moderado' : conditions.riskLevel === 'high' ? 'Alto' : 'Extremo'}
                </div>
              </div>
            </div>

            {conditions.alerts.length > 0 && (
              <div className="max-w-xs space-y-2 animate-slide-up">
                {conditions.alerts.map((alert, idx) => (
                  <div key={idx} className="bg-rose-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 flex items-center">
                    <span className="mr-2">⚠️</span> {alert}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Temperatura Ar', val: conditions.airTemp, icon: '🌡️', color: 'text-orange-500' },
              { label: 'Altura Ondas', val: conditions.waves, icon: '🌊', sub: `Água ${conditions.waterTemp}`, color: 'text-blue-500' },
              { label: 'Vento', val: conditions.windSpeed, icon: '💨', sub: conditions.windDir, color: 'text-slate-500' },
              { label: 'Índice UV', val: conditions.uvIndex, icon: '☀️', color: 'text-yellow-500' },
            ].map((card, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/40 border-2 border-slate-100 dark:border-slate-800 transition-all hover:scale-[1.05] hover:shadow-xl hover:border-blue-500/20 cursor-default">
                <div className={`text-5xl mb-6 transform group-hover:scale-110 transition-transform ${card.color}`}>{card.icon}</div>
                <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">{card.label}</div>
                <div className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{card.val}</div>
                {card.sub && <div className="text-[10px] font-bold text-slate-500 uppercase mt-2 bg-white dark:bg-slate-900 inline-block px-2 py-0.5 rounded-md shadow-sm">{card.sub}</div>}
              </div>
            ))}
          </div>

          <form onSubmit={handleSearch} className="flex bg-slate-100 dark:bg-slate-800 rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 overflow-hidden max-w-xl transition-all shadow-inner focus-within:border-blue-500/50">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar outra praia (ex: Ericeira)..."
              className="flex-1 bg-transparent px-8 py-6 outline-none text-slate-900 dark:text-white font-bold text-lg placeholder:opacity-50"
            />
            <button type="submit" className="px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">Consultar</button>
          </form>
        </div>
      </section>

      {/* Flag Signaling Section */}
      <section className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <span className="text-9xl">🏁</span>
        </div>
        <h3 className="text-2xl font-black tracking-tighter uppercase mb-8 flex items-center relative z-10">
          <span className="mr-3">🚩</span> Sinalética Oficial ISN
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 relative z-10">
          {BEACH_FLAGS.map((flag) => (
            <div key={flag.color} className="flex flex-col items-center text-center group">
              <div className="w-20 h-14 rounded-xl mb-4 shadow-xl border-4 border-white dark:border-slate-800 group-hover:scale-110 group-hover:rotate-2 transition-all cursor-help" style={{ backgroundColor: flag.hex }} title={flag.name} />
              <h4 className="text-[11px] font-black uppercase tracking-tighter mb-1 group-hover:text-blue-500 transition-colors">{flag.name}</h4>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-tight max-w-[100px]">{flag.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary Content Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-lg border-b-8 border-b-rose-600 group">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black tracking-tighter uppercase group-hover:text-rose-600 transition-colors">Cenário SAR Diário</h3>
            <button onClick={loadScenario} disabled={loadingScenario} className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-all hover:bg-rose-100 dark:hover:bg-rose-900/30 ${loadingScenario ? 'animate-spin' : 'hover:rotate-180'}`}>🔄</button>
          </div>
          {loadingScenario ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-lg w-full"></div>
              <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-lg w-4/5"></div>
              <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-lg w-[90%]"></div>
            </div>
          ) : (
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic text-lg border-l-4 border-rose-500/20 pl-6 py-2">"{dailyScenario}"</p>
          )}
          <div className="mt-8 flex justify-end">
             <button onClick={() => setCurrentTab('assistant')} className="text-[10px] font-black uppercase tracking-widest text-rose-600 hover:underline">Resolver com IA →</button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-lg border-b-8 border-b-blue-600 group">
          <div className="flex items-center space-x-4 mb-8">
             <span className="text-3xl">💡</span>
             <h3 className="text-2xl font-black tracking-tighter uppercase group-hover:text-blue-600 transition-colors">Dica de Prevenção</h3>
          </div>
          <p className="text-slate-700 dark:text-slate-300 font-bold leading-relaxed text-lg bg-blue-50 dark:bg-blue-950/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
            {TIPS[Math.floor(Date.now() / 3600000) % TIPS.length].text}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <Navbar currentTab={currentTab} setTab={setCurrentTab} manuals={MANUALS} isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
      <main className="max-w-5xl mx-auto px-4 pt-28 md:pt-40">
        {currentTab === 'home' && renderHome()}
        {currentTab === 'manuals' && <ManualView />}
        {currentTab === 'quiz' && <QuizView />}
        {currentTab === 'assistant' && <AssistantView />}
        {currentTab === 'training' && <TrainingLocations items={trainingData} sources={trainingSources} loading={loadingTraining} />}
      </main>
      <button onClick={() => setShowEmergency(true)} className="fixed bottom-8 right-8 z-50 bg-red-600 text-white w-20 h-20 rounded-full shadow-[0_0_50px_rgba(220,38,38,0.4)] flex items-center justify-center text-4xl border-4 border-white dark:border-slate-900 active:scale-90 transition-all hover:scale-110">🚨</button>
      <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
    </div>
  );
};

export default App;
