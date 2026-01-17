
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
    title: '1. Legislação e Ética',
    icon: '⚖️',
    content: [
      {
        id: 'leg-1',
        title: 'Lei 68/2014 e Regime Jurídico',
        description: 'Enquadramento legal e responsabilidade.',
        fullContent: 'A Lei n.º 68/2014 estabelece o regime jurídico da assistência a banhistas. O Nadador-Salvador (NS) é o elemento habilitado com o curso de formação técnica e tem o dever de vigiar, prevenir e socorrer. O cartão de NS é válido por 3 anos.'
      },
      {
        id: 'leg-2',
        title: 'Deveres e Ética Profissional',
        description: 'Normas de conduta e sigilo.',
        fullContent: 'Deveres: Permanência no posto, uso de uniforme, vigilância ativa e colaboração com autoridades. A ética exige imparcialidade e sigilo profissional sobre o estado das vítimas.'
      }
    ]
  },
  {
    id: 'physiology-drowning',
    title: '2. Fisiologia e Afogamento',
    icon: '🫁',
    content: [
      {
        id: 'phys-1',
        title: 'Mecanismos do Afogamento',
        description: 'Processo de asfixia e laringospasmo.',
        fullContent: 'Afogamento é compromisso respiratório por submersão. Ocorre laringospasmo, seguido de hipóxia e paragem respiratória. A rapidez na ventilação é crítica.'
      },
      {
        id: 'phys-2',
        title: 'Hipotermia e Choque Térmico',
        description: 'Impacto do frio no sistema cardiovascular.',
        fullContent: 'Hipotermia (temp < 35°C). Perda de calor na água é 25x superior ao ar. Choque térmico pode causar arritmias letais.'
      }
    ]
  },
  {
    id: 'first-aid',
    title: '3. Suporte Básico de Vida',
    icon: '🏥',
    content: [
      {
        id: 'fa-1',
        title: 'SBV Adulto (Afogamento)',
        description: 'Algoritmo adaptado ao meio aquático.',
        fullContent: '1. Segurança; 2. Avaliar VOS; 3. Gritar Ajuda; 4. 5 Insuflações de Resgate; 5. 30 Compressões; 6. Rácio 30:2.',
        flowSteps: [
          { id: '1', type: 'start', label: 'Segurança e VOS', next: '2' },
          { id: '2', type: 'decision', label: 'Respira Normalmente?', yes: 'end-1', no: '3' },
          { id: '3', type: 'action', label: '5 Insuflações Resgate', next: '4' },
          { id: '4', type: 'action', label: 'Ciclo 30:2 e DAE', next: '4' },
          { id: 'end-1', type: 'end', label: 'Posição Lateral de Segurança' }
        ]
      }
    ]
  },
  {
    id: 'trauma-special',
    title: '4. Traumatologia',
    icon: '🦴',
    content: [
      {
        id: 'tr-coluna',
        title: 'Suspeita de Lesão Medular',
        description: 'Imobilização em mergulhos.',
        fullContent: 'Imobilização manual (Head Splint). Uso de plano rígido e colar cervical. Extração controlada com 3-4 socorristas.'
      }
    ]
  },
  {
    id: 'rescue-techniques',
    title: '5. Técnicas de Salvamento',
    icon: '🌊',
    content: [
      {
        id: 'res-1',
        title: 'Aproximação e Reboques',
        description: 'Abordagem segura e transporte.',
        fullContent: 'Aproximação pelas costas. Reboque axilar (consciente) ou cabeça-peito (inconsciente).'
      }
    ]
  },
  {
    id: 'oceanography',
    title: '6. Oceanografia e Meteorologia',
    icon: '🗺️',
    content: [
      {
        id: 'ocean-1',
        title: 'Agueiros (Correntes de Retorno)',
        description: 'Identificação e dinâmica.',
        fullContent: 'Zonas de água calma e escura entre rebentação. Nadar paralelo à costa para sair.'
      }
    ]
  },
  {
    id: 'equipment-comm',
    title: '7. Equipamentos e Comunicação',
    icon: '📻',
    content: [
      {
        id: 'eq-1',
        title: 'Sinais Visuais e Bandeiras',
        description: 'Linguagem gestual padrão.',
        fullContent: 'Braço levantado: Ajuda. Agitar braços: Perigo. Bandeira Vermelha: Proibido.'
      }
    ]
  },
  {
    id: 'prevention-vigilance',
    title: '8. Prevenção e Vigilância',
    icon: '🔭',
    content: [
      {
        id: 'prev-1',
        title: 'Varrimento Visual',
        description: 'Estratégias de observação.',
        fullContent: 'Varrimento em S/Z. Foco em grupos de risco: crianças, idosos e banhistas perto de rochas.'
      }
    ]
  },
  {
    id: 'sanitary-support',
    title: '9. Apoio Sanitário',
    icon: '🩹',
    content: [
      {
        id: 'san-1',
        title: 'Gestão de Posto de Socorro',
        description: 'Manutenção de material.',
        fullContent: 'Verificar O2 (min 150 bar), DAE e validade de fármacos diariamente.'
      }
    ]
  },
  {
    id: 'special-rescue',
    title: '10. Salvamento Especializado',
    icon: '🚤',
    content: [
      {
        id: 'spec-1',
        title: 'Operação de Motas de Água (RWC)',
        description: 'Salvamento com meios motorizados.',
        fullContent: 'Aproximação por sotavento. Uso de Sled (plataforma de resgate). Protocolos de comunicação rádio VHF.'
      }
    ]
  },
  {
    id: 'psychology',
    title: '11. Psicologia do Socorro',
    icon: '🧠',
    content: [
      {
        id: 'psy-1',
        title: 'Gestão de Stress e Pânico',
        description: 'Abordagem psicológica à vítima.',
        fullContent: 'Vítima em pânico: falar calmo, dar ordens claras, manter distância física até segurança. Gestão de stress pós-incidente para o socorrista.'
      }
    ]
  },
  {
    id: 'environment',
    title: '12. Ambiente e Orla Costeira',
    icon: '🌿',
    content: [
      {
        id: 'env-1',
        title: 'Proteção de Dunas e Ecossistemas',
        description: 'Papel do NS na conservação.',
        fullContent: 'Sensibilização de banhistas para uso de passadiços. Identificação de focos de poluição marinha.'
      }
    ]
  },
  {
    id: 'advanced-first-aid',
    title: '13. Primeiros Socorros Avançados',
    icon: '🚑',
    content: [
      {
        id: 'adv-1',
        title: 'Choque Anafilático e Diabético',
        description: 'Emergências médicas comuns.',
        fullContent: 'Anafilaxia: Uso de epinefrina (se protocolado). Hipoglicemia: Administração de açúcar se consciente.'
      }
    ]
  }
];

