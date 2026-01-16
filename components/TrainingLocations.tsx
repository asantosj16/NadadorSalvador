
import React, { useState } from 'react';
import { TrainingItem } from '../types.ts';

interface TrainingLocationsProps {
  items: TrainingItem[];
  sources?: any[];
  loading: boolean;
}

const TrainingLocations: React.FC<TrainingLocationsProps> = ({ items, sources, loading }) => {
  const [filter, setFilter] = useState<'ALL' | 'CURSO' | 'EXAME' | 'RECERT'>('ALL');

  const today = new Date().toLocaleDateString('pt-PT', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });

  const filteredItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'CURSO') return item.type === 'CURSO';
    if (filter === 'EXAME') return item.type === 'EXAME REVALIDAÇÃO';
    if (filter === 'RECERT') return item.type === 'RECERTIFICAÇÃO 2026';
    return true;
  });

  return (
    <section className="space-y-6 animate-fade-in scroll-mt-24 pb-24 md:pb-0">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">Editais e Cursos</h2>
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
               <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></span>
               <p className="text-[10px] font-black uppercase tracking-widest">Sincronizado: {today}</p>
            </div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-2xl">
            🎓
          </div>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 w-full overflow-hidden">
          {(['ALL', 'CURSO', 'EXAME', 'RECERT'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                filter === f 
                ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {f === 'ALL' ? 'Todos' : f === 'CURSO' ? 'Cursos' : f === 'EXAME' ? 'Exames' : 'RECERT 26'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="h-44 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
          ))
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <div 
              key={idx} 
              className="group bg-white dark:bg-slate-900 rounded-[2rem] p-5 border border-slate-200 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-700 transition-all flex flex-col justify-between shadow-sm hover:shadow-xl"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                    item.type === 'CURSO' 
                    ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900' 
                    : item.type?.includes('RECERTIFICAÇÃO')
                    ? 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-900'
                    : 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-900'
                  }`}>
                    {item.type}
                  </span>
                  <div className={`flex items-center space-x-1 ${item.status?.toLowerCase().includes('abertas') ? 'text-green-600' : 'text-slate-400'}`}>
                    <span className="w-1 h-1 bg-current rounded-full"></span>
                    <span className="text-[9px] font-black uppercase tracking-tighter">
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-black text-slate-900 dark:text-slate-100 text-lg tracking-tight leading-tight mb-1">{item.location}</h4>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{item.entity}</p>
                </div>

                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 mb-6 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-sm">📅</span>
                  <span className="text-[10px] font-bold tracking-tight">{item.dates}</span>
                </div>
              </div>
              
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 active:scale-95 shadow-lg shadow-red-500/10"
              >
                <span>Saber Mais</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Aguardando novos editais...</p>
          </div>
        )}
      </div>

      {sources && sources.length > 0 && (
        <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-inner">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
            <span className="mr-2">🔗</span> Fontes Oficiais de Verificação
          </h3>
          <ul className="space-y-2">
            {sources.map((chunk: any, i: number) => (
              chunk.web && (
                <li key={i}>
                  <a 
                    href={chunk.web.uri} 
                    target="_blank" 
                    className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center truncate"
                  >
                    <span className="mr-2 opacity-50">•</span>
                    {chunk.web.title || chunk.web.uri}
                  </a>
                </li>
              )
            ))}
          </ul>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/50 text-center">
        <p className="text-[9px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest leading-relaxed">
          Os dados são obtidos via pesquisa em tempo real no portal da Marinha/ISN. Confirme sempre nos editais oficiais.
        </p>
      </div>
    </section>
  );
};

export default TrainingLocations;
