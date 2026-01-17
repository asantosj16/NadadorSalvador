
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
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  
  const [location, setLocation] = useState('Cascais, Portugal');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
  const [trainingData, setTrainingData] = useState<TrainingItem[]>([]);
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
    alerts: [] as any[],
    ipmaIcon: '☀️'
  });

  const fetchData = useCallback(async (loc: string) => {
    setIsSyncing(true);
    try {
      const data = await getBeachConditions(loc);
      setConditions(data);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
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
    <div className="space-y-8 md:space-y-12 animate-fade-in pb-24">
      {/* Risk Map Section */}
      <section>
        <div className="mb-6 flex justify-between items-end px-1">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter uppercase">Vigilância</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] mt-1">IPMA & ISN Real-Time</p>
          </div>
          <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sinc: {lastUpdated}</div>
        </div>

        {/* Real-time Weather Section - Mobile Optimized */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-14 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
            <div className="w-full">
              <div className="flex items-center space-x-3 mb-3">
                 <span className="text-5xl md:text-7xl drop-shadow-md">{conditions.ipmaIcon}</span>
                 <div className="min-w-0">
                   <h1 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter leading-none truncate">{location.split(',')[0]}</h1>
                   <p className="text-sm md:text-lg font-bold text-slate-500 mt-1">{conditions.condition}</p>
                 </div>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-xl border-2 font-black uppercase tracking-widest text-[9px] md:text-xs ${
                conditions.riskLevel === 'extreme' ? 'bg-red-500/10 text-red-600 border-red-500/20' : 
                conditions.riskLevel === 'high' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' : 
                'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
              }`}>
                Risco: {conditions.riskLevel.toUpperCase()}
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-2">
              {conditions.alerts.map((alert, i) => (
                <div key={i} className={`p-3 rounded-2xl border-2 flex items-center space-x-3 w-full animate-slide-up ${
                  alert.level === 'Vermelho' ? 'bg-red-600 text-white border-red-400' :
                  alert.level === 'Laranja' ? 'bg-orange-500 text-white border-orange-300' :
                  'bg-yellow-400 text-slate-900 border-yellow-300'
                }`}>
                  <span className="text-lg">⚠️</span>
                  <div className="min-w-0">
                    <h5 className="text-[9px] font-black uppercase leading-none mb-1 truncate">{alert.type}</h5>
                    <p className="text-[9px] font-bold opacity-90 leading-tight">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-10">
            {[
              { label: 'Temperatura Ar', val: conditions.airTemp, icon: '🌡️', color: 'text-orange-500' },
              { label: 'Ondulação', val: conditions.waves, icon: '🌊', color: 'text-blue-500' },
              { label: 'Vento', val: conditions.windSpeed, icon: '💨', sub: conditions.windDir, color: 'text-slate-500' },
              { label: 'Índice UV', val: conditions.uvIndex, icon: '☀️', color: 'text-yellow-500' },
            ].map((card, i) => (
              <div key={i} className="p-5 md:p-8 rounded-[1.8rem] md:rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/40 border-2 border-slate-100 dark:border-slate-800 active:scale-95 transition-transform">
                <div className={`text-3xl md:text-4xl mb-3 ${card.color}`}>{card.icon}</div>
                <div className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</div>
                <div className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{card.val}</div>
                {card.sub && <div className="text-[9px] font-bold text-slate-500 mt-1 uppercase">{card.sub}</div>}
              </div>
            ))}
          </div>

          <form onSubmit={handleSearch} className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden max-w-md w-full">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Localidade..."
              className="flex-1 bg-transparent px-4 py-3.5 outline-none font-bold text-sm dark:text-white"
            />
            <button type="submit" className="px-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase text-[9px]">Ir</button>
          </form>
        </div>

        <BeachMap />
      </section>

      {/* 2026 Training Section */}
      <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="flex justify-between items-center mb-6 px-1">
           <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase flex items-center">
             <span className="mr-2">🎓</span> Editais 2026
           </h3>
           <button onClick={() => setCurrentTab('training')} className="text-[9px] font-black text-red-600 uppercase tracking-widest">Mais →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trainingData.slice(0, 3).map((item, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
               <span className="text-[7px] font-black uppercase bg-red-100 dark:bg-red-900/30 text-red-600 px-2 py-0.5 rounded-md mb-2 inline-block">{item.type}</span>
               <h4 className="font-black text-slate-900 dark:text-slate-100 leading-tight mb-1 text-sm">{item.location}</h4>
               <p className="text-[9px] text-slate-500 font-bold mb-3">{item.dates}</p>
               <a href={item.link} className="text-[8px] font-black text-blue-600 uppercase tracking-widest flex items-center">Info ↗</a>
            </div>
          ))}
        </div>
      </section>
      
      {/* Scenario & Tips - Mobile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-12">
        <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg border-b-8 border-b-rose-600">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black tracking-tighter uppercase">Dilema SAR</h3>
            <button onClick={loadScenario} disabled={loadingScenario} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm">🔄</button>
          </div>
          {loadingScenario ? <div className="h-16 bg-slate-50 animate-pulse rounded-xl"></div> : <p className="text-slate-600 dark:text-slate-400 font-medium italic text-sm leading-relaxed border-l-4 border-rose-500/20 pl-4">"{dailyScenario}"</p>}
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg border-b-8 border-b-blue-600">
          <div className="flex items-center space-x-3 mb-6">
             <span className="text-2xl">💡</span>
             <h3 className="text-xl font-black tracking-tighter uppercase">Dica</h3>
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
      <main className="max-w-5xl mx-auto px-4 pt-24 md:pt-40">
        {currentTab === 'home' && renderHome()}
        {currentTab === 'manuals' && <ManualView />}
        {currentTab === 'quiz' && <QuizView />}
        {currentTab === 'assistant' && <AssistantView />}
        {currentTab === 'training' && <TrainingLocations items={trainingData} loading={loadingTraining} />}
      </main>
      
      {/* Floating Emergency Button - Scaled for Mobile */}
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