export const QUIZ_CHAPTERS: QuizChapter[] = [
  {
    id: 'q-cap-1',
    title: 'Capítulo 1: Legislação e Ética Profissional',
    description: 'Enquadramento jurídico da assistência a banhistas.',
    questions: [
      { id: '1-1', question: 'Qual a lei base da atividade de Nadador-Salvador em Portugal?', options: ['Lei 68/2014', 'Lei 50/2006', 'DL 12/2000', 'Lei 24/2012'], correctAnswer: 0, explanation: 'A Lei 68/2014 estabelece o regime jurídico da assistência a banhistas.' },
      { id: '1-2', question: 'Qual a validade do cartão de Nadador-Salvador?', options: ['1 ano', '2 anos', '3 anos', '5 anos'], correctAnswer: 2, explanation: 'A certificação é válida por 3 anos (ISN).' },
      { id: '1-3', question: 'A negligência profissional pode levar a que tipo de responsabilidade?', options: ['Apenas Disciplinar', 'Civil e Criminal', 'Apenas Civil', 'Nenhuma'], correctAnswer: 1, explanation: 'O NS responde civil e criminalmente por omissões ou erros técnicos.' },
      { id: '1-4', question: 'Quem é a autoridade técnica em salvamento aquático?', options: ['Polícia Marítima', 'ISN', 'Marinha', 'Proteção Civil'], correctAnswer: 1, explanation: 'O Instituto de Socorros a Náufragos é a autoridade técnica oficial.' },
      { id: '1-5', question: 'O uso de uniforme fora do serviço é permitido?', options: ['Sim, para publicidade', 'Não, é apenas para o exercício da função', 'Sim, se for na praia', 'Sempre'], correctAnswer: 1, explanation: 'O uniforme identifica o socorrista em prontidão operativa.' },
      { id: '1-6', question: 'A omissão de auxílio é punível por que código?', options: ['Código Civil', 'Código Penal', 'Código da Estrada', 'Lei 68'], correctAnswer: 1, explanation: 'A omissão de auxílio é um crime previsto no Código Penal.' },
      { id: '1-7', question: 'O NS pode ausentar-se do posto se o mar estiver calmo?', options: ['Sim', 'Apenas com autorização e substituição', 'Não, em circunstância alguma', 'Apenas para almoço'], correctAnswer: 1, explanation: 'A vigilância deve ser ininterrupta durante o horário de serviço.' },
      { id: '1-8', question: 'Qual o dever do NS perante as autoridades marítimas?', options: ['Ignorar', 'Colaborar e obedecer às instruções técnicas', 'Fazer apenas o que o patrão mandar', 'Criticar'], correctAnswer: 1, explanation: 'A cooperação com a Polícia Marítima e Capitanias é obrigatória.' },
      { id: '1-9', question: 'A ética profissional exige sigilo sobre o quê?', options: ['Cor do mar', 'Dados clínicos e estado das vítimas', 'Horário de marés', 'Nome do concessionário'], correctAnswer: 1, explanation: 'A privacidade da vítima é um direito fundamental.' },
      { id: '1-10', question: 'O cartão de NS permite trabalhar em que locais?', options: ['Apenas praias', 'Piscinas e águas balneares marítimas/interiores', 'Só piscinas', 'Apenas no estrangeiro'], correctAnswer: 1, explanation: 'A habilitação é válida para todos os contextos balneares previstos na lei.' }
    ]
  },
  {
    id: 'q-cap-2',
    title: 'Capítulo 2: Fisiologia e Afogamento',
    description: 'Processos de asfixia e impacto da imersão no corpo humano.',
    questions: [
      { id: '2-1', question: 'Definição da OMS para afogamento:', options: ['Morte por água', 'Processo de sofrer compromisso respiratório por imersão/submersão', 'Pânico na água', 'Beber água salgada'], correctAnswer: 1, explanation: 'A OMS foca no compromisso respiratório como processo central.' },
      { id: '2-2', question: 'O laringospasmo impede a entrada de quê?', options: ['Comida', 'Água e ar nos pulmões', 'Apenas água', 'Apenas ar'], correctAnswer: 1, explanation: 'O fecho das cordas vocais impede a ventilação total.' },
      { id: '2-3', question: 'A hipóxia cerebral irreversível ocorre em média após quanto tempo?', options: ['1 min', '4-6 min', '10 min', '20 min'], correctAnswer: 1, explanation: 'A falta de oxigénio causa danos cerebrais permanentes rapidamente.' },
      { id: '2-4', question: 'Hipotermia severa ocorre abaixo de que temperatura central?', options: ['35°C', '32°C', '30°C', '28°C'], correctAnswer: 3, explanation: 'Abaixo dos 28°C a situação é considerada hipotermia severa.' },
      { id: '2-5', question: 'O afogado de Grau 3 apresenta:', options: ['Apenas tosse', 'Edema pulmonar (espuma) sem paragem', 'Paragem respiratória', 'Paragem cardíaca'], correctAnswer: 1, explanation: 'Grau 3 caracteriza-se por grande quantidade de espuma e sem paragem.' },
      { id: '2-6', question: 'A água salgada no pulmão causa:', options: ['Hidratação', 'Edema por osmose (atrai fluido do sangue)', 'Limpeza', 'Aumento de energia'], correctAnswer: 1, explanation: 'A salinidade atrai fluidos para os alvéolos pulmonares.' },
      { id: '2-7', question: 'O choque térmico causa frequentemente:', options: ['Calma', 'Bradicardia súbita ou fibrilação', 'Fome', 'Melhoria na natação'], correctAnswer: 1, explanation: 'O reflexo de mergulho em água fria pode parar o coração.' },
      { id: '2-8', question: 'A aspiração de água doce destrói:', options: ['O fígado', 'O surfactante pulmonar', 'Os dentes', 'Os músculos'], correctAnswer: 1, explanation: 'A destruição do surfactante causa o colapso dos alvéolos.' },
      { id: '2-9', question: 'Qual a principal causa de morte no afogamento?', options: ['Cãibras', 'Hipóxia progressiva', 'Hipotermia', 'Medo'], correctAnswer: 1, explanation: 'A paragem cardíaca é quase sempre secundária à falta de oxigénio.' },
      { id: '2-10', question: 'Vítima Grau 1 necessita de:', options: ['RCP', 'Aquecimento e repouso', 'Entubação', 'Adrenalina'], correctAnswer: 1, explanation: 'Grau 1 é o mais leve, focado em suporte e conforto.' }
    ]
  },
  {
    id: 'q-cap-3',
    title: 'Capítulo 3: Suporte Básico de Vida',
    description: 'Algoritmos ERC 2021 adaptados ao salvamento aquático.',
    questions: [
      { id: '3-1', question: 'Primeira prioridade no SBV em afogados:', options: ['Compressões', 'Garantir segurança e 5 ventilações iniciais', 'Ligar 112', 'DAE'], correctAnswer: 1, explanation: 'Em afogados, a paragem é hipóxica; oxigénio primeiro.' },
      { id: '3-2', question: 'Rácio compressão:ventilação no adulto?', options: ['15:2', '30:2', '30:5', '10:1'], correctAnswer: 1, explanation: 'Padrão ERC é 30 compressões para 2 ventilações.' },
      { id: '3-3', question: 'Frequência de compressões no adulto?', options: ['60-80', '100-120', '140-160', '80-100'], correctAnswer: 1, explanation: '100 a 120 compressões por minuto.' },
      { id: '3-4', question: 'Profundidade das compressões no adulto?', options: ['2-3 cm', '5-6 cm', 'Metade do tórax', '10 cm'], correctAnswer: 1, explanation: 'Pelo menos 5 cm mas não mais de 6 cm.' },
      { id: '3-5', question: 'No lactente, o rácio profissional é:', options: ['30:2', '15:2', '3:1', '5:1'], correctAnswer: 1, explanation: 'Socorristas profissionais usam 15:2 em pediatria.' },
      { id: '3-6', question: 'Onde avaliar o pulso no bebé?', options: ['Carotídeo', 'Braquial', 'Radial', 'Femoral'], correctAnswer: 1, explanation: 'O pulso braquial é o recomendado no lactente.' },
      { id: '3-7', question: 'DAE pode ser usado em vítimas molhadas?', options: ['Sim, em qualquer estado', 'Não, deve secar-se o tórax primeiro', 'Apenas em terra seca', 'Só em piscinas'], correctAnswer: 1, explanation: 'O tórax deve ser seco para os elétrodos aderirem e não haver curto-circuito.' },
      { id: '3-8', question: 'VOS significa:', options: ['Ver, Ouvir, Sentir (até 10 seg)', 'Ver, Olhar, Salvar', 'Vigilância ou Socorro', 'Vítima ou Sobrevivente'], correctAnswer: 0, explanation: 'Técnica de avaliação da respiração.' },
      { id: '3-9', question: 'Posição Lateral de Segurança (PLS) serve para:', options: ['Dormir', 'Manter via aérea livre em vítima inconsciente que respira', 'Reanimar', 'Trauma de coluna'], correctAnswer: 1, explanation: 'Evita a queda da língua e aspiração de vómito.' },
      { id: '3-10', question: 'Obstrução de via aérea grave exige:', options: ['Água', '5 Pancadas interescapulares + 5 Compressões abdominais', 'Insuflações', 'Gritar'], correctAnswer: 1, explanation: 'Protocolo de desobstrução (Heimlich).' }
    ]
  },
  {
    id: 'q-cap-4',
    title: 'Capítulo 4: Traumatologia e Imobilização',
    description: 'Gestão de lesões vertebrais e traumas físicos.',
    questions: [
      { id: '4-1', question: 'Suspeita de lesão medular ocorre em:', options: ['Quedas ou mergulhos em águas rasas', 'Cãibras', 'Fome', 'Picadas'], correctAnswer: 0, explanation: 'Impacto da cabeça no fundo é a causa clássica.' },
      { id: '4-2', question: 'Técnica de eleição na água para trauma:', options: ['Reboque axilar', 'Head Splint (estabilização manual)', 'Puxar pelos pés', 'Apoio nas dunas'], correctAnswer: 1, explanation: 'Usa os braços da vítima para imobilizar a cervical.' },
      { id: '4-3', question: 'Ordem de imobilização no plano rígido:', options: ['Cabeça primeiro', 'Tronco/Corpo primeiro, Cabeça por último', 'Pés primeiro', 'Não há ordem'], correctAnswer: 1, explanation: 'Garante que o corpo não mexe se a cabeça for fixada.' },
      { id: '4-4', question: 'O colar cervical substitui a imobilização manual?', options: ['Sim', 'Não, deve manter-se o apoio manual até fixação no plano', 'Só se for rígido', 'Apenas em terra'], correctAnswer: 1, explanation: 'O colar é apenas um adjuvante.' },
      { id: '4-5', question: 'Hemorragia arterial massiva num membro exige:', options: ['Pôr gelo', 'Torniquete 5-7cm acima da ferida', 'Lavar', 'Elevar'], correctAnswer: 1, explanation: 'O torniquete é vital em hemorragias arteriais extremas.' },
      { id: '4-6', question: 'Sinal de fratura da base do crânio:', options: ['Riso', 'Sinal de Guaxinim (hematoma periorbital)', 'Sede', 'Visão perfeita'], correctAnswer: 1, explanation: 'Sinais de Battle ou Guaxinim indicam trauma craniano grave.' },
      { id: '4-7', question: 'Fractura aberta (exposta) deve-se:', options: ['Tentar reduzir', 'Cobrir e imobilizar sem manipular o osso', 'Lavar com areia', 'Ignorar'], correctAnswer: 1, explanation: 'Risco elevado de infeção e dano nervoso.' },
      { id: '4-8', question: 'Queimadura solar grave (Grau 2) tem:', options: ['Vermelhidão', 'Bolhas (flictenas)', 'Cinza', 'Nenhuma dor'], correctAnswer: 1, explanation: 'As bolhas definem o 2º grau.' },
      { id: '4-9', question: 'Extração de trauma da água exige quantos nadadores?', options: ['1', 'Mínimo 3-4 socorristas coordenados', '2 apenas', 'Não se retira'], correctAnswer: 1, explanation: 'Necessário para manter o alinhamento total no plano.' },
      { id: '4-10', question: 'Vítima com trauma deve ser mantida:', options: ['Sentada', 'Em decúbito dorsal e alinhada', 'De pé', 'A andar'], correctAnswer: 1, explanation: 'Evitar agravamento de lesões medulares.' }
    ]
  },
  {
    id: 'q-cap-5',
    title: 'Capítulo 5: Técnicas de Salvamento Aquático',
    description: 'Abordagens, reboques e entradas na água.',
    questions: [
      { id: '5-1', question: 'Melhor entrada na água com flutuador?', options: ['Mergulho cabeça', 'Salto tesoura (manter visão na vítima)', 'Pés juntos fechados', 'Caminhar'], correctAnswer: 1, explanation: 'O salto tesoura permite nunca perder o contacto visual.' },
      { id: '5-2', question: 'Aproximação à vítima deve ser feita:', options: ['Pela frente sempre', 'Pelas costas (zona de segurança)', 'A gritar', 'Submerso'], correctAnswer: 1, explanation: 'Evita que a vítima em pânico agarre o socorrista.' },
      { id: '5-3', question: 'Reboque axilar é indicado para:', options: ['Vítima inconsciente', 'Vítima consciente e colaborante', 'Trauma', 'Morte'], correctAnswer: 1, explanation: 'Dá conforto e segurança a quem está consciente.' },
      { id: '5-4', question: 'Técnica de reboque para inconsciente:', options: ['Pelo braço', 'Cabeça-Peito (Jaw-Thrust adaptado)', 'Pelo cabelo', 'Axilar'], correctAnswer: 1, explanation: 'Mantém a via aérea aberta e fora de água.' },
      { id: '5-5', question: 'Se agarrado pela vítima (abraço de urso):', options: ['Bater', 'Submergir para ela soltar e afastar-se', 'Lutar', 'Gritar'], correctAnswer: 1, explanation: 'A vítima soltará para tentar respirar na superfície.' },
      { id: '5-6', question: 'O flutuador (Rescue Tube) serve para:', options: ['Estética', 'Dar flutuabilidade passiva e barreira de segurança', 'Nadar mais rápido', 'Pescar'], correctAnswer: 1, explanation: 'Equipamento polivalente de segurança.' },
      { id: '5-7', question: 'Passagem da rebentação exige técnica de:', options: ['Saltar por cima', 'Saca-rolhas ou mergulho sob a onda', 'Parar', 'Gritar'], correctAnswer: 1, explanation: 'Evita o impacto direto da energia da onda.' },
      { id: '5-8', question: 'No salvamento com prancha, o NS fica:', options: ['Atrás da vítima', 'À frente da vítima para controlar a prancha', 'Sentado', 'Deitado em cima da vítima'], correctAnswer: 1, explanation: 'Controlo direcional e estabilidade.' },
      { id: '5-9', question: 'Aproximação em "L" serve para:', options: ['Gastar energia', 'Avaliar a vítima mantendo distância segura antes do contacto', 'Diversão', 'Nadar melhor'], correctAnswer: 1, explanation: 'Protocolo de segurança em aproximação.' },
      { id: '5-10', question: 'Barbatanas devem ser postas:', options: ['Na areia seca', 'Na água (zona de pé seguro)', 'Não se usam', 'Só em piscinas'], correctAnswer: 1, explanation: 'Evita tropeçar e danos nas articulações na areia.' }
    ]
  },
  {
    id: 'q-cap-6',
    title: 'Capítulo 6: Oceanografia e Meteorologia',
    description: 'Dinâmica costeira e previsão de risco.',
    questions: [
      { id: '6-1', question: 'O que é um agueiro?', options: ['Uma gruta', 'Corrente de retorno da costa para o mar', 'Um redemoinho', 'Uma onda de choque'], correctAnswer: 1, explanation: 'Principal perigo em praias oceânicas.' },
      { id: '6-2', question: 'Como identificar um agueiro?', options: ['Muitas ondas', 'Zona sem ondas, água escura e espuma a sair', 'Muitos barcos', 'Areia branca'], correctAnswer: 1, explanation: 'Onde a onda não parte, está o canal de retorno.' },
      { id: '6-3', question: 'Escala de Beaufort mede:', options: ['Ondas', 'Intensidade do vento', 'Sal', 'Maré'], correctAnswer: 1, explanation: 'De 0 (Calmo) a 12 (Furacão).' },
      { id: '6-4', question: 'Escala de Douglas mede:', options: ['Vento', 'Estado do Mar (Vagas)', 'Visibilidade', 'UV'], correctAnswer: 1, explanation: 'Focada na agitação marítima.' },
      { id: '6-5', question: 'Maré Vaza significa que a água está a:', options: ['Subir', 'Descer (Vazante)', 'Parada', 'Tempestade'], correctAnswer: 1, explanation: 'Caminho para a Baixa-Mar.' },
      { id: '6-6', question: 'O "Swell" refere-se a:', options: ['Vento local', 'Ondulação formada por tempestades distantes', 'Rochas', 'Peixes'], correctAnswer: 1, explanation: 'Ondas com mais período e energia.' },
      { id: '6-7', question: 'Upwelling causa:', options: ['Água quente', 'Subida de águas profundas frias (descida de temp)', 'Ondas gigantes', 'Tsunamis'], correctAnswer: 1, explanation: 'Fenómeno comum no Verão em Portugal.' },
      { id: '6-8', question: 'Vento Terral (Offshore):', options: ['Vem do mar', 'Vem de terra para o mar (alisa as ondas)', 'De lado', 'Forte sempre'], correctAnswer: 1, explanation: 'Favorece o surf mas afasta objetos da costa.' },
      { id: '6-9', question: 'As marés são causadas principalmente pela:', options: ['Lua e Sol', 'Vento', 'Navios', 'Sismos'], correctAnswer: 0, explanation: 'Atração gravitacional lunar e solar.' },
      { id: '6-10', question: 'Em que fase da maré os agueiros são mais fortes?', options: ['Preia-mar', 'Baixa-mar ou meia-maré vazante', 'Sempre igual', 'Nunca'], correctAnswer: 1, explanation: 'Menos volume de água aumenta a velocidade do fluxo no canal.' }
    ]
  },
  {
    id: 'q-cap-7',
    title: 'Capítulo 7: Equipamentos e Comunicações',
    description: 'Uso de rádio VHF e sinais visuais.',
    questions: [
      { id: '7-1', question: 'Canal de Socorro internacional no VHF:', options: ['Canal 10', 'Canal 16', 'Canal 68', 'Canal 09'], correctAnswer: 1, explanation: 'Canal prioritário para chamadas de emergência.' },
      { id: '7-2', question: 'Sinal de braço levantado estático significa:', options: ['Tudo bem', 'Preciso de Ajuda / Apoio no local', 'Sair da água', 'Almoço'], correctAnswer: 1, explanation: 'Pedido de assistência visual internacional.' },
      { id: '7-3', question: 'Agitar os dois braços acima da cabeça:', options: ['Olá', 'Alerta de Perigo / Evacuação', 'OK', 'Fim do dia'], correctAnswer: 1, explanation: 'Sinal de perigo iminente ou aviso grave.' },
      { id: '7-4', question: 'O apito curto serve para:', options: ['Salvamento', 'Chamar atenção de banhista em risco (Prevenção)', 'Cumprimentar', 'Zangar-se'], correctAnswer: 1, explanation: 'Ferramenta de prevenção acústica.' },
      { id: '7-5', question: 'O megafone deve ser usado para:', options: ['Ouvir rádio', 'Informar e avisar banhistas a longa distância', 'Gritar', 'Decoração'], correctAnswer: 1, explanation: 'Essencial para a prevenção coletiva.' },
      { id: '7-6', question: 'O rádio VHF deve estar em que modo?', options: ['Baixo volume', 'Squelch ajustado e Canal 16 em escuta', 'Desligado', 'Rádio comercial'], correctAnswer: 1, explanation: 'Garante receção de alertas marítimos.' },
      { id: '7-7', question: 'Bandeira Xadrez significa:', options: ['Perigo', 'Posto desabitado / fora de horário', 'Banho livre', 'Prova de natação'], correctAnswer: 1, explanation: 'Informa que não há vigilância ativa no local.' },
      { id: '7-8', question: 'Bandeira Azul premeia:', options: ['Mar calmo', 'Qualidade, Segurança e Gestão Ambiental', 'Areia fina', 'Nadadores bonitos'], correctAnswer: 1, explanation: 'Galardão internacional de excelência.' },
      { id: '7-9', question: 'O binóculo auxilia na:', options: ['Leitura', 'Identificação precoce de agueiros e banhistas distantes', 'Visão noturna', 'Decoração'], correctAnswer: 1, explanation: 'Aumenta o raio de prevenção.' },
      { id: '7-10', question: 'Adoçar o equipamento significa:', options: ['Pôr açúcar', 'Lavar com água doce para remover o sal', 'Pintar', 'Guardar'], correctAnswer: 1, explanation: 'Prolonga a vida útil e evita corrosão.' }
    ]
  },
  {
    id: 'q-cap-8',
    title: 'Capítulo 8: Prevenção e Vigilância',
    description: 'Estratégias de antecipação e zonas de risco.',
    questions: [
      { id: '8-1', question: 'Qual o pilar mais importante do salvamento?', options: ['Natação', 'Prevenção (Vigilância Ativa)', 'Força física', 'Equipamento'], correctAnswer: 1, explanation: 'O melhor salvamento é o que não chega a acontecer.' },
      { id: '8-2', question: 'Varrimento em "S" ou "Z" serve para:', options: ['Ficar tonto', 'Garantir que toda a área é vigiada sistematicamente', 'Dormir', 'Ver peixes'], correctAnswer: 1, explanation: 'Técnica sistemática de observação visual.' },
      { id: '8-3', question: 'Grupo de maior risco na praia:', options: ['Surfistas', 'Crianças sozinhas e idosos', 'Pescadores', 'Nadadores'], correctAnswer: 1, explanation: 'Grupos mais vulneráveis e com menos perceção de risco.' },
      { id: '8-4', question: 'Zona de risco identificada por rochas e esporões:', options: ['Excelente para banhos', 'Perigo de correntes laterais e trauma', 'Seguro', 'Só para fotos'], correctAnswer: 1, explanation: 'Rochas criam turbulência e correntes perigosas.' },
      { id: '8-5', question: 'O "instinto de sobrevivência" no afogado causa:', options: ['Gritos fortes', 'Movimentos laterais ineficazes sem grito (luta silenciosa)', 'Flutuabilidade', 'Calma'], correctAnswer: 1, explanation: 'O afogado gasta toda a energia a tentar manter a boca fora de água.' },
      { id: '8-6', question: 'Em caso de nevoeiro cerrado, o que fazer?', options: ['Ir para casa', 'Aumentar vigilância na linha de água e avisar banhistas', 'Fechar o posto', 'Dormir'], correctAnswer: 1, explanation: 'Aumentar a proximidade física com o risco.' },
      { id: '8-7', question: 'Vigilância em pé vs sentada:', options: ['Sentada é sempre melhor', 'Alternar para evitar fadiga ocular e física', 'Só de pé', 'Só deitados'], correctAnswer: 1, explanation: 'A alternância mantém a mente alerta.' },
      { id: '8-8', question: 'O que é a vigilância passiva?', options: ['Dormir', 'Observação indireta durante outras tarefas', 'Não vigiar', 'Vigiar só com rádio'], correctAnswer: 1, explanation: 'Ocorre enquanto se limpa material ou fala com público.' },
      { id: '8-9', question: 'A sinalética de perigo deve ser posta:', options: ['Escondida', 'Onde o perigo é real e visível ao público', 'No bar', 'Só no WC'], correctAnswer: 1, explanation: 'Educação visual do banhista.' },
      { id: '8-10', question: 'Comportamento de risco deve ser:', options: ['Ignorado', 'Corrigido imediatamente com aviso educado', 'Punido com violência', 'Rido'], correctAnswer: 1, explanation: 'A correção preventiva salva vidas.' }
    ]
  },
  {
    id: 'q-cap-9',
    title: 'Capítulo 9: Apoio Sanitário e Gestão de Posto',
    description: 'Material de socorro e organização.',
    questions: [
      { id: '9-1', question: 'Pressão mínima da garrafa de O2 portátil:', options: ['10 bar', '150 bar (verificar diariamente)', '50 bar', '500 bar'], correctAnswer: 1, explanation: 'Garante reserva para emergência real.' },
      { id: '9-2', question: 'O aspirador de secreções serve para:', options: ['Limpar areia', 'Libertar via aérea de fluidos/vómito', 'Fazer vento', 'Drenar água do mar'], correctAnswer: 1, explanation: 'Vital em paragens respiratórias com fluidos.' },
      { id: '9-3', question: 'Verificação do DAE inclui:', options: ['Ouvir música', 'Verificar luz de prontidão e validade de elétrodos', 'Lamber', 'Nada'], correctAnswer: 1, explanation: 'Equipamento crítico deve estar sempre pronto.' },
      { id: '9-4', question: 'Picada de Peixe-Aranha exige:', options: ['Gelo', 'Água quente (calor destrói a toxina)', 'Álcool', 'Cortar'], correctAnswer: 1, explanation: 'A toxina é termolábil (destruída pelo calor).' },
      { id: '9-5', question: 'Picada de Caravela Portuguesa:', options: ['Água quente', 'Vinagre e remover tentáculos sem esfregar', 'Areia quente', 'Gelo'], correctAnswer: 1, explanation: 'Protocolo específico para cnidários.' },
      { id: '9-6', question: 'O relatório de ocorrência deve ser feito:', options: ['Nunca', 'Sempre após qualquer intervenção relevante', 'No fim do mês', 'Só se houver polícia'], correctAnswer: 1, explanation: 'Documento legal e estatístico do serviço.' },
      { id: '9-7', question: 'EPI básico para feridas:', options: ['Mãos nuas', 'Luvas de nitrilo/látex', 'Botas', 'Capacete'], correctAnswer: 1, explanation: 'Proteção biológica do socorrista.' },
      { id: '9-8', question: 'Mala de primeiros socorros deve estar:', options: ['Trancada com cadeado', 'Acessível e organizada por categorias', 'No carro do patrão', 'Enterrada'], correctAnswer: 1, explanation: 'Rapidez na resposta exige organização.' },
      { id: '9-9', question: 'Vítima com queimadura solar grave:', options: ['Pôr manteiga', 'Arrefecer com água doce e hidratar', 'Esfregar', 'Pôr álcool'], correctAnswer: 1, explanation: 'O calor deve ser removido com água.' },
      { id: '9-10', question: 'A vigilância sanitária foca em:', options: ['Limpeza da areia', 'Estado dos equipamentos e higiene do posto', 'Vender gelados', 'Nada'], correctAnswer: 1, explanation: 'Manutenção da saúde pública e operativa.' }
    ]
  },
  {
    id: 'q-cap-10',
    title: 'Capítulo 10: Salvamento Especializado (RWC/Mergulho)',
    description: 'Motos de água e técnicas subaquáticas.',
    questions: [
      { id: '10-1', question: 'Kill Switch serve para:', options: ['Ligar luzes', 'Desligar motor se o condutor cair', 'Acelerar', 'Mudar rádio'], correctAnswer: 1, explanation: 'Sistema de segurança vital em motas de água.' },
      { id: '10-2', question: 'Aproximação com mota de água à vítima:', options: ['Alta velocidade', 'Pelo lado de sotavento (com cuidado)', 'De frente', 'Submerso'], correctAnswer: 1, explanation: 'Evita que a mota atropele a vítima com o vento/corrente.' },
      { id: '10-3', question: 'O Sled (plataforma) serve para:', options: ['Dormir', 'Extração rápida e transporte estável', 'Aumentar peso', 'Estética'], correctAnswer: 1, explanation: 'Permite resgatar e transportar vítimas deitadas.' },
      { id: '10-4', question: 'Mergulho em apneia exige técnica de:', options: ['Gritar', 'Compensação de ouvidos (Valsalva)', 'Comer muito', 'Correr'], correctAnswer: 1, explanation: 'Evita barotrauma nos ouvidos.' },
      { id: '10-5', question: 'Busca subaquática padrão:', options: ['Aleatória', 'Em leque ou circular organizada', 'Apenas onde o sol bate', 'Não se faz'], correctAnswer: 1, explanation: 'Metodologia científica para não falhar áreas.' },
      { id: '10-6', question: 'Embarcação de apoio deve ter sempre:', options: ['Televisão', 'Comunicação rádio e meios de flutuação', 'Camas', 'Grelhador'], correctAnswer: 1, explanation: 'Segurança e prontidão.' },
      { id: '10-7', question: 'Colete de salvação para NS operativo:', options: ['Cinto 50N', 'Colete de impacto ou 50N específico', 'Colete 150N (vira rosto)', 'Nenhum'], correctAnswer: 1, explanation: 'Equilíbrio entre flutuabilidade e agilidade.' },
      { id: '10-8', question: 'Navegação na rebentação exige:', options: ['Ir devagar de lado', 'Enfrentar a onda de proa com aceleração moderada', 'Parar o motor', 'Gritar'], correctAnswer: 1, explanation: 'Técnica de segurança náutica básica.' },
      { id: '10-9', question: 'Manutenção pós-mar da mota:', options: ['Nada', 'Adoçar motor e casco com água doce', 'Deixar ao sol', 'Pintar'], correctAnswer: 1, explanation: 'O sal destrói motores e componentes.' },
      { id: '10-10', question: 'Sinal sonoro de perigo (navio):', options: ['1 apito', '5 ou mais apitos curtos', 'Silêncio', 'Música'], correctAnswer: 1, explanation: 'Código internacional de navegação.' }
    ]
  },
  {
    id: 'q-cap-11',
    title: 'Capítulo 11: Psicologia do Socorro',
    description: 'Gestão de stress e comunicação em crise.',
    questions: [
      { id: '11-1', question: 'Como falar com vítima em pânico?', options: ['Gritar mais', 'Voz calma, ordens curtas e claras', 'Ignorar', 'Chorar'], correctAnswer: 1, explanation: 'Transmitir autoridade calma e segurança.' },
      { id: '11-2', question: 'Stress pós-evento é:', options: ['Sinal de fraqueza', 'Normal e deve ser gerido/falado', 'Proibido', 'Inexistente'], correctAnswer: 1, explanation: 'O "Critical Incident Stress" afeta todos os socorristas.' },
      { id: '11-3', question: 'Pânico na água causa:', options: ['Melhor natação', 'Gasto de energia inútil e aceleração do afogamento', 'Flutuabilidade', 'Calma'], correctAnswer: 1, explanation: 'O pânico é o maior inimigo da sobrevivência.' },
      { id: '11-4', question: 'Comunicar com a família da vítima:', options: ['Brutal e direto', 'Empático, factual e calmo', 'Não falar', 'Mentir'], correctAnswer: 1, explanation: 'Gestão de emoções extremas em terceiros.' },
      { id: '11-5', question: 'Auto-controlo do NS permite:', options: ['Ficar famoso', 'Manter a eficácia técnica sob pressão', 'Dormir melhor', 'Comer mais'], correctAnswer: 1, explanation: 'O socorrista deve ser o porto de abrigo na crise.' },
      { id: '11-6', question: 'Acalmar a multidão serve para:', options: ['Nada', 'Evitar pânico generalizado e facilitar o socorro', 'Publicidade', 'Divertimento'], correctAnswer: 1, explanation: 'Ordem pública na zona de intervenção.' },
      { id: '11-7', question: 'Primeiro apoio psicológico à vítima:', options: ['Dar medicação', 'Segurança, conforto e escuta ativa', 'Analisar o passado', 'Dar conselhos de vida'], correctAnswer: 1, explanation: 'Estabilização emocional imediata.' },
      { id: '11-8', question: 'Vítima agressiva por álcool/drogas:', options: ['Bater', 'Manter distância e chamar autoridades', 'Abraçar', 'Ignorar afogamento'], correctAnswer: 1, explanation: 'Segurança pessoal do NS em primeiro lugar.' },
      { id: '11-9', question: 'O "Debriefing" após o turno serve para:', options: ['Criticar', 'Analisar falhas e sucessos e libertar carga emocional', 'Comer', 'Terminar rápido'], correctAnswer: 1, explanation: 'Melhoria contínua e saúde mental da equipa.' },
      { id: '11-10', question: 'Ouvir a vítima após o resgate:', options: ['Perda de tempo', 'Ajuda na estabilização emocional (ventilação)', 'Perigoso', 'Só médicos'], correctAnswer: 1, explanation: 'Validar a experiência da vítima reduz o trauma.' }
    ]
  },
  {
    id: 'q-cap-12',
    title: 'Capítulo 12: Ambiente e Orla Costeira',
    description: 'Preservação dunas e galardões.',
    questions: [
      { id: '12-1', question: 'Função das dunas?', options: ['Brincar', 'Proteção contra erosão e barreira natural', 'Estética', 'Parque automóvel'], correctAnswer: 1, explanation: 'Defesa vital do litoral.' },
      { id: '12-2', question: 'Bandeira Azul premeia:', options: ['Ondas grandes', 'Qualidade Água, Segurança, Gestão e Educação Ambiental', 'Gente', 'Preço baixo'], correctAnswer: 1, explanation: 'Galardão de referência mundial.' },
      { id: '12-3', question: 'Lixo marinho causa:', options: ['Mais peixes', 'Ingestão/Morte fauna e perigo cortes banhistas', 'Nada', 'Areia bonita'], correctAnswer: 1, explanation: 'Risco biológico e físico.' },
      { id: '12-4', question: 'Vegetação dunar deve ser:', options: ['Pisada', 'Preservada (fixa a areia)', 'Arrancada', 'Queimada'], correctAnswer: 1, explanation: 'Sem plantas a duna desaparece.' },
      { id: '12-5', question: 'Uso de passadiços serve para:', options: ['Andar de bicicleta', 'Proteger o ecossistema dunar', 'Ficar alto', 'Correr'], correctAnswer: 1, explanation: 'Canaliza o público sem destruir a duna.' },
      { id: '12-6', question: 'Poluição por hidrocarbonetos (petróleo):', options: ['Limpar com as mãos', 'Alertar Autoridade Marítima', 'Ignorar', 'Pôr areia'], correctAnswer: 1, explanation: 'Crime ambiental e risco de saúde.' },
      { id: '12-7', question: 'Qual o papel educador do NS?', options: ['Nenhum', 'Sensibilizar banhistas para comportamentos eco-friendly', 'Vender jornais', 'Gritar'], correctAnswer: 1, explanation: 'O NS é uma figura de referência na praia.' },
      { id: '12-8', question: 'Arribas são:', options: ['Seguras para sombra', 'Zonas de instabilidade e queda de rochas', 'Casas', 'Parques'], correctAnswer: 1, explanation: 'Perigo de desmoronamento constante.' },
      { id: '12-9', question: 'POOC significa:', options: ['Plano Organizacional', 'Plano de Ordenamento da Orla Costeira', 'Pequeno Oceano', 'Nada'], correctAnswer: 1, explanation: 'Instrumento de gestão do litoral.' },
      { id: '12-10', question: 'Resíduos perigosos (agulhas):', options: ['Lixo comum', 'Recipiente específico e segurança biológica', 'Mar', 'Enterrar'], correctAnswer: 1, explanation: 'Risco de contágio de doenças graves.' }
    ]
  },
  {
    id: 'q-cap-13',
    title: 'Capítulo 13: Emergências Médicas e Suporte Avançado',
    description: 'Anafilaxia, diabetes, convulsões e choque.',
    questions: [
      { id: '13-1', question: 'Sinal de choque anafilático grave:', options: ['Fome', 'Dificuldade respiratória e edema (inchaço)', 'Sono', 'Riso'], correctAnswer: 1, explanation: 'Reação alérgica sistémica que pode fechar via aérea.' },
      { id: '13-2', question: 'Vítima diabética confusa mas consciente:', options: ['Dar insulina', 'Dar açúcar (hidratos rápidos)', 'Dar água', 'Massagem'], correctAnswer: 1, explanation: 'Suspeita de hipoglicemia.' },
      { id: '13-3', question: 'Crise convulsiva na areia:', options: ['Pôr algo na boca', 'Proteger a cabeça e não restringir movimentos', 'Bater', 'Virar ao contrário'], correctAnswer: 1, explanation: 'Evitar trauma secundário durante a crise.' },
      { id: '13-4', question: 'Insolação severa (Heat Stroke):', options: ['Mais sol', 'Arrefecimento imediato, sombra e emergência 112', 'Comer', 'Correr'], correctAnswer: 1, explanation: 'Falência do sistema de termoregulação.' },
      { id: '13-5', question: 'AVC identifica-se com escala:', options: ['Cincinnati (F de Força, F de Fala, F de Face)', 'Glasgow apenas', 'Peso', 'Altura'], correctAnswer: 0, explanation: 'Avaliação rápida de sinais neurológicos.' },
      { id: '13-6', question: 'Dor no peito irradiada para o braço esquerdo:', options: ['Cansaço', 'Suspeita de Enfarte (SCA)', 'Fome', 'Cãibra'], correctAnswer: 1, explanation: 'Sinal clássico de problema cardíaco.' },
      { id: '13-7', question: 'Hemorragia interna pode causar:', options: ['Euforia', 'Choque hipovolémico (palidez, taquicardia)', 'Fome', 'Calor'], correctAnswer: 1, explanation: 'Perda de volume sanguíneo não visível.' },
      { id: '13-8', question: 'Vítima inconsciente com respiração agónica (Gasping):', options: ['Está bem', 'Considerar Paragem Cardíaca e iniciar RCP', 'Esperar', 'Pôr de lado'], correctAnswer: 1, explanation: 'Gasping não é respiração normal; indica morte iminente.' },
      { id: '13-9', question: 'Asma severa exige:', options: ['Correr', 'Repouso e ajuda com medicação inaladora', 'Nadar', 'Beber leite'], correctAnswer: 1, explanation: 'Auxiliar na broncodilatação.' },
      { id: '13-10', question: 'Epistaxe (sangue pelo nariz):', options: ['Cabeça para trás', 'Cabeça para a frente e pressão nas narinas', 'Areia', 'Lavar'], correctAnswer: 1, explanation: 'Evita a ingestão/aspiração de sangue.' }
    ]
  }
];

export const TIPS: Tip[] = [
  { id: 't1', category: 'Segurança', text: 'Mantenha o rádio sempre no Canal 16.' },
  { id: 't2', category: 'Prevenção', text: 'Identifique agueiros antes do início do turno.' },
  { id: 't3', category: 'Saúde', text: 'Hidrate-se regularmente e use sempre protetor solar.' },
  { id: 't4', category: 'Equipamento', text: 'Verifique a pressão da garrafa de O2 diariamente.' }
];
