
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
    { id: 'manuals', label: 'Manuais', icon: '📖', title: 'Manuais Técnicos' },
    { id: 'quiz', label: 'Questionários', icon: '📝', title: 'Centro de Treino' },
    { id: 'assistant', label: 'IA Assistente', icon: '🤖', title: 'Assistente IA' },
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
      <div className="max-w-4xl mx-auto px-4">
        {/* Main Nav Row */}
        <div className="flex justify-between items-center h-16">
          {/* Logo & Dynamic Title */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-1 cursor-pointer" onClick={() => setTab('home')}>
              <span className="text-xl font-black text-red-600 dark:text-red-500">Lifeguard</span>
              <span className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Pro</span>
            </div>
            
            {/* Dynamic Title Separator (Desktop) */}
            <div className="hidden md:block h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
            
            {/* The Dynamic Title */}
            <h1 className="text-sm md:text-base font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest animate-fade-in truncate max-w-[120px] sm:max-w-none">
              {currentTabInfo.title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-4">
            <div className="flex items-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTab(tab.id)}
                  title={tab.label}
                  className={`flex flex-col md:flex-row items-center justify-center p-2 md:px-3 md:py-1.5 rounded-xl transition-all
                    ${currentTab === tab.id 
                      ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <span className="text-xl md:text-lg">{tab.icon}</span>
                  <span className="hidden md:inline-block ml-2 text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                </button>
              ))}
            </div>

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
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </header>
  );
};

export default Navbar;
