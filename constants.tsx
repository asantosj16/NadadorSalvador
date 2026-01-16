
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
    title: 'Capítulo 1: Atividade e Perfil do Nadador-Salvador',
    description: 'Enquadramento legal, deveres, ética e regulamentação da profissão.',
    questions: [
      { id: 'q1-1', question: 'Qual o diploma que regulamenta a atividade de Nadador-Salvador em Portugal?', options: ['Decreto-Lei 118/2011', 'Lei Geral do Trabalho', 'Código Civil', 'Constituição da República'], correctAnswer: 0, explanation: 'O Decreto-Lei n.º 118/2011 regula a assistência a banhistas e a atividade de nadador-salvador.' },
      { id: 'q1-2', question: 'Qual a validade da certificação técnica do NS?', options: ['1 ano', '2 anos', '3 anos', 'Indeterminada'], correctAnswer: 2, explanation: 'A certificação tem validade de 3 anos, devendo ser renovada através de exame.' },
      { id: 'q1-3', question: 'O Nadador-Salvador pode abandonar o posto durante o horário de vigilância?', options: ['Sim, para almoçar', 'Não, exceto por motivo de força maior ou salvamento', 'Sim, se não houver banhistas', 'Sim, se um colega estiver perto'], correctAnswer: 1, explanation: 'A presença contínua e vigilante é um dever fundamental do NS durante o período de serviço.' },
      { id: 'q1-4', question: 'É competência do ISN:', options: ['Vender fatos de banho', 'Definir o regime jurídico e certificar os NS', 'Limpar as praias', 'Construir hotéis na costa'], correctAnswer: 1, explanation: 'O ISN é a autoridade técnica responsável pela formação e certificação dos nadadores-salvadores.' }
    ]
  },
  {
    id: 'cap-2',
    title: 'Capítulo 2: Meios de Salvamento e Equipamento',
    description: 'Material de abordagem, reboque e comunicações.',
    questions: [
      { id: 'q2-1', question: 'Qual a principal vantagem do "Torpedo" ou Cinto de Salvamento?', options: ['Estética', 'Permite manter as mãos livres durante o reboque', 'Proteção contra tubarões', 'Substitui o colete salva-vidas'], correctAnswer: 1, explanation: 'O torpedo oferece flutuabilidade à vítima e liberta as mãos do NS para a natação de reboque.' },
      { id: 'q2-2', question: 'No uso do rádio VHF, o canal internacional de socorro é o:', options: ['Canal 9', 'Canal 16', 'Canal 68', 'Canal 22'], correctAnswer: 1, explanation: 'O Canal 16 VHF é utilizado mundialmente para chamadas de socorro, urgência e segurança marítima.' },
      { id: 'q2-3', question: 'Para que serve o saco de arremesso?', options: ['Guardar comida', 'Salvamento a partir de terra ou embarcação em zonas de difícil acesso', 'Pesar a bandeira', 'Treinar musculação'], correctAnswer: 1, explanation: 'É um meio de salvamento passivo que permite lançar uma linha flutuante a uma vítima próxima da costa.' }
    ]
  },
  {
    id: 'cap-3',
    title: 'Capítulo 3: Vigilância e Prevenção',
    description: 'Sinalética, métodos de observação e antecipação de perigo.',
    questions: [
      { id: 'q3-1', question: 'A bandeira vermelha indica:', options: ['Mar calmo', 'Proibição de entrar na água', 'Aviso de presença de medusas', 'Zona de surf'], correctAnswer: 1, explanation: 'Bandeira vermelha significa mar perigoso e proibição total de entrada na água.' },
      { id: 'q3-2', question: 'O que é o "Varrimento Ocular"?', options: ['Limpar os óculos', 'Observação sistemática da zona de vigilância por setores', 'Olhar apenas para o horizonte', 'Fechar os olhos para descansar'], correctAnswer: 1, explanation: 'É a técnica de dividir a área em zonas e percorrê-las visualmente de forma rítmica.' },
      { id: 'q3-3', question: 'Uma bandeira xadrez (azul e branca) significa:', options: ['Zona de mergulho', 'Zona de desportos náuticos/embarcações', 'Praia sem nadador-salvador', 'Fim do turno'], correctAnswer: 1, explanation: 'Sinaliza áreas onde o banho é proibido devido ao uso de pranchas ou embarcações.' }
    ]
  },
  {
    id: 'cap-4',
    title: 'Capítulo 4: Técnicas de Salvamento Aquático',
    description: 'Abordagem, natação de salvamento e técnicas de libertação.',
    questions: [
      { id: 'q4-1', question: 'Na abordagem a uma vítima consciente e em pânico, o NS deve:', options: ['Abraçá-la imediatamente', 'Manter distância e usar o equipamento como interface', 'Gritar para ela se acalmar', 'Bater na vítima'], correctAnswer: 1, explanation: 'O uso do equipamento (torpedo) evita que o socorrista seja agarrado e submerso pela vítima em pânico.' },
      { id: 'q4-2', question: 'Qual o melhor estilo de natação para visualização da vítima na abordagem?', options: ['Mariposa', 'Crawl de salvamento (cabeça fora de água)', 'Bruços submerso', 'Costas'], correctAnswer: 1, explanation: 'O crawl de salvamento permite manter contacto visual constante com a vítima e o local da ocorrência.' },
      { id: 'q4-3', question: 'O reboque "Mãos às Axilas" é indicado para:', options: ['Vítimas agressivas', 'Vítimas inconscientes com necessidade de estabilização', 'Pessoas que sabem nadar', 'Crianças a brincar'], correctAnswer: 1, explanation: 'Permite um bom controlo da cabeça e das vias aéreas de uma vítima inconsciente.' }
    ]
  },
  {
    id: 'cap-5',
    title: 'Capítulo 5: Primeiros Socorros - SBV',
    description: 'Algoritmo de suporte básico de vida no afogamento.',
    questions: [
      { id: 'q5-1', question: 'No afogamento, o algoritmo de SBV começa com:', options: ['30 compressões', '5 insuflações de resgate', 'Pedir o DAE', 'Verificar pulso'], correctAnswer: 1, explanation: 'Devido à causa ser hipóxica, o algoritmo de afogamento prioriza a ventilação inicial.' },
      { id: 'q5-2', question: 'Qual a profundidade das compressões num adulto?', options: ['2 a 3 cm', '5 a 6 cm', '8 a 10 cm', 'O máximo possível'], correctAnswer: 1, explanation: 'As compressões devem ter 5-6 cm de profundidade para serem eficazes.' },
      { id: 'q5-3', question: 'A frequência das compressões deve ser:', options: ['60 por minuto', '100 a 120 por minuto', '150 por minuto', 'O mais rápido que conseguir'], correctAnswer: 1, explanation: 'A recomendação oficial é de 100 a 120 compressões por minuto.' }
    ]
  },
  {
    id: 'cap-6',
    title: 'Capítulo 6: Traumatologia e Lesões Específicas',
    description: 'Gestão de traumas, fraturas e acidentes ambientais.',
    questions: [
      { id: 'q6-1', question: 'Perante uma suspeita de lesão vertebro-medular na água, a prioridade é:', options: ['Retirar a vítima rapidamente', 'Manter o alinhamento cabeça-pescoço-tronco na água', 'Verificar se consegue andar', 'Dar água à vítima'], correctAnswer: 1, explanation: 'A estabilização manual do eixo axial é crítica para evitar danos neurológicos permanentes.' },
      { id: 'q6-2', question: 'O tratamento inicial para picada de peixe-aranha é:', options: ['Gelo', 'Imersão em água quente (tolerável)', 'Vinagre', 'Lixívia'], correctAnswer: 1, explanation: 'O calor destrói a toxina termolábil do peixe-aranha, aliviando a dor.' },
      { id: 'q6-3', question: 'Na insolação, qual o sintoma mais grave?', options: ['Pele fria', 'Alteração do estado de consciência e temperatura elevada', 'Muita sede', 'Pele bronzeada'], correctAnswer: 1, explanation: 'A insolação é uma emergência médica caracterizada pela falência da termorregulação.' }
    ]
  },
  {
    id: 'cap-7',
    title: 'Capítulo 7: Oxigenoterapia',
    description: 'Administração de oxigénio suplementar e via aérea.',
    questions: [
      { id: 'q7-1', question: 'Qual o débito de O2 recomendado para uma vítima em paragem respiratória usando balão auto-insuflável?', options: ['2 L/min', '6 L/min', '15 L/min', '10 L/min'], correctAnswer: 2, explanation: 'Utiliza-se o débito máximo (15 L/min) para garantir a maior concentração de O2 possível.' },
      { id: 'q7-2', question: 'O que indica a cor branca/preta no ombro de uma garrafa de oxigénio?', options: ['Que está vazia', 'Que contém Oxigénio Medicinal', 'Que é perigosa', 'Que é Ar Comprimido'], correctAnswer: 1, explanation: 'É a codificação padrão para cilindros de oxigénio medicinal.' },
      { id: 'q7-3', question: 'Cânula de Guedel serve para:', options: ['Impedir a queda da língua e manter a via aérea permeável', 'Injetar medicamentos', 'Alimentar a vítima', 'Drenar água dos pulmões'], correctAnswer: 0, explanation: 'A Guedel mantém a base da língua afastada da parede posterior da faringe.' }
    ]
  },
  {
    id: 'cap-8',
    title: 'Capítulo 8: Oceanografia e Meteorologia',
    description: 'Dinamismo das praias, correntes e fenómenos climáticos.',
    questions: [
      { id: 'q8-1', question: 'Um agueiro (corrente de retorno) identifica-se por:', options: ['Grandes ondas a rebentar', 'Zona de água mais calma e escura entre a rebentação', 'Presença de muitos peixes', 'Água muito fria'], correctAnswer: 1, explanation: 'Os agueiros são canais onde a água regressa ao largo, muitas vezes parecendo "buracos" calmos.' },
      { id: 'q8-2', question: 'Qual o comportamento correto se for apanhado por um agueiro?', options: ['Nadar contra a corrente', 'Nadar paralelamente à costa', 'Gritar e bater na água', 'Mergulhar até ao fundo'], correctAnswer: 1, explanation: 'Nadar de lado (paralelo à praia) permite sair da zona de sucção da corrente.' },
      { id: 'q8-3', question: 'O que é a "Preia-Mar"?', options: ['Maré vazia', 'Maré cheia', 'Vento de terra', 'Tempestade no mar'], correctAnswer: 1, explanation: 'É o ponto máximo de elevação do nível do mar num ciclo de maré.' }
    ]
  }
];

export const TIPS: Tip[] = [
  { id: 't1', category: 'Segurança', text: 'Mantenha o rádio sempre carregado e no Canal 16 durante o turno.' },
  { id: 't2', category: 'Prevenção', text: 'Vigie prioritariamente as crianças e idosos perto de agueiros.' },
  { id: 't3', category: 'Equipamento', text: 'Verifique a pressão da garrafa de O2 no início de cada turno.' },
  { id: 't4', category: 'Prevenção', text: 'Esteja atento a mudanças repentinas no padrão de rebentação.' }
];
