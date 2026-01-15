
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
      },
      {
        id: 'fa-szpilman',
        title: 'Algoritmo de Szpilman (Afogamento)',
        description: 'Classificação oficial de gravidade e tratamento do afogado.',
        fullContent: `A escala de Szpilman define 6 graus de afogamento baseados na presença de tosse, espuma e sinais vitais.`,
        flowSteps: [
          { id: 'sz1', type: 'start', label: 'Avaliar Vítima Resgatada', next: 'sz2' },
          { id: 'sz2', type: 'decision', label: 'Vítima Consciente?', yes: 'sz3', no: 'sz7' },
          { id: 'sz3', type: 'decision', label: 'Tem Espuma na boca/nariz?', yes: 'sz4', no: 'sz6' },
          { id: 'sz4', type: 'decision', label: 'Pulso Radial Presente?', yes: 'grau2', no: 'grau4' },
          { id: 'sz6', type: 'end', label: 'Grau 1: Tosse sem espuma', description: 'Repouso, aquecimento e observação.' },
          { id: 'grau2', type: 'end', label: 'Grau 2: Pouca Espuma', description: 'O2 (5L/min), aquecimento, repouso lateral direito.' },
          { id: 'grau4', type: 'end', label: 'Grau 4: Muita Espuma / Sem Pulso Radial', description: 'O2 (15L/min), monitorizar PCR iminente, Hospital urgente.' },
          { id: 'sz7', type: 'decision', label: 'Vítima Respira?', yes: 'sz8', no: 'sz9' },
          { id: 'sz8', type: 'end', label: 'Grau 3: Espuma e Pulso Radial', description: 'PLS, O2 (15L/min), Hospital urgente.' },
          { id: 'sz9', type: 'decision', label: 'Tem Pulso Carotídeo?', yes: 'grau5', no: 'grau6' },
          { id: 'grau5', type: 'end', label: 'Grau 5: Paragem Respiratória', description: 'Efetuar ventilações de resgate (10/min).' },
          { id: 'grau6', type: 'end', label: 'Grau 6: Paragem Cardíaca', description: 'Iniciar SBV completo (30:2) imediatamente.' }
        ]
      },
      {
        id: 'fa-hemorrhage',
        title: 'Hemorragias Graves',
        description: 'Protocolo de controlo de hemorragias massivas e choque.',
        fullContent: `O controlo rápido de uma hemorragia arterial é vital.`,
        flowSteps: [
          { id: 'h1', type: 'start', label: 'Identificar Fonte', next: 'h2' },
          { id: 'h2', type: 'action', label: 'Pressão Direta Manual', description: 'Aplicar pressão firme sobre a ferida com gaze limpa.', next: 'h3' },
          { id: 'h3', type: 'decision', label: 'Sangramento Parou?', yes: 'h4', no: 'h5' },
          { id: 'h4', type: 'end', label: 'Curativo Compressivo', description: 'Manter a compressão com ligadura elástica.' },
          { id: 'h5', type: 'decision', label: 'Hemorragia em Membro?', yes: 'h6', no: 'h7' },
          { id: 'h6', type: 'action', label: 'Aplicar Torniquete', description: '5-10cm acima da ferida. Apertar até parar o sangue.', next: 'h8' },
          { id: 'h7', type: 'action', label: 'Preenchimento da Ferida', description: 'Gaze hemostática e pressão manual forte.', next: 'h8' },
          { id: 'h8', type: 'end', label: 'Tratar Choque', description: 'Manter vítima deitada e quente. Ligar 112.' }
        ]
      },
      {
        id: 'fa-spine',
        title: 'Trauma Vertebro-Medular',
        description: 'Imobilização cervical e extração de vítimas de trauma.',
        fullContent: `A manipulação incorreta pode causar paralisia definitiva.`,
        flowSteps: [
          { id: 's1', type: 'start', label: 'Estabilização Manual', description: 'Manter cabeça em posição neutra imediatamente.', next: 's2' },
          { id: 's2', type: 'action', label: 'Avaliar ABC', description: 'Priorizar via aérea sem mover o pescoço.', next: 's3' },
          { id: 's3', type: 'decision', label: 'Vítima na Água?', yes: 's4', no: 's5' },
          { id: 's4', type: 'action', label: 'Rolamento em Bloco', description: 'Usar plano rígido para extração lateral.', next: 's5' },
          { id: 's5', type: 'action', label: 'Fixação em Plano Rígido', description: 'Cintos e imobilizadores laterais (Head-blocks).', next: 's6' },
          { id: 's6', type: 'end', label: 'Transporte Nivelado', description: 'Evitar inclinações durante o transporte para a ambulância.' }
        ]
      },
      {
        id: 'fa-pedsbv',
        title: 'SBV Pediátrico',
        description: 'Protocolo para Crianças e Lactentes.',
        fullContent: `Adaptações críticas para vítimas com via aérea imatura.`,
        flowSteps: [
          { id: 'p1', type: 'start', label: 'Segurança e Estímulo', next: 'p2' },
          { id: 'p2', type: 'decision', label: 'Responde?', yes: 'p-end1', no: 'p3' },
          { id: 'p3', type: 'action', label: '5 Insuflações de Resgate', description: 'Primeiro passo crítico na paragem pediátrica.', next: 'p4' },
          { id: 'p4', type: 'decision', label: 'Sinais de Vida?', yes: 'p-end2', no: 'p5' },
          { id: 'p5', type: 'action', label: '15 Compressões : 2 Ventilações', description: 'Rácio para profissionais (ou 30:2 se sozinho).', next: 'p5' },
          { id: 'p-end1', type: 'end', label: 'Observação', description: 'Manter calma e aguardar meios.' },
          { id: 'p-end2', type: 'action', label: 'Ventilação de Suporte', description: '12-20 ventilações/min sem compressões.' }
        ]
      },
      {
        id: 'fa-ovace',
        title: 'OVACE (Desobstrução)',
        description: 'Protocolo para asfixia por corpo estranho.',
        fullContent: `Protocolo para engasgamento total.`,
        flowSteps: [
          { id: 'o1', type: 'start', label: 'Avaliar Obstrução', next: 'o2' },
          { id: 'o2', type: 'decision', label: 'Tosse Eficaz?', yes: 'o3', no: 'o4' },
          { id: 'o3', type: 'end', label: 'Observar e Encorajar', description: 'Não intervir fisicamente.' },
          { id: 'o4', type: 'decision', label: 'Consciente?', yes: 'o5', no: 'o8' },
          { id: 'o5', type: 'action', label: '5 Pancadas Interescapulares', next: 'o6' },
          { id: 'o6', type: 'action', label: '5 Compressões Abdominais', next: 'o7' },
          { id: 'o7', type: 'decision', label: 'Objeto Saiu?', yes: 'o3', no: 'o5' },
          { id: 'o8', type: 'end', label: 'Iniciar SBV', description: 'Começar por compressões mesmo se houver pulso.' }
        ]
      },
      {
        id: 'fa-bites',
        title: 'Picadas de Animais Marinhos',
        description: 'Tratamento para Peixe-Aranha e Alforrecas.',
        fullContent: `A dor pode causar choque anafilático ou pânico no banhista.`,
        flowSteps: [
          { id: 'b1', type: 'start', label: 'Identificar Animal', next: 'b2' },
          { id: 'b2', type: 'decision', label: 'Peixe-Aranha / Raya?', yes: 'b3', no: 'b4' },
          { id: 'b3', type: 'end', label: 'Água Quente (40-45ºC)', description: 'Imergir zona picada por 30-90 min (toxina termolábil).' },
          { id: 'b4', type: 'decision', label: 'Alforreca / Caravela?', yes: 'b5', no: 'b6' },
          { id: 'b5', type: 'end', label: 'Água Salgada e Vinagre', description: 'Lavar com água do mar. Não usar água doce (ativa cnidócitos).' },
          { id: 'b6', type: 'end', label: 'Vigilância Alérgica', description: 'Se houver edema ou falta de ar, ligar 112.' }
        ]
      }
    ]
  },
  {
    id: 'special-ops',
    title: 'Meios Especiais e Piscinas',
    icon: '🌊',
    content: [
      {
        id: 'pool-1',
        title: 'Segurança em Piscinas',
        description: 'Gestão de riscos em ambientes de águas confinadas.',
        fullContent: `As piscinas apresentam riscos específicos como sucção e químicos.`
      },
      {
        id: 'sub-vehicle',
        title: 'Veículos Submersos',
        description: 'Protocolo de resgate rodoviário em meio aquático.',
        fullContent: `Resgate de emergência em veículos com queda à água.`,
        flowSteps: [
          { id: 'v1', type: 'start', label: 'Acesso ao Veículo', description: 'Priorizar janelas laterais.', next: 'v2' },
          { id: 'v2', type: 'decision', label: 'Submerso Total?', yes: 'v3', no: 'v4' },
          { id: 'v3', type: 'action', label: 'Equalização de Pressão', description: 'Aguardar entrada de água para abrir portas.', next: 'v5' },
          { id: 'v4', type: 'action', label: 'Extração Rápida', description: 'Corte de cintos e remoção.', next: 'v5' },
          { id: 'v5', type: 'end', label: 'Transporte e SBV', description: 'Garantir via aérea em terra.' }
        ]
      }
    ]
  },
  {
    id: 'vigilance',
    title: 'Vigilância e Prevenção Ativa',
    icon: '👁️',
    content: [
      {
        id: 'vg-1',
        title: 'Técnicas de Scanning',
        description: 'Métodos para manter a atenção e cobrir toda a zona balnear.',
        fullContent: `A vigilância proativa é a base do trabalho do Nadador-Salvador.`
      }
    ]
  },
  {
    id: 'docs',
    title: 'Documentação e Logística',
    icon: '📋',
    content: [
      {
        id: 'doc-1',
        title: 'Relatório de Salvamento (ISN)',
        description: 'Guia de preenchimento do relatório oficial.',
        externalLink: 'https://www.amn.pt/ISN/Documents/01_relatorio_salvamento_praia.pdf',
        fullContent: `Registo fundamental para fins estatísticos e jurídicos.`
      }
    ]
  }
];

export const QUIZ_CHAPTERS: QuizChapter[] = [
  {
    id: 'cap-1',
    title: 'Capítulo 1: O Nadador-Salvador',
    description: 'Perfil, responsabilidades e regime jurídico.',
    questions: [
      {
        id: 'c1-q1',
        question: 'Qual a entidade responsável pela certificação técnica dos Nadadores-Salvadores em Portugal?',
        options: ['Marinha Portuguesa', 'Instituto de Socorros a Náufragos (ISN)', 'FEPONS', 'Polícia Marítima'],
        correctAnswer: 1,
        explanation: 'O ISN é o regulador técnico e o organismo certificador da atividade conforme o DL 118/2011.'
      }
    ]
  }
];

export const TIPS: Tip[] = [
  { id: 't1', category: 'Segurança', text: 'Mantenha o rádio sempre carregado e no Canal 16 durante o turno.' },
  { id: 't2', category: 'Saúde', text: 'Hidrate-se constantemente para manter a clareza mental durante a vigilância.' },
  { id: 't3', category: 'Equipamento', text: 'Lave o flutuador e o carreto com água doce ao final de cada dia.' }
];
