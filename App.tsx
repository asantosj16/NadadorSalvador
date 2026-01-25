import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.tsx';
import ManualView from './components/ManualView.tsx';
import QuizView from './components/QuizView.tsx';
import AssistantView from './components/AssistantView.tsx';
import TrainingLocations from './components/TrainingLocations.tsx';
import BeachMap from './components/BeachMap.tsx';
import BeachDataPanel from './components/BeachDataPanel.tsx';
import { TIPS, MANUALS } from './constants.tsx';
import { TrainingItem, BeachConditions, WeatherAlert } from './types.ts';
import { generateDailyScenario, getBeachConditions, getTrainingSchedules } from './services/gemini.ts';
import { BeachPoint, FORECAST_POINTS } from './data/weatherData';

const EmergencyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const contacts = [
    { name: 'Nacional', number: '112', description: 'Número único' },
    { name: 'MRCC Lisboa', number: '214 401 919', description: 'Salvamento Mar' },
    { name: 'VHF', number: 'CH 16', description: 'Socorro Marítimo' },
  ];
  return (
    <div className="fixed inset-0 z-[100] flex items-center sm:items-center justify-center p-3 sm:p-4 bg-slate-900/95 backdrop-blur-lg animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] w-full max-w-xs sm:max-w-sm overflow-hidden shadow-2xl animate-zoom-in border border-slate-200 dark:border-slate-800">
        <div className="bg-red-600 p-6 sm:p-8 text-white text-center">
          <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🚨</div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter">Emergência</h2>
          <p className="text-red-100 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-1">Canais Prioritários</p>
        </div>
        <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
          {contacts.map((contact) => (
            <a key={contact.name} href={`tel:${contact.number.replace(/\s/g, '')}`} className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 active:bg-red-50 transition-colors group">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">{contact.name}</h3>
                <p className="text-[8px] sm:text-[9px] text-slate-500 uppercase tracking-widest">{contact.description}</p>
              </div>
              <span className="text-base sm:text-lg font-black text-red-600">{contact.number}</span>
            </a>
          ))}
        </div>
        <button onClick={onClose} className="w-full p-3 sm:p-4 text-slate-400 font-black uppercase tracking-widest text-[9px] sm:text-[10px] border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors" aria-label="Fechar modal de emergência">Fechar</button>
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
  const [trainingLastUpdated, setTrainingLastUpdated] = useState<string>('');
  const [selectedBeach, setSelectedBeach] = useState<BeachPoint | null>(null);

  const [conditions, setConditions] = useState<BeachConditions>({
    airTemp: '--', waterTemp: '--', waves: '--', windSpeed: '--', windDir: '--', uvIndex: '--',
    condition: 'A carregar...', riskLevel: 'low', alerts: [], ipmaIcon: '⌛'
  });

  // Mapa de meses para parsing de datas
  const MONTH_MAP: { [key: string]: number } = {
    'janeiro': 1, 'fevereiro': 2, 'março': 3, 'abril': 4, 'maio': 5, 'junho': 6,
    'julho': 7, 'agosto': 8, 'setembro': 9, 'outubro': 10, 'novembro': 11, 'dezembro': 12
  };

  // Extrai o primeiro mês de uma string de datas
  const extractFirstMonth = (dateStr: string): number => {
    const lowerStr = dateStr.toLowerCase();
    for (const [month, num] of Object.entries(MONTH_MAP)) {
      if (lowerStr.includes(month)) {
        return num;
      }
    }
    return 13; // Retorna valor alto se não encontrar mês
  };

  const parseTrainingDate = (dateStr: string): Date => {
    const nowYear = new Date().getFullYear();
    const match = dateStr.toLowerCase().match(/(\d{1,2})\s+de\s+(\w+)\s+(\d{4})/);
    if (match) {
      const day = Number(match[1]);
      const month = MONTH_MAP[match[2]] || 1;
      const year = Number(match[3]);
      return new Date(year, month - 1, day);
    }
    const monthNum = extractFirstMonth(dateStr);
    const yearMatch = dateStr.match(/(20\d{2})/);
    const year = yearMatch ? Number(yearMatch[1]) : nowYear;
    return new Date(year, (monthNum - 1) || 0, 1);
  };

  // Função para obter as próximas 2 formações/exames por data
  const getUpcomingTrainings = (trainings: TrainingItem[]): TrainingItem[] => {
    const now = new Date();
    return trainings
      .map(training => ({ ...training, dateValue: parseTrainingDate(training.dates) }))
      .filter(training => training.dateValue >= now)
      .sort((a, b) => a.dateValue.getTime() - b.dateValue.getTime())
      .slice(0, 2);
  };

  const getNearestByType = (trainings: TrainingItem[], type: TrainingItem['type']): TrainingItem | null => {
    const now = new Date();
    const filtered = trainings
      .filter(t => t.type === type)
      .map(t => ({ ...t, dateValue: parseTrainingDate(t.dates) }))
      .filter(t => t.dateValue >= now)
      .sort((a, b) => a.dateValue.getTime() - b.dateValue.getTime());
    return filtered[0] || null;
  };

  const fetchData = useCallback(async (loc: string) => {
    try {
      const data = await getBeachConditions(loc);
      setConditions(data);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (error) {
      console.error('Erro ao buscar condições meteorológicas:', error);
      // Manter dados anteriores em caso de erro
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, []);

  const fetchTrainingData = useCallback(async () => {
    setLoadingTraining(true);
    const data = await getTrainingSchedules();
    setTrainingData(data);
    setTrainingLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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

  // Atualizar dados quando a localização mudar
  useEffect(() => {
    if (currentTab === 'home' && location) {
      fetchData(location);
    }
  }, [location, currentTab, fetchData]);

  // Atualização automática a cada 10 minutos
  useEffect(() => {
    if (currentTab !== 'home') return;

    const interval = setInterval(() => {
      if (location) {
        fetchData(location);
      }
    }, 600000); // 10 minutos

    return () => clearInterval(interval);
  }, [location, currentTab, fetchData]);

  useEffect(() => {
    if (currentTab === 'home') {
      if (!dailyScenario) loadScenario();
    }
    if (trainingData.length === 0) {
      fetchTrainingData();
    }
  }, [currentTab, loadScenario, fetchTrainingData, dailyScenario, trainingData.length]);

  // Atualizar formações a cada hora
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTrainingData();
    }, 3600000);

    return () => clearInterval(interval);
  }, [fetchTrainingData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = searchQuery.trim();
      setLocation(query.includes(',') ? query : `${query}, Portugal`);
      
      // Tentar encontrar a praia no mapa baseada na busca
      const foundBeach = FORECAST_POINTS.find(point => 
        point.name.toLowerCase().includes(query.toLowerCase()) ||
        point.region.toLowerCase().includes(query.toLowerCase())
      );
      
      if (foundBeach) {
        setSelectedBeach(foundBeach);
      }
      
      setSearchQuery('');
    }
  };

  const renderHome = () => (
    <div className="space-y-8 md:space-y-12 animate-fade-in pb-24">
      {/* Painel Unificado de Vigilância e Dados */}
      <section>
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end px-1 gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter uppercase">Central de Vigilância</h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Dados Tempo.pt em Tempo Real • {lastUpdated}</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[8px] text-green-500 font-bold uppercase tracking-wider">Live</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => fetchData(location)} 
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-700 transition-colors active:scale-95 flex items-center space-x-2"
          >
            <span>🔄</span>
            <span>Atualizar Agora</span>
          </button>
        </div>

        {/* Painel Único Integrado */}
        <div className="relative p-1 bg-gradient-to-br from-blue-500/50 via-indigo-600/50 to-purple-600/50 rounded-[3rem] shadow-2xl">
          <div className="bg-slate-950 rounded-[2.9rem] overflow-hidden">
            
            {/* Seção de Localização e Busca */}
            <div className="p-6 md:p-8 border-b border-slate-800">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Localização Atual */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="text-3xl md:text-4xl">📍</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter truncate">{location.split(',')[0]}</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">{conditions.condition} {conditions.ipmaIcon}</p>
                  </div>
                </div>

                {/* Busca de Localização */}
                <form onSubmit={handleSearch} className="flex bg-slate-900 border border-slate-700 rounded-xl overflow-hidden w-full md:w-auto md:min-w-[300px]">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ex: Nazaré, Porto, Lisboa..."
                    className="flex-1 bg-transparent px-4 py-2.5 outline-none font-bold text-xs text-white placeholder:text-slate-500"
                  />
                  <button type="submit" className="px-5 bg-blue-600 text-white font-black uppercase text-[9px] hover:bg-blue-700 transition-colors active:scale-95">
                    🔍
                  </button>
                </form>
              </div>

              {/* Indicadores de Risco */}
              <div className="flex flex-wrap gap-2 mt-4">
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full border font-black uppercase tracking-widest text-[9px] ${
                  conditions.riskLevel === 'extreme' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                  conditions.riskLevel === 'high' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                  'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                }`}>
                  Risco: {conditions.riskLevel.toUpperCase()}
                </div>
                {conditions.alerts && conditions.alerts.length > 0 && conditions.alerts.map((alert: WeatherAlert, idx: number) => (
                  <div key={idx} className="inline-flex items-center px-3 py-1.5 rounded-full border bg-yellow-400/10 text-yellow-500 border-yellow-500/20 font-black uppercase tracking-widest text-[9px]">
                    ⚠️ {alert.type}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Principal: Mapa e Dados Meteorológicos */}
            <div className="grid grid-cols-1 gap-0">

              {/* Mapa Interativo */}
              <div className="p-6 md:p-8 bg-slate-900/30">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                  Mapa de Praias
                </h4>
                <BeachMap onSelectBeach={(beach) => {
                  setSelectedBeach(beach);
                  // Atualizar localização baseada na região da praia
                  const newLocation = `${beach.region}, Portugal`;
                  setLocation(newLocation);
                }} />
              </div>

            </div>

            {/* Painel Expandido - Dados Detalhados da Praia Selecionada */}
              {selectedBeach && (
                <div className="p-6 md:p-8 border-t border-slate-800 bg-slate-900/20 mt-4 md:mt-6 rounded-b-[2.5rem]">
                <BeachDataPanel beach={selectedBeach} />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-1 gap-3">
           <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase flex items-center">
             <span className="mr-2">🎓</span> Próximas Formações e Exames
           </h3>
           <button onClick={() => setCurrentTab('training')} className="text-[9px] font-black text-red-600 uppercase tracking-widest hover:text-red-700 transition-colors whitespace-nowrap active:scale-95">Ver Todas as Formações →</button>
        </div>
        {loadingTraining ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 animate-pulse">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-20"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-3 w-32"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : trainingData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {getUpcomingTrainings(trainingData).map((item, i) => (
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
            <p className="text-sm font-bold">Nenhuma formação próxima no momento</p>
            <button onClick={() => setCurrentTab('training')} className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Ver calendário completo →
            </button>
          </div>
        )}
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 pb-12">
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 md:p-10 rounded-xl sm:rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg border-b-4 sm:border-b-6 md:border-b-8 border-b-rose-600">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg md:text-xl font-black tracking-tighter uppercase">Dilema de Intervenção</h3>
            <button onClick={loadScenario} disabled={loadingScenario} className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex-shrink-0" aria-label="Recarregar dilema de intervenção">🔄</button>
          </div>
          {loadingScenario ? <div className="h-12 sm:h-16 bg-slate-50 dark:bg-slate-800 animate-pulse rounded-lg"></div> : <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium italic leading-relaxed border-l-4 border-rose-500/20 pl-3 sm:pl-4">"{dailyScenario}"</p>}
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 md:p-10 rounded-xl sm:rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg border-b-4 sm:border-b-6 md:border-b-8 border-b-blue-600">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
             <span className="text-lg sm:text-2xl flex-shrink-0">💡</span>
             <h3 className="text-base sm:text-lg md:text-xl font-black tracking-tighter uppercase">Insight Técnico</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-bold leading-relaxed bg-blue-50 dark:bg-blue-950/20 p-3 sm:p-4 rounded-lg sm:rounded-2xl">
            {TIPS[Math.floor(Date.now() / 3600000) % TIPS.length].text}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <Navbar currentTab={currentTab} setTab={setCurrentTab} manuals={MANUALS} isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
      <main className="w-full px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 md:pt-40 pb-20 max-w-6xl mx-auto">
        {currentTab === 'home' && renderHome()}
        {currentTab === 'manuals' && <ManualView />}
        {currentTab === 'quiz' && <QuizView />}
        {currentTab === 'assistant' && <AssistantView />}
        {currentTab === 'training' && <TrainingLocations items={trainingData} loading={loadingTraining} lastUpdated={trainingLastUpdated} />}
      </main>
      
      {/* Footer com créditos IPMA e ISN */}
      <footer className="w-full px-3 sm:px-4 md:px-6 pb-24 max-w-6xl mx-auto">
        <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg sm:rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-[8px] sm:text-[9px] text-slate-500">
            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-lg flex-shrink-0">🌊</span>
              <div className="text-center sm:text-left">
                <p className="font-black uppercase tracking-wider">Dados Meteorológicos</p>
                <p className="font-bold">Fonte: Tempo.pt - Meteorologia em Tempo Real</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <a 
                href="https://www.tempo.pt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-600 text-white rounded-md sm:rounded-lg font-black uppercase tracking-wider text-[7px] sm:text-[8px] hover:bg-blue-700 transition-colors"
              >
                Tempo.pt
              </a>
              <span className="text-slate-400 hidden sm:block">•</span>
              <span className="font-bold">Tempo Real</span>
            </div>
          </div>
        </div>

        {/* Seção ISN/Autoridade Marítima */}
        <div className="mt-3 sm:mt-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg sm:rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-[8px] sm:text-[9px] text-slate-500">
            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-lg flex-shrink-0">🛟</span>
              <div className="text-center sm:text-left">
                <p className="font-black uppercase tracking-wider">Autoridade Marítima Nacional</p>
                <p className="font-bold">ISN - Instituto de Socorros a Náufragos</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 justify-center sm:justify-end flex-shrink-0">
              <a 
                href="https://www.amn.pt/ISN/paginas/missao.aspx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-600 text-white rounded-md sm:rounded-lg font-black uppercase tracking-wider text-[7px] sm:text-[8px] hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Autoridade Marítima
              </a>
              <a 
                href="https://www.isn.pt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-red-600 text-white rounded-md sm:rounded-lg font-black uppercase tracking-wider text-[7px] sm:text-[8px] hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                ISN.pt
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      <button 
        onClick={() => setShowEmergency(true)} 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-red-600 text-white w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full shadow-2xl flex items-center justify-center text-2xl sm:text-3xl md:text-4xl border-4 border-white dark:border-slate-900 active:scale-90 transition-transform hover:bg-red-700 hover:shadow-red-600/50"
        aria-label="Abrir contactos de emergência"
      >
        🚨
      </button>
      <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
    </div>
  );
};

export default App;
