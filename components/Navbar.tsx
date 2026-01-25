
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
    { id: 'home', label: 'Início', icon: '🛟', title: 'Vigilância' },
    { id: 'training', label: 'Formação', icon: '🎓', title: 'Formação' },
    { id: 'manuals', label: 'Manuais', icon: '📖', title: 'Manuais' },
    { id: 'quiz', label: 'Quiz', icon: '📝', title: 'Treino' },
    { id: 'assistant', label: 'IA', icon: '🤖', title: 'SafeGuard IA' },
  ];

  const currentTabInfo = tabs.find(t => t.id === currentTab) || tabs[0];

  const scrollToSection = (sectionId: string) => {
    if (currentTab !== 'manuals') {
      setTab('manuals');
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 100;
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="w-full px-3 sm:px-4 md:px-6">
        {/* Main Nav Row */}
        <div className="flex justify-between items-center h-16 sm:h-20 md:h-24">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="hidden sm:flex items-center cursor-pointer group" onClick={() => setTab('home')}>
              <span className="text-lg sm:text-2xl font-black text-red-600 dark:text-red-500 tracking-tighter">Lifeguard</span>
            </div>
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

            <div className="flex items-center space-x-2 bg-red-600 dark:bg-red-700 px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-2xl shadow-lg shadow-red-500/10 border border-red-500/50 flex-shrink-0">
              <span key={`icon-${currentTab}`} className="text-lg sm:text-xl animate-zoom-in flex-shrink-0">{currentTabInfo.icon}</span>
              <h1 className="text-[9px] sm:text-[10px] md:text-sm font-black text-white uppercase tracking-widest truncate max-w-[70px] sm:max-w-[90px] md:max-w-none">
                {currentTabInfo.title}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-1.5 flex-shrink-0">
            <nav className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 sm:p-1 rounded-lg sm:rounded-2xl gap-0.5 sm:gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTab(tab.id)}
                  className={`flex items-center justify-center p-1.5 sm:p-2.5 md:px-4 md:py-2.5 rounded-md sm:rounded-xl transition-all flex-shrink-0
                    ${currentTab === tab.id 
                      ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400'}`}
                >
                  <span className="text-base sm:text-xl md:text-2xl">{tab.icon}</span>
                  <span className="hidden lg:inline-block ml-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                    {tab.label}
                  </span>
                </button>
              ))}
            </nav>

            <button 
              onClick={toggleDark}
              className="p-1.5 sm:p-2.5 md:p-3.5 rounded-lg sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex-shrink-0 text-lg sm:text-xl"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Sub-menu for Manuals - Mobile Carousel */}
        {currentTab === 'manuals' && (
          <div className="h-12 sm:h-14 border-t border-slate-100 dark:border-slate-800 flex items-center overflow-x-auto no-scrollbar py-1.5 sm:py-2 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6 scroll-smooth">
            <div className="flex space-x-1.5 sm:space-x-2 whitespace-nowrap">
              {manuals.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[9px] md:text-[10px] font-black bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg sm:rounded-xl hover:border-red-500 transition-all uppercase tracking-widest flex-shrink-0"
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
