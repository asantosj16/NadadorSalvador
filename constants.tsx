
import { ManualCategory, QuizChapter, Tip } from './types';

export const MANUALS: ManualCategory[] = [
  {
    id: 'first-aid',
    title: 'Socorrismo e Emergência Médica',
    icon: '🏥',
    content: [
      {
        id: 'fa-1',
        title: 'SBV Adulto (Afogamento)',
        description: 'Algoritmo de Suporte Básico de Vida adaptado ao meio aquático (ISN/ERC).',
        fullContent: `O protocolo de SBV em afogamento prioriza a ventilação devido à natureza hipóxica da paragem.`,
        flowSteps: [
          { id: '1', type: 'start', label: 'Segurança e Proteção', description: 'Garantir segurança do local e EPI.', next: '2' },
          { id: '2', type: 'action', label: 'Avaliar Resposta', description: 'Abanar ombros e perguntar "Está bem?".', next: '3' },
          { id: '3', type: 'decision', label: 'A vítima responde?', yes: 'end-1', no: '4' },
          { id: '4', type: 'action', label: 'Gritar por Ajuda', description: 'Alertar colegas ou banhistas.', next: '5' },
          { id: '5', type: 'action', label: 'Abertura da Via Aérea', description: 'Extensão da cabeça e elevação do queixo.', next: '6' },
          { id: '6', type: 'decision', label: 'Respira normalmente?', description: 'VOS (Ver, Ouvir, Sentir) até 10 seg.', yes: 'end-2', no: '7' },
          { id: '7', type: 'action', label: '5 Insuflações de Resgate', description: 'Insuflar lentamente (1 seg) até ver o tórax elevar.', next: '8' },
          { id: '8', type: 'decision', label: 'Sinais de Vida?', yes: 'end-3', no: '9' },
          { id: '9', type: 'action', label: 'Ligar 112 / Pedir DAE', next: '10' },
          { id: '10', type: 'action', label: '30 Compressões : 2 Ventilações', description: 'Manter rácio 30:2 continuamente.', next: '10' },
          { id: 'end-1', type: 'end', label: 'Avaliar Lesões', description: 'Manter vigilância, conforto e aquecimento.' },
          { id: 'end-2', type: 'end', label: 'PLS e Monitorizar', description: 'Colocar em Posição Lateral de Segurança.' },
          { id: 'end-3', type: 'action', label: 'Ventilar sem comprimir', description: '1 ventilação a cada 6 segundos (10/min).' }
        ]
      }
    ]
  }
];

