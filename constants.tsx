
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
  }
];

export const QUIZ_CHAPTERS: QuizChapter[] = [
  {
    id: 'cap-1',
    title: '1. Atividade e Perfil do Nadador-Salvador',
    description: 'Enquadramento legal, certificação e deveres éticos.',
    questions: [
      {
        id: 'q1-1',
        question: 'Qual a validade atual da certificação de Nadador-Salvador em Portugal?',
        options: ['2 anos', '3 anos', '5 anos', 'Vitalícia'],
        correctAnswer: 1,
        explanation: 'A certificação técnica de Nadador-Salvador é válida por 3 anos, findos os quais deve ser realizado exame de recertificação.'
      },
      {
        id: 'q1-2',
        question: 'Quem é a autoridade técnica responsável pela atividade de salvamento aquático em Portugal?',
        options: ['Polícia Marítima', 'Proteção Civil', 'Instituto de Socorros a Náufragos (ISN)', 'Marinha Portuguesa'],
        correctAnswer: 2,
        explanation: 'O ISN é o organismo regulador e certificador técnico da atividade, sob a dependência da Autoridade Marítima Nacional.'
      },
      {
        id: 'q1-3',
        question: 'Um Nadador-Salvador pode abandonar o posto se não houver banhistas na água?',
        options: ['Sim, se avisar o colega', 'Não, deve manter vigilância durante todo o período de serviço', 'Sim, se as condições do mar forem calmas', 'Apenas para refeições sem aviso'],
        correctAnswer: 1,
        explanation: 'O abandono do posto de vigilância sem substituição é uma falta grave. A vigilância deve ser ininterrupta durante o horário fixado.'
      },
      {
        id: 'q1-4',
        question: 'Qual o diploma que estabelece o regime jurídico da assistência a banhistas?',
        options: ['DL 118/2011', 'DL 24/2024', 'Lei 58/2005', 'DL 35/2004'],
        correctAnswer: 0,
        explanation: 'O Decreto-Lei n.º 118/2011 é a base legal fundamental que regula a profissão e a assistência nas praias.'
      },
      {
        id: 'q1-5',
        question: 'Constitui dever do Nadador-Salvador colaborar com as autoridades de proteção civil?',
        options: ['Apenas em caso de tsunami', 'Sim, é um dever legal e moral em situações de emergência', 'Não, apenas com a Polícia Marítima', 'Só se for pago extra'],
        correctAnswer: 1,
        explanation: 'O Nadador-Salvador é um agente de proteção civil e deve colaborar com todas as autoridades em situações de socorro.'
      },
      {
        id: 'q1-6',
        question: 'O Nadador-Salvador pode aplicar coimas por comportamentos de risco?',
        options: ['Sim', 'Não, deve apenas sensibilizar e contactar a Polícia Marítima se necessário', 'Apenas em praias concessionadas', 'Sim, se for o coordenador'],
        correctAnswer: 1,
        explanation: 'O NS não tem autoridade policial. O seu papel é preventivo e de socorro. Infrações devem ser reportadas à Polícia Marítima.'
      },
      {
        id: 'q1-7',
        question: 'A quem deve o Nadador-Salvador prestar contas diariamente no final do turno?',
        options: ['Ao dono do bar', 'Ao ISN diretamente', 'Ao concessionário ou coordenador de praia', 'À Câmara Municipal'],
        correctAnswer: 2,
        explanation: 'O NS reporta ao concessionário (entidade empregadora) e ao Coordenador de Praia, mantendo os registos de ocorrência em dia.'
      },
      {
        id: 'q1-8',
        question: 'Qual o equipamento de proteção individual (EPI) obrigatório para vigilância estática?',
        options: ['Apenas calções', 'T-shirt, chapéu de sol, óculos escuros e protetor solar', 'Fato de mergulho completo', 'Capa de chuva'],
        correctAnswer: 1,
        explanation: 'A proteção contra radiação UV e insolação é crítica para manter a capacidade de vigilância e saúde do NS.'
      },
      {
        id: 'q1-9',
        question: 'Um NS certificado noutro país da UE pode trabalhar em Portugal sem equivalência?',
        options: ['Sim, automaticamente', 'Não, deve obter o reconhecimento de qualificações pelo ISN', 'Apenas em piscinas privadas', 'Só se falar português'],
        correctAnswer: 1,
        explanation: 'As qualificações estrangeiras devem ser submetidas a um processo de equivalência técnica no ISN.'
      },
      {
        id: 'q1-10',
        question: 'Qual o principal objetivo da "prevenção" no salvamento aquático?',
        options: ['Evitar que o acidente ocorra', 'Limpar a areia', 'Contar os banhistas', 'Vender gelados'],
        correctAnswer: 0,
        explanation: 'A prevenção é a ferramenta mais eficaz. Evitar que a pessoa entre em perigo poupa vidas e evita salvamentos de risco.'
      }
    ]
  },
  {
    id: 'cap-2',
    title: '2. Suporte Básico de Vida (Meio Aquático)',
    description: 'Protocolos ERC/ISN específicos para afogamento.',
    questions: [
      {
        id: 'q2-1',
        question: 'No SBV adaptado ao afogamento, qual o primeiro passo após verificar que a vítima não respira?',
        options: ['30 compressões', 'Ligar 112', '5 ventilações de resgate', 'Posição Lateral de Segurança'],
        correctAnswer: 2,
        explanation: 'No afogamento (paragem hipóxica), as 5 ventilações iniciais são prioritárias para oxigenar o sangue e os pulmões.'
      },
      {
        id: 'q2-2',
        question: 'Qual o rácio de compressões/ventilações num SBV de adulto realizado por um NS?',
        options: ['15:2', '30:2', '5:1', 'Continuous compressions'],
        correctAnswer: 1,
        explanation: 'O rácio padrão para SBV de adulto, mesmo no afogamento após as ventilações iniciais, é de 30 compressões para 2 ventilações.'
      },
      {
        id: 'q2-3',
        question: 'Quanto tempo deve durar a avaliação da respiração (VOS)?',
        options: ['Até 5 segundos', 'Exatamente 10 segundos', 'Entre 5 a 10 segundos', '20 segundos'],
        correctAnswer: 2,
        explanation: 'Deve-se Ver, Ouvir e Sentir a respiração por no máximo 10 segundos para não atrasar o início das manobras.'
      },
      {
        id: 'q2-4',
        question: 'Onde devem ser colocadas as mãos para realizar compressões torácicas num adulto?',
        options: ['No lado esquerdo do peito', 'No centro do tórax (metade inferior do esterno)', 'No estômago', 'Perto do pescoço'],
        correctAnswer: 1,
        explanation: 'As mãos devem ser colocadas no centro do peito, na metade inferior do osso esterno.'
      },
      {
        id: 'q2-5',
        question: 'Qual a profundidade recomendada para as compressões num adulto?',
        options: ['2 a 3 cm', '5 a 6 cm', '7 a 10 cm', 'O máximo possível'],
        correctAnswer: 1,
        explanation: 'As compressões devem ter uma profundidade de 5 a 6 cm para serem eficazes na ejeção de sangue.'
      },
      {
        id: 'q2-6',
        question: 'A que frequência deve realizar as compressões torácicas?',
        options: ['60-80 por minuto', '100-120 por minuto', '140-160 por minuto', 'Ao ritmo do batimento cardíaco do NS'],
        correctAnswer: 1,
        explanation: 'A frequência correta é entre 100 a 120 compressões por minuto (ritmo de "Stayin\' Alive").'
      },
      {
        id: 'q2-7',
        question: 'Se a vítima vomitar durante o SBV, o que deve fazer?',
        options: ['Parar o SBV e desistir', 'Limpar a boca e continuar imediatamente', 'Virar a vítima de lado, limpar a via aérea e retomar o SBV', 'Ignorar'],
        correctAnswer: 2,
        explanation: 'É comum vomitar água/ar durante o SBV no afogamento. Limpar rapidamente a via aérea evita aspiração para os pulmões.'
      },
      {
        id: 'q2-8',
        question: 'O DAE (Desfibrilhador) pode ser usado numa vítima de afogamento molhada?',
        options: ['Não, nunca', 'Sim, após secar rapidamente o tórax da vítima', 'Apenas se estiver em terra firme', 'Sim, mesmo dentro de água'],
        correctAnswer: 1,
        explanation: 'Deve-se secar o peito da vítima para garantir a adesão dos elétrodos e evitar dispersão da corrente elétrica, mas nunca dentro de água.'
      },
      {
        id: 'q2-9',
        question: 'Quando é que o NS deve parar o SBV?',
        options: ['Quando estiver cansado', 'Quando chegar ajuda diferenciada ou a vítima recuperar sinais de vida', 'Após 10 minutos', 'Quando o sol se puser'],
        correctAnswer: 1,
        explanation: 'O socorro só pára se o NS estiver exausto sem alternativa, se a ajuda especializada assumir ou se a vítima recuperar.'
      },
      {
        id: 'q2-10',
        question: 'Em SBV pediátrico (Criança), qual o rácio recomendado para profissionais de saúde/socorro?',
        options: ['30:2', '15:2', '5:1', '10:1'],
        correctAnswer: 1,
        explanation: 'Para profissionais de socorro em pediatria, o rácio recomendado é 15:2 após as 5 ventilações iniciais.'
      }
    ]
  },
  {
    id: 'cap-3',
    title: '3. Socorrismo Avançado e Trauma',
    description: 'Trauma, hemorragias e picadas de animais marinhos.',
    questions: [
      {
        id: 'q3-1',
        question: 'Qual o tratamento imediato para uma picada de Peixe-Aranha?',
        options: ['Gelo local', 'Água quente (40-45ºC)', 'Vinagre', 'Álcool'],
        correctAnswer: 1,
        explanation: 'O veneno do peixe-aranha é termolábil (destrói-se com o calor). Imergir a zona em água quente por 30-90 min alivia a dor.'
      },
      {
        id: 'q3-2',
        question: 'Como tratar uma queimadura de Alforreca ou Caravela Portuguesa?',
        options: ['Lavar com água doce', 'Esfregar com areia', 'Lavar com água do mar e aplicar vinagre', 'Urinar na ferida'],
        correctAnswer: 2,
        explanation: 'Água doce ativa as células urticantes (cnidócitos). Deve usar-se água salgada e vinagre para inativar o veneno.'
      },
      {
        id: 'q3-3',
        question: 'Numa suspeita de trauma vertebral (salto para água), qual a prioridade?',
        options: ['Retirar a vítima rapidamente da água', 'Imobilização cervical manual imediata e alinhamento neutro', 'Verificar se a vítima consegue nadar', 'Massajar o pescoço'],
        correctAnswer: 1,
        explanation: 'A estabilização da coluna cervical é vital para evitar lesões medulares irreversíveis. A extração deve ser feita com plano rígido.'
      },
      {
        id: 'q3-4',
        question: 'O que caracteriza uma hemorragia arterial?',
        options: ['Sangue escuro e constante', 'Sangue vermelho vivo que sai em jatos rítmicos', 'Pequenas gotas', 'Sangue azul'],
        correctAnswer: 1,
        explanation: 'As hemorragias arteriais são as mais graves, pulsando ao ritmo do coração e com sangue oxigenado (claro).'
      },
      {
        id: 'q3-5',
        question: 'Qual a primeira medida para controlar uma hemorragia externa grave?',
        options: ['Aplicar torniquete', 'Pressão direta sobre a ferida', 'Elevar o membro', 'Lavar com soro'],
        correctAnswer: 1,
        explanation: 'A compressão manual direta é a medida inicial mais eficaz e segura para a maioria das hemorragias.'
      },
      {
        id: 'q3-6',
        question: 'Quando deve ser aplicado um torniquete?',
        options: ['Em qualquer corte', 'Apenas em hemorragias massivas em membros onde a pressão direta falhou', 'Sempre que houver sangue', 'No pescoço'],
        correctAnswer: 1,
        explanation: 'O torniquete é uma medida de último recurso para hemorragias catastróficas em braços ou pernas.'
      },
      {
        id: 'q3-7',
        question: 'Vítima com queimadura solar grave. Qual o procedimento?',
        options: ['Aplicar manteiga', 'Arrefecer com água corrente e aplicar compressas húmidas', 'Furar as bolhas', 'Expor mais ao sol'],
        correctAnswer: 1,
        explanation: 'O arrefecimento suave e hidratação são as chaves. Nunca furar bolhas devido ao risco elevado de infeção.'
      },
      {
        id: 'q3-8',
        question: 'O que é a Posição Lateral de Segurança (PLS)?',
        options: ['Vítima de barriga para baixo', 'Vítima deitada de lado para manter a via aérea desobstruída', 'Sentada', 'De cabeça para baixo'],
        correctAnswer: 1,
        explanation: 'A PLS evita que a língua ou vómito obstruam a via aérea em vítimas inconscientes que respiram.'
      },
      {
        id: 'q3-9',
        question: 'Como imobilizar uma fratura exposta?',
        options: ['Empurrar o osso para dentro', 'Cobrir com gaze húmida e imobilizar a articulação acima e abaixo', 'Lavar com lixívia', 'Não mexer'],
        correctAnswer: 1,
        explanation: 'Nunca se deve tentar reduzir a fratura. Proteção da ferida e imobilização estável são as prioridades.'
      },
      {
        id: 'q3-10',
        question: 'O que fazer perante uma insolação (Golpe de Calor)?',
        options: ['Dar café quente', 'Retirar do sol, arrefecer o corpo e dar água se consciente', 'Pedir para correr', 'Fazer SBV'],
        correctAnswer: 1,
        explanation: 'A insolação é uma emergência médica. Baixar a temperatura corporal de forma gradual é fundamental.'
      }
    ]
  },
  {
    id: 'cap-4',
    title: '4. Oceanografia e Meio Aquático',
    description: 'Correntes, marés, ondas e riscos costeiros.',
    questions: [
      {
        id: 'q4-1',
        question: 'O que deve fazer um banhista apanhado por uma corrente de retorno (rip current)?',
        options: ['Nadar contra a corrente em direção à areia', 'Nadar paralelamente à costa até sair da corrente', 'Gritar e debater-se muito', 'Mergulhar até ao fundo'],
        correctAnswer: 1,
        explanation: 'Lutar contra a corrente causa exaustão rápida. Nadar para o lado (paralelo à areia) permite sair do canal da corrente.'
      },
      {
        id: 'q4-2',
        question: 'Onde se localiza normalmente a corrente de retorno?',
        options: ['Onde as ondas quebram com mais força', 'Numa zona de águas aparentemente mais calmas entre rebentações', 'Apenas em rios', 'No topo das dunas'],
        correctAnswer: 1,
        explanation: 'A ausência de ondas numa zona cercada por rebentação indica um canal por onde a água volta para o mar.'
      },
      {
        id: 'q4-3',
        question: 'Qual a principal força geradora das marés?',
        options: ['Vento', 'Atração gravitacional da Lua e do Sol', 'Sismos submarinos', 'Rotação da Terra apenas'],
        correctAnswer: 1,
        explanation: 'A Lua, pela proximidade, exerce a maior influência no ciclo das marés terrestres.'
      },
      {
        id: 'q4-4',
        question: 'O que é a "baixa-mar"?',
        options: ['O nível máximo da água', 'O nível mínimo da água no ciclo da maré', 'Uma onda pequena', 'Água doce'],
        correctAnswer: 1,
        explanation: 'Baixa-mar é o ponto mais baixo da maré recuada.'
      },
      {
        id: 'q4-5',
        question: 'Qual o risco de uma "ondulação de fundo" (Swell)?',
        options: ['Nenhum', 'Pode causar rebentação forte e inesperada mesmo em dias sem vento local', 'Faz a água ficar doce', 'Cria nevoeiro'],
        correctAnswer: 1,
        explanation: 'O swell transporta energia de tempestades distantes, podendo criar ondas perigosas em praias calmas.'
      },
      {
        id: 'q4-6',
        question: 'O que define uma maré de "viva" ou "sizígia"?',
        options: ['Marés com pouca amplitude', 'Marés com grande amplitude (marés muito cheias e muito vazias)', 'Apenas maré alta', 'Maré de inverno'],
        correctAnswer: 1,
        explanation: 'Ocorre quando a Lua e o Sol estão alinhados, somando as suas forças gravitacionais.'
      },
      {
        id: 'q4-7',
        question: 'O que é o "Shorebreak" (rebentação na areia)?',
        options: ['Ondas que quebram longe da costa', 'Ondas que quebram diretamente na face da praia', 'Um tipo de peixe', 'Uma corrente lateral'],
        correctAnswer: 1,
        explanation: 'O shorebreak é perigoso para a coluna e pescoço, pois a onda tem pouca profundidade para amortecer a queda.'
      },
      {
        id: 'q4-8',
        question: 'Como a temperatura da água afeta o socorro?',
        options: ['Não afeta', 'Água fria acelera a hipotermia e o cansaço da vítima e do NS', 'Água quente é tóxica', 'Torna o nadador mais rápido'],
        correctAnswer: 1,
        explanation: 'A temperatura da água em Portugal exige atenção constante ao estado térmico das vítimas resgatadas.'
      },
      {
        id: 'q4-9',
        question: 'O que indica a presença de "água acastanhada" movendo-se para o largo?',
        options: ['Poluição', 'Uma corrente de retorno ativa transportando sedimentos', 'Presença de baleias', 'Maré a subir'],
        correctAnswer: 1,
        explanation: 'O canal de retorno muitas vezes escava o fundo, levando areia em suspensão para fora.'
      },
      {
        id: 'q4-10',
        question: 'Qual o perigo de rochas e arribas instáveis?',
        options: ['Sombra excessiva', 'Desmoronamentos e cortes graves no socorro', 'Nenhum', 'Atraem raios'],
        correctAnswer: 1,
        explanation: 'O NS deve delimitar zonas de risco perto de arribas para evitar acidentes por queda de pedras.'
      }
    ]
  },
  {
    id: 'cap-5',
    title: '5. Vigilância e Prevenção',
    description: 'Scanning, sinais de afogamento e bandeiras.',
    questions: [
      {
        id: 'q5-1',
        question: 'A regra do "10/20" na vigilância significa:',
        options: ['10 minutos de pausa, 20 de trabalho', 'Varrer a zona em 10 seg. e chegar a qualquer ponto em 20 seg.', '10 banhistas por cada 20 metros', 'Beber 10cl de água a cada 20 min.'],
        correctAnswer: 1,
        explanation: 'É o padrão de scanning internacional para garantir vigilância ativa e resposta rápida.'
      },
      {
        id: 'q5-2',
        question: 'Qual destes NÃO é um sinal típico de afogamento real?',
        options: ['Gritos altos e pedidos de socorro', 'Boca ao nível da água e cabeça inclinada para trás', 'Movimentos de subir escadas sem sair do lugar', 'Olhar vidrado e vazio'],
        correctAnswer: 0,
        explanation: 'O afogamento é silencioso. Quem grita está em "dificuldades", quem se afoga não consegue respirar para gritar.'
      },
      {
        id: 'q5-3',
        question: 'O que significa a bandeira AMARELA?',
        options: ['Banho permitido', 'Banho proibido, permitido apenas molhar os pés', 'Perigo extremo, proibição total de entrada', 'Praia sem vigilância'],
        correctAnswer: 1,
        explanation: 'A bandeira amarela exige prudência e proíbe a natação (nadar para o largo).'
      },
      {
        id: 'q5-4',
        question: 'Qual a função principal do "scanning" (varrimento visual)?',
        options: ['Ver se há amigos na praia', 'Detetar comportamentos de risco e vítimas precocemente', 'Contar as gaivotas', 'Ler o jornal discretamente'],
        correctAnswer: 1,
        explanation: 'O varrimento sistemático evita a "cegueira por desatenção" e permite intervir antes do acidente.'
      },
      {
        id: 'q5-5',
        question: 'Qual a zona de maior risco numa praia com correntes de retorno?',
        options: ['A areia seca', 'As zonas de rebentação lateral', 'Os canais de água calma entre espumeiros', 'A beira-mar'],
        correctAnswer: 2,
        explanation: 'As pessoas tendem a entrar onde não há ondas, que é exatamente onde a corrente as puxa para o largo.'
      },
      {
        id: 'q5-6',
        question: 'O que indica a bandeira XADREZ (Preto e Branco)?',
        options: ['Início de corrida de barcos', 'Posto de vigilância temporariamente sem Nadador-Salvador', 'Banho livre', 'Zona de surf apenas'],
        correctAnswer: 1,
        explanation: 'Indica que o NS se ausentou (ex: salvamento noutra zona ou fim de turno) e a praia não está vigiada.'
      },
      {
        id: 'q5-7',
        question: 'Como deve ser a postura do NS na cadeira de vigilância?',
        options: ['Deitado e relaxado', 'Sentado direito, com óculos de sol e atento à água', 'De costas para o mar', 'A dormir'],
        correctAnswer: 1,
        explanation: 'A postura transmite autoridade e permite um campo visual otimizado.'
      },
      {
        id: 'q5-8',
        question: 'Qual o perigo de vigiar sempre o mesmo ponto fixo?',
        options: ['Fadiga ocular e perda de noção do resto da zona', 'Nenhum', 'Fica-se especialista naquele ponto', 'O ponto desaparece'],
        correctAnswer: 0,
        explanation: 'A visão periférica e o varrimento constante são necessários para cobrir toda a área de responsabilidade.'
      },
      {
        id: 'q5-9',
        question: 'O que fazer ao ver uma criança sozinha perto da água?',
        options: ['Esperar que os pais apareçam', 'Aproximar-se preventivamente e tentar localizar os responsáveis', 'Ignorar', 'Gritar com a criança'],
        correctAnswer: 1,
        explanation: 'Crianças desacompanhadas são o grupo de maior risco. A intervenção precoce evita afogamentos fatais.'
      },
      {
        id: 'q5-10',
        question: 'Qual a importância de usar óculos de sol polarizados?',
        options: ['Ficar com estilo', 'Eliminar o reflexo do sol na água para ver o que está submerso', 'Esconder os olhos', 'Proteger do vento'],
        correctAnswer: 1,
        explanation: 'Lentes polarizadas permitem ver através da superfície da água, facilitando a deteção de vítimas submersas.'
      }
    ]
  },
  {
    id: 'cap-6',
    title: '6. Técnicas e Equipamentos de Salvamento',
    description: 'Bóias, carretos, motas de água e embarcações.',
    questions: [
      {
        id: 'q6-1',
        question: 'Qual a principal vantagem do "Flutuador" (bóia torpedo/baywatch)?',
        options: ['É bonito', 'Oferece flutuabilidade imediata e segurança ao NS e à vítima', 'Serve de remo', 'É leve para correr'],
        correctAnswer: 1,
        explanation: 'O flutuador permite ao NS manter a vítima à tona sem contacto direto perigoso, servindo também de apoio ao próprio NS.'
      },
      {
        id: 'q6-2',
        question: 'Como deve ser transportada a bóia circular num salvamento?',
        options: ['Lançada de terra com o cabo seguro', 'Levada a nadar', 'Colocada na cabeça', 'Apenas para decoração'],
        correctAnswer: 0,
        explanation: 'A bóia circular com retenida é um meio de salvamento à distância para ser lançado de cais ou embarcações.'
      },
      {
        id: 'q6-3',
        question: 'Para que serve o "Carreto"?',
        options: ['Pescar', 'Resgate com cabo de aço e cinto em zonas de corrente forte', 'Puxar barcos', 'Enrolar mangueiras'],
        correctAnswer: 1,
        explanation: 'O carreto permite um resgate seguro em praias com correntes fortes, onde o NS é puxado de volta por colegas em terra.'
      },
      {
        id: 'q6-4',
        question: 'Qual a regra de ouro ao abordar uma vítima em pânico?',
        options: ['Agarrar logo o pescoço', 'Manter distância e oferecer o meio de flutuação primeiro', 'Nadar por baixo dela', 'Gritar para ela ter calma'],
        correctAnswer: 1,
        explanation: 'Uma vítima em pânico pode afogar o socorrista. O flutuador deve ser a barreira de segurança.'
      },
      {
        id: 'q6-5',
        question: 'A mota de salvamento aquático (VSA) deve ser operada por:',
        options: ['Qualquer pessoa', 'Nadador-Salvador com formação específica de tripulante de VSA', 'Apenas pela Marinha', 'O dono da concessão'],
        correctAnswer: 1,
        explanation: 'A condução de motas de água de salvamento exige certificação adicional devido à complexidade e risco.'
      },
      {
        id: 'q6-6',
        question: 'O que é a "Prancha de Salvamento"?',
        options: ['Uma prancha de surf normal', 'Uma prancha mais longa e estável desenhada para resgate e transporte', 'Uma mesa', 'Um flutuador pequeno'],
        correctAnswer: 1,
        explanation: 'A prancha permite chegar rapidamente à vítima e transportá-la sobre o casco, reduzindo o esforço do NS.'
      },
      {
        id: 'q6-7',
        question: 'Qual o cuidado principal com os rádios VHF?',
        options: ['Manter o volume no máximo', 'Garantir estanquicidade e bateria carregada no Canal 16', 'Falar com pescadores', 'Não usar'],
        correctAnswer: 1,
        explanation: 'A comunicação rádio é o elo de ligação com o MRCC e capitanias em caso de emergência grave.'
      },
      {
        id: 'q6-8',
        question: 'Como limpar o equipamento após o turno?',
        options: ['Deixar ao sol', 'Lavar com água doce e secar à sombra', 'Lavar com detergente forte', 'Não precisa de limpeza'],
        correctAnswer: 1,
        explanation: 'O sal corrói e o sol degrada os plásticos e tecidos. A manutenção prolonga a vida útil dos meios de socorro.'
      },
      {
        id: 'q6-9',
        question: 'Num resgate com cinto e cabo, quem controla a velocidade da puxada?',
        options: ['O nadador que está na água', 'O sinaleiro/equipa em terra conforme as ondas', 'Ninguém, puxa-se o mais rápido possível', 'A vítima'],
        correctAnswer: 1,
        explanation: 'A equipa de terra deve coordenar a força para não afogar o NS e a vítima durante a passagem da rebentação.'
      },
      {
        id: 'q6-10',
        question: 'O que é um "Plano Rígido"?',
        options: ['Uma folha de papel', 'Uma maca de imobilização para trauma e extração da água', 'Um plano de férias', 'Uma prancha de surf'],
        correctAnswer: 1,
        explanation: 'O plano rígido é essencial para resgatar vítimas com suspeita de lesão na coluna, mantendo o alinhamento corporal.'
      }
    ]
  },
  {
    id: 'cap-7',
    title: '7. Comunicações e Coordenação de Emergência',
    description: 'Apitos, sinais gestuais e rádio VHF.',
    questions: [
      {
        id: 'q7-1',
        question: 'O que significam 3 toques curtos de apito?',
        options: ['Atenção banhista', 'Mudança de posto', 'Entrada na água para salvamento', 'Fim de turno'],
        correctAnswer: 2,
        explanation: 'É o sinal sonoro padrão que alerta a equipa e banhistas de que um socorro real está a começar.'
      },
      {
        id: 'q7-2',
        question: 'Qual o significado de 1 toque longo de apito?',
        options: ['Emergência geral / Ordem para sair da água', 'Bom dia', 'Chamar o concessionário', 'Pedido de café'],
        correctAnswer: 0,
        explanation: 'Um toque longo serve para captar atenção massiva ou ordenar a evacuação da água por perigo iminente.'
      },
      {
        id: 'q7-3',
        question: 'Sinal gestual: Um braço levantado verticalmente e estático significa:',
        options: ['Preciso de ajuda', 'Vítima localizada / Está tudo bem', 'Vão-se embora', 'Adeus'],
        correctAnswer: 1,
        explanation: 'Indica ao colega em terra ou na cadeira que a situação está sob controlo ou a vítima foi alcançada.'
      },
      {
        id: 'q7-4',
        question: 'Sinal gestual: Agitar os dois braços acima da cabeça significa:',
        options: ['Olá', 'Preciso de ajuda urgente / Apoio no salvamento', 'Está muito sol', 'Fim do salvamento'],
        correctAnswer: 1,
        explanation: 'É o sinal de socorro para o próprio Nadador-Salvador pedir reforços.'
      },
      {
        id: 'q7-5',
        question: 'Qual o canal de socorro internacional em rádios VHF Marítimo?',
        options: ['Canal 9', 'Canal 16', 'Canal 68', 'Canal 11'],
        correctAnswer: 1,
        explanation: 'O Canal 16 é monitorizado permanentemente pelas estações costeiras e Marinha para emergências.'
      },
      {
        id: 'q7-6',
        question: 'O que significa a palavra "MAYDAY" repetida 3 vezes ao rádio?',
        options: ['Pedido de informações', 'Perigo grave e iminente para a vida humana', 'Teste de rádio', 'Saudação'],
        correctAnswer: 1,
        explanation: 'Mayday é o sinal de socorro máximo e deve ser usado apenas em situações de vida ou morte.'
      },
      {
        id: 'q7-7',
        question: 'Qual a informação MAIS importante ao ligar para o 112?',
        options: ['O nome do NS', 'A localização exata e o número de vítimas', 'A cor do mar', 'O tempo que falta para o almoço'],
        correctAnswer: 1,
        explanation: 'Sem localização exata, os meios de socorro não conseguem chegar. O tipo de ocorrência ajuda a despachar os meios certos.'
      },
      {
        id: 'q7-8',
        question: 'Como confirmar que recebeu uma mensagem via rádio?',
        options: ['Dizer "Recebido", "Copiado" ou "Roger"', 'Balançar o rádio', 'Gritar', 'Não responder'],
        correctAnswer: 0,
        explanation: 'A confirmação é essencial para garantir que a cadeia de comando e comunicação está ativa e sem erros.'
      },
      {
        id: 'q7-9',
        question: 'O apito deve ser usado para que fim principal?',
        options: ['Assustar pessoas', 'Comunicação tática e avisos de prevenção a banhistas', 'Música', 'Treinar os pulmões'],
        correctAnswer: 1,
        explanation: 'O apito é uma ferramenta de trabalho séria. O uso excessivo retira-lhe a autoridade e eficácia.'
      },
      {
        id: 'q7-10',
        question: 'Numa equipa de 2 NS, qual a função do NS que fica em terra durante um salvamento?',
        options: ['Dormir', 'Vigiar o resto da praia, coordenar o 112 e preparar material de apoio', 'Ir almoçar', 'Tirar fotos'],
        correctAnswer: 1,
        explanation: 'O apoio em terra é tão vital quanto o resgate. Garante a segurança do colega e a continuidade da assistência médica.'
      }
    ]
  },
  {
    id: 'cap-8',
    title: '8. Piscinas, Parques Aquáticos e Logística',
    description: 'Especificidades de águas confinadas e documentação.',
    questions: [
      {
        id: 'q8-1',
        question: 'Qual o principal risco em piscinas relacionado com a sucção?',
        options: ['Ficar com sede', 'Ficar preso nos ralos de fundo', 'Nenhum', 'A água sair toda'],
        correctAnswer: 1,
        explanation: 'A força de sucção dos filtros pode prender cabelos ou membros, causando afogamento mesmo em água pouco profunda.'
      },
      {
        id: 'q8-2',
        question: 'A vigilância em piscinas exige atenção especial a:',
        options: ['Cores das toalhas', 'Entradas de cabeça em zonas pouco profundas', 'Temperatura do bar', 'Música ambiente'],
        correctAnswer: 1,
        explanation: 'Traumas cervicais por mergulhos em zonas rasas são acidentes comuns e graves em piscinas.'
      },
      {
        id: 'q8-3',
        question: 'Onde deve ser feito o registo oficial de um salvamento?',
        options: ['No Facebook', 'No Relatório de Ocorrência oficial (modelo ISN)', 'Num guardanapo', 'Não é necessário registo'],
        correctAnswer: 1,
        explanation: 'O relatório oficial é um documento jurídico e estatístico obrigatório para todos os salvamentos.'
      },
      {
        id: 'q8-4',
        question: 'Qual o tempo máximo de resposta recomendado numa piscina?',
        options: ['10 minutos', 'O mais rápido possível, idealmente em menos de 30 segundos', '5 minutos', 'Quando o banhista pedir'],
        correctAnswer: 1,
        explanation: 'Em ambientes confinados, a resposta deve ser quase instantânea devido à visibilidade facilitada.'
      },
      {
        id: 'q8-5',
        question: 'O que deve o NS verificar diariamente no kit de primeiros socorros?',
        options: ['Se tem pastilhas elásticas', 'Validade dos consumíveis e presença de O2/DAE operacionais', 'Se a mala é bonita', 'Nada'],
        correctAnswer: 1,
        explanation: 'Material fora de validade ou baterias de DAE descarregadas podem custar vidas numa emergência.'
      },
      {
        id: 'q8-6',
        question: 'Em parques aquáticos, a maior causa de conflito e risco é:',
        options: ['Falta de gelados', 'Incumprimento das regras de saída dos escorregas', 'A cor da água', 'O preço do bilhete'],
        correctAnswer: 1,
        explanation: 'Colisões em escorregas por não respeitar o sinal de "livre" causam muitos traumas e fraturas.'
      },
      {
        id: 'q8-7',
        question: 'O NS de piscina pode ser obrigado a limpar a zona envolvente?',
        options: ['Sim, é o trabalho dele', 'Não, a função é exclusivamente vigilância e socorro (DL 118/2011)', 'Apenas se não houver banhistas', 'Sim, se o patrão mandar'],
        correctAnswer: 1,
        explanation: 'A lei protege o NS de realizar tarefas que desviem a sua atenção da vigilância dos banhistas.'
      },
      {
        id: 'q8-8',
        question: 'Qual a sinalização obrigatória numa piscina pública?',
        options: ['Apenas o preço', 'Indicação de profundidades, regras de segurança e horários', 'Fotos dos nadadores', 'Nenhuma'],
        correctAnswer: 1,
        explanation: 'A informação clara sobre profundidades é a principal medida preventiva contra traumas.'
      },
      {
        id: 'q8-9',
        question: 'Como agir perante uma defecação na água da piscina?',
        options: ['Ignorar', 'Evacuar a piscina, remover e proceder à desinfeção química (cloragem de choque)', 'Dizer para não repetirem', 'Mudar a água toda'],
        correctAnswer: 1,
        explanation: 'É um risco biológico grave. Devem seguir-se protocolos de higiene e segurança sanitária rigorosos.'
      },
      {
        id: 'q8-10',
        question: 'O que caracteriza a vigilância em "Águas Confinadas"?',
        options: ['Ser mais difícil', 'Ambiente controlado, sem correntes naturais mas com riscos químicos e mecânicos', 'Água salgada', 'Apenas crianças'],
        correctAnswer: 1,
        explanation: 'Embora pareçam mais seguras, as piscinas exigem vigilância constante devido à densidade de banhistas e riscos de trauma.'
      }
    ]
  }
];

export const TIPS: Tip[] = [
  { id: 't1', category: 'Segurança', text: 'Mantenha o rádio sempre carregado e no Canal 16 durante o turno.' },
  { id: 't2', category: 'Saúde', text: 'Hidrate-se constantemente para manter a clareza mental durante a vigilância.' },
  { id: 't3', category: 'Equipamento', text: 'Lave o flutuador e o carreto com água doce ao final de cada dia.' }
];
