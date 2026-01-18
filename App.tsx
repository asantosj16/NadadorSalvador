
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.tsx';
import ManualView from './components/ManualView.tsx';
import QuizView from './components/QuizView.tsx';
import AssistantView from './components/AssistantView.tsx';
import TrainingLocations from './components/TrainingLocations.tsx';
import BeachMap from './components/BeachMap.tsx';
import BeachDataPanel from './components/BeachDataPanel.tsx';
import { TIPS, MANUALS } from './constants.tsx';
import { TrainingItem } from './types.ts';
import { generateDailyScenario, getBeachConditions, getTrainingSchedules } from './services/gemini.ts';
import { BeachPoint } from './data/weatherData';

const EmergencyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const contacts = [
    { name: 'Nacional', number: '112', description: 'Número único' },
    { name: 'MRCC Lisboa', number: '214 401 919', description: 'Salvamento Mar' },
    { name: 'VHF', number: 'CH 16', description: 'Socorro Marítimo' },
  ];
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-lg animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl animate-zoom-in border border-slate-200 dark:border-slate-800">
        <div className="bg-red-600 p-8 text-white text-center">
          <div className="text-5xl mb-3">🚨</div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Emergência</h2>
          <p className="text-red-100 text-[10px] font-bold uppercase tracking-widest mt-1">Canais Prioritários</p>
        </div>
        <div className="p-4 space-y-2">
          {contacts.map((contact) => (
            <a key={contact.name} href={`tel:${contact.number.replace(/\s/g, '')}`} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 active:bg-red-50 transition-colors group">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{contact.name}</h3>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest">{contact.description}</p>
              </div>
              <span className="text-lg font-black text-red-600">{contact.number}</span>
            </a>
          ))}
        </div>
        <button onClick={onClose} className="w-full p-4 text-slate-400 font-black uppercase tracking-widest text-[10px] border-t border-slate-100 dark:border-slate-800">Fechar</button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [dailyScenario, setDailyScenario] = useState<string | null>(null);
  const [loadingScenario, setLoadingScenario] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to dark as per screenshot
  
  const [location, setLocation] = useState('Nazaré, Portugal');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [trainingData, setTrainingData] = useState<TrainingItem[]>([]);
  const [loadingTraining, setLoadingTraining] = useState(false);
  const [selectedBeach, setSelectedBeach] = useState<BeachPoint | null>(null);

  const [conditions, setConditions] = useState({
    airTemp: '--', waterTemp: '--', waves: '--', windSpeed: '--', windDir: '--', uvIndex: '--',
    condition: 'A carregar...', riskLevel: 'low', alerts: [] as any[], ipmaIcon: '⌛'
  });

  const fetchData = useCallback(async (loc: string) => {
    try {
      const data = await getBeachConditions(loc);
      setConditions(data);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const fetchTrainingData = useCallback(async () => {
    setLoadingTraining(true);
    const data = await getTrainingSchedules();
    setTrainingData(data);
    setLoadingTraining(false);
  }, []);

  const loadScenario = useCallback(async () => {
    setLoadingScenario(true);
    const scenario = await generateDailyScenario();
    setDailyScenario(scenario);
    setLoadingScenario(false);
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (currentTab === 'home') {
      if (!lastUpdated) fetchData(location);
      if (!dailyScenario) loadScenario();
    }
    if (currentTab === 'training' && trainingData.length === 0) {
      fetchTrainingData();
    }
  }, [currentTab, fetchData, loadScenario, fetchTrainingData, location, lastUpdated, dailyScenario, trainingData.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newLoc = searchQuery.includes(',') ? searchQuery : `${searchQuery}, Portugal`;
      setLocation(newLoc);
      fetchData(newLoc);
      setSearchQuery('');
    }
  };

  const renderHome = () => (
    <div className="space-y-8 md:space-y-12 animate-fade-in pb-24">
      {/* Painel de Vigilância Unificado */}
      <section>
        <div className="mb-6 flex justify-between items-end px-1">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter uppercase">Painel de Vigilância Nacional</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] mt-1">Sistema Integrado IPMA & ISN • Tempo Real</p>
          </div>
          <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sinc: {lastUpdated}</div>
        </div>

        {/* Container Principal Unificado */}
        <div className="relative p-1 bg-gradient-to-br from-blue-500/50 via-indigo-600/50 to-purple-600/50 rounded-[3rem] md:rounded-[4rem] shadow-2xl">
          <div className="bg-slate-950 dark:bg-slate-950 rounded-[2.9rem] md:rounded-[3.9rem] overflow-hidden">
            
            {/* Grid Principal: Dados + Mapa */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
              
              {/* Painel Esquerdo - Dados da Localização */}
              <div className="p-6 md:p-10 relative">
                {/* Background design */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(30,58,138,0.2)_0%,transparent_70%)]"></div>
                </div>

                <div className="relative z-10 flex flex-col gap-6 h-full">
                  {/* Header da Localização */}
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-4xl md:text-6xl font-black text-slate-700/50">📍</span>
                      <div className="min-w-0 flex-1">
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none truncate">{location.split(',')[0]}</h1>
                        <p className="text-base md:text-lg font-bold text-slate-500 mt-1 uppercase tracking-wide">{conditions.condition}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <div className={`inline-flex items-center px-3 py-1.5 rounded-full border font-black uppercase tracking-widest text-[9px] ${
                        conditions.riskLevel === 'extreme' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                        conditions.riskLevel === 'high' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                        'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      }`}>
                        Risco: {conditions.riskLevel.toUpperCase()}
                      </div>
                      
                      {conditions.alerts.length === 0 && (
                        <div className="inline-flex items-center px-3 py-1.5 rounded-full border bg-yellow-400/10 text-yellow-500 border-yellow-500/20 font-black uppercase tracking-widest text-[9px]">
                          ⚠️ Aviso Marítimo
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Grid de Condições */}
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {[
                      { label: 'Temperatura', val: conditions.airTemp, icon: '🌡️', color: 'from-rose-500 to-rose-600' },
                      { label: 'Ondulação', val: conditions.waves, icon: '🌊', color: 'from-blue-500 to-blue-600' },
                      { label: 'Vento', val: conditions.windSpeed, icon: '🌬️', sub: conditions.windDir, color: 'from-slate-400 to-slate-500' },
                      { label: 'Índice UV', val: conditions.uvIndex, icon: '☀️', color: 'from-amber-400 to-amber-500' },
                    ].map((card, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col items-center text-center shadow-inner hover:bg-slate-900 transition-colors">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-xl mb-3 shadow-lg`}>
                          <span className="drop-shadow-md">{card.icon}</span>
                        </div>
                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{card.label}</div>
                        <div className="text-xl md:text-2xl font-black text-white tracking-tight">{card.val}</div>
                        {card.sub && <div className="text-[9px] font-bold text-slate-600 mt-1 uppercase">{card.sub}</div>}
                      </div>
                    ))}
                  </div>

                  {/* Busca de Localização */}
                  <form onSubmit={handleSearch} className="flex bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Alterar Localização..."
                      className="flex-1 bg-transparent px-4 py-3 outline-none font-bold text-xs text-white placeholder:text-slate-600"
                    />
                    <button type="submit" className="px-6 bg-slate-200 text-slate-900 font-black uppercase text-[9px] hover:bg-white transition-colors">
                      Ir
                    </button>
                  </form>
                </div>
              </div>

              {/* Painel Direito - Mapa Interativo */}
              <div className="p-6 md:p-10 bg-slate-900/30">
                <BeachMap onSelectBeach={(beach) => { 
                  setSelectedBeach(beach);
                  setLocation(`${beach.name}, Portugal`); 
                  fetchData(`${beach.name}, Portugal`); 
                }} />
              </div>
            </div>

            {/* Painel Inferior - Dados da Praia Selecionada */}
            <div className="p-6 md:p-10 border-t border-slate-800">
              <BeachDataPanel beach={selectedBeach} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-1 gap-3">
           <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase flex items-center">
             <span className="mr-2">🎓</span> Formações e Editais Ativos 2026
           </h3>
           <button onClick={() => setCurrentTab('training')} className="text-[9px] font-black text-red-600 uppercase tracking-widest hover:text-red-700 transition-colors whitespace-nowrap active:scale-95">Ver Todas as Formações →</button>
        </div>
        {loadingTraining ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 animate-pulse">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-20"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-3 w-32"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : trainingData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainingData.slice(0, 3).map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-800/20 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95">
                 <div className="flex items-center gap-2 mb-3">
                   <span className="text-[7px] font-black uppercase bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-md">{item.type}</span>
                   <span className={`text-[7px] font-black uppercase px-2 py-1 rounded-md ${
                     item.status === 'Inscrições Abertas' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                     item.status === 'Lista de Espera' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                     'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                   }`}>{item.status}</span>
                 </div>
                 <h4 className="font-black text-slate-900 dark:text-slate-100 leading-tight mb-2 text-sm">{item.location}</h4>
                 <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold mb-1 flex items-center">
                   <span className="mr-1">📅</span> {item.dates}
                 </p>
                 <p className="text-[10px] text-slate-500 dark:text-slate-500 font-bold mb-3 flex items-center">
                   <span className="mr-1">🏛️</span> {item.entity}
                 </p>
                 <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                   Consultar Edital <span className="ml-1">↗</span>
                 </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400">
            <span className="text-4xl mb-2 block">📚</span>
            <p className="text-sm font-bold">Nenhuma formação disponível no momento</p>
          </div>
        )}
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-12">
        <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg border-b-8 border-b-rose-600">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black tracking-tighter uppercase">Dilema de Intervenção</h3>
            <button onClick={loadScenario} disabled={loadingScenario} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm">🔄</button>
          </div>
          {loadingScenario ? <div className="h-16 bg-slate-50 animate-pulse rounded-xl"></div> : <p className="text-slate-600 dark:text-slate-400 font-medium italic text-sm leading-relaxed border-l-4 border-rose-500/20 pl-4">"{dailyScenario}"</p>}
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg border-b-8 border-b-blue-600">
          <div className="flex items-center space-x-3 mb-6">
             <span className="text-2xl">💡</span>
             <h3 className="text-xl font-black tracking-tighter uppercase">Insight Técnico</h3>
          </div>
          <p className="text-slate-700 dark:text-slate-300 font-bold text-sm leading-relaxed bg-blue-50 dark:bg-blue-950/20 p-4 rounded-2xl">
            {TIPS[Math.floor(Date.now() / 3600000) % TIPS.length].text}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <Navbar currentTab={currentTab} setTab={setCurrentTab} manuals={MANUALS} isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
      <main className="max-w-5xl mx-auto px-4 pt-24 md:pt-40 pb-20">
        {currentTab === 'home' && renderHome()}
        {currentTab === 'manuals' && <ManualView />}
        {currentTab === 'quiz' && <QuizView />}
        {currentTab === 'assistant' && <AssistantView />}
        {currentTab === 'training' && <TrainingLocations items={trainingData} loading={loadingTraining} />}
      </main>
      
      {/* Footer com créditos IPMA */}
      <footer className="max-w-5xl mx-auto px-4 pb-24">
        <div className="bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[9px] text-slate-500">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🌊</span>
              <div>
                <p className="font-black uppercase tracking-wider">Dados Meteorológicos</p>
                <p className="font-bold">Fonte: IPMA - Instituto Português do Mar e da Atmosfera</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a 
                href="https://www.ipma.pt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-black uppercase tracking-wider hover:bg-blue-700 transition-colors"
              >
                IPMA.pt
              </a>
              <span className="text-slate-400">•</span>
              <span className="font-bold">API Pública</span>
            </div>
          </div>
        </div>
      </footer>
      
      <button 
        onClick={() => setShowEmergency(true)} 
        className="fixed bottom-6 right-6 z-50 bg-red-600 text-white w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl flex items-center justify-center text-3xl md:text-4xl border-4 border-white dark:border-slate-900 active:scale-90 transition-transform"
      >
        🚨
      </button>
      <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
    </div>
  );
};

export default App;
