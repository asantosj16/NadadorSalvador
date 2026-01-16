
import React, { useState } from 'react';

export interface TrainingItem {
  location: string;
  entity: string;
  type: 'CURSO' | 'EXAME REVALIDAÇÃO';
  dates: string;
  status: string;
  link: string;
}

interface TrainingLocationsProps {
  items: TrainingItem[];
  loading: boolean;
}

const TrainingLocations: React.FC<TrainingLocationsProps> = ({ items, loading }) => {
  const [filter, setFilter] = useState<'ALL' | 'CURSO' | 'EXAME'>('ALL');

  const today = new Date().toLocaleDateString('pt-PT', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });

  const filteredItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'CURSO') return item.type === 'CURSO';
    if (filter === 'EXAME') return item.type === 'EXAME REVALIDAÇÃO';
    return true;
  });

  return (
    <section className="space-y-6 animate-fade-in scroll-mt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Formação & Revalidação</h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">Monitorização diária de vagas e exames ISN.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {(['ALL', 'CURSO', 'EXAME'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  filter === f 
                  ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {f === 'ALL' ? 'Todos' : f === 'CURSO' ? 'Cursos' : 'Exames'}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/50">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-[8px] font-black uppercase text-blue-700 dark:text-blue-400 tracking-widest">
              Sincronizado: Hoje, {today}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-slate-100 dark:bg-slate-800/50 rounded-3xl animate-pulse"></div>
          ))
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <div 
              key={idx} 
              className="group bg-white dark:bg-slate-900 rounded-[2rem] p-6 border-2 border-slate-100 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-700 transition-all hover:shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* Type Icon Background */}
              <div className={`absolute top-0 right-0 p-8 opacity-5 transition-transform group-hover:scale-125 ${item.type === 'CURSO' ? 'text-blue-500' : 'text-orange-500'}`}>
                <span className="text-6xl font-black">{item.type === 'CURSO' ? '🎓' : '📝'}</span>
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                    item.type === 'CURSO' 
                    ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900' 
                    : 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900'
                  }`}>
                    {item.type}
                  </span>
                  <div className="flex flex-col items-end">
                    <span className={`text-[10px] font-black ${item.status.toLowerCase().includes('abertas') ? 'text-green-600' : 'text-slate-400'}`}>
                      {item.status.toUpperCase()}
                    </span>
                    <span className="text-[7px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-tighter">Verificado Agora</span>
                  </div>
                </div>

                <div className="relative z-10 mb-6">
                  <h4 className="font-black text-slate-900 dark:text-slate-100 text-xl tracking-tight mb-1">{item.location}</h4>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">{item.entity}</p>
                  
                  <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm">📅</span>
                      <span className="text-xs font-bold">{item.dates}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative z-10 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-lg active:scale-95 group/btn"
              >
                <span>Consultar Vaga Oficial</span>
                <span className="text-xs group-hover/btn:translate-x-1 transition-transform">↗</span>
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Sem eventos registados nas últimas 24h para este filtro.</p>
          </div>
        )}
      </div>

      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed text-center">
        <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          As informações são sincronizadas em tempo real com o Assistente IA para garantir dados atualizados das entidades oficiais.
        </p>
      </div>
    </section>
  );
};

export default TrainingLocations;
