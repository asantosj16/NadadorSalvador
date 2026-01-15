
import { ManualCategory, QuizChapter, Tip } from './types';

export const MANUALS: ManualCategory[] = [
  {
    id: 'first-aid',
    title: 'Socorrismo e Emergência Médica',
    icon: '🏥',
    content: [
      {
        id: 'fa-1',
        title: 'Suporte Básico de Vida (SBV)',
        description: 'Protocolo completo de reanimação segundo as normas do ERC.',
        fullContent: `O Suporte Básico de Vida é a base da sobrevivência em paragem cardiorrespiratória (PCR).

ALGORITMO OPERACIONAL (ADULTO):
1. SEGURANÇA: Avaliar riscos para o socorrista e vítima.
2. RESPOSTA: Abanar ombros e perguntar "Está bem?".
3. VIA AÉREA: Extensão da cabeça e elevação do queixo.
4. RESPIRAÇÃO: VOS (Ver, Ouvir, Sentir) durante 10 segundos. Se não respira ou respira anormalmente (gasping):
5. ALERTA: Ligar 112, indicar localização exata e solicitar DAE.
6. COMPRESSÕES: 30 compressões (5-6cm profundidade) a um ritmo de 100-120/min.
7. INSUFLAÇÕES: 2 ventilações de 1 segundo cada.

NOTAS ESPECÍFICAS (AFOGAMENTO):
No afogamento, a causa primária é a hipóxia. Deve-se iniciar com 5 insuflações de resgate antes das compressões. Se sozinho, realizar 1 minuto de SBV antes de ir pedir ajuda.`
      },
      {
        id: 'fa-2',
        title: 'Exame Primário (ABCDE)',
        description: 'Metodologia sistemática de avaliação da vítima crítica.',
        fullContent: `O protocolo ABCDE permite identificar ameaças imediatas à vida por ordem de prioridade.

A (Airway) - Via Aérea: Verificar permeabilidade e controlo cervical.
B (Breathing) - Respiração: Avaliar frequência e eficácia respiratória.
C (Circulation) - Circulação: Controlo de hemorragias, avaliação de pulso e perfusão.
D (Disability) - Estado Neurológico: Avaliar consciência (AVPU) e pupilas.
E (Exposure) - Exposição: Observar corpo inteiro e prevenir hipotermia.`
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
        fullContent: `A vigilância eficaz exige disciplina mental.
        
TÉCNICAS RECOMENDADAS:
- Padrão 10/20: Percorrer visualmente a zona em 10 segundos e estar a 20 segundos de distância de qualquer ponto.
- Varrimento em "S": Observar da areia para o horizonte e vice-versa.
- Rotação: Mudar de posto a cada 20-30 minutos para evitar a fadiga cognitiva.
- Foco em Grupos de Risco: Crianças desacompanhadas, idosos e banhistas com flutuadores.`
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
        description: 'Guia de preenchimento do relatório oficial de ocorrências.',
        externalLink: 'https://www.amn.pt/ISN/Documents/01_relatorio_salvamento_praia.pdf',
        fullContent: `O Relatório de Salvamento é o registo histórico e jurídico da intervenção. Deve conter:
- Identificação da vítima e socorrista.
- Localização exata (coordenadas ou referência).
- Natureza da ocorrência (Salvamento Aquático, Assistência Médica, etc).
- Grau de Afogamento (Szpilman 1-6).
- Manobras realizadas (SBV, DAE, O2).
- Meios de evacuação utilizados.

Pode descarregar o modelo oficial (PDF) clicando no botão de download acima.`
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
      },
      {
        id: 'c1-q2',
        question: 'Qual a validade do cartão de Nadador-Salvador?',
        options: ['1 ano', '2 anos', '3 anos', '5 anos'],
        correctAnswer: 2,
        explanation: 'A certificação tem a validade de 3 anos, findos os quais deve ser realizado exame de recertificação.'
      },
      {
        id: 'c1-q3',
        question: 'Qual é a idade mínima para o acesso à formação de Nadador-Salvador?',
        options: ['16 anos', '17 anos', '18 anos', '21 anos'],
        correctAnswer: 2,
        explanation: 'A idade mínima legal para frequentar o curso e exercer a profissão é de 18 anos.'
      },
      {
        id: 'c1-q4',
        question: 'O Nadador-Salvador é considerado um agente de proteção civil?',
        options: ['Sim, em qualquer situação', 'Não, nunca', 'Sim, quando integrado em operações de socorro coordenadas', 'Apenas se for militar'],
        correctAnswer: 2,
        explanation: 'O Nadador-Salvador colabora com as autoridades e é um elemento fundamental na rede de socorro balnear.'
      },
      {
        id: 'c1-q5',
        question: 'Qual o diploma que estabelece o regime jurídico da assistência a banhistas?',
        options: ['Lei 68/2014', 'DL 118/2011', 'DL 135/2014', 'Constituição da República'],
        correctAnswer: 0,
        explanation: 'A Lei nº 68/2014 define o regime jurídico da assistência a banhistas em Portugal.'
      },
      {
        id: 'c1-q6',
        question: 'Qual a formação mínima exigida para ser Nadador-Salvador?',
        options: ['Curso de 1 mês', 'Curso certificado pelo ISN', 'Licenciatura em Desporto', 'Curso de Primeiros Socorros'],
        correctAnswer: 1,
        explanation: 'Apenas cursos certificados pelo ISN habilitam ao exercício da função.'
      },
      {
        id: 'c1-q7',
        question: 'É dever do Nadador-Salvador manter a sua condição física?',
        options: ['Não, apenas técnica', 'Sim, é obrigatório para garantir a eficácia do socorro', 'Apenas se o concessionário pagar o ginásio', 'Só durante o curso'],
        correctAnswer: 1,
        explanation: 'A aptidão física é essencial para realizar salvamentos em condições adversas.'
      },
      {
        id: 'c1-q8',
        question: 'O NS pode exercer funções sob efeito de álcool?',
        options: ['Sim, moderadamente', 'Apenas fora das horas de maior calor', 'Não, é estritamente proibido', 'Sim, se não houver banhistas'],
        correctAnswer: 2,
        explanation: 'O exercício de funções exige prontidão total e estado de sobriedade absoluta.'
      },
      {
        id: 'c1-q9',
        question: 'O Nadador-Salvador deve usar uniforme?',
        options: ['Sim, apenas os calções', 'Sim, o uniforme oficial aprovado pelo ISN', 'Pode usar o que quiser', 'Apenas se estiver frio'],
        correctAnswer: 1,
        explanation: 'O uniforme permite a identificação imediata do socorrista pelos banhistas e autoridades.'
      },
      {
        id: 'c1-q10',
        question: 'Qual a principal função do Nadador-Salvador?',
        options: ['Limpar a praia', 'Vigiar, prevenir e socorrer banhistas', 'Vender bilhetes de estacionamento', 'Ensinar a nadar'],
        correctAnswer: 1,
        explanation: 'O foco principal é a segurança dos banhistas através da tríade: Vigilância, Prevenção e Socorro.'
      }
    ]
  },
  {
    id: 'cap-2',
    title: 'Capítulo 2: Meio Marinho',
    description: 'Oceanografia, correntes e ventos.',
    questions: [
      {
        id: 'c2-q1',
        question: 'O que é uma Corrente de Retorno (Rip Current)?',
        options: ['Uma corrente que puxa para o fundo', 'Um fluxo estreito de água que se dirige da costa para o mar', 'Um movimento lateral da maré', 'Uma onda de grande amplitude'],
        correctAnswer: 1,
        explanation: 'As correntes de retorno são canais onde a água regressa ao mar aberto.'
      },
      {
        id: 'c2-q2',
        question: 'Como se identifica visualmente uma corrente de retorno?',
        options: ['Onde as ondas quebram mais', 'Onde a água está mais calma e com cor diferente', 'Onde há muitos surfistas', 'Onde a areia é mais branca'],
        correctAnswer: 1,
        explanation: 'Zonas com menos rebentação e água mais escura indicam frequentemente canais de retorno.'
      },
      {
        id: 'c2-q3',
        question: 'A escala de Beaufort mede o quê?',
        options: ['A altura das ondas', 'A intensidade do vento', 'A temperatura da água', 'A visibilidade'],
        correctAnswer: 1,
        explanation: 'A escala de Beaufort quantifica a força do vento.'
      },
      {
        id: 'c2-q4',
        question: 'O que caracteriza uma maré de "Vivas" ou Sizígia?',
        options: ['Marés com pouca amplitude', 'Marés com a maior amplitude (Luas Nova e Cheia)', 'Marés de verão', 'Marés sem corrente'],
        correctAnswer: 1,
        explanation: 'Ocorrem quando o Sol e a Lua estão alinhados.'
      },
      {
        id: 'c2-q5',
        question: 'A escala de Douglas é utilizada para classificar:',
        options: ['O vento', 'O estado do mar (vaga e ondulação)', 'A pressão atmosférica', 'A salinidade'],
        correctAnswer: 1,
        explanation: 'Classifica o estado do mar em termos de altura das ondas.'
      },
      {
        id: 'c2-q6',
        question: 'O que é a "Ondulação" (Swell)?',
        options: ['Ondas geradas pelo vento local', 'Ondas geradas por ventos distantes que se propagam', 'O movimento das marés', 'A espuma das ondas'],
        correctAnswer: 1,
        explanation: 'Swell é a ondulação regular que viaja longas distâncias sem influência direta do vento local.'
      },
      {
        id: 'c2-q7',
        question: 'Um vento "Offshore" sopra em que direção?',
        options: ['Do mar para terra', 'De terra para o mar', 'Lateralmente à costa', 'De cima para baixo'],
        correctAnswer: 1,
        explanation: 'Ventos Offshore sopram da terra para o mar, alisando a face das ondas.'
      },
      {
        id: 'c2-q8',
        question: 'O que é o "Período da Onda"?',
        options: ['A distância entre duas cristas', 'O tempo entre a passagem de duas cristas consecutivas', 'A altura da onda', 'A duração de uma maré'],
        correctAnswer: 1,
        explanation: 'Mede a frequência temporal das ondas; períodos maiores indicam ondas com mais energia.'
      },
      {
        id: 'c2-q9',
        question: 'Como se chama o ponto mais alto de uma onda?',
        options: ['Cava', 'Crista', 'Base', 'Lábio'],
        correctAnswer: 1,
        explanation: 'A crista é a parte superior da onda.'
      },
      {
        id: 'c2-q10',
        question: 'O que causa as marés?',
        options: ['O vento', 'As correntes marítimas', 'A atração gravitacional da Lua e do Sol', 'Os terramotos'],
        correctAnswer: 2,
        explanation: 'As marés são causadas principalmente pela força gravitacional exercida pelos astros sobre a Terra.'
      }
    ]
  },
  {
    id: 'cap-3',
    title: 'Capítulo 3: Vigilância e Prevenção',
    description: 'Scanning e identificação de riscos.',
    questions: [
      {
        id: 'c3-q1',
        question: 'Qual o principal objetivo da vigilância proativa?',
        options: ['Fazer salvamentos rápidos', 'Eliminar perigos antes do acidente ocorrer', 'Contar pessoas', 'Verificar protetor solar'],
        correctAnswer: 1,
        explanation: 'A prevenção evita que o acidente aconteça.'
      },
      {
        id: 'c3-q2',
        question: 'O que significa a técnica 10/20?',
        options: ['Olhar 10 vezes', 'Varrer em 10 seg e chegar em 20 seg', 'Trabalhar 10h', 'Vigiar 10m por 20m'],
        correctAnswer: 1,
        explanation: 'É o padrão internacional de tempo de vigilância e resposta.'
      },
      {
        id: 'c3-q3',
        question: 'Quais são grupos de risco na praia?',
        options: ['Surfistas', 'Crianças, idosos e flutuadores', 'Nadadores experientes', 'Pessoas sentadas'],
        correctAnswer: 1,
        explanation: 'Estes grupos têm maior probabilidade de dificuldades físicas ou pânico.'
      },
      {
        id: 'c3-q4',
        question: 'Onde deve o NS posicionar-se?',
        options: ['No bar', 'Num ponto elevado com visão total', 'De costas para o mar', 'Dentro de água'],
        correctAnswer: 1,
        explanation: 'A elevação melhora o ângulo de visão sobre a zona balnear.'
      },
      {
        id: 'c3-q5',
        question: 'A fadiga cognitiva combate-se com:',
        options: ['Café', 'Rotação de postos e pausas', 'Música', 'Conversar'],
        correctAnswer: 1,
        explanation: 'Mudar de cenário renova o foco visual e mental.'
      },
      {
        id: 'c3-q6',
        question: 'O que é o "Scanning"?',
        options: ['Ler um livro', 'Padrão visual sistemático de observação da água', 'Falar ao rádio', 'Correr na areia'],
        correctAnswer: 1,
        explanation: 'É o movimento ocular organizado para cobrir toda a zona de vigilância.'
      },
      {
        id: 'c3-q7',
        question: 'Como identificar um banhista em dificuldades?',
        options: ['Ele grita sempre por socorro', 'Braços agitando-se, falta de progressão e cabeça baixa', 'Ele está a mergulhar', 'Ele está a acenar com a mão'],
        correctAnswer: 1,
        explanation: 'Muitas vítimas não conseguem gritar devido à exaustão e pânico.'
      },
      {
        id: 'c3-q8',
        question: 'Qual a zona mais crítica para vigilância?',
        options: ['A areia seca', 'A zona de rebentação e transição para o largo', 'O horizonte distante', 'As dunas'],
        correctAnswer: 1,
        explanation: 'É onde a maioria dos acidentes e perdas de pé ocorrem.'
      },
      {
        id: 'c3-q9',
        question: 'O que deve fazer ao ver uma criança sozinha na beira-mar?',
        options: ['Ignorar', 'Aproximar-se e tentar localizar os pais imediatamente', 'Esperar que ela chore', 'Chamar a polícia'],
        correctAnswer: 1,
        explanation: 'A prevenção ativa exige intervir antes que a criança entre em perigo.'
      },
      {
        id: 'c3-q10',
        question: 'Um "Ponto Cego" na vigilância é:',
        options: ['Uma zona sem banhistas', 'Uma área que não pode ser vista do posto de vigia', 'Uma zona proibida', 'Onde o sol reflete'],
        correctAnswer: 1,
        explanation: 'Obstáculos físicos ou ângulos mortos criam zonas perigosas sem cobertura visual.'
      }
    ]
  },
  {
    id: 'cap-4',
    title: 'Capítulo 4: Técnicas de Salvamento',
    description: 'Uso de equipamentos e abordagens.',
    questions: [
      {
        id: 'c4-q1',
        question: 'Vantagem do Rescue Tube no salvamento?',
        options: ['Nado rápido', 'Flutuabilidade à vítima e segurança ao salvador', 'Sinalizar posição', 'Leveza'],
        correctAnswer: 1,
        explanation: 'Garante que ambos se mantêm à tona com segurança.'
      },
      {
        id: 'c4-q2',
        question: 'No salvamento com carreto, quantas pessoas são ideais?',
        options: ['1 pessoa', '2 pessoas (nadador e o que segura em terra)', '5 pessoas', 'Ninguém em terra'],
        correctAnswer: 1,
        explanation: 'Um nada até à vítima e o outro controla o cabo em terra.'
      },
      {
        id: 'c4-q3',
        question: 'Regra de ouro na abordagem a vítima consciente em pânico?',
        options: ['Agarrar pelo pescoço', 'Manter distância e oferecer equipamento', 'Nadar por baixo', 'Gritar'],
        correctAnswer: 1,
        explanation: 'Priorizar a segurança para não ser arrastado pela vítima.'
      },
      {
        id: 'c4-q4',
        question: 'As barbatanas são equipamentos:',
        options: ['Opcionais', 'Fundamentais para potência e velocidade', 'Para mergulho', 'Proibidas em rocha'],
        correctAnswer: 1,
        explanation: 'Essenciais para vencer correntes e rebentação.'
      },
      {
        id: 'c4-q5',
        question: 'Uso da prancha de salvamento?',
        options: ['Distâncias curtas', 'Patrulhamento e salvamentos longos', 'Surf', 'Sem flutuadores'],
        correctAnswer: 1,
        explanation: 'Permite transporte rápido e plataforma de descanso.'
      },
      {
        id: 'c4-q6',
        question: 'O que é o "Nado de Aproximação"?',
        options: ['Nado de costas', 'Nado com a cabeça fora de água para não perder a vítima de vista', 'Nado subaquático', 'Nado de lazer'],
        correctAnswer: 1,
        explanation: 'Nunca se deve perder o contacto visual com a vítima durante a aproximação.'
      },
      {
        id: 'c4-q7',
        question: 'Ao utilizar o cinto de salvamento, onde deve ser colocado?',
        options: ['No pescoço', 'À volta da cintura ou a tiracolo conforme o modelo', 'Nos pés', 'No braço'],
        correctAnswer: 1,
        explanation: 'Deve permitir o nado livre mas estar seguro para o reboque.'
      },
      {
        id: 'c4-q8',
        question: 'Como libertar-se se a vítima o agarrar pelo pescoço?',
        options: ['Bater-lhe', 'Mergulhar, encostar o queixo ao peito e empurrar a vítima para cima', 'Gritar por ajuda', 'Ficar quieto'],
        correctAnswer: 1,
        explanation: 'Vítimas em pânico soltam-se quando sentem que vão ser afundadas.'
      },
      {
        id: 'c4-q9',
        question: 'Qual a ordem correta de salvamento se houver várias vítimas?',
        options: ['As que gritam mais', 'As que estão em silêncio e a afundar primeiro (prioridade crítica)', 'As mais velhas', 'As que estão mais perto'],
        correctAnswer: 1,
        explanation: 'Priorizam-se as vítimas inconscientes ou silenciosas (paragem respiratória iminente).'
      },
      {
        id: 'c4-q10',
        question: 'A bóia circular com cabo deve ser usada preferencialmente:',
        options: ['No meio do mar', 'De pontes, molhes ou zonas de águas paradas para lançar à vítima', 'Para nadar com ela', 'Como almofada'],
        correctAnswer: 1,
        explanation: 'É um equipamento de lançamento, não de nado.'
      }
    ]
  },
  {
    id: 'cap-5',
    title: 'Capítulo 5: Suporte Básico de Vida',
    description: 'SBV, DAE e Afogamento.',
    questions: [
      {
        id: 'c5-q1',
        question: 'Sequência inicial no SBV afogamento (vítima não respira)?',
        options: ['30 compressões', '112 imediato', '5 insuflações de resgate', 'Colocar DAE'],
        correctAnswer: 2,
        explanation: 'No afogamento a hipóxia é a causa; as 5 insuflações são cruciais.'
      },
      {
        id: 'c5-q2',
        question: 'Rácio compressões/insuflações no adulto?',
        options: ['15:2', '30:2', '30:5', '5:1'],
        correctAnswer: 1,
        explanation: 'Padrão ERC: 30 compressões para 2 ventilações.'
      },
      {
        id: 'c5-q3',
        question: 'Profundidade das compressões no adulto?',
        options: ['3 cm', '5 a 6 cm', 'Sentir costelas partirem', '7 cm'],
        correctAnswer: 1,
        explanation: 'Garante bombeamento eficaz sem danos excessivos.'
      },
      {
        id: 'c5-q4',
        question: 'O DAE deve ser aplicado:',
        options: ['Só por médicos', 'O mais precocemente possível', 'Após 30 min de SBV', 'Só em maiores de 18'],
        correctAnswer: 1,
        explanation: 'Aumenta drasticamente a sobrevivência em ritmos chocáveis.'
      },
      {
        id: 'c5-q5',
        question: 'Tempo de cada insuflação?',
        options: ['5 seg', '1 seg', '3 seg', 'Rápido'],
        correctAnswer: 1,
        explanation: 'Evita a entrada de ar no estômago.'
      },
      {
        id: 'c5-q6',
        question: 'Como abrir a via aérea se não houver suspeita de trauma?',
        options: ['Abrir a boca com os dedos', 'Extensão da cabeça e elevação do queixo', 'Manobra de Jaw-thrust', 'Puxar a língua'],
        correctAnswer: 1,
        explanation: 'Método padrão para permitir a passagem do ar.'
      },
      {
        id: 'c5-q7',
        question: 'Onde colocar as mãos para as compressões?',
        options: ['No lado esquerdo do peito', 'No centro do peito (metade inferior do esterno)', 'No estômago', 'Perto do pescoço'],
        correctAnswer: 1,
        explanation: 'Posição correta para comprimir o coração contra a coluna.'
      },
      {
        id: 'c5-q8',
        question: 'O que fazer se a vítima vomitar durante o SBV?',
        options: ['Parar tudo', 'Colocar em Posição Lateral de Segurança (PLS), limpar e retomar SBV', 'Continuar a ventilar', 'Fugir'],
        correctAnswer: 1,
        explanation: 'Limpar a via aérea é prioritário para evitar aspiração.'
      },
      {
        id: 'c5-q9',
        question: 'Qual o ritmo das compressões?',
        options: ['60 por minuto', '80 por minuto', '100 a 120 por minuto', 'O mais rápido que puder'],
        correctAnswer: 2,
        explanation: 'Garante fluxo sanguíneo cerebral adequado.'
      },
      {
        id: 'c5-q10',
        question: 'A Posição Lateral de Segurança (PLS) serve para:',
        options: ['Vítimas conscientes', 'Vítimas inconscientes que respiram normalmente', 'Vítimas em paragem cardíaca', 'Ajudar a dormir'],
        correctAnswer: 1,
        explanation: 'Previne a queda da língua e a aspiração de vómito.'
      }
    ]
  },
  {
    id: 'cap-6',
    title: 'Capítulo 6: Emergências Médicas',
    description: 'Graus de afogamento e patologias.',
    questions: [
      {
        id: 'c6-q1',
        question: 'Afogamento com tosse mas sem espuma?',
        options: ['Resgate', 'Grau 1', 'Grau 2', 'Grau 3'],
        correctAnswer: 1,
        explanation: 'Grau 1 apresenta tosse sem espuma.'
      },
      {
        id: 'c6-q2',
        question: 'Vítima com espuma e pulso radial presente?',
        options: ['Grau 1', 'Grau 2', 'Grau 3', 'Grau 4'],
        correctAnswer: 1,
        explanation: 'Grau 2 apresenta espuma e pulso radial.'
      },
      {
        id: 'c6-q3',
        question: 'Tratamento picada peixe-aranha?',
        options: ['Gelo', 'Água quente suportável', 'Vinagre', 'Urinar'],
        correctAnswer: 1,
        explanation: 'O veneno é destruído pelo calor.'
      },
      {
        id: 'c6-q4',
        question: 'Suspeita de trauma cervical (mergulho)?',
        options: ['Retirar rápido', 'Estabilização manual e alinhamento', 'Fazer SBV', 'Sentar'],
        correctAnswer: 1,
        explanation: 'Evita lesões permanentes na medula.'
      },
      {
        id: 'c6-q5',
        question: 'O que é insolação?',
        options: ['Queimadura ligeira', 'Emergência por falência térmica', 'Falta açúcar', 'Alergia'],
        correctAnswer: 1,
        explanation: 'Grave falência da regulação térmica do corpo.'
      },
      {
        id: 'c6-q6',
        question: 'Afogamento Grau 4 caracteriza-se por:',
        options: ['Pulso radial ausente', 'Paragem respiratória', 'Paragem cardíaca', 'Pequena tosse'],
        correctAnswer: 0,
        explanation: 'No Grau 4 o pulso radial é impercetível (choque severo).'
      },
      {
        id: 'c6-q7',
        question: 'Tratamento de queimadura solar de 1º grau?',
        options: ['Manteiga', 'Arrefecimento com água e hidratação', 'Rebentar bolhas', 'Álcool'],
        correctAnswer: 1,
        explanation: 'Água e hidratação aliviam a dor e o calor na pele.'
      },
      {
        id: 'c6-q8',
        question: 'Picada de Caravela Portuguesa - o que usar para lavar?',
        options: ['Água doce', 'Vinagre (se disponível) ou água do mar', 'Sumo de limão', 'Lixívia'],
        correctAnswer: 1,
        explanation: 'Água doce ativa os nematocistos; o vinagre neutraliza o veneno em certas espécies.'
      },
      {
        id: 'c6-q9',
        question: 'Sinais de Hipotermia?',
        options: ['Febre alta', 'Arrepios, lábios azuis, confusão mental', 'Muita sede', 'Pele seca e quente'],
        correctAnswer: 1,
        explanation: 'O corpo está a perder calor mais rápido do que o produz.'
      },
      {
        id: 'c6-q10',
        question: 'Obstrução da via aérea por corpo estranho (Vítima Consciente que não tosse)?',
        options: ['Fazer SBV', 'Manobra de Heimlich (5 pancadas interescapulares e 5 compressões abdominais)', 'Dar de beber', 'Esperar'],
        correctAnswer: 1,
        explanation: 'Protocolo para expulsar o objeto da via aérea.'
      }
    ]
  },
  {
    id: 'cap-7',
    title: 'Capítulo 7: Sinais e Comunicações',
    description: 'Bandeiras, sinais e rádio VHF.',
    questions: [
      {
        id: 'c7-q1',
        question: 'Indicação da bandeira Amarela?',
        options: ['Proibido', 'Livre', 'Com prudência (não nadar para longe)', 'Sem vigilância'],
        correctAnswer: 2,
        explanation: 'Proíbe o nado em direção ao largo.'
      },
      {
        id: 'c7-q2',
        question: 'Canal de emergência VHF?',
        options: ['Canal 9', 'Canal 12', 'Canal 16', 'Canal 68'],
        correctAnswer: 2,
        explanation: 'Canal universal de socorro e segurança.'
      },
      {
        id: 'c7-q3',
        question: 'Bandeira xadrez azul e branco?',
        options: ['Poluição', 'NS temporariamente ausente', 'Fim de dia', 'Surf'],
        correctAnswer: 1,
        explanation: 'Posto sem vigilância naquele momento.'
      },
      {
        id: 'c7-q4',
        question: 'Fonético Marinha para "S"?',
        options: ['Sugar', 'Sierra', 'Sapo', 'Sintra'],
        correctAnswer: 1,
        explanation: 'S é Sierra.'
      },
      {
        id: 'c7-q5',
        question: 'Braços em "V" acima da cabeça?',
        options: ['"Tudo bem"', '"Vitória"', 'Pedido de socorro', '"Olá"'],
        correctAnswer: 2,
        explanation: 'Sinal universal de pedido de auxílio.'
      },
      {
        id: 'c7-q6',
        question: 'O que indica a bandeira Verde?',
        options: ['Banho proibido', 'Banho e nado permitidos', 'Água fria', 'Praia com rochas'],
        correctAnswer: 1,
        explanation: 'Indica condições favoráveis à prática de banhos.'
      },
      {
        id: 'c7-q7',
        question: 'Bandeira Vermelha significa:',
        options: ['Cuidado com o sol', 'Banho estritamente proibido', 'Zonas de correntes', 'Praia cheia'],
        correctAnswer: 1,
        explanation: 'Perigo extremo, entrada na água proibida.'
      },
      {
        id: 'c7-q8',
        question: 'Como dizer "C" no alfabeto fonético?',
        options: ['Charlie', 'Coca', 'Caneta', 'Casa'],
        correctAnswer: 0,
        explanation: 'C é Charlie.'
      },
      {
        id: 'c7-q9',
        question: 'A palavra "MAYDAY" repetida 3 vezes indica:',
        options: ['Uma urgência técnica', 'Perigo grave e iminente (Socorro)', 'Teste de rádio', 'Cumprimento'],
        correctAnswer: 1,
        explanation: 'Sinal de socorro de maior prioridade.'
      },
      {
        id: 'c7-q10',
        question: 'O que indica a bandeira preta e branca (xadrez pequeno)?',
        options: ['Fim de serviço', 'Competição desportiva / Surf / Embarcações', 'Praia sem areia', 'Ponteiros da maré'],
        correctAnswer: 1,
        explanation: 'Indica zonas reservadas a desportos náuticos, desaconselhadas a banhistas.'
      }
    ]
  },
  {
    id: 'cap-8',
    title: 'Capítulo 8: Ética e Legislação',
    description: 'Responsabilidade e deveres do NS.',
    questions: [
      {
        id: 'c8-q1',
        question: 'Abandono do posto durante o turno é:',
        options: ['Falta leve', 'Infração grave e omissão de auxílio', 'Permitido sem banhistas', 'Direito'],
        correctAnswer: 1,
        explanation: 'Viola o dever fundamental de vigilância.'
      },
      {
        id: 'c8-q2',
        question: 'Cobrar dinheiro por salvamento?',
        options: ['Sim', 'Não, é dever profissional gratuito', 'Só se oferecerem', 'Sim, 50€'],
        correctAnswer: 1,
        explanation: 'Antiético e ilegal cobrar por atos de socorro.'
      },
      {
        id: 'c8-q3',
        question: 'Autoridade máxima na segurança da praia?',
        options: ['Dono bar', 'Capitão do Porto / AMN', 'Presidente Câmara', 'NS'],
        correctAnswer: 1,
        explanation: 'O Capitão do Porto regula a segurança marítima.'
      },
      {
        id: 'c8-q4',
        question: 'Sigilo profissional aplica-se a:',
        options: ['Crimes', 'Dados pessoais e clínicos das vítimas', 'Nada', 'Nome praia'],
        correctAnswer: 1,
        explanation: 'Respeita a privacidade e dignidade da vítima.'
      },
      {
        id: 'c8-q5',
        question: 'Dever de auxílio fora de serviço?',
        options: ['Não', 'Sim, como cidadão e com dever ético técnico', 'Só com equipamento', 'Só se a PM mandar'],
        correctAnswer: 1,
        explanation: 'Dever moral e cívico de prestar auxílio.'
      },
      {
        id: 'c8-q6',
        question: 'Qual a multa por falta de Nadador-Salvador em praia concessionada?',
        options: ['Não há multa', 'Pesada multa e possível interdição da praia', '10 euros', 'Apenas aviso'],
        correctAnswer: 1,
        explanation: 'A segurança é requisito legal para a exploração da praia.'
      },
      {
        id: 'c8-q7',
        question: 'O NS pode confiscar bens de banhistas?',
        options: ['Sim, se estiverem a portar-se mal', 'Não, deve solicitar a presença da Polícia Marítima', 'Sim, se for o telemóvel', 'Pode'],
        correctAnswer: 1,
        explanation: 'O NS não tem autoridade policial direta para apreensão de bens.'
      },
      {
        id: 'c8-q8',
        question: 'Dever de colaboração com as autoridades significa:',
        options: ['Dizer "olá"', 'Prestar informações verdadeiras e auxiliar as forças de segurança', 'Fazer o trabalho da polícia', 'Denunciar todos os vizinhos'],
        correctAnswer: 1,
        explanation: 'O NS é um parceiro vital no terreno para a Autoridade Marítima.'
      },
      {
        id: 'c8-q9',
        question: 'A quem deve o NS reportar diretamente as anomalias no posto?',
        options: ['Aos amigos', 'Ao concessionário e à autoridade marítima/coordenação', 'À televisão', 'A ninguém'],
        correctAnswer: 1,
        explanation: 'Garante que os meios de socorro estão operacionais.'
      },
      {
        id: 'c8-q10',
        question: 'O "Dever de Vigilância" termina quando:',
        options: ['O NS tem sono', 'O horário oficial de assistência termina', 'A praia está vazia', 'O sol se põe'],
        correctAnswer: 1,
        explanation: 'O horário é definido pelo edital de praia; até lá a vigilância é obrigatória.'
      }
    ]
  }
];

export const TIPS: Tip[] = [
  { id: 't1', category: 'Segurança', text: 'Mantenha o rádio sempre carregado e no Canal 16 durante o turno.' },
  { id: 't2', category: 'Saúde', text: 'Hidrate-se constantemente para manter a clareza mental durante a vigilância.' },
  { id: 't3', category: 'Equipamento', text: 'Lave o flutuador e o carreto com água doce ao final de cada dia.' }
];
