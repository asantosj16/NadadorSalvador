
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
    description: 'Enquadramento legal, deveres, ética e regulamentação (10 questões).',
    questions: [
      { id: 'q1-1', question: 'Qual o diploma que regulamenta a atividade de Nadador-Salvador?', options: ['DL 118/2011', 'DL 124/2006', 'Lei 50/2018', 'Código Civil'], correctAnswer: 0, explanation: 'O DL 118/2011 é a base legal da assistência a banhistas.' },
      { id: 'q1-2', question: 'Validade da certificação técnica?', options: ['1 ano', '2 anos', '3 anos', '5 anos'], correctAnswer: 2, explanation: 'Dura 3 anos.' },
      { id: 'q1-3', question: 'Quem certifica os Nadadores-Salvadores?', options: ['INEM', 'ISN', 'Capitanias', 'Câmaras'], correctAnswer: 1, explanation: 'O ISN é a autoridade técnica.' },
      { id: 'q1-4', question: 'O NS pode abandonar o posto?', options: ['Sim, para comer', 'Apenas em salvamento ou força maior', 'Sim, se houver colegas', 'Sim, se o mar estiver calmo'], correctAnswer: 1, explanation: 'A presença deve ser contínua.' },
      { id: 'q1-5', question: 'Dever do NS perante as autoridades?', options: ['Ignorar', 'Colaborar sempre', 'Colaborar apenas se pago', 'Fugir'], correctAnswer: 1, explanation: 'É um dever ético e legal.' },
      { id: 'q1-6', question: 'Idade mínima para ser NS?', options: ['16 anos', '18 anos', '21 anos', '25 anos'], correctAnswer: 1, explanation: 'Mínimo de 18 anos.' },
      { id: 'q1-7', question: 'Escolaridade mínima exigida?', options: ['4º ano', '9º ano', '12º ano', 'Licenciatura'], correctAnswer: 2, explanation: 'Exige-se a escolaridade obrigatória.' },
      { id: 'q1-8', question: 'O NS é um agente de proteção civil?', options: ['Sim', 'Não', 'Apenas no Verão', 'Só em Lisboa'], correctAnswer: 0, explanation: 'Sim, no exercício das suas funções.' },
      { id: 'q1-9', question: 'Pode o NS cobrar por salvamentos?', options: ['Sim', 'Não, o serviço é público/contratado', 'Apenas gorjetas', 'Sim, se for caro'], correctAnswer: 1, explanation: 'O salvamento é gratuito para a vítima.' },
      { id: 'q1-10', question: 'A farda é obrigatória?', options: ['Sim', 'Não', 'Apenas em dias frios', 'Só para fotos'], correctAnswer: 0, explanation: 'O uso da farda identifica o socorrista e é obrigatório.' }
    ]
  },
  {
    id: 'cap-2',
    title: 'Capítulo 2: Meios de Salvamento e Equipamento',
    description: 'Uso de Torpedo, VHF, Carretel e Barbatanas (10 questões).',
    questions: [
      { id: 'q2-1', question: 'Vantagem do Torpedo?', options: ['Estética', 'Mãos livres no reboque', 'Corta ondas', 'Pesca'], correctAnswer: 1, explanation: 'Oferece flutuabilidade sem prender as mãos.' },
      { id: 'q2-2', question: 'Canal VHF de socorro?', options: ['9', '16', '68', '22'], correctAnswer: 1, explanation: 'Canal 16 é internacional de socorro.' },
      { id: 'q2-3', question: 'Saco de arremesso serve para?', options: ['Lixo', 'Salvamento passivo/distância', 'Ancorar', 'Dormir'], correctAnswer: 1, explanation: 'Lança uma linha flutuante.' },
      { id: 'q2-4', question: 'Uso de barbatanas permite?', options: ['Mergulho livre', 'Propulsão e força no reboque', 'Andar na areia', 'Descanso'], correctAnswer: 1, explanation: 'Essenciais para vencer correntes.' },
      { id: 'q2-5', question: 'Finalidade do carretel?', options: ['Puxar barcos', 'Salvamento com apoio em terra', 'Enrolar mangueiras', 'Decoração'], correctAnswer: 1, explanation: 'Usado em praias com forte corrente.' },
      { id: 'q2-6', question: 'A bóia circular é um meio de?', options: ['Ataque', 'Alcance/Passivo', 'Prevenção', 'Lazer'], correctAnswer: 1, explanation: 'Meio de alcance a partir de estrutura fixa.' },
      { id: 'q2-7', question: 'Equipamento mínimo de proteção individual (EPI)?', options: ['Fato de banho', 'Farda, apito e óculos', 'Barbatanas', 'Cinto'], correctAnswer: 1, explanation: 'Itens básicos de identificação e aviso.' },
      { id: 'q2-8', question: 'Como limpar o equipamento após o turno?', options: ['Deixar ao sol', 'Lavar com água doce/desalinizar', 'Usar lixívia', 'Não precisa'], correctAnswer: 1, explanation: 'O sal corrói o material.' },
      { id: 'q2-9', question: 'O que verificar no rádio antes do turno?', options: ['Se tem música', 'Bateria e canal correto', 'Se brilha', 'Peso'], correctAnswer: 1, explanation: 'Comunicação é vital.' },
      { id: 'q2-10', question: 'Máscara e tubo servem para?', options: ['Ver peixes', 'Busca subaquática e clareza visual', 'Respirar debaixo de água', 'Estilo'], correctAnswer: 1, explanation: 'Melhoram a eficácia da busca.' }
    ]
  },
  {
    id: 'cap-3',
    title: 'Capítulo 3: Vigilância e Prevenção',
    description: 'Bandeiras, scans e antecipação de risco (10 questões).',
    questions: [
      { id: 'q3-1', question: 'Bandeira Vermelha significa?', options: ['Banho livre', 'Atenção', 'Proibição de banhos', 'Água fria'], correctAnswer: 2, explanation: 'Perigo extremo.' },
      { id: 'q3-2', question: 'Varrimento Ocular deve ser?', options: ['Lento', 'Sistemático e rítmico', 'Só para o horizonte', 'Rápido demais'], correctAnswer: 1, explanation: 'Garante cobertura total.' },
      { id: 'q3-3', question: 'Bandeira Xadrez sinaliza?', options: ['Mergulho', 'Desportos náuticos/Embarcações', 'Almoço', 'Fim de praia'], correctAnswer: 1, explanation: 'Área reservada.' },
      { id: 'q3-4', question: 'Frequência do varrimento?', options: ['Cada 10 min', 'Cada 10-30 seg', 'Uma vez por hora', 'Só se chamarem'], correctAnswer: 1, explanation: 'Vigilância constante.' },
      { id: 'q3-5', question: 'Bandeira Amarela?', options: ['Proibido', 'Atenção, não nadar para longe', 'Livre', 'Surf apenas'], correctAnswer: 1, explanation: 'Cuidado redobrado.' },
      { id: 'q3-6', question: 'Melhor local para o posto de vigilância?', options: ['Onde houver sombra', 'Local elevado com visão total', 'Perto do bar', 'Atrás das dunas'], correctAnswer: 1, explanation: 'Visibilidade é a prioridade.' },
      { id: 'q3-7', question: 'O que é a "Zona Crítica"?', options: ['A areia', 'A rebentação/onde os banhistas perdem o pé', 'O bar', 'O parque'], correctAnswer: 1, explanation: 'Onde ocorrem mais afogamentos.' },
      { id: 'q3-8', question: 'Prevenção passiva inclui?', options: ['Salvamento', 'Placas informativas e bandeiras', 'Gritar', 'Correr'], correctAnswer: 1, explanation: 'Informação visual.' },
      { id: 'q3-9', question: 'Sinal de braços em "V"?', options: ['Vitória', 'Vítima localizada/Socorro', 'Venham cá', 'Vou embora'], correctAnswer: 1, explanation: 'Sinal de braços padrão.' },
      { id: 'q3-10', question: 'O que fazer ao ver um agueiro?', options: ['Nadar nele', 'Sinalizar e avisar banhistas', 'Ignorar', 'Fechar a praia'], correctAnswer: 1, explanation: 'Prevenção ativa.' }
    ]
  },
  {
    id: 'cap-4',
    title: 'Capítulo 4: Técnicas de Salvamento Aquático',
    description: 'Abordagem, reboque e extração (10 questões).',
    questions: [
      { id: 'q4-1', question: 'Abordagem a vítima em pânico?', options: ['Abraçar', 'Distância e torpedo à frente', 'Gritar', 'Bater'], correctAnswer: 1, explanation: 'Segurança do socorrista.' },
      { id: 'q4-2', question: 'Crawl de salvamento permite?', options: ['Velocidade máxima', 'Visão constante da vítima', 'Descanso', 'Mergulho'], correctAnswer: 1, explanation: 'Cabeça fora de água.' },
      { id: 'q4-3', question: 'Reboque "Mãos às Axilas" é para?', options: ['Conscientes', 'Inconscientes/Passivos', 'Agressivos', 'Crianças'], correctAnswer: 1, explanation: 'Controlo total da via aérea.' },
      { id: 'q4-4', question: 'Mergulho de fuga serve para?', options: ['Apanhar conchas', 'Soltar-se de um agarrão', 'Mergulho profundo', 'Esconder-se'], correctAnswer: 1, explanation: 'A vítima tende a subir, socorrista desce.' },
      { id: 'q4-5', question: 'Extração na areia?', options: ['Pés primeiro', 'Cabeça elevada e vigiada', 'Arastar', 'Rolar'], correctAnswer: 1, explanation: 'Prevenção de aspiração.' },
      { id: 'q4-6', question: 'Aproximação deve ser feita por?', options: ['Frente', 'Costas/Lado', 'Baixo', 'Cima'], correctAnswer: 1, explanation: 'Evita agarres diretos.' },
      { id: 'q4-7', question: 'Prioridade no salvamento múltiplo?', options: ['O mais pesado', 'O mais silencioso/passivo', 'O que grita mais', 'O mais próximo'], correctAnswer: 1, explanation: 'Vítimas silenciosas estão em maior risco.' },
      { id: 'q4-8', question: 'Uso de embarcação no salvamento?', options: ['Sempre', 'Apenas em longas distâncias', 'Para passeio', 'Nunca'], correctAnswer: 1, explanation: 'Otimiza tempo e energia.' },
      { id: 'q4-9', question: 'Reboque com torpedo?', options: ['Prender na cintura', 'Segurar com a mão', 'Não usar', 'Dar à vítima'], correctAnswer: 0, explanation: 'Permite natação livre.' },
      { id: 'q4-10', question: 'O que fazer se perder a vítima de vista?', options: ['Ir embora', 'Marcar o último local e iniciar busca em leque', 'Esperar', 'Gritar'], correctAnswer: 1, explanation: 'Protocolo de busca subaquática.' }
    ]
  },
  {
    id: 'cap-5',
    title: 'Capítulo 5: Primeiros Socorros - SBV',
    description: 'Algoritmo de afogamento e rácio (10 questões).',
    questions: [
      { id: 'q5-1', question: 'Início do SBV no afogamento?', options: ['Compressões', '5 ventilações', 'DAE', 'Pulso'], correctAnswer: 1, explanation: 'Causa hipóxica.' },
      { id: 'q5-2', question: 'Profundidade compressão adulto?', options: ['2cm', '5-6cm', '10cm', 'Qualquer'], correctAnswer: 1, explanation: 'Eficácia cardíaca.' },
      { id: 'q5-3', question: 'Frequência compressão?', options: ['60/min', '100-120/min', '200/min', '10/min'], correctAnswer: 1, explanation: 'Ritmo ERC.' },
      { id: 'q5-4', question: 'Rácio compressão/ventilação adulto?', options: ['15:2', '30:2', '5:1', '10:2'], correctAnswer: 1, explanation: 'Padrão universal.' },
      { id: 'q5-5', question: 'Vítima inconsciente respira?', options: ['Massagem', 'PLS', 'Água', 'Deixar estar'], correctAnswer: 1, explanation: 'Manter via aérea.' },
      { id: 'q5-6', question: 'Quando ligar 112 no afogamento?', options: ['Imediato', 'Após as 5 ventilações iniciais', 'Nunca', 'No fim'], correctAnswer: 1, explanation: 'Oxigenação é prioritária.' },
      { id: 'q5-7', question: 'Insuflação deve durar?', options: ['5 seg', '1 seg', '10 seg', 'Rápida'], correctAnswer: 1, explanation: 'Evita distensão gástrica.' },
      { id: 'q5-8', question: 'DAE pode ser usado na areia molhada?', options: ['Sim, se a vítima estiver seca/isolada', 'Não', 'Sempre', 'Só em hospitais'], correctAnswer: 0, explanation: 'Segurança elétrica.' },
      { id: 'q5-9', question: 'Rácio em crianças (socorrista profissional)?', options: ['30:2', '15:2', '5:1', '10:1'], correctAnswer: 1, explanation: 'Profissionais usam 15:2.' },
      { id: 'q5-10', question: 'Sinal de obstrução grave da via aérea?', options: ['Fala muito', 'Incapacidade de tossir/falar', 'Risos', 'Sono'], correctAnswer: 1, explanation: 'Necessita manobra de Heimlich.' }
    ]
  },
  {
    id: 'cap-6',
    title: 'Capítulo 6: Traumatologia e Lesões Específicas',
    description: 'Trauma cervical, peixe-aranha e insolação (10 questões).',
    questions: [
      { id: 'q6-1', question: 'Prioridade no trauma cervical?', options: ['Correr', 'Estabilização manual na água', 'Verificar pernas', 'Dar água'], correctAnswer: 1, explanation: 'Evitar danos na medula.' },
      { id: 'q6-2', question: 'Calor no peixe-aranha?', options: ['Gelo', 'Água quente (detona toxina)', 'Vinagre', 'Lixívia'], correctAnswer: 1, explanation: 'Toxina termolábil.' },
      { id: 'q6-3', question: 'Sintoma grave de insolação?', options: ['Frio', 'Alteração consciência/temp >40C', 'Fome', 'Sede'], correctAnswer: 1, explanation: 'Emergência crítica.' },
      { id: 'q6-4', question: 'Tratamento caravela-portuguesa?', options: ['Água doce', 'Vinagre/Água mar', 'Esfregar', 'Álcool'], correctAnswer: 1, explanation: 'Água doce dispara veneno.' },
      { id: 'q6-5', question: 'Fratura exposta?', options: ['Empurrar osso', 'Cobrir e imobilizar', 'Lavar', 'Não mexer'], correctAnswer: 1, explanation: 'Proteção e estabilização.' },
      { id: 'q6-6', question: 'O que é o choque hipovolémico?', options: ['Medo', 'Perda excessiva de sangue/líquidos', 'Eletrocussão', 'Frio'], correctAnswer: 1, explanation: 'Baixa de volume sanguíneo.' },
      { id: 'q6-7', question: 'Como tratar hemorragia externa?', options: ['Garrote imediato', 'Compressão direta', 'Lavar', 'Esperar'], correctAnswer: 1, explanation: 'Primeira linha de ação.' },
      { id: 'q6-8', question: 'Sinais de hipotermia?', options: ['Calor', 'Tremores e confusão', 'Suor', 'Fome'], correctAnswer: 1, explanation: 'Baixa temperatura corporal.' },
      { id: 'q6-9', question: 'O que não fazer numa queimadura solar?', options: ['Arrefecer', 'Rebentar bolhas', 'Hidratar', 'Sombra'], correctAnswer: 1, explanation: 'Risco de infeção.' },
      { id: 'q6-10', question: 'Transporte de vítima com trauma?', options: ['Ao colo', 'Plano duro/Maca de vácuo', 'Cadeirinha', 'Arrastar'], correctAnswer: 1, explanation: 'Imobilização total.' }
    ]
  },
  {
    id: 'cap-7',
    title: 'Capítulo 7: Oxigenoterapia',
    description: 'Débitos, cilindros e cânulas (10 questões).',
    questions: [
      { id: 'q7-1', question: 'Débito O2 em paragem?', options: ['2L', '15L', '5L', '10L'], correctAnswer: 1, explanation: 'Máximo possível.' },
      { id: 'q7-2', question: 'Cor ombro garrafa O2?', options: ['Preto', 'Branco (Medicinal)', 'Azul', 'Verde'], correctAnswer: 1, explanation: 'Norma de segurança.' },
      { id: 'q7-3', question: 'Cânula Guedel serve para?', options: ['Comer', 'Manter via aérea aberta', 'Injetar ar', 'Beber'], correctAnswer: 1, explanation: 'Segura a língua.' },
      { id: 'q7-4', question: 'Perigo do O2 com óleos?', options: ['Explosão/Combustão', 'Congela', 'Nada', 'Cheiro'], correctAnswer: 0, explanation: 'O2 é comburente forte.' },
      { id: 'q7-5', question: 'SpO2 normal?', options: ['50%', '94-100%', '10%', '200%'], correctAnswer: 1, explanation: 'Saturação de oxigénio.' },
      { id: 'q7-6', question: 'Quando usar máscara de reservatório?', options: ['Vítima não respira', 'Vítima respira com dificuldade/hipóxia', 'Dormir', 'Sempre'], correctAnswer: 1, explanation: 'Alta concentração de O2.' },
      { id: 'q7-7', question: 'O que é um fluxómetro?', options: ['Mede pressão', 'Controla débito (L/min)', 'Mede peso', 'Abre a garrafa'], correctAnswer: 1, explanation: 'Ajusta a saída do gás.' },
      { id: 'q7-8', question: 'Como abrir a garrafa de O2?', options: ['Rápido', 'Lentamente', 'Com chave de fendas', 'Não abrir'], correctAnswer: 1, explanation: 'Evita picos de pressão.' },
      { id: 'q7-9', question: 'Pode-se fumar perto de O2?', options: ['Sim', 'Não (Risco incêndio)', 'Só longe', 'Sim, se apagado'], correctAnswer: 1, explanation: 'Segurança contra incêndio.' },
      { id: 'q7-10', question: 'O oxigénio substitui as compressões?', options: ['Sim', 'Não', 'Apenas em crianças', 'Às vezes'], correctAnswer: 1, explanation: 'É um suporte, não substitui massagem.' }
    ]
  },
  {
    id: 'cap-8',
    title: 'Capítulo 8: Oceanografia e Meteorologia',
    description: 'Correntes, marés e ventos (10 questões).',
    questions: [
      { id: 'q8-1', question: 'Identificar agueiro?', options: ['Ondas grandes', 'Zona calma entre rebentação', 'Peixes', 'Gelo'], correctAnswer: 1, explanation: 'Canal de retorno.' },
      { id: 'q8-2', question: 'Sair de agueiro?', options: ['Contra', 'Paralelo à costa', 'Gritar', 'Baixo'], correctAnswer: 1, explanation: 'Nadar de lado.' },
      { id: 'q8-3', question: 'Preia-mar?', options: ['Vazia', 'Cheia', 'Vento', 'Chuva'], correctAnswer: 1, explanation: 'Ponto máximo.' },
      { id: 'q8-4', question: 'Vento Levante sopra de?', options: ['Norte', 'Este', 'Oeste', 'Sul'], correctAnswer: 1, explanation: 'Vento de leste.' },
      { id: 'q8-5', question: 'Marés vivas ocorrem em?', options: ['Quarto crescente', 'Lua Cheia/Nova', 'Verão', 'Noite'], correctAnswer: 1, explanation: 'Alinhamento Sol-Lua.' },
      { id: 'q8-6', question: 'O que é a "Baixa-Mar"?', options: ['Maré mínima', 'Onda pequena', 'Vento fraco', 'Areia'], correctAnswer: 0, explanation: 'Nível mínimo da água.' },
      { id: 'q8-7', question: 'Onda de "Enseada" é?', options: ['Perigosa', 'Onda que enrola na costa', 'Onda de alto mar', 'Nuvem'], correctAnswer: 1, explanation: 'Típica de baías.' },
      { id: 'q8-8', question: 'O que causa as marés?', options: ['Peixes', 'Atração gravítica Lua/Sol', 'Vento', 'Rotação da Terra apenas'], correctAnswer: 1, explanation: 'Forças astronómicas.' },
      { id: 'q8-9', question: 'Vento "Nortada" é comum em?', options: ['Algarve', 'Costa Oeste/Verão', 'Interior', 'Inverno'], correctAnswer: 1, explanation: 'Vento Norte refrescante.' },
      { id: 'q8-10', question: 'Como medir a profundidade visualmente?', options: ['Pela cor da água', 'Pelo som', 'Pelo cheiro', 'Não dá'], correctAnswer: 0, explanation: 'Água mais escura costuma ser mais profunda.' }
    ]
  }
];

export const TIPS: Tip[] = [
  { id: 't1', category: 'Segurança', text: 'Mantenha o rádio sempre carregado e no Canal 16 durante o turno.' },
  { id: 't2', category: 'Prevenção', text: 'Vigie prioritariamente as crianças e idosos perto de agueiros.' },
  { id: 't3', category: 'Equipamento', text: 'Verifique a pressão da garrafa de O2 no início de cada turno.' },
  { id: 't4', category: 'Prevenção', text: 'Esteja atento a mudanças repentinas no padrão de rebentação.' },
  { id: 't5', category: 'Saúde', text: 'Mantenha-se hidratado e use proteção solar mesmo em dias nublados.' }
];
