
import React from 'react';

export interface TrainingItem {
  location: string;
  entity: string;
  type: 'CURSO' | 'EXAME REVALIDAÇÃO';
  dates: string;
  status: string;
}

interface TrainingLocationsProps {
  items: TrainingItem[];
  loading: boolean;
}

const TrainingLocations: React.FC<TrainingLocationsProps> = ({ items, loading }) => {
  const nextUpdateDate = () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });
  };

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Formação & Revalidação</h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">Calendário oficial de certificação técnica ISN.</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[9px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest">Atualização Mensal: {nextUpdateDate()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800/50 rounded-3xl animate-pulse"></div>
          ))
        ) : (
          items.map((item, idx) => (
            <div 
              key={idx} 
              className="group bg-white dark:bg-slate-900 rounded-3xl p-5 border-2 border-slate-100 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-700 transition-all hover:shadow-xl relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 transition-transform group-hover:scale-125 ${item.type === 'CURSO' ? 'text-blue-500' : 'text-red-500'}`}>
                <span className="text-6xl font-black">{item.type === 'CURSO' ? '🎓' : '📝'}</span>
              </div>

              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                  item.type === 'CURSO' 
                  ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900' 
                  : 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900'
                }`}>
                  {item.type}
                </span>
                <span className="text-[10px] font-bold text-green-600 dark:text-green-500">{item.status}</span>
              </div>

              <h4 className="font-black text-slate-900 dark:text-slate-100 text-lg tracking-tight mb-1">{item.location}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{item.entity}</p>
              
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <span className="text-sm">📅</span>
                <span className="text-xs font-bold">{item.dates}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed text-center">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Consulte sempre o edital oficial da Capitania ou o site do ISN para confirmação final.
        </p>
      </div>
    </section>
  );
};

export default TrainingLocations;
