
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-2 md:px-4">
        {/* Main Nav Row */}
        <div className="flex justify-between items-center h-16">
          {/* Logo & Dynamic Title */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-1 cursor-pointer group" onClick={() => setTab('home')}>
              <span className="text-xl font-black text-red-600 dark:text-red-500 group-hover:scale-110 transition-transform tracking-tighter">Lifeguard</span>
            </div>
            
            {/* The Dynamic Title with key for animation trigger */}
            <div className="flex items-center space-x-2 bg-slate-100/50 dark:bg-slate-800/50 px-2.5 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-inner">
              <span key={`icon-${currentTab}`} className="text-base animate-zoom-in">{currentTabInfo.icon}</span>
              <h1 
                key={currentTab} 
                className="text-[9px] md:text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest animate-fade-in truncate max-w-[80px] sm:max-w-none"
              >
                {currentTabInfo.title}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <nav className="flex items-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTab(tab.id)}
                  title={tab.label}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all
                    ${currentTab === tab.id 
                      ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <span className="text-xl md:text-lg">{tab.icon}</span>
                  <span className="hidden lg:inline-block ml-1 text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
                </button>
              ))}
            </nav>

            <button 
              onClick={toggleDark}
              className="p-2 ml-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Alternar Modo Escuro"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Sub-menu for Manuals (Sections) */}
        {currentTab === 'manuals' && (
          <div className="h-12 border-t border-slate-100 dark:border-slate-800 flex items-center overflow-x-auto no-scrollbar py-2 animate-in slide-in-from-top-2 duration-300">
            <div className="flex space-x-2 whitespace-nowrap pb-1">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter mr-2 self-center">Saltar para:</span>
              {manuals.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className="px-3 py-1 text-[10px] font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-full hover:border-red-400 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all uppercase tracking-tight"
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
