
import { ManualCategory, QuizChapter, Tip, BeachFlag } from './types';

export const BEACH_FLAGS: BeachFlag[] = [
  { color: 'Verde', name: 'Banhos Autorizados', meaning: 'Mar calmo. Vigilância ativa.', hex: '#22c55e' },
  { color: 'Amarela', name: 'Atenção', meaning: 'Banhos permitidos, mas proibido nadar para longe.', hex: '#eab308' },
  { color: 'Vermelha', name: 'Perigo: Proibido', meaning: 'Proibida a entrada na água.', hex: '#dc2626' },
  { color: 'Xadrez', name: 'Posto Desabitado', meaning: 'Zona de desportos náuticos ou sem vigilância.', hex: '#0f172a' },
  { color: 'Azul', name: 'Qualidade Ambiental', meaning: 'Galardão de excelência da praia.', hex: '#2563eb' }
];

export const MANUALS: ManualCategory[] = [
  {
    id: 'legal-ethics',
    title: 'Legislação e Ética Profissional',
    icon: '⚖️',
    content: [
      {
        id: 'leg-1',
        title: 'Lei 68/2014 e Regime Jurídico',
        description: 'Enquadramento legal da atividade e responsabilidade civil/criminal.',
        fullContent: 'A Lei n.º 68/2014 estabelece o regime jurídico da assistência a banhistas. O Nadador-Salvador (NS) é o elemento habilitado com o curso de formação técnica e tem o dever de vigiar, prevenir e socorrer. O cartão de NS é válido por 3 anos e a sua falta impede o exercício da função em qualquer contexto balnear.'
      },
      {
        id: 'leg-2',
        title: 'Deveres e Ética do NS',
        description: 'Normas de conduta, sigilo profissional e prontidão operativa.',
        fullContent: 'Deveres fundamentais: 1. Permanência no posto durante o horário; 2. Uso correto do uniforme; 3. Vigilância ativa e ininterrupta; 4. Colaboração com as autoridades (Polícia Marítima e Capitania). A ética profissional exige imparcialidade total no socorro e manutenção do sigilo sobre o estado das vítimas.'
      },
      {
        id: 'leg-3',
        title: 'Responsabilidade Civil e Criminal',
        description: 'Consequências legais da omissão de auxílio ou negligência.',
        fullContent: 'O NS pode ser responsabilizado civilmente por danos causados por negligência e criminalmente em caso de omissão de auxílio. A lei protege o NS quando este atua dentro dos protocolos estabelecidos pelo ISN.'
      }
    ]
  },
  {
    id: 'physiology-drowning',
    title: 'Fisiologia e Afogamento',
    icon: '🫁',
    content: [
      {
        id: 'phys-1',
        title: 'Mecanismos do Afogamento',
        description: 'Processo de asfixia por submersão e laringospasmo.',
        fullContent: 'O afogamento é um processo que resulta em compromisso respiratório. Inicia-se com a aspiração de pequenas quantidades de água, levando ao laringospasmo (fecho das cordas vocais). Segue-se a hipóxia cerebral e paragem respiratória antes da cardíaca.'
      },
      {
        id: 'phys-2',
        title: 'Hipotermia e Choque Térmico',
        description: 'Impacto da temperatura da água no sistema cardiovascular.',
        fullContent: 'Hipotermia ocorre quando a temperatura central < 35°C. Na água, a perda de calor é 25x superior ao ar. O choque térmico pode causar bradicardia súbita, desorientação ou fibrilação ventricular.'
      },
      {
        id: 'phys-3',
        title: 'Fisiopatologia da Respiração',
        description: 'Trocas gasosas e importância da oxigenação no socorro.',
        fullContent: 'A respiração externa (nos pulmões) e interna (nos tecidos) é interrompida no afogado. A prioridade absoluta é restaurar a ventilação para reverter a hipoxemia.'
      }
    ]
  },
  {
    id: 'first-aid',
    title: 'Suporte Básico de Vida',
    icon: '🏥',
    content: [
      {
        id: 'fa-1',
        title: 'SBV Adulto (Afogamento)',
        description: 'Algoritmo de reanimação adaptado ao meio aquático.',
        fullContent: '1. Verificar Segurança; 2. Avaliar Consciência; 3. Gritar por Ajuda; 4. Avaliar Respiração (VOS); 5. 5 Insuflações de Resgate (prioridade em afogados); 6. 30 compressões (5-6cm profundidade); 7. Rácio 30:2.',
        flowSteps: [
          { id: '1', type: 'start', label: 'Segurança Local', next: '2' },
          { id: '2', type: 'action', label: 'Avaliar Vítima (Consciência e VOS)', next: '3' },
          { id: '3', type: 'decision', label: 'Respira Normalmente?', yes: 'end-1', no: '4' },
          { id: '4', type: 'action', label: '5 Insuflações Iniciais', next: '5' },
          { id: '5', type: 'action', label: 'Ciclo 30:2 e DAE', next: '5' },
          { id: 'end-1', type: 'end', label: 'Posição Lateral de Segurança' }
        ]
      },
      {
        id: 'fa-2',
        title: 'SBV Pediátrico',
        description: 'Protocolo para lactentes e crianças.',
        fullContent: 'Crianças (< puberdade): Rácio 15:2 para profissionais. Lactentes (< 1 ano): Compressão com 2 dedos ou técnica de abraçar. Profundidade: 1/3 do diâmetro do tórax. Iniciar sempre com 5 insuflações de resgate.',
        flowSteps: [
          { id: '1', type: 'start', label: 'Avaliar Segurança', next: '2' },
          { id: '2', type: 'action', label: 'Gritar por Ajuda / 112', next: '3' },
          { id: '3', type: 'action', label: '5 Ventilações (Boca-Boca/Nariz)', next: '4' },
          { id: '4', type: 'action', label: '15 Compressões (2 dedos no bebé)', next: '4' },
          { id: 'end-1', type: 'end', label: 'Estabilizar até chegada INEM' }
        ]
      },
      {
        id: 'fa-3',
        title: 'Obstrução da Via Aérea (Engasgamento)',
        description: 'Manobra de Heimlich e pancadas interescapulares.',
        fullContent: 'Para vítimas conscientes: 5 pancadas nas costas seguidas de 5 compressões abdominais (Heimlich). Se inconsciente, iniciar protocolo de SBV.',
        flowSteps: [
          { id: '1', type: 'start', label: 'Tosse Eficaz?', next: '2' },
          { id: '2', type: 'decision', label: 'Consegue Tossir?', yes: 'end-1', no: '3' },
          { id: '3', type: 'action', label: '5 Pancadas nas Costas', next: '4' },
          { id: '4', type: 'action', label: '5 Manobras de Heimlich', next: '1' },
          { id: 'end-1', type: 'end', label: 'Apoio e Vigilância' }
        ]
      }
    ]
  },
  {
    id: 'trauma-special',
    title: 'Traumatologia e Emergências Médicas',
    icon: '🦴',
    content: [
      {
        id: 'tr-coluna',
        title: 'Suspeita de Lesão Medular',
        description: 'Manuseamento em mergulhos em águas rasas.',
        fullContent: 'Imobilização cervical imediata. Não remover a vítima da água sem plano rígido ou apoio de 3-4 socorristas mantendo o alinhamento cabeça-pescoço-tronco. O "Head Splint" é a técnica de eleição para estabilização manual na água.',
        flowSteps: [
          { id: '1', type: 'start', label: 'Imobilização Manual (Head Splint)', next: '2' },
          { id: '2', type: 'action', label: 'Colar Cervical e Plano Rígido', next: '3' },
          { id: '3', type: 'action', label: 'Fixar Aranha e Laterais', next: 'end' },
          { id: 'end', type: 'end', label: 'Extração Suave da Água' }
        ]
      },
      {
        id: 'tr-hem',
        title: 'Controlo de Hemorragias',
        description: 'Pressão direta e uso de torniquete.',
        fullContent: '1. Pressão Direta; 2. Curativo Compressivo; 3. Torniquete em situações extremas de hemorragia massiva arterial em membros. Manter a vítima em choque (pernas elevadas se possível e manter quente).'
      },
      {
        id: 'tr-burns',
        title: 'Queimaduras Solares e Térmicas',
        description: 'Graus de queimadura e primeiros cuidados.',
        fullContent: 'Arrefecer com água doce corrente (não gelada). Não rebentar bolhas. Aplicar pensos estéreis húmidos. Hidratar a vítima.'
      }
    ]
  },
  {
    id: 'rescue-techniques',
    title: 'Técnicas de Salvamento',
    icon: '🌊',
    content: [
      {
        id: 'res-1',
        title: 'Aproximação e Reboques',
        description: 'Abordagem à vítima e transporte para terra.',
        fullContent: 'Aproximação deve ser feita pelas costas. Reboques padrão: 1. Axilar (vítima consciente); 2. Cabeça-peito (vítima inconsciente); 3. Pelo braço. Manter sempre a via aérea da vítima fora de água.'
      },
      {
        id: 'res-2',
        title: 'Libertações e Defesa Pessoal',
        description: 'Técnicas de segurança quando agarrado em pânico.',
        fullContent: 'Se agarrado, o NS deve submergir. A vítima soltará para tentar flutuar. Usar as pernas para afastar a vítima se necessário. Recorrer ao flutuador como barreira.'
      },
      {
        id: 'res-3',
        title: 'Uso do Flutuador (Rescue Tube)',
        description: 'Operação do material de salvamento básico.',
        fullContent: 'O flutuador deve ser colocado sob as axilas da vítima. Permite ao NS ter as mãos livres para nadar e rebocar com maior eficiência e segurança.'
      }
    ]
  },
  {
    id: 'oceanography',
    title: 'Oceanografia e Meteorologia',
    icon: '🗺️',
    content: [
      {
        id: 'ocean-1',
        title: 'Correntes de Retorno (Agueiros)',
        description: 'Identificação e dinâmica dos canais.',
        fullContent: 'O agueiro é uma corrente forte que flui da costa para o mar. Identificação: Água mais escura, sem rebentação, espuma a sair. Instruir banhista a nadar paralelo à costa para sair da corrente.'
      },
      {
        id: 'ocean-2',
        title: 'Escalas de Beaufort e Douglas',
        description: 'Intensidade do vento e estado do mar.',
        fullContent: 'Beaufort (0-12) mede o vento. Douglas (0-9) mede a vaga. Crucial para decidir o hastear das bandeiras e alertas de segurança.'
      },
      {
        id: 'ocean-3',
        title: 'Marés e Zonas de Rebentação',
        description: 'Impacto do nível do mar na segurança balnear.',
        fullContent: 'A maré vaza pode expor rochas perigosas. A maré enchente pode criar correntes laterais fortes e reduzir a área útil de vigilância.'
      }
    ]
  },
  {
    id: 'equipment-comm',
    title: 'Equipamentos e Comunicações',
    icon: '📻',
    content: [
      {
        id: 'eq-1',
        title: 'Sinais de Braço e Bandeiras',
        description: 'Linguagem gestual internacional.',
        fullContent: 'Braço levantado: "Preciso de Ajuda". Agitar braços: "Alerta de Perigo". Bandeira Vermelha: Proibido. Amarela: Atenção. Xadrez: Posto Desabitado.'
      },
      {
        id: 'eq-2',
        title: 'Rádio VHF e CH16',
        description: 'Procedimentos de rádio marítimo.',
        fullContent: 'Canal 16 é o canal internacional de socorro. Usar frases curtas e alfabeto fonético internacional para clareza em situações críticas.'
      }
    ]
  },
  {
    id: 'prevention-vigilance',
    title: 'Prevenção e Vigilância',
    icon: '🔭',
    content: [
      {
        id: 'prev-1',
        title: 'Metodologias de Vigilância',
        description: 'Varrimento visual e posicionamento.',
        fullContent: 'Varrimento em "S" ou "Z". Focar em: Crianças sozinhas, idosos e zonas de agueiros. Alternar entre vigilância em pé (melhor ângulo) e sentada (descanso ativo).'
      },
      {
        id: 'prev-2',
        title: 'Gestão de Posto e Apoio Sanitário',
        description: 'Organização e prontidão do material.',
        fullContent: 'Verificar diariamente: Oxigénio (min 150 bar), DAE (elétrodos e bateria), mala de 1º socorros e comunicações.'
      }
    ]
  }
];

