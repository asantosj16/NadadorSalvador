
import React, { useState, useMemo } from 'react';
import { MANUALS } from '../constants.tsx';
import { ManualItem, ManualCategory, FlowStep } from '../types.ts';

const AlgorithmFlow: React.FC<{ steps: FlowStep[] }> = ({ steps }) => {
  const findStepLabel = (id?: string) => {
    if (!id) return null;
    return steps.find(s => s.id === id)?.label || 'Próximo passo';
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-8 overflow-x-auto">
      {steps.map((step, idx) => (
        <React.Fragment key={step.id}>
          {/* Connector Line */}
          {idx > 0 && (
            <div className="w-1 h-8 bg-slate-200 dark:bg-slate-700 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 border-b-2 border-r-2 border-slate-300 dark:border-slate-600 rotate-45"></div>
            </div>
          )}

          {/* Step Card */}
          <div className="w-full max-w-sm">
            {step.type === 'decision' ? (
              <div className="relative group animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="bg-white dark:bg-slate-900 border-2 border-red-500 rounded-3xl p-6 text-center shadow-lg relative z-10">
                  <span className="text-[10px] font-black uppercase text-red-500 tracking-widest mb-1 block">Decisão Crítica</span>
                  <h4 className="font-black text-slate-900 dark:text-slate-100 text-lg">{step.label}</h4>
                  {step.description && <p className="text-xs text-slate-500 mt-2 italic">{step.description}</p>}
                  
                  {/* Detailed Decision Paths */}
                  <div className="mt-4 space-y-2 text-left">
                    <div className="bg-green-50 dark:bg-green-950/30 p-2.5 rounded-xl border border-green-200 dark:border-green-800 flex items-start space-x-2">
                      <span className="bg-green-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded mt-0.5">SIM</span>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-green-700 dark:text-green-400 uppercase tracking-tighter">Ação Seguinte:</p>
                        <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight">{findStepLabel(step.yes)}</p>
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/30 p-2.5 rounded-xl border border-red-200 dark:border-red-800 flex items-start space-x-2">
                      <span className="bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded mt-0.5">NÃO</span>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-red-700 dark:text-red-400 uppercase tracking-tighter">Ação Seguinte:</p>
                        <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight">{findStepLabel(step.no)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`
                p-5 rounded-[1.5rem] border-2 shadow-sm animate-fade-in
                ${step.type === 'start' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 text-blue-900 dark:text-blue-100' : ''}
                ${step.type === 'action' ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800' : ''}
                ${step.type === 'end' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent' : ''}
              `} style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[8px] font-black uppercase tracking-widest ${step.type === 'end' ? 'opacity-100 text-red-500' : 'opacity-60'}`}>
                    {step.type === 'start' ? 'Início do Protocolo' : step.type === 'end' ? 'Objetivo / Conclusão' : 'Ação Operacional'}
                  </span>
                  <span className="text-[10px] opacity-40">#{idx + 1}</span>
                </div>
                <h4 className="font-black leading-tight text-md">{step.label}</h4>
                {step.description && <p className="text-xs opacity-70 mt-2 leading-relaxed">{step.description}</p>}
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

  const filteredManuals = useMemo(() => {
    if (!searchTerm.trim()) return MANUALS;
    
    return MANUALS.map(category => ({
      ...category,
      content: category.content.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.content.length > 0);
  }, [searchTerm]);

  const handleDownloadSinglePDF = async (item: ManualItem) => {
    setIsGenerating(item.id);
    try {
      const filename = `Protocolo_${item.title.replace(/\s+/g, '_')}.pdf`;
      const element = document.createElement('div');
      element.innerHTML = `<div style="padding: 40px;"><h1>${item.title}</h1><p>${item.fullContent}</p></div>`;
      // @ts-ignore
      if (window.html2pdf) {
        // @ts-ignore
        await window.html2pdf().set({ margin: 10, filename: filename }).from(element).save();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(null);
    }
  };

  if (selectedItem) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button 
          onClick={() => setSelectedItem(null)}
          className="text-red-600 dark:text-red-400 font-bold flex items-center space-x-2 hover:underline"
        >
          <span>← Voltar aos Manuais</span>
        </button>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">{selectedItem.title}</h2>
              <p className="text-slate-500 text-sm mt-1">{selectedItem.description}</p>
            </div>
            <div className="flex space-x-2">
              {selectedItem.flowSteps && (
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-1 flex">
                  <button 
                    onClick={() => setViewMode('flow')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'flow' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-50'}`}
                  >
                    Fluxo
                  </button>
                  <button 
                    onClick={() => setViewMode('text')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'text' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-50'}`}
                  >
                    Texto
                  </button>
                </div>
              )}
              <button 
                onClick={() => handleDownloadSinglePDF(selectedItem)}
                disabled={isGenerating === selectedItem.id}
                className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-600 dark:text-slate-400 transition-colors"
              >
                {isGenerating === selectedItem.id ? '⌛' : '📄'}
              </button>
            </div>
          </div>

          {selectedItem.flowSteps && viewMode === 'flow' ? (
            <AlgorithmFlow steps={selectedItem.flowSteps} />
          ) : (
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap text-lg font-medium">{selectedItem.fullContent}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Manuais Técnicos</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Protocolos oficiais e organogramas operacionais.</p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Pesquisar protocolo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 outline-none w-full md:w-64 dark:text-white"
          />
          <span className="absolute left-3 top-2.5 opacity-40">🔍</span>
        </div>
      </header>

      <div className="space-y-12">
        {filteredManuals.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-32">
            <div className="flex items-center space-x-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">{category.title}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.content.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setViewMode(item.flowSteps ? 'flow' : 'text'); setSelectedItem(item); }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:border-red-500 dark:hover:border-red-700 hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 mb-2">{item.title}</h4>
                    {item.flowSteps && <span className="text-[8px] bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-black uppercase tracking-widest">Organograma</span>}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{item.description}</p>
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
