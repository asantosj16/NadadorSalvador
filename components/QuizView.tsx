
import React, { useState } from 'react';
import { QUIZ_CHAPTERS } from '../constants.tsx';
import { QuizChapter } from '../types.ts';

const QuizView: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<QuizChapter | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState<number | null>(null);

  const startQuiz = (chapter: QuizChapter) => {
    setSelectedChapter(chapter);
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowResult(false);
    setAnswered(null);
  };

  const handleAnswer = (idx: number) => {
    if (answered !== null || !selectedChapter) return;
    setAnswered(idx);
    if (idx === selectedChapter.questions[currentQuestionIdx].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (!selectedChapter) return;
    if (currentQuestionIdx + 1 < selectedChapter.questions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setAnswered(null);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setSelectedChapter(null);
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowResult(false);
    setAnswered(null);
  };

  if (!selectedChapter) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Questionários de Treino</h2>
          <p className="text-slate-600 dark:text-slate-400">Escolha um capítulo para testar os seus conhecimentos técnicos.</p>
        </header>
        <div className="grid gap-4">
          {QUIZ_CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => startQuiz(chapter)}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:border-red-500 dark:hover:border-red-700 hover:shadow-md transition-all group"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{chapter.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{chapter.description}</p>
              <div className="mt-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {chapter.questions.length} Questões
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentQuestion = selectedChapter.questions[currentQuestionIdx];

  if (showResult) {
    const percentage = (score / selectedChapter.questions.length) * 100;
    const isPassing = percentage >= 70;

    return (
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-10 text-center max-w-lg mx-auto animate-zoom-in">
        <div className="text-6xl mb-6 animate-bounce inline-block">
          {isPassing ? '🏆' : '📚'}
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {isPassing ? 'Excelente Trabalho!' : 'Continue a Praticar!'}
        </h2>
        
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          Concluiu o capítulo <span className="text-slate-900 dark:text-slate-100 font-bold">{selectedChapter.title}</span>
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 mb-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Resultado Final</div>
          <div className="text-5xl font-black text-red-600 dark:text-red-500 mb-2">
            {score} <span className="text-2xl text-slate-400">/ {selectedChapter.questions.length}</span>
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase">
             Taxa de sucesso: {Math.round(percentage)}%
          </div>
        </div>

        <button 
          onClick={restart}
          className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-4 rounded-2xl font-black hover:bg-slate-800 dark:hover:bg-white transition-all shadow-lg active:scale-95 animate-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          Voltar aos Capítulos
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-red-600 dark:text-red-500 uppercase tracking-wider mb-1">{selectedChapter.title}</span>
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Questão {currentQuestionIdx + 1} de {selectedChapter.questions.length}</span>
        </div>
        <div className="h-2 w-32 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-600 dark:bg-red-500 transition-all duration-300" 
            style={{ width: `${((currentQuestionIdx + 1) / selectedChapter.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8 leading-snug">{currentQuestion.question}</h3>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            let bgColor = 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100';
            if (answered !== null) {
              if (idx === currentQuestion.correctAnswer) bgColor = 'bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-600 text-green-800 dark:text-green-300';
              else if (idx === answered) bgColor = 'bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-600 text-red-800 dark:text-red-300';
              else bgColor = 'bg-slate-50 dark:bg-slate-800/20 border-slate-100 dark:border-slate-800 opacity-50';
            }

            return (
              <button
                key={idx}
                disabled={answered !== null}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all font-medium ${bgColor}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {answered !== null && (
          <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-800 dark:text-blue-300 text-sm mb-6">
              <span className="font-bold">Explicação:</span> {currentQuestion.explanation}
            </div>
            <button 
              onClick={nextQuestion}
              className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-white transition-colors"
            >
              {currentQuestionIdx + 1 === selectedChapter.questions.length ? 'Ver Resultados' : 'Próxima Questão'}
            </button>
          </div>
        )}
      </div>
      <button 
        onClick={() => setSelectedChapter(null)}
        className="mt-6 text-slate-400 dark:text-slate-500 text-sm hover:text-red-600 dark:hover:text-red-400 block mx-auto transition-colors"
      >
        Cancelar e Sair
      </button>
    </div>
  );
};

export default QuizView;
