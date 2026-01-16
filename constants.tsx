
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
    description: 'Enquadramento legal, certificação e deveres éticos.',
    questions: [
      { id: 'q1-1', question: 'Qual a validade atual da certificação de Nadador-Salvador em Portugal?', options: ['2 anos', '3 anos', '5 anos', 'Vitalícia'], correctAnswer: 1, explanation: 'A certificação técnica é válida por 3 anos (Decreto-Lei 118/2011).' }
    ]
  },
  {
    id: 'cap-9',
    title: '9. Oxigenoterapia no Salvamento Aquático',
    description: 'Protocolos de administração, segurança e equipamentos de oxigénio.',
    questions: [
      { 
        id: 'q9-1', 
        question: 'Qual o débito de oxigénio recomendado para uma vítima de afogamento Grau 2 (Szpilman)?', 
        options: ['1-2 L/min', '5 L/min', '15 L/min', 'Não se administra O2'], 
        correctAnswer: 1, 
        explanation: 'Vítimas Grau 2 (pouca espuma na boca/nariz) apresentam hipoxemia leve a moderada e beneficiam de 5 L/min via máscara simples para estabilização.' 
      },
      { 
        id: 'q9-2', 
        question: 'Nas vítimas Grau 3, 4, 5 e 6 da Escala de Szpilman, qual o débito de oxigénio indicado?', 
        options: ['5 L/min', '10 L/min', '15 L/min', 'Apenas SBV'], 
        correctAnswer: 2, 
        explanation: 'Afogados graves (G3 a G6) apresentam edema pulmonar agudo ou paragem. Necessitam de alta concentração de O2 (15L/min) via máscara de reservatório ou insuflador manual.' 
      },
      { 
        id: 'q9-3', 
        question: 'Por que razão nunca se deve usar gorduras, óleos ou vaselina perto das válvulas de oxigénio?', 
        options: ['Mancha o fardamento', 'Pode causar combustão espontânea ou explosão sob pressão', 'Dificulta a abertura da válvula', 'Altera o odor do gás'], 
        correctAnswer: 1, 
        explanation: 'O oxigénio sob pressão reage violentamente com hidrocarbonetos. O contacto de óleo ou gordura com a válvula pode gerar uma ignição explosiva imediata.' 
      },
      { 
        id: 'q9-4', 
        question: 'Qual a função principal do saco reservatório numa máscara de alta concentração?', 
        options: ['Recolher o CO2 exalado', 'Permitir concentrações de O2 próximas de 100%', 'Funcionar como almofada para a vítima', 'Aquecer o gás antes de entrar nos pulmões'], 
        correctAnswer: 1, 
        explanation: 'O saco reservatório garante que a vítima inspire quase exclusivamente oxigénio puro vindo da garrafa, minimizando a mistura com o ar ambiente.' 
      },
      { 
        id: 'q9-5', 
        question: 'Qual a cor que identifica obrigatoriamente as garrafas de oxigénio medicinal em Portugal?', 
        options: ['Azul com ogiva branca', 'Toda branca ou cinzenta com ogiva branca', 'Verde', 'Amarela'], 
        correctAnswer: 1, 
        explanation: 'De acordo com a norma ISO 32, o oxigénio medicinal é identificado pela cor branca na ogiva (parte superior) da garrafa.' 
      },
      { 
        id: 'q9-6', 
        question: 'O fluxómetro da garrafa de oxigénio serve para medir:', 
        options: ['A pressão restante na garrafa', 'A quantidade de litros por minuto administrados', 'A temperatura do gás', 'O batimento cardíaco da vítima'], 
        correctAnswer: 1, 
        explanation: 'O fluxómetro controla e indica a saída de gás em Litros por Minuto (Lpm). A pressão da garrafa é medida pelo manómetro.' 
      },
      { 
        id: 'q9-7', 
        question: 'O que deve ser feito antes de aplicar a máscara de reservatório no rosto de uma vítima consciente?', 
        options: ['Insuflar o saco reservatório tapando a válvula com o dedo', 'Pedir à vítima para prender a respiração', 'Molhar a máscara com água do mar', 'Desligar o oxigénio'], 
        correctAnswer: 0, 
        explanation: 'Deve-se pré-encher o saco reservatório com oxigénio para garantir que a primeira inspiração da vítima já seja rica em O2 e o saco não colapse.' 
      },
      { 
        id: 'q9-8', 
        question: 'Numa vítima Grau 5 (Paragem Respiratória), como deve ser administrado o oxigénio?', 
        options: ['Via máscara simples a 5L/min', 'Acoplado ao insuflador manual (Ambu) a 15L/min', 'Não se usa oxigénio em paragem', 'Via óculos nasais'], 
        correctAnswer: 1, 
        explanation: 'Na paragem respiratória, o NS deve ventilar a vítima. O O2 deve estar ligado ao balão insuflador a 15L/min para enriquecer cada ventilação de resgate.' 
      },
      { 
        id: 'q9-9', 
        question: 'Uma garrafa de 2 litros carregada a 200 bar contém que volume total de oxigénio?', 
        options: ['2 litros', '200 litros', '400 litros', '1000 litros'], 
        correctAnswer: 2, 
        explanation: 'Volume total = Capacidade da garrafa (2L) x Pressão (200 bar) = 400 litros de oxigénio disponíveis.' 
      },
      { 
        id: 'q9-10', 
        question: 'Qual a principal contraindicação de fumar ou usar chamas perto de um posto com oxigénio?', 
        options: ['O cheiro incomoda os banhistas', 'O oxigénio é comburente e acelera violentamente qualquer incêndio', 'O fumo estraga o oxímetro', 'Não há risco'], 
        correctAnswer: 1, 
        explanation: 'Embora o oxigénio não arda sozinho, ele é um comburente potente. Qualquer faísca ou brasa em ambiente rico em O2 transforma-se instantaneamente numa chama incontrolável.' 
      }
    ]
  }
];

export const TIPS: Tip[] = [
  { id: 't1', category: 'Segurança', text: 'Mantenha o rádio sempre carregado e no Canal 16 durante o turno.' }
];
