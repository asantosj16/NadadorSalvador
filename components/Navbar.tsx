
import React from 'react';
import { ManualCategory } from '../types';

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  manuals: ManualCategory[];
  isDark: boolean;
  toggleDark: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentTab, setTab, manuals, isDark, toggleDark }) => {
  const tabs = [
    { id: 'home', label: 'Início', icon: '🛟', title: 'Painel de Vigilância' },
    { id: 'training', label: 'Vagas', icon: '🎓', title: 'Cursos & Exames' },
    { id: 'manuals', label: 'Manuais', icon: '📖', title: 'Manuais Técnicos' },
    { id: 'quiz', label: 'Quiz', icon: '📝', title: 'Treino Técnico' },
    { id: 'assistant', label: 'IA', icon: '🤖', title: 'Assistente SafeGuard' },
  ];

  const currentTabInfo = tabs.find(t => t.id === currentTab) || tabs[0];

  const scrollToSection = (sectionId: string) => {
    if (currentTab !== 'manuals') {
      setTab('manuals');
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 120;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Main Nav Row */}
        <div className="flex justify-between items-center h-24">
          {/* Logo & Enhanced Dynamic Title */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center cursor-pointer group" onClick={() => setTab('home')}>
              <span className="text-3xl font-black text-red-600 dark:text-red-500 group-hover:scale-105 transition-transform tracking-tighter">Lifeguard</span>
            </div>
            
            {/* The Dynamic Title - Prominent Separator */}
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

            <div className="flex items-center space-x-3 bg-red-600 dark:bg-red-700 px-5 py-2.5 rounded-[1.2rem] shadow-lg shadow-red-500/20 border border-red-500/50">
              <span key={`icon-${currentTab}`} className="text-2xl animate-zoom-in drop-shadow-md">{currentTabInfo.icon}</span>
              <h1 
                key={currentTab} 
                className="text-sm font-black text-white uppercase tracking-[0.2em] animate-fade-in truncate max-w-[150px] sm:max-w-none"
              >
                {currentTabInfo.title}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <nav className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTab(tab.id)}
                  title={tab.label}
                  className={`flex items-center justify-center px-4 py-2.5 rounded-xl transition-all
                    ${currentTab === tab.id 
                      ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-md ring-1 ring-slate-200 dark:ring-slate-600' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <span className={`hidden xl:inline-block ml-2 text-[10px] font-black uppercase tracking-widest ${currentTab === tab.id ? 'opacity-100' : 'opacity-60'}`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </nav>

            <button 
              onClick={toggleDark}
              className="p-3.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              aria-label="Alternar Modo Escuro"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Sub-menu for Manuals (Sections) */}
        {currentTab === 'manuals' && (
          <div className="h-14 border-t border-slate-100 dark:border-slate-800 flex items-center overflow-x-auto no-scrollbar py-2 animate-in slide-in-from-top-2 duration-300">
            <div className="flex space-x-3 whitespace-nowrap px-2">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mr-4 self-center flex items-center">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                Protocolos:
              </span>
              {manuals.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className="px-5 py-2 text-[10px] font-black bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:border-red-500 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-all uppercase tracking-widest shadow-sm"
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
