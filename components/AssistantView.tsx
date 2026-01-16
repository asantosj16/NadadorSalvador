
import React, { useState } from 'react';
import { getLifeguardAdvice } from '../services/gemini';

const AssistantView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(''); // Limpa a resposta anterior para mostrar o loader
    const result = await getLifeguardAdvice(query);
    setResponse(result || '');
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <header className="text-center">
        <div className="inline-block p-4 bg-red-100 dark:bg-red-900/30 rounded-2xl mb-4 shadow-inner">
          <span className="text-4xl">🤖</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Assistente SafeGuard IA</h2>
        <p className="text-slate-600 dark:text-slate-400">Suporte técnico instantâneo para protocolos de salvamento.</p>
      </header>

      <form onSubmit={handleSubmit} className="relative group">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Como proceder numa PCR com uma criança?"
          aria-label="Introduza a sua questão técnica"
          className="w-full p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-red-500 dark:focus:border-red-600 focus:ring-4 focus:ring-red-500/10 transition-all shadow-sm resize-none min-h-[140px] dark:text-slate-100 text-lg outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute bottom-6 right-6 bg-red-600 dark:bg-red-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 dark:hover:bg-red-800 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed z-10"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>A pensar...</span>
            </div>
          ) : 'Perguntar'}
        </button>
      </form>

      {/* Área de Resposta / Loading */}
      <div className="min-h-[100px]">
        {loading && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 p-6 md:p-8 animate-pulse">
            <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 font-bold mb-6 uppercase text-[10px] tracking-widest">
              <span className="w-2 h-2 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
              <span>O Assistente está a redigir a resposta técnica...</span>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-full"></div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-[95%]"></div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-[90%]"></div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-[98%]"></div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-2/3"></div>
            </div>
            
            <div className="mt-8 flex justify-center">
               <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-[bounce_1s_infinite_0ms]"></div>
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-[bounce_1s_infinite_400ms]"></div>
               </div>
            </div>
          </div>
        )}

        {response && !loading && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 p-6 md:p-8 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-500 font-bold uppercase text-[10px] tracking-widest">
                <span className="w-2 h-2 bg-red-600 dark:bg-red-500 rounded-full animate-pulse"></span>
                <span>Instrução do Assistente (Protocolo ISN/ERC)</span>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(response)}
                className="text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-tighter"
              >
                Copiar
              </button>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-medium">{response}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          "Tratamento de picada de peixe-aranha",
          "Sinais de afogamento grau 3",
          "Manobra de Heimlich em adultos"
        ].map((hint) => (
          <button
            key={hint}
            onClick={() => setQuery(hint)}
            className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-300 dark:hover:border-red-800 transition-all text-left shadow-sm"
          >
            "{hint}"
          </button>
        ))}
      </div>
    </div>
  );
};

export default AssistantView;
