
export interface ManualCategory {
  id: string;
  title: string;
  icon: string;
  content: ManualItem[];
}

export interface ManualItem {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  externalLink?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizChapter {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface Tip {
  id: string;
  category: 'Segurança' | 'Saúde' | 'Equipamento';
  text: string;
}
