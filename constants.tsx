
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
      { id: 'q1-1', question: 'Qual a validade atual da certificação de Nadador-Salvador em Portugal?', options: ['2 anos', '3 anos', '5 anos', 'Vitalícia'], correctAnswer: 1, explanation: 'A certificação técnica é válida por 3 anos (Decreto-Lei 118/2011).' },
      { id: 'q1-2', question: 'Qual a entidade responsável pela certificação técnica de Nadadores-Salvadores?', options: ['Polícia Marítima', 'ISN - Instituto de Socorros a Náufragos', 'Cruz Vermelha', 'Proteção Civil'], correctAnswer: 1, explanation: 'O ISN é a autoridade técnica responsável pela formação e certificação.' },
      { id: 'q1-3', question: 'Um Nadador-Salvador em serviço pode abandonar o seu posto para auxiliar noutra zona da praia?', options: ['Sim, livremente', 'Não, exceto se articulado com o dispositivo de segurança', 'Apenas se for para almoçar', 'Sim, se avisar um banhista'], correctAnswer: 1, explanation: 'A vigilância deve ser contínua e qualquer movimentação deve ser coordenada com a equipa.' },
      { id: 'q1-4', question: 'Qual o diploma legal que regula a assistência a banhistas em Portugal?', options: ['Lei 58/2005', 'Decreto-Lei 118/2011', 'DL 35/2004', 'Código Marítimo'], correctAnswer: 1, explanation: 'O DL 118/2011 estabelece o regime jurídico da assistência a banhistas.' },
      { id: 'q1-5', question: 'É dever do Nadador-Salvador utilizar o uniforme oficial durante o horário de serviço?', options: ['Apenas se estiver frio', 'Sim, é obrigatório para identificação rápida', 'Não, pode usar roupa civil', 'Só em praias fluviais'], correctAnswer: 1, explanation: 'O uso de uniforme é obrigatório por lei para identificação clara por parte dos banhistas e autoridades.' },
      { id: 'q1-6', question: 'O Nadador-Salvador é considerado um Agente de Proteção Civil?', options: ['Não', 'Apenas os bombeiros', 'Sim, nos termos da Lei de Bases da Proteção Civil', 'Só se trabalhar para a Câmara'], correctAnswer: 2, explanation: 'Os Nadadores-Salvadores integram o sistema de proteção civil em situações de socorro.' },
      { id: 'q1-7', question: 'Qual a idade mínima para ingressar no curso de Nadador-Salvador?', options: ['16 anos', '17 anos', '18 anos', '21 anos'], correctAnswer: 2, explanation: 'A idade mínima legal para a certificação é de 18 anos.' },
      { id: 'q1-8', question: 'Constitui falta grave o consumo de bebidas alcoólicas durante o serviço?', options: ['Sim, passível de cassação do título', 'Apenas se ficar embriagado', 'Não, se for moderado', 'Apenas em piscinas'], correctAnswer: 0, explanation: 'O consumo de substâncias que alterem a capacidade psicomotora é estritamente proibido.' },
      { id: 'q1-9', question: 'A quem deve o Nadador-Salvador reportar infrações de banhistas que ponham em risco a segurança?', options: ['Ao dono do bar', 'À Polícia Marítima', 'Aos pais da vítima', 'Não deve reportar'], correctAnswer: 1, explanation: 'A Polícia Marítima é a autoridade policial competente na orla costeira.' },
      { id: 'q1-10', question: 'O título de Nadador-Salvador pode ser cassado por negligência grave?', options: ['Não', 'Apenas por tribunal', 'Sim, pelo ISN após processo disciplinar', 'Só se houver morte'], correctAnswer: 2, explanation: 'O ISN pode retirar a certificação técnica em casos de falta de zelo ou competência demonstrada.' }
    ]
  },
  {
    id: 'cap-2',
    title: '2. Suporte Básico de Vida (Meio Aquático)',
    description: 'Protocolos ERC/ISN específicos para afogamento.',
    questions: [
      { id: 'q2-1', question: 'Qual a primeira ação no algoritmo de SBV para uma vítima de afogamento que não respira?', options: ['30 compressões', 'Chamar o 112', '5 ventilações de resgate', 'Posição Lateral de Segurança'], correctAnswer: 2, explanation: 'No afogamento (paragem hipóxica), as 5 ventilações iniciais são críticas.' },
      { id: 'q2-2', question: 'Qual o rácio de compressões/ventilações num adulto após as ventilações iniciais?', options: ['15:2', '30:2', '5:1', 'Continuous'], correctAnswer: 1, explanation: 'O rácio padrão para adultos é 30 compressões para 2 ventilações.' },
      { id: 'q2-3', question: 'Por quanto tempo deve avaliar a respiração (VOS) na vítima inconsciente?', options: ['5 segundos', 'Exatamente 10 segundos', 'Até 10 segundos', '20 segundos'], correctAnswer: 2, explanation: 'A avaliação deve durar no máximo 10 segundos para não atrasar as manobras.' },
      { id: 'q2-4', question: 'Numa paragem por afogamento, o que causa a paragem cardíaca na maioria dos casos?', options: ['Enfarte', 'Hipóxia (falta de oxigénio)', 'Frio excessivo', 'Pânico'], correctAnswer: 1, explanation: 'O coração pára devido à falta de oxigénio prolongada resultante da submersão.' },
      { id: 'q2-5', question: 'Onde devem ser feitas as compressões torácicas num adulto?', options: ['Lado esquerdo', 'Centro do tórax', 'Abdómen superior', 'Perto do pescoço'], correctAnswer: 1, explanation: 'As compressões devem ser feitas no centro do tórax, na metade inferior do esterno.' },
      { id: 'q2-6', question: 'Qual a profundidade recomendada para as compressões no adulto?', options: ['2-3 cm', '5-6 cm', '7-8 cm', 'O máximo possível'], correctAnswer: 1, explanation: 'Compressões de 5 a 6 cm garantem a ejeção de sangue eficaz.' },
      { id: 'q2-7', question: 'A que frequência devem ser realizadas as compressões?', options: ['60-80 por minuto', '100-120 por minuto', '140-160 por minuto', 'Ritmo livre'], correctAnswer: 1, explanation: 'O ritmo ideal situa-se entre 100 e 120 compressões por minuto.' },
      { id: 'q2-8', question: 'Pode-se utilizar o DAE em vítimas molhadas?', options: ['Não, nunca', 'Sim, após secar o tórax da vítima', 'Sim, mesmo dentro de água', 'Apenas se tiver luvas'], correctAnswer: 1, explanation: 'O tórax deve ser seco para os elétrodos aderirem e evitar condução elétrica superficial indesejada.' },
      { id: 'q2-9', question: 'Se a vítima vomitar durante o SBV, qual a conduta?', options: ['Desistir', 'Virar de lado, limpar via aérea e retomar SBV', 'Ignorar e continuar', 'Dar água'], correctAnswer: 1, explanation: 'É comum o vómito; deve-se limpar a via aérea para evitar aspiração e obstrução.' },
      { id: 'q2-10', question: 'Quando se pode interromper o SBV?', options: ['Quando estiver cansado', 'Chegada de ajuda diferenciada ou recuperação da vítima', 'Após 10 minutos', 'Quando o sol se puser'], correctAnswer: 1, explanation: 'A reanimação só pára com a entrega a equipas médicas, exaustão do socorrista ou sucesso na manobra.' }
    ]
  },
  {
    id: 'cap-3',
    title: '3. Socorrismo Avançado e Trauma',
    description: 'Trauma, hemorragias e picadas de animais marinhos.',
    questions: [
      { id: 'q3-1', question: 'Qual o tratamento imediato para uma picada de peixe-aranha?', options: ['Gelo local', 'Água quente (40-45ºC)', 'Vinagre', 'Amoníaco'], correctAnswer: 1, explanation: 'As toxinas são termolábeis e destroem-se com o calor.' },
      { id: 'q3-2', question: 'Como tratar uma queimadura de alforreca (medusa)?', options: ['Água doce', 'Água do mar e vinagre', 'Gelo', 'Esfregar areia'], correctAnswer: 1, explanation: 'A água doce ativa os nematocistos; a água salgada e o vinagre inativam-nos.' },
      { id: 'q3-3', question: 'Suspeita de trauma cervical num salto para a água: qual a prioridade?', options: ['Retirar rápido', 'Estabilização manual da coluna cervical', 'Massagem', 'Fazer SBV'], correctAnswer: 1, explanation: 'A imobilização manual imediata previne lesões medulares secundárias.' },
      { id: 'q3-4', question: 'O que caracteriza uma hemorragia arterial?', options: ['Sangue escuro', 'Sangue vermelho vivo em jatos rítmicos', 'Pequenas gotas', 'Sangue azul'], correctAnswer: 1, explanation: 'A pressão arterial faz o sangue sair em jatos pulsáteis.' },
      { id: 'q3-5', question: 'Qual o rácio de ventilações num afogado grau 5 (Paragem Respiratória)?', options: ['10-12 por minuto', '20-24 por minuto', '30 por minuto', '1 por minuto'], correctAnswer: 0, explanation: 'Em paragem respiratória com pulso (Grau 5), fazem-se ventilações de resgate (1 cada 5-6 seg).' },
      { id: 'q3-6', question: 'Qual a primeira medida para controlar uma hemorragia externa?', options: ['Torniquete', 'Pressão direta na ferida', 'Elevar o membro', 'Dar água'], correctAnswer: 1, explanation: 'A compressão direta é o método inicial mais eficaz.' },
      { id: 'q3-7', question: 'Vítima com queimadura solar de 2º grau (bolhas): deve-se furar as bolhas?', options: ['Sim', 'Não, risco de infeção', 'Apenas as grandes', 'Só se doer'], correctAnswer: 1, explanation: 'As bolhas protegem a pele nova e previnem infeções.' },
      { id: 'q3-8', question: 'O que é a manobra de Heimlich?', options: ['Manobra de natação', 'Desobstrução da via aérea por corpo estranho', 'Técnica de mergulho', 'Protocolo de rádio'], correctAnswer: 1, explanation: 'Utilizada para expulsar objetos que causam asfixia.' },
      { id: 'q3-9', question: 'Uma vítima inconsciente que respira deve ser colocada em:', options: ['Sentada', 'Barriga para cima', 'Posição Lateral de Segurança (PLS)', 'De pé'], correctAnswer: 2, explanation: 'A PLS evita a queda da língua e aspiração de vómito.' },
      { id: 'q3-10', question: 'Qual o principal sinal de choque hipovolémico?', options: ['Febre', 'Pulso rápido e fraco, palidez, suores frios', 'Fome', 'Hipertensão'], correctAnswer: 1, explanation: 'O choque é uma falha circulatória aguda que exige cuidados urgentes.' }
    ]
  },
  {
    id: 'cap-4',
    title: '4. Oceanografia e Meio Aquático',
    description: 'Correntes, marés, ondas e riscos costeiros.',
    questions: [
      { id: 'q4-1', question: 'O que deve um banhista fazer se for apanhado por uma corrente de retorno (rip current)?', options: ['Nadar contra ela', 'Nadar paralelamente à costa', 'Parar de nadar', 'Mergulhar'], correctAnswer: 1, explanation: 'Nadar para o lado permite sair do canal da corrente de retorno.' },
      { id: 'q4-2', question: 'As marés são provocadas principalmente por:', options: ['Vento', 'Atração gravitacional da Lua e do Sol', 'Sismos', 'Rotação da Terra apenas'], correctAnswer: 1, explanation: 'A Lua exerce a maior influência sobre as marés devido à proximidade.' },
      { id: 'q4-3', question: 'O que é a "baixa-mar"?', options: ['Onda pequena', 'Ponto mais baixo da maré', 'Maré de inverno', 'Corrente forte'], correctAnswer: 1, explanation: 'É o momento de nível mínimo de água no ciclo da maré.' },
      { id: 'q4-4', question: 'O que é o "Swell"?', options: ['Ondulação de fundo gerada por tempestades distantes', 'Ondas de vento local', 'Espuma da onda', 'Vento de terra'], correctAnswer: 0, explanation: 'O swell são ondas regulares que viajam longas distâncias.' },
      { id: 'q4-5', question: 'A zona de "rebentação" é onde a onda:', options: ['Nasce', 'Quebra e liberta energia', 'Desaparece', 'Aumenta de velocidade'], correctAnswer: 1, explanation: 'A rebentação ocorre quando a profundidade é insuficiente para manter a forma da onda.' },
      { id: 'q4-6', question: 'O que indica a água com tom acastanhado a ir para o largo?', options: ['Poluição', 'Corrente de retorno ativa', 'Baleias', 'Maré a subir'], correctAnswer: 1, explanation: 'As correntes de retorno transportam sedimentos da praia para o mar.' },
      { id: 'q4-7', question: 'O que é uma maré de "Sizígia"?', options: ['Maré pequena', 'Maré de grande amplitude (vivas)', 'Apenas maré cheia', 'Maré sem ondas'], correctAnswer: 1, explanation: 'Ocorre no alinhamento Sol-Terra-Lua (Lua Cheia/Nova).' },
      { id: 'q4-8', question: 'Qual o risco do "shorebreak"?', options: ['Nenhum', 'Lesões na coluna por quebra direta na areia', 'Peixes', 'Queimaduras'], correctAnswer: 1, explanation: 'Ondas que quebram na face da praia são muito perigosas para o pescoço.' },
      { id: 'q4-9', question: 'O vento "Nortada" em Portugal sopra de:', options: ['Sul', 'Oeste', 'Norte/Noroeste', 'Este'], correctAnswer: 2, explanation: 'É o vento predominante de Verão na costa Oeste portuguesa.' },
      { id: 'q4-10', question: 'Arribas instáveis: qual a distância de segurança recomendada?', options: ['1 metro', '1,5 vezes a altura da arriba', '10 metros fixos', 'Não há risco'], correctAnswer: 1, explanation: 'Deve-se manter uma distância de segurança proporcional à altura da arriba.' }
    ]
  },
  {
    id: 'cap-5',
    title: '5. Vigilância e Prevenção',
    description: 'Scanning, sinais de afogamento e bandeiras.',
    questions: [
      { id: 'q5-1', question: 'Qual a regra do "10/20" na vigilância?', options: ['10 min pausa, 20 trabalho', 'Varrer zona em 10 seg e chegar em 20 seg', '10 banhistas por 20 metros', 'Pausa a cada 10 min'], correctAnswer: 1, explanation: 'É o padrão internacional para deteção e resposta rápida.' },
      { id: 'q5-2', question: 'O afogamento real é geralmente:', options: ['Ruidoso e com muitos gritos', 'Silencioso e rápido', 'Demorado', 'Só acontece à noite'], correctAnswer: 1, explanation: 'Vítimas de afogamento não conseguem pedir ajuda verbalmente (Instinctive Drowning Response).' },
      { id: 'q5-3', question: 'O que significa a bandeira AMARELA?', options: ['Banho proibido', 'Banho permitido com prudência (proibido nadar)', 'Banho livre', 'Praia fechada'], correctAnswer: 1, explanation: 'Exige atenção e proíbe nadar para o largo ou mergulhar.' },
      { id: 'q5-4', question: 'O "scanning" deve ser feito de que forma?', options: ['Fixar um ponto', 'Movimentos oculares sistemáticos em toda a área', 'Olhar só para as crianças', 'Dormir'], correctAnswer: 1, explanation: 'O varrimento ocular evita a fadiga e pontos cegos.' },
      { id: 'q5-5', question: 'Qual a importância de usar óculos de sol polarizados?', options: ['Estilo', 'Eliminar reflexo e ver melhor submersos', 'Proteção do vento', 'Não têm utilidade'], correctAnswer: 1, explanation: 'Permitem ver através da superfície da água eliminando o brilho do sol.' },
      { id: 'q5-6', question: 'Bandeira XADREZ significa:', options: ['Vento forte', 'Posto de vigilância sem Nadador-Salvador', 'Banho livre', 'Regata'], correctAnswer: 1, explanation: 'Indica a ausência temporária do NS no seu posto.' },
      { id: 'q5-7', question: 'Onde deve estar focado o NS durante a vigilância?', options: ['No telemóvel', 'Na água (zonas de risco e banhistas)', 'Na areia', 'No bar'], correctAnswer: 1, explanation: 'A prioridade absoluta é a monitorização dos banhistas no meio aquático.' },
      { id: 'q5-8', question: 'Crianças desacompanhadas são consideradas:', options: ['Banhistas normais', 'Grupo de alto risco', 'Apenas barulho', 'Vigilância fácil'], correctAnswer: 1, explanation: 'Crianças exigem vigilância redobrada e intervenção preventiva imediata.' },
      { id: 'q5-9', question: 'A vigilância estática é feita a partir de:', options: ['Cadeira/Torre de vigilância', 'Caminhando na areia', 'Dentro de água', 'Do bar'], correctAnswer: 0, explanation: 'A posição elevada permite um campo visual superior e abrangente.' },
      { id: 'q5-10', question: 'Qual o sinal sonoro para iniciar um salvamento?', options: ['Apito longo', '3 toques curtos de apito', 'Gritar', 'Sirene'], correctAnswer: 1, explanation: 'É a sinalização padrão para alertar a equipa e banhistas.' }
    ]
  },
  {
    id: 'cap-6',
    title: '6. Técnicas e Equipamentos de Salvamento',
    description: 'Bóias, carretos, motas de água e embarcações.',
    questions: [
      { id: 'q6-1', question: 'Qual a principal vantagem do "Flutuador" (torpedo)?', options: ['Leveza', 'Flutuabilidade para o NS e vítima', 'Cor viva', 'Barato'], correctAnswer: 1, explanation: 'Permite manter a vítima à tona sem contacto direto perigoso.' },
      { id: 'q6-2', question: 'Para que serve o "Carreto"?', options: ['Puxar barcos', 'Salvamento com cabo em zonas de corrente', 'Transportar malas', 'Treino de força'], correctAnswer: 1, explanation: 'Utilizado para resgates onde o NS é puxado de volta por colegas em terra.' },
      { id: 'q6-3', question: 'A Prancha de Salvamento é ideal para:', options: ['Surfar', 'Vigilância móvel e resgates rápidos', 'Dormir', 'Substituir a torre'], correctAnswer: 1, explanation: 'Oferece rapidez e permite transportar a vítima sobre a prancha.' },
      { id: 'q6-4', question: 'Como se deve abordar uma vítima consciente em pânico?', options: ['Agarrar logo', 'Manter distância e oferecer o flutuador', 'Dar um estalo', 'Nadar por baixo'], correctAnswer: 1, explanation: 'O contacto direto pode pôr em risco o socorrista.' },
      { id: 'q6-5', question: 'O que é a VSA?', options: ['Vela de Salvamento', 'Mota de Água de Salvamento (Embarcação de Alta Velocidade)', 'Viatura de Apoio', 'Vigilância Ativa'], correctAnswer: 1, explanation: 'Veículo de Socorro Aquático (mota de água adaptada).' },
      { id: 'q6-6', question: 'Qual o equipamento obrigatório num posto de praia?', options: ['Gira-discos', 'Bóia circular, torpedo, mala primeiros socorros, rádio', 'Apenas calções', 'Pranchas de surf'], correctAnswer: 1, explanation: 'São os meios mínimos definidos por lei para intervenção.' },
      { id: 'q6-7', question: 'O cinto de salvamento do carreto deve ser colocado:', options: ['No pescoço', 'À volta da cintura ou peito', 'Na mão', 'Não se usa cinto'], correctAnswer: 1, explanation: 'Deve estar seguro ao corpo do NS para que possa nadar com as mãos livres.' },
      { id: 'q6-8', question: 'O "Plano Rígido" serve para:', options: ['Mesa de apoio', 'Imobilização e extração de vítimas de trauma', 'Remar', 'Vigilância'], correctAnswer: 1, explanation: 'Essencial para manter o alinhamento da coluna.' },
      { id: 'q6-9', question: 'Como deve ser limpo o material após o turno?', options: ['Deixar ao sol', 'Lavar com água doce e secar à sombra', 'Lavar com lixívia', 'Não precisa de limpeza'], correctAnswer: 1, explanation: 'A água doce remove o sal que degrada os materiais.' },
      { id: 'q6-10', question: 'Qual a distância máxima recomendada para usar a bóia circular com retenida?', options: ['100 metros', '20-25 metros (comprimento do cabo)', '1 metro', 'Distância infinita'], correctAnswer: 1, explanation: 'A bóia circular é para lançamentos curtos a partir de terra ou embarcações.' }
    ]
  },
  {
    id: 'cap-7',
    title: '7. Comunicações e Coordenação de Emergência',
    description: 'Apitos, sinais gestuais e rádio VHF.',
    questions: [
      { id: 'q7-1', question: 'O que significam 3 toques curtos de apito?', options: ['Atenção banhista', 'Vou entrar para salvamento', 'Fim de turno', 'Chamada para almoço'], correctAnswer: 1, explanation: 'Sinal de início de operação de socorro.' },
      { id: 'q7-2', question: 'Qual o canal de rádio VHF de socorro marítimo?', options: ['Canal 9', 'Canal 16', 'Canal 68', 'Canal 10'], correctAnswer: 1, explanation: 'O Canal 16 é a frequência internacional de emergência.' },
      { id: 'q7-3', question: 'Sinal gestual: Um braço levantado verticalmente parado significa:', options: ['Socorro!', 'Vítima localizada / Está tudo bem', 'Vou sair', 'Não vejo nada'], correctAnswer: 1, explanation: 'Comunica ao colega que a situação está sob controlo.' },
      { id: 'q7-4', question: 'O que dizer ao rádio antes de começar a falar?', options: ['Olá', 'Identificação do posto e para quem fala', 'Qualquer coisa', 'Nada'], correctAnswer: 1, explanation: 'A disciplina de rádio exige identificação clara.' },
      { id: 'q7-5', question: 'Qual a informação prioritária ao ligar 112?', options: ['Nome do NS', 'Localização exata e tipo de ocorrência', 'Cor das ondas', 'Número da licença'], correctAnswer: 1, explanation: 'A localização permite o despacho correto dos meios.' },
      { id: 'q7-6', question: 'Sinal gestual: Agitar os dois braços acima da cabeça significa:', options: ['Adeus', 'Preciso de ajuda urgente / Apoio', 'Vou mergulhar', 'Está frio'], correctAnswer: 1, explanation: 'Sinal de pedido de reforço para o NS na água.' },
      { id: 'q7-7', question: 'O toque longo de apito serve para:', options: ['Sinalizar perigo iminente a banhistas', 'Acordar colegas', 'Festejar', 'Chamar o barco'], correctAnswer: 0, explanation: 'Utilizado para captar a atenção geral para um perigo.' },
      { id: 'q7-8', question: 'Ao rádio, a palavra "COPIADO" significa:', options: ['Vou copiar o papel', 'Entendi a mensagem', 'O rádio está estragado', 'Repita'], correctAnswer: 1, explanation: 'Confirmação de receção de informação.' },
      { id: 'q7-9', question: 'Numa equipa de 2, quem coordena o socorro em terra?', options: ['O NS que fica no posto', 'O banhista', 'O dono da praia', 'Ninguém'], correctAnswer: 0, explanation: 'O NS de apoio garante comunicações e material de suporte.' },
      { id: 'q7-10', question: 'Para que servem os binóculos?', options: ['Ver pessoas ao longe', 'Identificar precocemente perigos e vítimas distantes', 'Decorar o posto', 'Proteção solar'], correctAnswer: 1, explanation: 'Ferramenta de extensão visual indispensável na vigilância.' }
    ]
  },
  {
    id: 'cap-8',
    title: '8. Piscinas, Parques Aquáticos e Logística',
    description: 'Especificidades de águas confinadas e documentação.',
    questions: [
      { id: 'q8-1', question: 'Qual o maior perigo mecânico numa piscina?', options: ['A escada', 'Sucção dos ralos de fundo', 'Trampolim', 'Cloro'], correctAnswer: 1, explanation: 'A sucção pode prender membros ou cabelos causando afogamento.' },
      { id: 'q8-2', question: 'A vigilância em piscinas exige atenção redobrada a:', options: ['Cor das toalhas', 'Mergulhos de cabeça em zonas pouco profundas', 'Música', 'Temperatura'], correctAnswer: 1, explanation: 'Causa frequente de traumas cervicais graves.' },
      { id: 'q8-3', question: 'O que fazer perante um acidente fecal na piscina?', options: ['Ignorar', 'Evacuar, remover e cloragem de choque', 'Deitar perfume', 'Mudar a água toda imediatamente'], correctAnswer: 1, explanation: 'Protocolo de higiene para prevenir doenças (criptosporidiose, etc).' },
      { id: 'q8-4', question: 'Onde se registam os salvamentos e assistências?', options: ['Diário de Ocorrências (modelo ISN)', 'Facebook', 'Não se regista', 'Caderno pessoal'], correctAnswer: 0, explanation: 'O registo oficial é obrigatório para estatística e prova jurídica.' },
      { id: 'q8-5', question: 'Em parques aquáticos, quem define a saída dos escorregas?', options: ['Os banhistas', 'O Nadador-Salvador (emissor)', 'Ninguém', 'O dono'], correctAnswer: 1, explanation: 'O controlo de fluxo evita colisões traumáticas.' },
      { id: 'q8-6', question: 'Qual a profundidade mínima para saltos de cabeça?', options: ['1 metro', 'Pelo menos 1.5 a 2 metros (dependendo da técnica)', '0.5 metros', 'Qualquer uma'], correctAnswer: 1, explanation: 'Abaixo desta profundidade o risco de bater no fundo é extremo.' },
      { id: 'q8-7', question: 'O que deve o NS verificar diariamente no DAE?', options: ['Se é bonito', 'Indicador de estado (bateria/elétrodos)', 'Se toca música', 'Nada'], correctAnswer: 1, explanation: 'O DAE deve estar sempre pronto a usar.' },
      { id: 'q8-8', question: 'A sinalização de profundidade numa piscina é:', options: ['Facultativa', 'Obrigatória e visível', 'Apenas no fundo', 'Não interessa'], correctAnswer: 1, explanation: 'Essencial para a prevenção de acidentes.' },
      { id: 'q8-9', question: 'A vigilância em piscinas deve ser feita:', options: ['Sempre a andar', 'A partir de postos fixos estrategicamente colocados', 'Sentado no chão', 'De costas'], correctAnswer: 1, explanation: 'Garante a cobertura total do espelho de água.' },
      { id: 'q8-10', question: 'Qual o dever do NS após um incidente grave?', options: ['Ir embora', 'Preencher relatório e informar coordenação/autoridades', 'Não contar a ninguém', 'Limpar tudo e esquecer'], correctAnswer: 1, explanation: 'O fecho operacional e documental é parte do dever profissional.' }
    ]
  },
  {
    id: 'cap-9',
    title: '9. Oxigenoterapia no Salvamento Aquático',
    description: 'Protocolos de administração, segurança e equipamentos de oxigénio.',
    questions: [
      { id: 'q9-1', question: 'Qual o débito de oxigénio recomendado para uma vítima de afogamento Grau 2 (Szpilman)?', options: ['1-2 L/min', '5 L/min', '15 L/min', 'Não se administra O2'], correctAnswer: 1, explanation: 'Vítimas Grau 2 (pouca espuma) beneficiam de 5L/min via máscara simples ou óculos nasais.' },
      { id: 'q9-2', question: 'Nas vítimas Grau 3, 4, 5 e 6 da Escala de Szpilman, qual o débito de oxigénio indicado?', options: ['5 L/min', '10 L/min', '15 L/min', 'Apenas SBV'], correctAnswer: 2, explanation: 'Afogados graves (G3 a G6) necessitam de alta concentração de O2 (15L/min).' },
      { id: 'q9-3', question: 'Por que razão nunca se deve usar gorduras ou óleos perto das válvulas das garrafas de oxigénio?', options: ['Suja o material', 'Risco de explosão/combustão espontânea na presença de O2 sob pressão', 'Estraga a borracha', 'Não tem contraindicação'], correctAnswer: 1, explanation: 'O oxigénio sob pressão reage violentamente com hidrocarbonetos (gorduras), podendo causar explosão.' },
      { id: 'q9-4', question: 'Qual a função do saco reservatório numa máscara de alta concentração (não-reinalante)?', options: ['Armazenar o ar exalado', 'Permitir a administração de O2 próximo dos 100%', 'Apenas conforto', 'Humidificar o ar'], correctAnswer: 1, explanation: 'O reservatório garante que a vítima inspire quase exclusivamente O2 puro do balão.' },
      { id: 'q9-5', question: 'Qual a cor padrão da ogiva (topo) das garrafas de oxigénio medicinal em Portugal?', options: ['Verde', 'Azul', 'Branca', 'Preta'], correctAnswer: 2, explanation: 'A cor branca identifica o oxigénio para fins medicinais.' },
      { id: 'q9-6', question: 'O manómetro da garrafa de oxigénio indica:', options: ['O fluxo por minuto', 'A pressão interna da garrafa (quantidade de gás restante)', 'A temperatura do gás', 'A pureza do O2'], correctAnswer: 1, explanation: 'O manómetro mede a pressão; o fluxómetro mede o débito em L/min.' },
      { id: 'q9-7', question: 'O que deve ser verificado antes de colocar a máscara de reservatório na vítima?', options: ['Se a vítima está a dormir', 'Se o saco reservatório está insuflado', 'A cor dos olhos da vítima', 'Se há vento'], correctAnswer: 1, explanation: 'Deve-se tapar a válvula com o dedo para insuflar o balão antes de aplicar no rosto.' },
      { id: 'q9-8', question: 'Numa vítima em paragem respiratória (Grau 5), o O2 deve ser acoplado a:', options: ['Óculos nasais', 'Máscara de Venturi', 'Insuflador manual (Ambu) com reservatório', 'Não se usa O2'], correctAnswer: 2, explanation: 'Vítimas que não respiram necessitam de ventilação assistida com O2 a 15L/min acoplado ao insuflador.' },
      { id: 'q9-9', question: 'O oxímetro de pulso é fiável em vítimas em estado de choque ou hipotermia grave?', options: ['Sim, sempre', 'Não, devido à má perfusão periférica (vasoconstrição)', 'Só se for caro', 'Apenas em crianças'], correctAnswer: 1, explanation: 'O frio e o choque causam vasoconstrição, impedindo a leitura correta da saturação.' },
      { id: 'q9-10', question: 'Qual o principal objetivo da oxigenoterapia no afogado?', options: ['Arrefecer a vítima', 'Tratar a hipoxémia (baixa concentração de O2 no sangue)', 'Secar os pulmões', 'Aumentar a pressão arterial'], correctAnswer: 1, explanation: 'O afogamento é essencialmente um problema de falta de oxigénio; a reposição precoce é vital.' }
    ]
  }
];

export const TIPS: Tip[] = [
  { id: 't1', category: 'Segurança', text: 'Mantenha o rádio sempre carregado e no Canal 16 durante o turno.' },
  { id: 't2', category: 'Saúde', text: 'Hidrate-se constantemente para manter a clareza mental durante a vigilância.' },
  { id: 't3', category: 'Equipamento', text: 'Lave o flutuador e o carreto com água doce ao final de cada dia.' }
];
