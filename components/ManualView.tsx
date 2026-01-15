
import React, { useState, useMemo } from 'react';
import { MANUALS } from '../constants';
import { ManualItem, ManualCategory } from '../types';

const ManualView: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ManualItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

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

  const handleDownloadCategoryPDF = async (category: ManualCategory) => {
    setIsGenerating(category.id);
    
    try {
      const filename = `Manual_NS_${category.title.replace(/\s+/g, '_')}.pdf`;

      const tocHtml = category.content.map((item, index) => `
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; margin-bottom: 8px; font-size: 12px;">
          <span>${index + 1}. ${item.title}</span>
          <span>_________</span>
        </div>
      `).join('');

      const itemsHtml = category.content.map((item, index) => `
        <div style="margin-top: 40px; page-break-before: always;">
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <div style="background: #dc2626; color: white; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: 900; border-radius: 4px; margin-right: 15px;">${index + 1}</div>
            <h2 style="color: #000; font-size: 20px; font-weight: 800; margin: 0; text-transform: uppercase; letter-spacing: -0.5px;">${item.title}</h2>
          </div>
          <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #94a3b8; margin-bottom: 20px;">
            <p style="font-style: italic; color: #475569; margin: 0; font-size: 12px; line-height: 1.5;">${item.description}</p>
          </div>
          <div style="white-space: pre-wrap; color: #1e293b; font-size: 13px; line-height: 1.8; text-align: justify;">${item.fullContent}</div>
          
          <div style="margin-top: 40px; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px;">
            <p style="margin: 0; font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase;">Protocolo de Verificação:</p>
            <div style="display: flex; margin-top: 10px;">
              <div style="width: 15px; height: 15px; border: 1px solid #000; margin-right: 10px;"></div>
              <span style="font-size: 11px;">Entendido e pronto para execução técnica.</span>
            </div>
          </div>
        </div>
      `).join('');

      const htmlContent = `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; color: #000; background: white; width: 720px; padding: 0;">
          <!-- Cover Page -->
          <div style="height: 900px; display: flex; flex-direction: column; justify-content: space-between; padding: 60px; border: 10px solid #dc2626;">
            <div style="text-align: right;">
              <p style="font-weight: 900; font-size: 14px; color: #dc2626; margin: 0;">LIFEGUARD PRO</p>
              <p style="font-size: 10px; color: #64748b; margin: 0;">SISTEMA DE APOIO TÉCNICO</p>
            </div>
            
            <div>
              <h1 style="font-size: 50px; font-weight: 900; margin: 0; line-height: 0.9; color: #000; text-transform: uppercase;">${category.title}</h1>
              <div style="width: 100px; height: 8px; background: #dc2626; margin: 20px 0;"></div>
              <p style="font-size: 18px; color: #475569; max-width: 400px; font-weight: 500;">Guia Técnico de Procedimentos para Nadadores Salvadores Certificados.</p>
            </div>

            <div>
              <p style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">Documentação Offline</p>
              <p style="font-size: 10px; color: #94a3b8;">Gerado em: ${new Date().toLocaleDateString('pt-PT')} | Cópia de Segurança</p>
            </div>
          </div>

          <!-- Table of Contents -->
          <div style="page-break-before: always; padding: 60px;">
            <h2 style="font-size: 24px; font-weight: 900; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px;">ÍNDICE DE CONTEÚDOS</h2>
            ${tocHtml}
          </div>
          
          <!-- Content Pages -->
          <div style="padding: 0 60px 60px 60px;">
            ${itemsHtml}
          </div>

          <!-- Final Disclaimer -->
          <div style="page-break-before: always; padding: 60px; text-align: center;">
             <div style="margin-top: 100px; padding: 40px; border: 2px dashed #ccc;">
                <p style="font-size: 14px; font-weight: 700;">AVISO DE RESPONSABILIDADE</p>
                <p style="font-size: 12px; line-height: 1.6; color: #475569;">
                  Este manual é um recurso de apoio e não substitui a formação oficial do Instituto de Socorros a Náufragos (ISN). 
                  A prática de salvamento aquático exige certificação válida e treino contínuo.
                </p>
                <p style="font-size: 11px; margin-top: 20px; color: #94a3b8;">Lifeguard Pro v2.5 | ISN Compliant Protocols</p>
             </div>
          </div>
        </div>
      `;

      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      // @ts-ignore
      if (window.html2pdf) {
        // @ts-ignore
        await window.html2pdf().set(opt).from(element).save();
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar o manual offline.");
    } finally {
      setIsGenerating(null);
    }
  };

  const handleDownloadSinglePDF = async (item: ManualItem) => {
    setIsGenerating(item.id);
    
    try {
      const filename = `Protocolo_${item.title.replace(/\s+/g, '_')}.pdf`;

      const htmlContent = `
        <div style="font-family: 'Inter', sans-serif; padding: 50px; color: #000; background: white; width: 700px; border: 1px solid #eee;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid #dc2626; padding-bottom: 20px; margin-bottom: 40px;">
            <div>
              <h1 style="margin: 0; font-size: 24px; text-transform: uppercase; font-weight: 900;">${item.title}</h1>
              <p style="margin: 5px 0 0; font-weight: 700; font-size: 12px; color: #64748b; text-transform: uppercase;">Protocolo Técnico de Emergência</p>
            </div>
            <div style="text-align: right;">
               <div style="background: #000; color: white; padding: 4px 8px; font-size: 10px; font-weight: 900;">NS-OFFLINE</div>
            </div>
          </div>
          
          <div style="margin-bottom: 40px;">
             <div style="white-space: pre-wrap; color: #000; font-size: 13px; line-height: 1.8; text-align: justify;">${item.fullContent}</div>
          </div>

          <div style="background: #fef2f2; border-left: 6px solid #dc2626; padding: 20px; border-radius: 0 8px 8px 0; margin-top: 50px;">
            <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #991b1b; font-weight: 900; text-transform: uppercase;">Aviso Crítico</h3>
            <p style="margin: 0; font-size: 11px; color: #b91c1c;">Este documento é um auxiliar de memória. Em situações reais, siga as ordens do Coordenador de Praia e contacte as autoridades competentes.</p>
          </div>
        </div>
      `;

      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      
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
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">{selectedItem.title}</h2>
            <div className="flex space-x-2">
              {selectedItem.externalLink && (
                <a 
                  href={selectedItem.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center space-x-2 text-sm"
                >
                  <span>📥 Modelo Oficial (PDF)</span>
                </a>
              )}
              <button 
                onClick={() => handleDownloadSinglePDF(selectedItem)}
                disabled={isGenerating === selectedItem.id}
                className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Descarregar Protocolo Offline"
              >
                {isGenerating === selectedItem.id ? '⌛' : '📄 PDF'}
              </button>
            </div>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap text-lg font-medium">{selectedItem.fullContent}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Manuais Técnicos</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Protocolos oficiais e procedimentos operacionais.</p>
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
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">{category.title}</h3>
              </div>
              <button 
                onClick={() => handleDownloadCategoryPDF(category)}
                disabled={isGenerating === category.id}
                className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
              >
                {isGenerating === category.id ? 'Gerando...' : 'Descarregar Guia Completo ↓'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.content.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:border-red-500 dark:hover:border-red-700 hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 mb-2">{item.title}</h4>
                    {item.externalLink && <span className="text-xs bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-black uppercase tracking-tighter">OFICIAL</span>}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{item.description}</p>
                  <div className="mt-4 flex items-center text-xs font-black text-red-600/50 dark:text-red-500/50 uppercase tracking-widest group-hover:text-red-600 dark:group-hover:text-red-400">
                    <span>Ler Protocolo</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
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
