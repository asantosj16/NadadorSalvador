
export interface BeachFlag {
  color: string;
  name: string;
  meaning: string;
  hex: string;
}

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
  // VideoUrl removido
}

export interface QuizChapter {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface Tip {
  id: string;
  category: 'Segurança' | 'Saúde' | 'Equipamento' | 'Prevenção';
  text: string;
}

export interface TrainingItem {
  location: string;
  entity: string;
  type: 'CURSO' | 'EXAME REVALIDAÇÃO' | 'RECERTIFICAÇÃO';
  dates: string;
  status: string;
  link: string;
}

export interface WeatherAlert {
  type: string;
  level: string;
  description: string;
}

export interface BeachConditions {
  airTemp: string;
  waterTemp: string;
  waves: string;
  windSpeed: string;
  windDir: string;
  uvIndex: string;
  condition: string;
  riskLevel: string;
  alerts: WeatherAlert[];
  ipmaIcon: string;
}

export interface ChunkSource {
  web?: {
    uri: string;
    title?: string;
  };
}