export const QUIZ_CHAPTERS: QuizChapter[] = [
  {
    id: 'cap-1',
    title: 'Capítulo 1: Legislação e Ética',
    description: 'Deveres, direitos e enquadramento jurídico do Nadador-Salvador (Lei 68/2014).',
    questions: [
      { id: '1-1', question: 'Qual a principal lei que regulamenta a atividade de Nadador-Salvador em Portugal?', options: ['Lei 68/2014', 'Lei 50/2006', 'Decreto-Lei 12/2000', 'Lei 24/2012'], correctAnswer: 0, explanation: 'A Lei 68/2014 estabelece o regime jurídico da assistência a banhistas.' },
      { id: '1-2', question: 'É um dever do Nadador-Salvador:', options: ['Ausentar-se do posto sem substituição', 'Vigiar a praia apenas em mar alto', 'Prevenir acidentes e socorrer banhistas', 'Cobrar taxas de salvamento'], correctAnswer: 2, explanation: 'A prevenção é o pilar fundamental da atividade.' },
      { id: '1-3', question: 'A entidade técnica responsável pelo salvamento aquático em Portugal é:', options: ['Polícia Marítima', 'ISN (Instituto de Socorros a Náufragos)', 'Proteção Civil', 'Marinha Portuguesa'], correctAnswer: 1, explanation: 'O ISN é a autoridade técnica em matéria de assistência a banhistas.' },
      { id: '1-4', question: 'Qual o tempo de validade da certificação de Nadador-Salvador?', options: ['1 ano', '2 anos', '3 anos', '5 anos'], correctAnswer: 2, explanation: 'A certificação é válida por 3 anos, findos os quais requer revalidação.' },
      { id: '1-5', question: 'O Nadador-Salvador pode exercer funções sem o cartão atualizado?', options: ['Sim, se tiver boa forma física', 'Não, é obrigatório por lei', 'Apenas em piscinas privadas', 'Sim, se a entidade patronal autorizar'], correctAnswer: 1, explanation: 'O cartão de Nadador-Salvador é o documento legal habilitante.' },
      { id: '1-6', question: 'Em caso de acidente grave, quem deve ser informado primeiro pelo NS?', options: ['A família da vítima', 'O gerente da concessão', 'As autoridades (Capitania/Polícia Marítima)', 'A imprensa'], correctAnswer: 2, explanation: 'A coordenação com as autoridades marítimas é prioritária.' },
      { id: '1-7', question: 'O Nadador-Salvador tem direito a:', options: ['Uniforme e material de socorro', 'Trabalhar 24h seguidas', 'Não usar protetor solar', 'Ignorar as ordens do ISN'], correctAnswer: 0, explanation: 'A entidade exploradora deve fornecer os meios necessários.' },
      { id: '1-8', question: 'O ombro de vigia deve ser feito:', options: ['Sentado de costas para o mar', 'Em pé ou sentado, com varrimento constante', 'Apenas quando há muita gente', 'Deitados na areia'], correctAnswer: 1, explanation: 'O varrimento visual constante é essencial para a deteção precoce.' },
      { id: '1-9', question: 'O que caracteriza a negligência no serviço?', options: ['Fazer um salvamento difícil', 'Omissão de auxílio ou falta de atenção', 'Pedir ajuda ao 112', 'Usar o apito'], correctAnswer: 1, explanation: 'A falta de zelo ou atenção configura negligência.' },
      { id: '1-10', question: 'A ética profissional do NS implica:', options: ['Neutralidade e prontidão', 'Escolher quem salvar primeiro por amizade', 'Dormir no posto', 'Não usar t-shirt identificativa'], correctAnswer: 0, explanation: 'A prontidão e imparcialidade são fundamentais.' }
    ]
  },
  {
    id: 'cap-2',
    title: 'Capítulo 2: Fisiologia e Afogamento',
    description: 'Processos fisiológicos, tipos de afogamento e mecanismos de asfixia.',
    questions: [
      { id: '2-1', question: 'A definição atual de afogamento é:', options: ['Morte imediata por água', 'Processo de sofrer compromisso respiratório por submersão/imersão', 'Beber muita água salgada', 'Apenas quando há paragem cardíaca'], correctAnswer: 1, explanation: 'Definição da OMS focada no processo respiratório.' },
      { id: '2-2', question: 'O que é o "Laringospasmo"?', options: ['Um tipo de natação', 'Fecho involuntário das cordas vocais', 'Aumento da temperatura corporal', 'Uma técnica de mergulho'], correctAnswer: 1, explanation: 'É um reflexo de defesa para impedir a entrada de água nos pulmões.' },
      { id: '2-3', question: 'A principal causa de morte no afogamento é:', options: ['Hipotermia', 'Cãibras', 'Hipóxia (falta de oxigénio)', 'Paragem cardíaca primária'], correctAnswer: 2, explanation: 'A falta de oxigénio leva à paragem cerebral e cardíaca subsequente.' },
      { id: '2-4', question: 'A água fria pode causar:', options: ['Hipertermia', 'Choque térmico e exaustão rápida', 'Melhoria na respiração', 'Aumento da energia'], correctAnswer: 1, explanation: 'A água fria rouba calor ao corpo 25 vezes mais rápido que o ar.' },
      { id: '2-5', question: 'A "Aspiração" no afogamento refere-se a:', options: ['Limpar a areia', 'Entrada de líquido nos pulmões', 'Tossir para fora', 'Fazer ventilação'], correctAnswer: 1, explanation: 'A entrada de água alveolares prejudica as trocas gasosas.' },
      { id: '2-6', question: 'O afogamento em água salgada causa:', options: ['Edema agudo do pulmão por osmose', 'Hidratação rápida', 'Aumento de glóbulos brancos', 'Menor risco que água doce'], correctAnswer: 0, explanation: 'A salinidade atrai fluidos do sangue para os pulmões.' },
      { id: '2-7', question: 'Qual o papel da adrenalina no salvamento?', options: ['Acalmar o NS', 'Aumentar o ritmo cardíaco e prontidão', 'Causar sono', 'Diminuir a força'], correctAnswer: 1, explanation: 'A resposta de "luta ou fuga" prepara o corpo para o esforço.' },
      { id: '2-8', question: 'O que é a Hipotermia?', options: ['Temperatura acima de 40°C', 'Temperatura central abaixo de 35°C', 'Falta de água no corpo', 'Excesso de sal'], correctAnswer: 1, explanation: 'Estado crítico onde o corpo perde mais calor do que gera.' },
      { id: '2-9', question: 'O "Reflexo de Mergulho" causa:', options: ['Bradicardia (diminuição do ritmo cardíaco)', 'Taquicardia', 'Riso', 'Aumento de apetite'], correctAnswer: 0, explanation: 'Reflexo de conservação de O2 em submersão.' },
      { id: '2-10', question: 'Vítimas de afogamento devem ser mantidas:', options: ['De cabeça para baixo', 'Em ambiente quente e vigiadas', 'A correr na praia', 'Sentadas ao sol'], correctAnswer: 1, explanation: 'Prevenir o choque e monitorizar a respiração.' }
    ]
  },
  {
    id: 'cap-3',
    title: 'Capítulo 3: SBV e Primeiros Socorros',
    description: 'Protocolos de Suporte Básico de Vida (ERC 2021) e emergência.',
    questions: [
      { id: '3-1', question: 'No SBV em afogamento, qual o primeiro passo após garantir segurança?', options: ['30 compressões', 'Chamar ajuda e avaliar consciência/respiração', 'Aplicar DAE', 'Dar água à vítima'], correctAnswer: 1, explanation: 'Avaliar o estado da vítima é fundamental antes de agir.' },
      { id: '3-2', question: 'Quantas insuflações iniciais devem ser feitas numa vítima de afogamento que não respira?', options: ['2', '5', '10', '0'], correctAnswer: 1, explanation: 'O protocolo de afogamento exige 5 insuflações iniciais (resgate).' },
      { id: '3-3', question: 'Qual o rácio compressão:ventilação no adulto?', options: ['15:2', '30:2', '10:1', '50:2'], correctAnswer: 1, explanation: 'O padrão internacional é 30 compressões para 2 ventilações.' },
      { id: '3-4', question: 'Onde se devem posicionar as mãos para compressões no adulto?', options: ['No abdómen', 'No pescoço', 'No centro do peito (metade inferior do esterno)', 'No lado esquerdo'], correctAnswer: 2, explanation: 'Posição central para eficácia máxima no bombeamento.' },
      { id: '3-5', question: 'A profundidade das compressões no adulto deve ser:', options: ['1 a 2 cm', '5 a 6 cm', 'Metade do peito', 'Não importa'], correctAnswer: 1, explanation: 'Pelo menos 5 cm, mas não mais de 6 cm.' },
      { id: '3-6', question: 'Qual a frequência das compressões por minuto?', options: ['60-80', '100-120', 'Mais de 150', '40-60'], correctAnswer: 1, explanation: 'Frequência de 100 a 120 compressões por minuto.' },
      { id: '3-7', question: 'Quando se deve usar o DAE?', options: ['Apenas se o médico autorizar', 'Assim que estiver disponível no local', 'Só após 1 hora de SBV', 'Nunca em praias'], correctAnswer: 1, explanation: 'O uso precoce do DAE aumenta drasticamente a sobrevivência.' },
      { id: '3-8', question: 'Se a vítima de afogamento respira normalmente, deve-se colocá-la em:', options: ['Posição Lateral de Segurança (PLS)', 'De barriga para baixo', 'De pé', 'Sentada'], correctAnswer: 0, explanation: 'A PLS mantém a via aérea desobstruída.' },
      { id: '3-9', question: 'O que fazer em caso de obstrução grave da via aérea (engasgamento)?', options: ['Dar 5 pancadas interescapulares e 5 compressões abdominais', 'Dar um copo de água', 'Virar ao contrário', 'Esperar'], correctAnswer: 0, explanation: 'Manobra de Heimlich e pancadas nas costas.' },
      { id: '3-10', question: 'A paragem cardíaca no afogamento é habitualmente secundária a:', options: ['Enfarte', 'Hipóxia (asfixia)', 'Medo', 'Cansaço'], correctAnswer: 1, explanation: 'A falta de ar causa a falência do coração.' }
    ]
  },
  {
    id: 'cap-4',
    title: 'Capítulo 4: Técnicas de Salvamento Aquático',
    description: 'Aproximação, reboque, uso de equipamentos e extração.',
    questions: [
      { id: '4-1', question: 'Qual a técnica de entrada na água com o flutuador para manter visibilidade?', options: ['Mergulho de cabeça', 'Salto de "tesoura"', 'Entrada de pés juntos com braços abertos', 'Caminhar lentamente'], correctAnswer: 2, explanation: 'Permite manter o contacto visual com a vítima e protege a coluna.' },
      { id: '4-2', question: 'A aproximação à vítima consciente deve ser feita:', options: ['Pela frente e agarrando logo', 'Pelas costas ou mantendo distância de segurança', 'Gritando muito', 'Submerso'], correctAnswer: 1, explanation: 'Evitar que a vítima em pânico agarre o nadador.' },
      { id: '4-3', question: 'O reboque "Axilar" é indicado para:', options: ['Vítimas inconscientes', 'Vítimas colaborantes e conscientes', 'Vítimas com trauma de coluna', 'Grandes distâncias'], correctAnswer: 1, explanation: 'Dá conforto e segurança a quem está consciente.' },
      { id: '4-4', question: 'Qual o equipamento mais versátil para o NS em praias?', options: ['Cinto de salvamento (Flutuador)', 'Barco a remos', 'Mota de água', 'Cana de pesca'], correctAnswer: 0, explanation: 'O flutuador permite flutuabilidade imediata para NS e vítima.' },
      { id: '4-5', question: 'Ao fazer o reboque, a cara da vítima deve estar:', options: ['Submersa para não beber água', 'Sempre fora de água', 'Virada para o fundo', 'Tapada com uma toalha'], correctAnswer: 1, explanation: 'Garantir que a vítima consegue respirar durante o transporte.' },
      { id: '4-6', question: 'Como se deve proceder com uma vítima em pânico que agarra o NS?', options: ['Bater na vítima', 'Técnicas de libertação (submersão e empurrar)', 'Deixar-se afogar', 'Parar de nadar'], correctAnswer: 1, explanation: 'Submergir faz a vítima soltar-se para tentar respirar.' },
      { id: '4-7', question: 'A técnica de "Saca-Rolhas" serve para:', options: ['Abrir garrafas', 'Mergulhar rapidamente sob as ondas', 'Nadar mais devagar', 'Pedir ajuda'], correctAnswer: 1, explanation: 'Passar a zona de rebentação com eficácia.' },
      { id: '4-8', question: 'No salvamento com prancha, a vítima deve ser posicionada:', options: ['Na ponta da frente (proa)', 'No centro ou na parte traseira (popa)', 'Debaixo da prancha', 'Sentada'], correctAnswer: 1, explanation: 'Garante estabilidade e flutuabilidade.' },
      { id: '4-9', question: 'A extração da vítima na zona de rebentação exige:', options: ['Aproveitar a boleia da onda com cuidado', 'Ir contra a onda', 'Esperar que o mar acalme 1 hora', 'Largar a vítima'], correctAnswer: 0, explanation: 'Sincronização com o movimento das águas.' },
      { id: '4-10', question: 'O uso de barbatanas no salvamento:', options: ['É proibido', 'Dificulta a natação', 'Aumenta a potência e velocidade significativamente', 'Apenas para mergulho'], correctAnswer: 2, explanation: 'Equipamento essencial para aumentar a eficácia do reboque.' }
    ]
  },
  {
    id: 'cap-5',
    title: 'Capítulo 5: Comunicações e Equipamentos',
    description: 'Sinais visuais, rádio VHF, megafone e manutenção.',
    questions: [
      { id: '5-1', question: 'Qual o canal de socorro internacional no rádio VHF?', options: ['Canal 10', 'Canal 16', 'Canal 68', 'Canal 9'], correctAnswer: 1, explanation: 'O Canal 16 é o canal de chamada e socorro marítimo.' },
      { id: '5-2', question: 'O sinal de braço levantado estático significa:', options: ['Vítima resgatada', 'Preciso de ajuda no local', 'OK, situação controlada', 'Sair da água'], correctAnswer: 1, explanation: 'Braço levantado verticalmente é pedido de assistência.' },
      { id: '5-3', question: 'Agitar os dois braços acima da cabeça significa:', options: ['Adeus', 'Alerta de perigo ou evacuação imediata', 'Tudo bem', 'Fim do turno'], correctAnswer: 1, explanation: 'Sinal visual de emergência ou aviso de perigo grave.' },
      { id: '5-4', question: 'O megafone é utilizado principalmente para:', options: ['Ouvir música', 'Prevenção e avisos a banhistas distantes', 'Falar com o colega ao lado', 'Substituir o rádio'], correctAnswer: 1, explanation: 'Ferramenta vital de prevenção ativa.' },
      { id: '5-5', question: 'O apito deve ser usado para:', options: ['Brincar com crianças', 'Chamar a atenção em situações de perigo', 'Marcar o ritmo da natação', 'Fazer barulho'], correctAnswer: 1, explanation: 'Sinal sonoro de advertência e prontidão.' },
      { id: '5-6', question: 'Como se deve cuidar do equipamento após o uso no mar?', options: ['Deixar ao sol', 'Lavar com água doce (adoçar)', 'Guardar com sal', 'Não precisa de manutenção'], correctAnswer: 1, explanation: 'Adoçar o material evita a corrosão e degradação pelo sal.' },
      { id: '5-7', question: 'O binóculo serve para:', options: ['Ver quem está na areia', 'Vigilância de longo alcance e deteção de agueiros', 'Ver estrelas', 'Apenas decoração'], correctAnswer: 1, explanation: 'Fundamental para vigiar banhistas que se afastam da costa.' },
      { id: '5-8', question: 'O que significa um toque curto de apito?', options: ['Início de salvamento', 'Atenção de um banhista', 'Almoço', 'Fim do dia'], correctAnswer: 1, explanation: 'Usado para alertar banhistas para comportamentos de risco.' },
      { id: '5-9', question: 'A mala de oxigenoterapia deve ser verificada:', options: ['Uma vez por ano', 'Diariamente antes do início do turno', 'Só quando acaba', 'Pela polícia'], correctAnswer: 1, explanation: 'Garantir que há pressão suficiente e válvulas funcionais.' },
      { id: '5-10', question: 'A comunicação com o nadador na água deve ser:', options: ['Longa e detalhada', 'Curta, clara e objetiva', 'Apenas por gestos obscenos', 'Gritando o nome'], correctAnswer: 1, explanation: 'Eficiência é chave em situações críticas.' }
    ]
  },
  {
    id: 'cap-6',
    title: 'Capítulo 6: Meteorologia e Oceanografia',
    description: 'Correntes, marés, ventos e dinâmica costeira.',
    questions: [
      { id: '6-1', question: 'O que é uma "Corrente de Retorno" (Agueiro)?', options: ['Água que vai para os lados', 'Fluxo de água que regressa ao mar através da rebentação', 'Uma onda gigante', 'Corrente de fundo'], correctAnswer: 1, explanation: 'Principal causa de afogamento em praias oceânicas.' },
      { id: '6-2', question: 'Como se identifica um agueiro visualmente?', options: ['Ondas muito grandes', 'Zona de água mais calma, escura ou com espuma/sedimentos a sair', 'Muitos peixes', 'Areia branca'], correctAnswer: 1, explanation: 'A descontinuidade da rebentação indica o canal do agueiro.' },
      { id: '6-3', question: 'A escala de Beaufort mede:', options: ['A altura das ondas', 'A intensidade do vento', 'A temperatura da água', 'A profundidade'], correctAnswer: 1, explanation: 'Escala de 0 a 12 para força do vento.' },
      { id: '6-4', question: 'A escala de Douglas mede:', options: ['O estado do mar (vagas)', 'O sal na água', 'O vento', 'A visibilidade'], correctAnswer: 0, explanation: 'Classifica a agitação marítima.' },
      { id: '6-5', question: 'O que causa as marés?', options: ['O vento', 'A atração gravitacional da Lua e do Sol', 'Os barcos', 'Os sismos'], correctAnswer: 1, explanation: 'Fenómeno cíclico de subida e descida do nível do mar.' },
      { id: '6-6', question: 'O "Swell" refere-se a:', options: ['Ondas geradas pelo vento local', 'Ondas formadas por tempestades distantes que viajam pelo oceano', 'Ondas de rio', 'Ondas pequenas'], correctAnswer: 1, explanation: 'Ondas de longo período, mais potentes.' },
      { id: '6-7', question: 'Um vento "Offshore" (Terral) sopra:', options: ['Do mar para a terra', 'Da terra para o mar', 'De lado', 'De baixo para cima'], correctAnswer: 1, explanation: 'Alisa as ondas mas pode afastar objetos flutuantes da costa.' },
      { id: '6-8', question: 'O que é a "Rebentação"?', options: ['Zona onde as ondas partem devido à pouca profundidade', 'O fim do mar', 'Onde os barcos atracam', 'O centro do oceano'], correctAnswer: 0, explanation: 'Zona de maior energia e perigo para o banhista.' },
      { id: '6-9', question: 'A maré "Vaza" significa que a água está a:', options: ['Subir', 'Descer', 'Parada', 'Ferver'], correctAnswer: 1, explanation: 'Período entre a preia-mar e a baixa-mar.' },
      { id: '6-10', question: 'A temperatura da água em Portugal é influenciada pela:', options: ['Corrente do Golfo', 'Corrente das Canárias e Upwelling', 'Corrente do Brasil', 'Falta de sol'], correctAnswer: 1, explanation: 'Explica as águas frias na costa ocidental.' }
    ]
  },
  {
    id: 'cap-7',
    title: 'Capítulo 7: Prevenção e Vigilância',
    description: 'Estratégias de antecipação, zonas de risco e bandeiras.',
    questions: [
      { id: '7-1', question: 'A "Vigilância Ativa" implica:', options: ['Estar ao telemóvel', 'Observação constante e sistemática da zona balnear', 'Ler um livro', 'Estar de olhos fechados'], correctAnswer: 1, explanation: 'Fundamental para a prevenção.' },
      { id: '7-2', question: 'Qual a zona de maior risco numa praia com agueiros?', options: ['A areia seca', 'O canal do agueiro e zonas adjacentes', 'As dunas', 'O parque de estacionamento'], correctAnswer: 1, explanation: 'Onde ocorre a maioria dos arrastamentos.' },
      { id: '7-3', question: 'As bandeiras de sinalização devem ser colocadas:', options: ['Onde o NS quiser', 'Em locais visíveis e de acordo com o estado do mar', 'Escondidas', 'Apenas aos domingos'], correctAnswer: 1, explanation: 'Informação crucial para os banhistas.' },
      { id: '7-4', question: 'Bandeira Amarela significa:', options: ['Banho proibido', 'Banhos permitidos mas nadar proibido', 'Tudo seguro', 'Praia sem NS'], correctAnswer: 1, explanation: 'Exige atenção redobrada dos banhistas.' },
      { id: '7-5', question: 'O varrimento visual deve ser feito em:', options: ['Linha reta', 'Zigue-zague ou semicírculos cobrindo toda a área', 'Apenas num ponto', 'Olhando para o céu'], correctAnswer: 1, explanation: 'Garante que nenhuma área fica por vigiar.' },
      { id: '7-6', question: 'Um banhista em dificuldade "silenciosa":', options: ['Grita muito por ajuda', 'Não consegue gritar, bate os braços lateralmente e tenta manter a boca fora de água', 'Acena com um lenço', 'Faz sinais de fumo'], correctAnswer: 1, explanation: 'O instinto de sobrevivência impede o grito.' },
      { id: '7-7', question: 'A prevenção primária foca-se em:', options: ['Salvar a vítima', 'Evitar que a situação de risco ocorra', 'Chamar a ambulância', 'Fazer o relatório'], correctAnswer: 1, explanation: 'Informar e avisar antes do perigo.' },
      { id: '7-8', question: 'Quem são os banhistas de maior risco?', options: ['Surfistas profissionais', 'Crianças, idosos e pessoas sob efeito de álcool', 'Nadadores experientes', 'Pescadores'], correctAnswer: 1, explanation: 'Grupos mais vulneráveis a acidentes.' },
      { id: '7-9', question: 'O Nadador-Salvador deve intervir quando:', options: ['A vítima já se afogou', 'Deteta um comportamento de risco iminente', 'Alguém pede autógrafo', 'O turno acaba'], correctAnswer: 1, explanation: 'A antecipação salva vidas.' },
      { id: '7-10', question: 'Zonas de rochas e esporões são:', options: ['Zonas ideais para banhos', 'Zonas de perigo por correntes e trauma', 'Zonas de sesta', 'Parques infantis'], correctAnswer: 1, explanation: 'Devem ser devidamente sinalizadas e evitadas.' }
    ]
  },
  {
    id: 'cap-8',
    title: 'Capítulo 8: Traumatologia e Imobilização',
    description: 'Lesões vertebrais, estabilização e transporte de trauma.',
    questions: [
      { id: '8-1', question: 'A principal suspeita de trauma em praias ocorre em:', options: ['Picadas de peixe', 'Mergulhos em águas rasas ou embates violentos', 'Caminhadas na areia', 'Apanhar sol'], correctAnswer: 1, explanation: 'O impacto pode causar lesão na coluna cervical.' },
      { id: '8-2', question: 'Se suspeitar de lesão na coluna, a prioridade é:', options: ['Retirar a vítima rápido', 'Estabilização manual da cabeça e pescoço', 'Fazer massagem cardíaca', 'Sentar a vítima'], correctAnswer: 1, explanation: 'Evitar lesões medulares permanentes.' },
      { id: '8-3', question: 'A técnica de "Head-Splint" serve para:', options: ['Nadar mais rápido', 'Imobilizar a coluna cervical usando os braços da vítima', 'Curar dores de cabeça', 'Sinalizar perigo'], correctAnswer: 1, explanation: 'Técnica de estabilização em água.' },
      { id: '8-4', question: 'O colar cervical deve ser aplicado:', options: ['Sempre que a vítima tosse', 'Após a estabilização manual e antes da colocação no plano rígido', 'Depois de chegar ao hospital', 'Em vez do SBV'], correctAnswer: 1, explanation: 'Limita os movimentos do pescoço.' },
      { id: '8-5', question: 'Vítimas de trauma na água devem ser retiradas usando:', options: ['Um reboque comum', 'Plano rígido com imobilizadores laterais e precintas', 'Ao colo', 'Puxando pelos pés'], correctAnswer: 1, explanation: 'Garante o alinhamento total do corpo.' },
      { id: '8-6', question: 'Sinais de lesão medular incluem:', options: ['Fome', 'Perda de sensibilidade ou movimento nos membros', 'Sede', 'Visão perfeita'], correctAnswer: 1, explanation: 'Sintoma crítico de comprometimento nervoso.' },
      { id: '8-7', question: 'Ao imobilizar uma vítima no plano rígido, a ordem das precintas é:', options: ['Pés primeiro', 'Tronco, bacia e membros (corpo primeiro, cabeça por fim)', 'Cabeça primeiro', 'Não há ordem'], correctAnswer: 1, explanation: 'Segurança no alinhamento.' },
      { id: '8-8', question: 'O Nadador-Salvador deve remover o capacete a um motociclista?', options: ['Sim, sempre', 'Não, exceto se impedir o SBV e com técnica de 2 socorristas', 'Apenas se for bonito', 'Sim, para ele respirar melhor'], correctAnswer: 1, explanation: 'Risco elevado de agravar lesões.' },
      { id: '8-9', question: 'O "Log Roll" é uma técnica para:', options: ['Rolar a vítima mantendo o alinhamento da coluna', 'Nadar de lado', 'Fazer ginástica', 'Lançar a boia'], correctAnswer: 0, explanation: 'Usado para colocar a vítima no plano rígido.' },
      { id: '8-10', question: 'Vítimas de queda de altura na areia devem ser:', options: ['Levantadas logo', 'Mantidas imóveis até chegada de meios diferenciados', 'Levadas para a água', 'Ignoradas'], correctAnswer: 1, explanation: 'Prevenção de agravamento de fraturas.' }
    ]
  }
];

export const TIPS: Tip[] = [
  { id: 't1', category: 'Segurança', text: 'Mantenha o rádio sempre carregado e no Canal 16 durante o turno.' },
  { id: 't2', category: 'Prevenção', text: 'Vigie prioritariamente as crianças e idosos perto de agueiros.' },
  { id: 't3', category: 'Equipamento', text: 'Verifique a pressão da garrafa de O2 no início de cada turno.' },
  { id: 't4', category: 'Saúde', text: 'Hidrate-se regularmente e use sempre protetor solar com fator 50+.' }
];
