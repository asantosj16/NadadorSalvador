
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar.tsx';
import ManualView from './components/ManualView.tsx';
import QuizView from './components/QuizView.tsx';
import AssistantView from './components/AssistantView.tsx';
import BeachMap from './components/BeachMap.tsx';
import { TIPS, MANUALS } from './constants.tsx';
import { generateDailyScenario, getBeachConditions } from './services/gemini.ts';

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
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const lastFetchTimestamp = useRef<number>(0);
  
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
    
    try {
      console.debug(`[Background Sync] Atualizando condições para: ${loc}`);
      const newConditions = await getBeachConditions(loc);
      setConditions(newConditions);
      lastFetchTimestamp.current = Date.now();
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (error) {
      console.error("Erro na atualização automática:", error);
    } finally {
      if (isManual) setLoadingConditions(false);
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

  // Ciclo de Vida: Carga Inicial e Cenários Diários
  useEffect(() => {
    // Carregar cenário se estiver na home (IA Task)
    if (currentTab === 'home' && !dailyScenario) {
      loadScenario();
    }

    // Garantir que a primeira carga de condições acontece assim que a app inicia, 
    // independentemente da aba, para que os dados estejam prontos.
    if (!lastUpdated) {
      refreshConditions(location, currentTab === 'home');
    }
  }, [currentTab, dailyScenario, lastUpdated, location, refreshConditions]);

  // Ciclo de Vida: Atualização Automática de Hora em Hora & Visibilidade
  useEffect(() => {
    // 1. Configurar Intervalo de 1 Hora (3.600.000 ms)
    const interval = setInterval(() => {
      refreshConditions(location, false); // Atualização silenciosa em background
    }, 3600000);

    // 2. Garantir frescura dos dados ao voltar para a App (Visibility Change)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const timeSinceLastFetch = Date.now() - lastFetchTimestamp.current;
        const oneHourInMs = 3600000;
        
        // Se a app esteve suspensa e os dados têm mais de 1 hora, refrescar imediatamente
        if (timeSinceLastFetch > oneHourInMs) {
          console.debug("[Background Sync] Dados obsoletos detetados após retorno. Refrescando...");
          refreshConditions(location, false);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location, refreshConditions]);

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
          <div className="space-y-8 animate-fade-in">
            <section className="bg-gradient-to-br from-red-600 to-orange-500 dark:from-red-800 dark:to-orange-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group transition-all duration-500">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <span className="text-9xl">🛟</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span>Vigilância Ativa</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setShowMap(!showMap)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors flex items-center space-x-2"
                    >
                      <span>{showMap ? '📊 Dados' : '🗺️ Mapa'}</span>
                    </button>
                    {lastUpdated && (
                      <div className="text-[10px] font-bold opacity-75 uppercase tracking-widest mt-1">
                        Atu. {lastUpdated}
                      </div>
                    )}
                  </div>
                </div>
                
                <h1 className="text-5xl font-black mb-2 tracking-tighter">Bom turno, NS.</h1>
                <p className="text-red-50 opacity-90 text-lg mb-8 font-medium">Posto atual em <span className="font-bold underline decoration-white/30">{location}</span>.</p>
                
                {!showMap ? (
                  <div className="animate-fade-in">
                    <form onSubmit={handleSearchRegion} className="mb-10 flex max-w-md bg-white/10 backdrop-blur-xl rounded-[1.25rem] border border-white/20 overflow-hidden focus-within:ring-4 focus-within:ring-white/30 transition-all shadow-inner">
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Mudar localização..."
                        className="flex-1 bg-transparent px-5 py-4 outline-none placeholder:text-red-100 text-white w-full font-medium"
                      />
                      <button 
                        type="submit" 
                        disabled={loadingConditions}
                        className="px-8 bg-white text-red-600 font-black hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {loadingConditions ? '...' : 'IR'}
                      </button>
                    </form>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className={`bg-white/20 backdrop-blur-xl rounded-[1.5rem] p-5 border border-white/10 transition-all ${loadingConditions ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
                        <span className="block text-[10px] uppercase font-black opacity-75 tracking-widest mb-1">Céu</span>
                        <span className="text-xl font-black tracking-tight leading-none block mt-1">{conditions.condition}</span>
                        <span className="text-xs opacity-80 mt-1 block">Ar: {conditions.airTemp}</span>
                      </div>
                      <div className={`bg-white/20 backdrop-blur-xl rounded-[1.5rem] p-5 border border-white/10 transition-all ${loadingConditions ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
                        <span className="block text-[10px] uppercase font-black opacity-75 tracking-widest mb-1">Mar</span>
                        <span className="text-xl font-black tracking-tight leading-none block mt-1">{conditions.waves}</span>
                        <span className="text-xs opacity-80 mt-1 block">Água: {conditions.waterTemp}</span>
                      </div>
                      <div className={`bg-white/20 backdrop-blur-xl rounded-[1.5rem] p-5 border border-white/10 transition-all ${loadingConditions ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
                        <span className="block text-[10px] uppercase font-black opacity-75 tracking-widest mb-1">Vento</span>
                        <span className="text-xl font-black tracking-tight leading-none block mt-1">{conditions.windSpeed}</span>
                        <span className="text-xs opacity-80 mt-1 block">Dir: {conditions.windDir}</span>
                      </div>
                      <div className={`bg-white/20 backdrop-blur-xl rounded-[1.5rem] p-5 border border-white/10 transition-all ${loadingConditions ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
                        <span className="block text-[10px] uppercase font-black opacity-75 tracking-widest mb-1">Rad. UV</span>
                        <span className="text-xl font-black tracking-tight leading-none block mt-1">{conditions.uvIndex}</span>
                        <span className="text-xs opacity-80 mt-1 block">Risco Solar</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-zoom-in">
                    <BeachMap onSelectBeach={handleMapSelect} selectedBeach={location} currentConditions={conditions} />
                    <div className="mt-4 text-[10px] font-bold text-white/60 uppercase tracking-widest text-center">
                      Clique num marcador para alternar o posto de vigilância
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 p-8 hover:shadow-lg transition-all border-b-4 border-b-blue-500">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Dica de Segurança</h2>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Prevenção</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 italic font-medium leading-relaxed">"{TIPS[Math.floor(Date.now() / (1000 * 60 * 60)) % TIPS.length].text}"</p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 p-8 hover:shadow-lg transition-all border-b-4 border-b-red-500">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Treino Mental</h2>
                  <button onClick={loadScenario} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full hover:rotate-180 transition-transform duration-500">🔄</button>
                </div>
                {loadingScenario ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-full"></div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-5/6"></div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-4/6"></div>
                  </div>
                ) : (
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">{dailyScenario || "Prepare-se para agir."}</p>
                )}
              </div>
            </section>

            <section className="space-y-6 pb-24 md:pb-0">
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Módulos de Trabalho</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onClick={() => setCurrentTab('manuals')} className="aspect-square bg-slate-900 dark:bg-slate-800 text-white rounded-[2rem] flex flex-col items-center justify-center space-y-3 hover:scale-[1.05] active:scale-95 transition-all shadow-xl">
                  <span className="text-4xl">📖</span>
                  <span className="font-black text-xs uppercase tracking-widest">Manuais</span>
                </button>
                <button onClick={() => setCurrentTab('quiz')} className="aspect-square bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center space-y-3 hover:border-red-500 dark:hover:border-red-700 active:scale-95 transition-all group shadow-sm">
                  <span className="text-4xl">📝</span>
                  <span className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400">Quiz</span>
                </button>
                <button onClick={() => setCurrentTab('assistant')} className="aspect-square bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center space-y-3 hover:border-red-500 dark:hover:border-red-700 active:scale-95 transition-all group shadow-sm">
                  <span className="text-4xl">🤖</span>
                  <span className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400">IA Apoio</span>
                </button>
                <button onClick={() => setShowEmergency(true)} className="aspect-square bg-red-600 text-white rounded-[2rem] flex flex-col items-center justify-center space-y-3 hover:scale-[1.05] active:scale-95 transition-all shadow-xl">
                  <span className="text-4xl">🚨</span>
                  <span className="font-black text-xs uppercase tracking-widest">S.O.S</span>
                </button>
              </div>
            </section>
          </div>
        );
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 selection:bg-red-100 selection:text-red-900">
      <Navbar 
        currentTab={currentTab} 
        setTab={setCurrentTab} 
        manuals={MANUALS} 
        isDark={isDark} 
        toggleDark={() => setIsDark(!isDark)}
      />
      
      <main className="max-w-4xl mx-auto px-4 pt-24 md:pt-32 pb-16">
        {renderContent()}
      </main>

      <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
      
      <button 
        onClick={() => setShowEmergency(true)}
        className="md:hidden fixed bottom-24 right-6 z-40 bg-red-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl active:scale-75 transition-all border-4 border-white dark:border-slate-900"
      >
        🚨
      </button>
    </div>
  );
};

export default App;