export const QUIZ_CHAPTERS: QuizChapter[] = [
  {
    id: 'cap-1',
    title: '1. Atividade e Perfil do Nadador-Salvador',
    description: 'Certificação, deveres, ética e regulamentação.',
    questions: [
      { id: 'q1-1', question: 'Qual a validade da certificação de Nadador-Salvador?', options: ['1 ano', '2 anos', '3 anos', '5 anos'], correctAnswer: 2, explanation: 'A certificação técnica é válida por 3 anos conforme o Decreto-Lei 118/2011.' },
      { id: 'q1-2', question: 'Quem é a autoridade técnica responsável pela certificação em Portugal?', options: ['Proteção Civil', 'INEM', 'Instituto de Socorros a Náufragos (ISN)', 'Marinha de Guerra'], correctAnswer: 2, explanation: 'O ISN é a autoridade técnica nacional para o salvamento aquático.' },
      { id: 'q1-3', question: 'É dever do Nadador-Salvador colaborar com a Autoridade Marítima?', options: ['Apenas em caso de morte', 'Sempre que solicitado', 'Nunca, são entidades independentes', 'Apenas em horário pós-laboral'], correctAnswer: 1, explanation: 'Colaborar com as autoridades é um dever ético e legal do NS.' }
    ]
  },
  {
    id: 'cap-2',
    title: '2. Meios de Salvamento e Equipamento',
    description: 'Identificação e uso correto do material técnico.',
    questions: [
      { id: 'q2-1', question: 'Qual a função principal do cinto de salvamento (torpedo)?', options: ['Apoio para descanso', 'Flutuabilidade para a vítima e NS', 'Sinalização visual', 'Apenas para treinar'], correctAnswer: 1, explanation: 'O torpedo oferece flutuabilidade crítica e permite rebocar a vítima com as mãos livres.' },
      { id: 'q2-2', question: 'As barbatanas no salvamento aquático servem para:', options: ['Aumentar a propulsão e velocidade', 'Proteger os pés das rochas', 'Dificultar a natação', 'Fazer mergulho profundo'], correctAnswer: 0, explanation: 'As barbatanas permitem uma abordagem mais rápida e maior força no reboque contra correntes.' }
    ]
  },
  {
    id: 'cap-3',
    title: '3. Vigilância e Prevenção',
    description: 'Técnicas de observação e sinais de perigo.',
    questions: [
      { id: 'q3-1', question: 'O que significa uma bandeira xadrez (branca e azul)?', options: ['Mar calmo', 'Zona de desportos náuticos (proibido banhos)', 'Posto sem vigilância', 'Praia perigosa'], correctAnswer: 1, explanation: 'A bandeira xadrez sinaliza áreas reservadas a desportos, onde o banho é proibido.' },
      { id: 'q3-2', question: 'No método de varrimento ocular, quanto tempo deve durar cada ciclo?', options: ['5 segundos', '10 a 30 segundos', '2 minutos', '5 minutos'], correctAnswer: 1, explanation: 'O varrimento deve ser constante e completo, demorando entre 10 a 30 segundos conforme a afluência.' }
    ]
  },
  {
    id: 'cap-4',
    title: '4. Técnicas de Salvamento Aquático',
    description: 'Abordagem, reboque e extração de vítimas.',
    questions: [
      { id: 'q4-1', question: 'Como deve ser feita a abordagem a uma vítima consciente e em pânico?', options: ['De frente para falar com ela', 'Por trás, mantendo distância de segurança', 'Mergulhando por baixo', 'Gritando de longe'], correctAnswer: 1, explanation: 'A abordagem por trás evita que a vítima agarre o socorrista em pânico.' },
      { id: 'q4-2', question: 'Qual o principal objetivo do reboque?', options: ['Levar a vítima para o fundo', 'Manter as vias aéreas da vítima fora de água', 'Chegar rápido à areia', 'Treinar a resistência'], correctAnswer: 1, explanation: 'O reboque deve priorizar sempre a manutenção das vias respiratórias desobstruídas.' }
    ]
  },
  {
    id: 'cap-5',
    title: '5. Primeiros Socorros - SBV',
    description: 'Suporte Básico de Vida no meio aquático.',
    questions: [
      { id: 'q5-1', question: 'Em caso de afogamento em paragem, qual o primeiro passo após avaliar a respiração?', options: ['30 compressões', 'Ligar ao 112 imediatamente', '5 insuflações de resgate', 'Esperar ajuda'], correctAnswer: 2, explanation: 'No afogamento (paragem hipóxica), as 5 ventilações iniciais são prioritárias.' },
      { id: 'q5-2', question: 'Qual o rácio de compressões/ventilações no SBV Adulto?', options: ['15:2', '30:2', '5:1', '10:2'], correctAnswer: 1, explanation: 'O rácio padrão do ERC/ISN é de 30 compressões para 2 ventilações.' }
    ]
  },
  {
    id: 'cap-6',
    title: '6. Traumatologia e Lesões Específicas',
    description: 'Gestão de traumas e acidentes em meio aquático.',
    questions: [
      { id: 'q6-1', question: 'Qual a principal suspeita num acidente de mergulho em águas rasas?', options: ['Afogamento', 'Lesão vertebro-medular (Cervical)', 'Hipotermia', 'Cãibras'], correctAnswer: 1, explanation: 'Impactos no fundo sugerem sempre trauma cervical, exigindo imobilização imediata.' },
      { id: 'q6-2', question: 'Como se trata uma picada de peixe-aranha?', options: ['Gelo', 'Água quente (calor detona a toxina)', 'Álcool', 'Vinagre'], correctAnswer: 1, explanation: 'O veneno do peixe-aranha é termolábil; o calor (água quente) ajuda a aliviar a dor.' }
    ]
  },
  {
    id: 'cap-7',
    title: '7. Oxigenoterapia',
    description: 'Administração de O2 e gestão de vias aéreas.',
    questions: [
      { id: 'q7-1', question: 'Qual o débito de O2 para uma vítima em paragem (ligado ao balão)?', options: ['5 L/min', '10 L/min', '15 L/min', '2 L/min'], correctAnswer: 2, explanation: 'Em situações críticas ou paragem, utiliza-se o débito máximo de 15 L/min.' },
      { id: 'q7-2', question: 'O oxigénio é um gás inflamável?', options: ['Sim', 'Não, mas é comburente (alimenta a chama)', 'Depende da marca', 'Apenas no verão'], correctAnswer: 1, explanation: 'O O2 não arde mas acelera violentamente a combustão de outros materiais.' }
    ]
  },
  {
    id: 'cap-8',
    title: '8. Oceanografia e Meteorologia',
    description: 'Marés, correntes e ventos.',
    questions: [
      { id: 'q8-1', question: 'O que é uma corrente de retorno (Rip Current)?', options: ['Uma onda gigante', 'Um canal de água que flui da costa para o mar', 'Um redemoinho', 'Vento forte'], correctAnswer: 1, explanation: 'As correntes de retorno são os principais causadores de afogamentos por arrastarem os banhistas para fora.' },
      { id: 'q8-2', question: 'Qual a periodicidade aproximada das marés em Portugal?', options: ['12 em 12 horas', '6 em 6 horas (aprox)', 'Uma vez por dia', 'Semanal'], correctAnswer: 1, explanation: 'O ciclo de maré (preia-mar a baixa-mar) ocorre aproximadamente a cada 6 horas.' }
    ]
  }
];

export const TIPS: Tip[] = [
  { id: 't1', category: 'Segurança', text: 'Mantenha o rádio sempre carregado e no Canal 16 durante o turno.' },
  { id: 't2', category: 'Prevenção', text: 'Vigie prioritariamente as crianças e idosos perto de agueiros.' },
  { id: 't3', category: 'Equipamento', text: 'Verifique a pressão da garrafa de O2 no início de cada turno.' }
];
