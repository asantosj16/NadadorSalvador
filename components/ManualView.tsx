
import React, { useState, useMemo } from 'react';
import { MANUALS } from '../constants.tsx';
import { ManualItem, FlowStep } from '../types.ts';

const Toast: React.FC<{ message: string; type: 'info' | 'success'; onClose: () => void }> = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[150] animate-slide-up">
      <div className={`px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 border-2 ${
        type === 'success' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-800 border-slate-600 text-white'
      }`}>
        <span className="text-lg">{type === 'success' ? '✅' : '⚙️'}</span>
        <p className="text-xs font-black uppercase tracking-widest">{message}</p>
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
    <div className="flex flex-col items-center space-y-0 py-12 px-4 max-w-2xl mx-auto overflow-visible">
      {steps.map((step, idx) => (
        <React.Fragment key={step.id}>
          {idx > 0 && (
            <div className="relative h-12 w-0.5 bg-slate-200 dark:bg-slate-800">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-red-500/30 animate-ping"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-300 dark:border-t-slate-700"></div>
            </div>
          )}

          <div className="w-full relative group">
            {step.type === 'decision' ? (
              <div className="relative animate-fade-in py-2" style={{ animationDelay: `${idx * 80}ms` }}>
                <div className="bg-white dark:bg-slate-900 border-2 border-red-500 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(239,68,68,0.1)] relative z-10 overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <span className="text-6xl font-black">?</span>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 font-black text-xs">?</span>
                    <span className="text-[10px] font-black uppercase text-red-500 tracking-[0.2em]">Ponto de Decisão</span>
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-slate-100 text-xl leading-tight mb-3">{step.label}</h4>
                  {step.description && <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic border-l-2 border-slate-100 dark:border-slate-800 pl-4">{step.description}</p>}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-green-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full">SIM</span>
                        <div className="h-px flex-1 bg-green-200 dark:bg-green-800"></div>
                      </div>
                      <p className="text-[13px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">{findStepLabel(step.yes)}</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-200 dark:border-red-800">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-red-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full">NÃO</span>
                        <div className="h-px flex-1 bg-red-200 dark:bg-red-800"></div>
                      </div>
                      <p className="text-[13px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">{findStepLabel(step.no)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`
                p-6 rounded-[2rem] border-2 shadow-sm animate-fade-in transition-all
                ${step.type === 'start' ? 'bg-blue-600 border-blue-400 text-white shadow-blue-500/10' : ''}
                ${step.type === 'action' ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100' : ''}
                ${step.type === 'end' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent text-center' : ''}
              `} style={{ animationDelay: `${idx * 80}ms` }}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${step.type === 'end' ? 'bg-red-500 animate-pulse' : 'bg-current opacity-30'}`}></span>
                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${step.type === 'end' ? 'text-red-500' : 'opacity-60'}`}>
                      {step.type === 'start' ? 'Início Protocolar' : step.type === 'end' ? 'Finalização' : 'Procedimento Técnico'}
                    </span>
                  </div>
                </div>
                <h4 className={`font-black leading-tight tracking-tight ${step.type === 'end' ? 'text-2xl' : 'text-lg'}`}>{step.label}</h4>
                {step.description && (
                  <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed font-medium ${step.type === 'start' ? 'bg-white/10' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400'}`}>
                    {step.description}
                  </div>
                )}
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
    setToast({ message: 'A preparar download em background...', type: 'info' });

    // Envolvemos a lógica num timeout pequeno para libertar a thread de UI antes de processar o PDF
    setTimeout(async () => {
      try {
        const filename = `LifeguardPro_${item.title.replace(/\s+/g, '_')}.pdf`;
        const element = document.createElement('div');
        element.innerHTML = `<div style="padding: 50px; font-family: sans-serif; color: #1e293b;">
          <h1 style="color: #dc2626; font-size: 36px; font-weight: 900; letter-spacing: -1px;">${item.title}</h1>
          <p style="color: #64748b; font-size: 14px; margin-bottom: 30px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Manual Técnico Operacional</p>
          <hr style="border: 0; border-top: 4px solid #f1f5f9; margin-bottom: 30px;" />
          <div style="line-height: 1.8; font-size: 16px;">${item.fullContent}</div>
          <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #f1f5f9; font-size: 10px; color: #94a3b8; text-transform: uppercase;">
            Gerado via Lifeguard Pro App • ${new Date().toLocaleDateString('pt-PT')}
          </footer>
        </div>`;
        
        // @ts-ignore
        if (window.html2pdf) {
          // @ts-ignore
          await window.html2pdf().set({ 
            margin: 10, 
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
          }).from(element).save();
          
          setToast({ message: 'Download concluído com sucesso!', type: 'success' });
        }
      } catch (error) {
        console.error(error);
        setToast({ message: 'Erro ao gerar PDF técnico.', type: 'info' });
      } finally {
        setIsGenerating(null);
      }
    }, 100);
  };

  if (selectedItem) {
    return (
      <div className="space-y-6 animate-fade-in relative">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <button 
          onClick={() => setSelectedItem(null)}
          className="text-red-600 dark:text-red-400 font-bold flex items-center space-x-2 hover:underline group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span className="text-sm uppercase tracking-widest font-black">Biblioteca</span>
        </button>
        
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-black text-red-600 dark:text-red-500 uppercase tracking-[0.4em] mb-2 block animate-fade-in">Protocolo Verificado ISN</span>
              <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none animate-slide-up">{selectedItem.title}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 font-medium leading-relaxed">{selectedItem.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {selectedItem.flowSteps && (
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 flex shadow-inner">
                  <button 
                    onClick={() => setViewMode('flow')}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'flow' ? 'bg-white dark:bg-slate-700 shadow-md text-red-600 dark:text-red-400' : 'opacity-40 hover:opacity-100'}`}
                  >
                    Fluxograma
                  </button>
                  <button 
                    onClick={() => setViewMode('text')}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'text' ? 'bg-white dark:bg-slate-700 shadow-md text-red-600 dark:text-red-400' : 'opacity-40 hover:opacity-100'}`}
                  >
                    Texto Integral
                  </button>
                </div>
              )}
              <button 
                onClick={() => handleDownloadSinglePDF(selectedItem)}
                disabled={!!isGenerating}
                title="Descarregar Manual PDF"
                className="bg-red-600 hover:bg-red-700 text-white w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-90 disabled:opacity-50"
              >
                {isGenerating === selectedItem.id ? (
                  <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <span className="text-2xl">📥</span>
                )}
              </button>
            </div>
          </div>

          <div className="relative">
            {selectedItem.flowSteps && viewMode === 'flow' ? (
              <AlgorithmFlow steps={selectedItem.flowSteps} />
            ) : (
              <div className="prose prose-slate dark:prose-invert max-w-none animate-fade-in">
                <div className="bg-slate-50 dark:bg-slate-950 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-900 shadow-inner">
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap text-lg font-medium">
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
    <div className="space-y-10 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter uppercase">Biblioteca Técnica</h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold mt-2 text-lg">Manuais oficiais do Instituto de Socorros a Náufragos.</p>
        </div>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Pesquisar protocolo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl focus:border-red-500 outline-none w-full md:w-96 dark:text-white transition-all shadow-xl font-bold text-base"
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl opacity-40 group-focus-within:opacity-100 transition-opacity">🔎</span>
        </div>
      </header>

      <div className="space-y-16">
        {filteredManuals.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-32">
            <div className="flex items-center space-x-5 mb-10 border-b-2 border-slate-100 dark:border-slate-900 pb-8">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center text-3xl">
                {category.icon}
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter leading-none">{category.title}</h3>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1">{category.content.length} Procedimentos Operacionais</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.content.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setViewMode(item.flowSteps ? 'flow' : 'text'); setSelectedItem(item); }}
                  className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 text-left hover:border-red-500 dark:hover:border-red-700 hover:shadow-2xl transition-all group relative overflow-hidden active:scale-95"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-tight pr-6">
                        {item.title}
                      </h4>
                      {item.flowSteps && (
                        <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-blue-200 dark:border-blue-800 shadow-sm">
                          Fluxo
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-medium line-clamp-2 leading-relaxed italic">
                      {item.description}
                    </p>
                    <div className="mt-8 flex items-center text-[10px] font-black uppercase text-red-600 dark:text-red-500 tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-3 group-hover:translate-y-0">
                      <span>Estudar Protocolo Técnico</span>
                      <span className="ml-3 text-lg">→</span>
                    </div>
                  </div>
                  {/* Sutil background decor para categorias */}
                  <div className="absolute -bottom-6 -right-6 text-9xl opacity-[0.03] grayscale pointer-events-none group-hover:scale-110 transition-transform">{category.icon}</div>
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
