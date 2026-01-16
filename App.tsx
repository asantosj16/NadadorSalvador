
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar.tsx';
import ManualView from './components/ManualView.tsx';
import QuizView from './components/QuizView.tsx';
import AssistantView from './components/AssistantView.tsx';
import BeachMap from './components/BeachMap.tsx';
import TrainingLocations, { TrainingItem } from './components/TrainingLocations.tsx';
import { TIPS, MANUALS } from './constants.tsx';
import { generateDailyScenario, getBeachConditions, getTrainingSchedules } from './services/gemini.ts';

const EmergencyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const contacts = [
    { name: 'Emergência Nacional', number: '112', description: 'Número único de emergência' },
    { name: 'MRCC Lisboa (Marinha)', number: '214 401 919', description: 'Coordenação de Busca e Salvamento' },
    { name: 'ISN (Sede)', number: '210 911 000', description: 'Instituto de Socorros a Náufragos' },
    { name: 'VHF Marítimo', number: 'CH 16', description: 'Canal de Socorro e Segurança' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-zoom-in border border-slate-200 dark:border-slate-800">
        <div className="bg-red-600 p-8 text-white text-center">
          <div className="text-5xl mb-3">🚨</div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Emergência</h2>
          <p className="text-red-100 text-sm opacity-90 font-medium">Linhas Críticas de Coordenação</p>
        </div>
        <div className="p-6 space-y-3">
          {contacts.map((contact) => (
            <a
              key={contact.name}
              href={contact.number === '112' || contact.number.startsWith('2') ? `tel:${contact.number.replace(/\s/g, '')}` : '#'}
              className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all group"
            >
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-700 dark:group-hover:text-red-400">{contact.name}</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest">{contact.description}</p>
              </div>
              <span className="text-xl font-black text-red-600 dark:text-red-500">{contact.number}</span>
            </a>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full p-6 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-t border-slate-100 dark:border-slate-800"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [dailyScenario, setDailyScenario] = useState<string | null>(null);
  const [loadingScenario, setLoadingScenario] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const [location, setLocation] = useState('Nazaré, Portugal');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingConditions, setLoadingConditions] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const lastFetchTimestamp = useRef<number>(0);
  const locationRef = useRef(location);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  const [trainingData, setTrainingData] = useState<TrainingItem[]>([]);
  const [loadingTraining, setLoadingTraining] = useState(false);
  
  const [conditions, setConditions] = useState({
    airTemp: '24°C',
    waterTemp: '18°C',
    waves: '1.5m',
    windSpeed: '18km/h',
    windDir: 'NW',
    uvIndex: 'Moderado',
    condition: 'Céu Limpo'
  });

  const refreshConditions = useCallback(async (loc: string, isManual: boolean = true) => {
    if (isManual) setLoadingConditions(true);
    else setIsSyncing(true);
    
    try {
      const newConditions = await getBeachConditions(loc);
      setConditions(newConditions);
      lastFetchTimestamp.current = Date.now();
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (error) {
      console.error("Erro na atualização:", error);
    } finally {
      if (isManual) setLoadingConditions(false);
      else setTimeout(() => setIsSyncing(false), 2000);
    }
  }, []);

  const loadTrainingData = useCallback(async () => {
    setLoadingTraining(true);
    try {
      const data = await getTrainingSchedules();
      setTrainingData(data);
    } catch (error) {
      console.error("Erro ao carregar formações:", error);
    } finally {
      setLoadingTraining(false);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    if (currentTab === 'home' || currentTab === 'training') {
      if (!dailyScenario) loadScenario();
      if (trainingData.length === 0) loadTrainingData();
    }

    if (!lastUpdated) {
      refreshConditions(location, true);
    }
  }, [currentTab, dailyScenario, lastUpdated, location, refreshConditions, loadTrainingData, trainingData.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshConditions(locationRef.current, false);
    }, 3600000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const timeSinceLastFetch = Date.now() - lastFetchTimestamp.current;
        if (timeSinceLastFetch > 3600000) {
          refreshConditions(locationRef.current, false);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refreshConditions]);

  const loadScenario = async () => {
    setLoadingScenario(true);
    const scenario = await generateDailyScenario();
    setDailyScenario(scenario);
    setLoadingScenario(false);
  };

  const handleSearchRegion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLocation(searchQuery);
    refreshConditions(searchQuery, true);
    setSearchQuery('');
  };

  const handleMapSelect = (beachName: string) => {
    const newLoc = beachName + ", Portugal";
    setLocation(newLoc);
    refreshConditions(newLoc, true);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <div className="space-y-6 animate-fade-in">
            <section className="bg-gradient-to-br from-red-600 to-orange-500 dark:from-red-800 dark:to-orange-900 rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                <span className="text-9xl">🛟</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                    <span>Vigilância Ativa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setShowMap(!showMap)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors flex items-center space-x-2 border border-white/10"
                    >
                      <span>{showMap ? '📊 Dados' : '🗺️ Mapa'}</span>
                    </button>
                    {lastUpdated && (
                      <div className="flex items-center space-x-1 text-[9px] font-black opacity-80 uppercase">
                        {isSyncing && <span className="w-2 h-2 border border-white/40 border-t-white rounded-full animate-spin"></span>}
                        <span>{lastUpdated}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black mb-1 tracking-tighter">Bom turno, NS.</h1>
                <p className="text-red-50 opacity-90 text-base mb-6 font-medium truncate">Posto em <span className="font-bold underline">{location.split(',')[0]}</span></p>
                
                {!showMap ? (
                  <div className="animate-fade-in">
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        { label: 'Céu', val: conditions.condition, sub: `Ar: ${conditions.airTemp}` },
                        { label: 'Mar', val: conditions.waves, sub: `Água: ${conditions.waterTemp}` },
                        { label: 'Vento', val: conditions.windSpeed, sub: `${conditions.windDir}` },
                        { label: 'UV', val: conditions.uvIndex, sub: `Risco Solar` },
                      ].map((card, i) => (
                        <div 
                          key={i} 
                          className={`bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/10 transition-all ${loadingConditions || isSyncing ? 'opacity-50' : 'opacity-100'}`}
                        >
                          <span className="block text-[8px] uppercase font-black opacity-75 tracking-widest mb-1">{card.label}</span>
                          <span className="text-base font-black tracking-tight leading-none block">{card.val}</span>
                          <span className="text-[10px] opacity-80 mt-1 block font-medium">{card.sub}</span>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSearchRegion} className="flex bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden shadow-inner">
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Mudar localização..."
                        className="flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-red-100 text-white w-full text-sm font-medium"
                      />
                      <button 
                        type="submit" 
                        disabled={loadingConditions}
                        className="px-4 bg-white text-red-600 font-black text-xs uppercase hover:bg-red-50 transition-colors"
                      >
                        OK
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="animate-zoom-in">
                    <BeachMap onSelectBeach={handleMapSelect} selectedBeach={location} currentConditions={conditions} />
                  </div>
                )}
              </div>
            </section>

            {/* Inclusão de Resumo de Vagas na Home */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Vagas Próximas</h2>
                <button 
                  onClick={() => setCurrentTab('training')} 
                  className="text-[10px] font-black text-red-600 dark:text-red-500 uppercase tracking-widest hover:underline"
                >
                  Ver Todas
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loadingTraining ? (
                   <div className="h-24 bg-slate-100 dark:bg-slate-900 rounded-2xl animate-pulse"></div>
                ) : trainingData.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-sm text-slate-900 dark:text-slate-100">{item.location}</h4>
                      <p className="text-[9px] text-slate-500 font-bold uppercase">{item.type} • {item.dates}</p>
                    </div>
                    <a href={item.link} target="_blank" className="bg-red-50 dark:bg-red-950 p-2 rounded-lg text-red-600 dark:text-red-400">
                       <span className="text-xs">↗</span>
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 border-b-4 border-b-blue-500">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">Dica Segura</h2>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Prevenção</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 italic text-sm font-medium leading-relaxed">"{TIPS[Math.floor(Date.now() / (1000 * 60 * 60)) % TIPS.length].text}"</p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 border-b-4 border-b-red-500">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">Treino Mental</h2>
                  <button onClick={loadScenario} className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-full hover:rotate-180 transition-transform">🔄</button>
                </div>
                {loadingScenario ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-full"></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-4/5"></div>
                  </div>
                ) : (
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-medium">{dailyScenario || "Prepare-se para agir."}</p>
                )}
              </div>
            </section>

            <section className="pb-24 md:pb-0">
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Módulos</h2>
               </div>
              <div className="grid grid-cols-4 gap-3">
                <button onClick={() => setCurrentTab('training')} className="aspect-square bg-slate-900 dark:bg-slate-800 text-white rounded-2xl flex flex-col items-center justify-center space-y-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                  <span className="text-3xl">🎓</span>
                  <span className="font-black text-[9px] uppercase tracking-widest text-center px-1">Vagas</span>
                </button>
                <button onClick={() => setCurrentTab('manuals')} className="aspect-square bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:border-red-500 active:scale-95 transition-all shadow-sm">
                  <span className="text-3xl">📖</span>
                  <span className="font-black text-[9px] uppercase tracking-widest text-slate-900 dark:text-slate-100 text-center px-1">Manuais</span>
                </button>
                <button onClick={() => setCurrentTab('quiz')} className="aspect-square bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:border-red-500 active:scale-95 transition-all shadow-sm">
                  <span className="text-3xl">📝</span>
                  <span className="font-black text-[9px] uppercase tracking-widest text-slate-900 dark:text-slate-100 text-center px-1">Quiz</span>
                </button>
                <button onClick={() => setShowEmergency(true)} className="aspect-square bg-red-600 text-white rounded-2xl flex flex-col items-center justify-center space-y-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                  <span className="text-3xl">🚨</span>
                  <span className="font-black text-[9px] uppercase tracking-widest text-center px-1">S.O.S</span>
                </button>
              </div>
            </section>
          </div>
        );
      case 'training':
        return <TrainingLocations items={trainingData} loading={loadingTraining} />;
      case 'manuals':
        return <ManualView />;
      case 'quiz':
        return <QuizView />;
      case 'assistant':
        return <AssistantView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <Navbar 
        currentTab={currentTab} 
        setTab={setCurrentTab} 
        manuals={MANUALS} 
        isDark={isDark} 
        toggleDark={() => setIsDark(!isDark)}
      />
      
      <main className="max-w-4xl mx-auto px-4 pt-20 md:pt-32 pb-16">
        {renderContent()}
      </main>

      <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
      
      <button 
        onClick={() => setShowEmergency(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-red-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl active:scale-75 transition-all border-4 border-white dark:border-slate-900"
      >
        🚨
      </button>
    </div>
  );
};

export default App;
