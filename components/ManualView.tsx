
import React, { useState, useMemo } from 'react';
import { MANUALS } from '../constants.tsx';
import { ManualItem, FlowStep } from '../types.ts';

const Toast: React.FC<{ message: string; type: 'info' | 'success'; onClose: () => void }> = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[150] animate-slide-up w-full px-4 max-w-xs">
      <div className={`px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border-2 ${
        type === 'success' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-800 border-slate-600 text-white'
      }`}>
        <span className="text-base">{type === 'success' ? '✅' : '⚙️'}</span>
        <p className="text-[10px] font-black uppercase tracking-widest leading-tight">{message}</p>
      </div>
    </div>
  );
};

const AlgorithmFlow: React.FC<{ steps: FlowStep[] }> = ({ steps }) => {
  const findStepLabel = (id?: string) => {
    if (!id) return null;
    return steps.find(s => s.id === id)?.label || 'Próximo passo';
  };

  return (
    <div className="flex flex-col items-center space-y-0 py-6 md:py-12 px-2 max-w-2xl mx-auto overflow-visible">
      {steps.map((step, idx) => (
        <React.Fragment key={step.id}>
          {idx > 0 && (
            <div className="relative h-8 md:h-12 w-0.5 bg-slate-200 dark:bg-slate-800">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                 <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-red-500/30 animate-ping"></div>
              </div>
            </div>
          )}

          <div className="w-full relative group">
            {step.type === 'decision' ? (
              <div className="relative animate-fade-in py-1">
                <div className="bg-white dark:bg-slate-900 border-2 border-red-500 rounded-2xl md:rounded-[2rem] p-5 md:p-8 shadow-sm">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 font-black text-[10px]">?</span>
                    <span className="text-[8px] font-black uppercase text-red-500 tracking-widest">Decisão Técnica</span>
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-slate-100 text-lg md:text-xl leading-tight mb-2">{step.label}</h4>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-xl border border-green-100 dark:border-green-800">
                      <span className="bg-green-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-md mb-1 inline-block uppercase">SIM</span>
                      <p className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">{findStepLabel(step.yes)}</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-100 dark:border-red-800">
                      <span className="bg-red-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-md mb-1 inline-block uppercase">NÃO</span>
                      <p className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">{findStepLabel(step.no)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`
                p-5 md:p-6 rounded-2xl md:rounded-[2rem] border-2 animate-fade-in
                ${step.type === 'start' ? 'bg-blue-600 border-blue-400 text-white' : ''}
                ${step.type === 'action' ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100' : ''}
                ${step.type === 'end' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent text-center' : ''}
              `}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-[8px] font-black uppercase tracking-widest ${step.type === 'end' ? 'text-red-500' : 'opacity-60'}`}>
                    {step.type === 'start' ? 'Início' : step.type === 'end' ? 'Conclusão' : 'Acionamento'}
                  </span>
                </div>
                <h4 className={`font-black leading-tight ${step.type === 'end' ? 'text-xl' : 'text-base'}`}>{step.label}</h4>
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const ManualView: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ManualItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'text' | 'flow'>('flow');
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' } | null>(null);

  const filteredManuals = useMemo(() => {
    if (!searchTerm.trim()) return MANUALS;
    return MANUALS.map(category => ({
      ...category,
      content: category.content.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.content.length > 0);
  }, [searchTerm]);

  const handleDownloadSinglePDF = async (item: ManualItem) => {
    if (isGenerating) return;
    setIsGenerating(item.id);
    setToast({ message: 'A preparar download...', type: 'info' });

    setTimeout(async () => {
      try {
        const filename = `LifeguardPro_${item.title.replace(/\s+/g, '_')}.pdf`;
        const element = document.createElement('div');
        element.innerHTML = `<div style="padding: 40px; font-family: sans-serif;">
          <h1 style="color: #dc2626; font-size: 24px;">${item.title}</h1>
          <hr />
          <div style="line-height: 1.6;">${item.fullContent}</div>
        </div>`;
        
        // @ts-ignore
        if (window.html2pdf) {
          // @ts-ignore
          await window.html2pdf().set({ margin: 10, filename: filename }).from(element).save();
          setToast({ message: 'Download concluído!', type: 'success' });
        }
      } catch (error) {
        setToast({ message: 'Erro no PDF.', type: 'info' });
      } finally {
        setIsGenerating(null);
      }
    }, 100);
  };

  if (selectedItem) {
    return (
      <div className="space-y-6 animate-fade-in pb-20">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <button onClick={() => setSelectedItem(null)} className="text-red-600 font-bold flex items-center space-x-2 text-xs uppercase tracking-widest font-black">
          <span>← Biblioteca</span>
        </button>
        
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div className="max-w-xl">
              <span className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-1 block">Protocolo ISN</span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">{selectedItem.title}</h2>
            </div>
            
            <div className="flex w-full md:w-auto items-center justify-between gap-3">
              {selectedItem.flowSteps && (
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-1 flex flex-1">
                  <button onClick={() => setViewMode('flow')} className={`flex-1 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest ${viewMode === 'flow' ? 'bg-white shadow-sm text-red-600' : 'opacity-40'}`}>Fluxo</button>
                  <button onClick={() => setViewMode('text')} className={`flex-1 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest ${viewMode === 'text' ? 'bg-white shadow-sm text-red-600' : 'opacity-40'}`}>Texto</button>
                </div>
              )}
              <button 
                onClick={() => handleDownloadSinglePDF(selectedItem)}
                className="bg-red-600 text-white w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                {isGenerating === selectedItem.id ? '...' : '📥'}
              </button>
            </div>
          </div>

          <div>
            {selectedItem.flowSteps && viewMode === 'flow' ? (
              <AlgorithmFlow steps={selectedItem.flowSteps} />
            ) : (
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap text-sm md:text-lg font-medium">
                    {selectedItem.fullContent}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter uppercase leading-none">Biblioteca</h2>
          <p className="text-slate-500 font-bold mt-1 text-sm">Protocolos Oficiais ISN.</p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl w-full md:w-72 dark:text-white font-bold text-sm outline-none focus:border-red-500"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30">🔎</span>
        </div>
      </header>

      <div className="space-y-12 pb-24">
        {filteredManuals.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-24">
            <div className="flex items-center space-x-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">{category.title}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.content.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setViewMode(item.flowSteps ? 'flow' : 'text'); setSelectedItem(item); }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-[1.8rem] border border-slate-200 dark:border-slate-800 text-left hover:border-red-500 active:scale-[0.98] transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 group-hover:text-red-600 transition-colors leading-tight">{item.title}</h4>
                    {item.flowSteps && <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase">Fluxo</span>}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium line-clamp-2 italic leading-relaxed">{item.description}</p>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ManualView;
