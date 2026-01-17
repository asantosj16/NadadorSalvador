
import React, { useState } from 'react';
import { QUIZ_CHAPTERS } from '../constants.tsx';
import { QuizChapter, QuizQuestion } from '../types.ts';

const QuizView: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<QuizChapter | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState<number | null>(null);

  const startQuiz = (chapter: QuizChapter) => {
    const shuffled = [...chapter.questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setSelectedChapter(chapter);
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowResult(false);
    setAnswered(null);
  };

  const handleAnswer = (idx: number) => {
    if (answered !== null || !selectedChapter) return;
    setAnswered(idx);
    if (idx === shuffledQuestions[currentQuestionIdx].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (!selectedChapter) return;
    if (currentQuestionIdx + 1 < shuffledQuestions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setAnswered(null);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setSelectedChapter(null);
    setShuffledQuestions([]);
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowResult(false);
    setAnswered(null);
  };

  if (!selectedChapter) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto animate-fade-in pb-20">
        <header className="mb-8 text-center md:text-left">
          <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tighter uppercase">Treino Técnico de Elite</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mt-2">Questões oficiais atualizadas. Baralhamento dinâmico.</p>
        </header>
        <div className="grid gap-4">
          {QUIZ_CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => startQuiz(chapter)}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 text-left hover:border-red-500 dark:hover:border-red-700 hover:shadow-xl transition-all group flex justify-between items-center"
            >
              <div className="flex-1 pr-4">
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors tracking-tight">{chapter.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium leading-relaxed">{chapter.description}</p>
                <div className="mt-6 flex items-center space-x-3">
                  <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">{chapter.questions.length} Questões</span>
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">Iniciar Teste →</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl grayscale group-hover:grayscale-0 transition-all">📝</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIdx];

  if (showResult) {
    const percentage = (score / shuffledQuestions.length) * 100;
    const isPassing = percentage >= 70;

    return (
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-10 md:p-14 text-center max-w-lg mx-auto animate-zoom-in mt-10">
        <div className="text-7xl mb-8 animate-pulse-slow inline-block transform transition-transform hover:scale-110">
          {isPassing ? '🏆' : '📚'}
        </div>
        
        <div className="space-y-2 mb-8">
          <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {isPassing ? 'Missão Cumprida!' : 'Quase lá!'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px] animate-fade-in" style={{ animationDelay: '200ms' }}>
            Avaliação de Competência Terminada
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] p-10 mb-10 border border-slate-100 dark:border-slate-800 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Pontuação Final</div>
          <div className="text-7xl font-black text-red-600 dark:text-red-500 mb-3 tracking-tighter">
            {score}<span className="text-2xl text-slate-400 opacity-50">/{shuffledQuestions.length}</span>
          </div>
          <div className={`text-sm font-black uppercase tracking-widest ${isPassing ? 'text-green-600' : 'text-orange-500'}`}>
             {isPassing ? 'Apto para serviço' : 'Necessita de Revisão'} • {Math.round(percentage)}%
          </div>
        </div>

        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <button onClick={restart} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-xl active:scale-95">
            Voltar à Lista de Capítulos
          </button>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase">O seu progresso é guardado localmente para histórico de treino.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in pb-20">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-red-600 dark:text-red-500 uppercase tracking-[0.3em] mb-2">{selectedChapter.title}</span>
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tighter uppercase">Pergunta {currentQuestionIdx + 1} de {shuffledQuestions.length}</span>
        </div>
        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-inner">
          <div className="h-full bg-red-600 dark:bg-red-500 transition-all duration-500 rounded-full" style={{ width: `${((currentQuestionIdx + 1) / shuffledQuestions.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 relative overflow-hidden">
        <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-10 leading-tight tracking-tight pr-10">{currentQuestion.question}</h3>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            let statusStyles = 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:border-red-400 dark:hover:border-red-600 text-slate-800 dark:text-slate-200';
            if (answered !== null) {
              if (idx === currentQuestion.correctAnswer) {
                statusStyles = 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400 shadow-lg shadow-green-500/10 scale-[1.02]';
              } else if (idx === answered) {
                statusStyles = 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400 shadow-lg shadow-red-500/10';
              } else {
                statusStyles = 'opacity-30 border-slate-100 dark:border-slate-800 text-slate-400';
              }
            }
            return (
              <button key={idx} disabled={answered !== null} onClick={() => handleAnswer(idx)} className={`w-full text-left p-6 rounded-2xl border-2 transition-all font-bold text-lg flex items-center group relative overflow-hidden ${statusStyles}`}>
                <span className={`w-8 h-8 rounded-lg mr-4 flex items-center justify-center text-xs font-black border transition-colors ${answered !== null && idx === currentQuestion.correctAnswer ? 'bg-green-500 text-white border-green-400' : answered !== null && idx === answered ? 'bg-red-500 text-white border-red-400' : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-400'}`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            );
          })}
        </div>

        {answered !== null && (
          <div className="mt-12 animate-slide-up duration-500">
            <div className="p-8 bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-900 rounded-[2rem] text-blue-900 dark:text-blue-300 mb-8 relative">
              <p className="text-sm font-medium leading-relaxed"><strong>ANÁLISE TÉCNICA:</strong> {currentQuestion.explanation}</p>
            </div>
            <button onClick={nextQuestion} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:opacity-90 active:scale-95 shadow-xl transition-all">
              {currentQuestionIdx + 1 === shuffledQuestions.length ? 'Finalizar Avaliação' : 'Seguinte →'}
            </button>
          </div>
        )}
      </div>
      <button onClick={restart} className="mt-10 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] hover:text-red-600 transition-colors block mx-auto">Sair do Treino</button>
    </div>
  );
};

export default QuizView;
