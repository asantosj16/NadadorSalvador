
export interface ManualCategory {
  id: string;
  title: string;
  icon: string;
  content: ManualItem[];
}

export type FlowStepType = 'start' | 'action' | 'decision' | 'end' | 'info';

export interface FlowStep {
  id: string;
  type: FlowStepType;
  label: string;
  description?: string;
  next?: string;
  yes?: string;
  no?: string;
}

export interface ManualItem {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  externalLink?: string;
  flowSteps?: FlowStep[];
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
