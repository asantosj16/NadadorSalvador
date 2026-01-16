
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
    description: 'Questões sobre legislação (DL 118/2011), ética e deveres.',
    questions: [
      { id: 'q1-1', question: 'Qual o diploma que regulamenta a atividade de Nadador-Salvador?', options: ['DL 118/2011', 'DL 124/2006', 'Lei 50/2018', 'Código Civil'], correctAnswer: 0, explanation: 'O DL 118/2011 regula a assistência a banhistas.' },
      { id: 'q1-2', question: 'Validade da certificação técnica do NS?', options: ['1 ano', '2 anos', '3 anos', '5 anos'], correctAnswer: 2, explanation: 'A certificação tem validade de 3 anos.' },
      { id: 'q1-3', question: 'Quem é a autoridade técnica nacional de salvamento aquático?', options: ['INEM', 'ISN', 'Capitanias', 'Proteção Civil'], correctAnswer: 1, explanation: 'O ISN (Instituto de Socorros a Náufragos) é a autoridade técnica.' },
      { id: 'q1-4', question: 'O Nadador-Salvador pode abandonar o posto?', options: ['Sim, para comer', 'Apenas por motivo de força maior ou salvamento', 'Sim, se não houver banhistas', 'Sim, se o mar estiver calmo'], correctAnswer: 1, explanation: 'A presença deve ser contínua durante o horário de serviço.' },
      { id: 'q1-5', question: 'O NS deve colaborar com as autoridades maritimas?', options: ['Apenas se solicitado por escrito', 'Sempre', 'Não, é independente', 'Apenas em caso de morte'], correctAnswer: 1, explanation: 'É um dever legal colaborar com a Autoridade Marítima.' },
      { id: 'q1-6', question: 'Idade mínima para frequência do curso de NS?', options: ['16 anos', '17 anos', '18 anos', '21 anos'], correctAnswer: 2, explanation: 'A idade mínima é de 18 anos à data do exame.' },
      { id: 'q1-7', question: 'Qual a escolaridade mínima exigida para ser NS?', options: ['9º Ano', '12º Ano', 'Escolaridade Obrigatória', 'Licenciatura'], correctAnswer: 2, explanation: 'Exige-se a escolaridade obrigatória de acordo com a idade.' },
      { id: 'q1-8', question: 'A farda de NS é de uso obrigatório?', options: ['Apenas em cerimónias', 'Sim, identifica o socorrista', 'Não', 'Só se o concessionário quiser'], correctAnswer: 1, explanation: 'A farda identifica o NS e o seu estatuto.' },
      { id: 'q1-9', question: 'O NS pode cobrar por salvamentos?', options: ['Sim', 'Não, o serviço é gratuito/incluído', 'Apenas gorjetas', 'Sim, se for fora de horas'], correctAnswer: 1, explanation: 'O salvamento de vidas humanas é gratuito.' },
      { id: 'q1-10', question: 'O cartão de NS é pessoal e intransmissível?', options: ['Sim', 'Não', 'Apenas se tiver foto', 'Pode ser emprestado a colegas'], correctAnswer: 0, explanation: 'O cartão certifica a competência individual.' }
    ]
  },
  {
    id: 'cap-2',
    title: 'Capítulo 2: Meios de Salvamento e Equipamento',
    description: 'Torpedo, Cinto de Salvamento, VHF e outros materiais.',
    questions: [
      { id: 'q2-1', question: 'A principal vantagem do torpedo é:', options: ['Permite mãos livres no reboque', 'É mais bonito', 'Substitui o barco', 'Não fura'], correctAnswer: 0, explanation: 'O torpedo oferece flutuabilidade e permite nadar com as mãos livres.' },
      { id: 'q2-2', question: 'O canal VHF internacional de socorro é o:', options: ['9', '16', '68', '22'], correctAnswer: 1, explanation: 'O Canal 16 é o canal mundial de socorro.' },
      { id: 'q2-3', question: 'O saco de arremesso serve para:', options: ['Lixo', 'Salvamento passivo/alcance', 'Transportar barbatanas', 'Ancoragem'], correctAnswer: 1, explanation: 'É um meio de alcance para lançar uma linha a uma vítima.' },
      { id: 'q2-4', question: 'O uso de barbatanas no salvamento:', options: ['É proibido', 'Aumenta a força de tração no reboque', 'Serve para mergulho apenas', 'Atrasa o nadador'], correctAnswer: 1, explanation: 'As barbatanas dão maior propulsão e força no reboque.' },
      { id: 'q2-5', question: 'O carretel de salvamento é usado para:', options: ['Praias com forte corrente de retorno', 'Enrolar cabos de pesca', 'Salvamento em barcos', 'Treino de força'], correctAnswer: 0, explanation: 'O carretel é usado com apoio de terra em correntes fortes.' },
      { id: 'q2-6', question: 'A bóia circular deve ter que comprimento de cabo?', options: ['5 metros', '10 metros', '25 a 30 metros', '50 metros'], correctAnswer: 2, explanation: 'Deve permitir o alcance a distância segura.' },
      { id: 'q2-7', question: 'Como se deve lavar o material após o uso no mar?', options: ['Água com lixívia', 'Água doce/Desalinizar', 'Não precisa lavar', 'Deixar ao sol'], correctAnswer: 1, explanation: 'A desalinização evita a corrosão e degradação.' },
      { id: 'q2-8', question: 'O que verificar no rádio VHF antes do turno?', options: ['Se dá música', 'Bateria e Canal 16', 'O peso', 'A cor'], correctAnswer: 1, explanation: 'A funcionalidade do rádio é crítica para a segurança.' },
      { id: 'q2-9', question: 'A máscara e tubo servem para:', options: ['Pesca submarina', 'Busca subaquática', 'Estilo', 'Evitar água nos olhos'], correctAnswer: 1, explanation: 'Melhoram a visibilidade e eficácia na busca.' },
      { id: 'q2-10', question: 'O "Rescue Board" (Prancha) é ideal para:', options: ['Apenas surf', 'Salvamentos a longa distância', 'Vítimas inconscientes na areia', 'Decoração'], correctAnswer: 1, explanation: 'A prancha permite chegar rápido e transportar a vítima.' }
    ]
  },
  {
    id: 'cap-3',
    title: 'Capítulo 3: Vigilância e Prevenção',
    description: 'Bandeiras, varrimento ocular e identificação de riscos.',
    questions: [
      { id: 'q3-1', question: 'Bandeira Vermelha significa:', options: ['Banhos autorizados', 'Perigo, proibido entrar na água', 'Mar calmo', 'Presença de medusas'], correctAnswer: 1, explanation: 'Vermelha indica proibição total de entrada.' },
      { id: 'q3-2', question: 'O varrimento ocular deve ser:', options: ['Sistemático e rítmico', 'Apenas para o horizonte', 'Rápido e aleatório', 'Apenas para onde há ruído'], correctAnswer: 0, explanation: 'Garante que toda a zona é vigiada eficazmente.' },
      { id: 'q3-3', question: 'Bandeira Xadrez sinaliza:', options: ['Início de prova', 'Posto de vigia temporariamente sem NS', 'Zona de desportos náuticos (proibido banhos)', 'Fim de praia'], correctAnswer: 2, explanation: 'Indica áreas de embarcações/surf.' },
      { id: 'q3-4', question: 'Qual a frequência do varrimento da zona crítica?', options: ['Cada 10 minutos', 'Cada 10 a 30 segundos', 'Uma vez por hora', 'Só quando houver gritos'], correctAnswer: 1, explanation: 'A vigilância deve ser constante na zona de risco.' },
      { id: 'q3-5', question: 'Bandeira Amarela indica:', options: ['Proibido banhos', 'Atenção, proibido nadar para longe', 'Livre', 'Medusas'], correctAnswer: 1, explanation: 'Amarela significa atenção e não sair de pé.' },
      { id: 'q3-6', question: 'Onde deve estar o NS durante a vigilância?', options: ['Sentado na areia', 'Em local elevado com visão total', 'No bar da praia', 'Dentro de água'], correctAnswer: 1, explanation: 'A elevação melhora o campo de visão.' },
      { id: 'q3-7', question: 'O que é a "Zona Crítica" na praia?', options: ['A zona das dunas', 'Onde as ondas rebentam e há perda de pé', 'O parque de estacionamento', 'O mar profundo'], correctAnswer: 1, explanation: 'É onde ocorrem a maioria dos incidentes.' },
      { id: 'q3-8', question: 'Uma vítima silenciosa na água pode indicar:', options: ['Que está a mergulhar', 'Afogamento iminente (luta pela sobrevivência)', 'Que está a descansar', 'Que sabe nadar bem'], correctAnswer: 1, explanation: 'Vítimas em afogamento raramente conseguem gritar.' },
      { id: 'q3-9', question: 'A bandeira azul indica:', options: ['Mar calmo', 'Qualidade ambiental/Galardão', 'Zona de mergulho', 'Nada'], correctAnswer: 1, explanation: 'A Bandeira Azul é um galardão ambiental.' },
      { id: 'q3-10', question: 'O sinal de braços em "V" significa:', options: ['Vitória', 'Vítima localizada/Socorro', 'Vou embora', 'Venham cá'], correctAnswer: 1, explanation: 'É a sinalética padrão para localização.' }
    ]
  },
  {
    id: 'cap-4',
    title: 'Capítulo 4: Técnicas de Salvamento Aquático',
    description: 'Abordagem, reboque e extração de vítimas.',
    questions: [
      { id: 'q4-1', question: 'Na abordagem a vítima em pânico, o NS deve:', options: ['Abraçá-la logo', 'Manter distância e usar o torpedo como interface', 'Gritar para ela se calar', 'Mergulhar para longe'], correctAnswer: 1, explanation: 'A segurança do socorrista é prioritária.' },
      { id: 'q4-2', question: 'O estilo "Crawl de Salvamento" caracteriza-se por:', options: ['Cabeça submersa', 'Cabeça fora de água e braçada alta', 'Pernas de bruços', 'Nadar de costas'], correctAnswer: 1, explanation: 'Permite manter contacto visual com a vítima.' },
      { id: 'q4-3', question: 'O reboque "Mãos às Axilas" é indicado para vítimas:', options: ['Conscientes e cooperantes', 'Inconscientes/Passivas', 'Agressivas', 'Crianças pequenas'], correctAnswer: 1, explanation: 'Permite manter as vias aéreas elevadas e vigiadas.' },
      { id: 'q4-4', question: 'O "Mergulho de Fuga" serve para:', options: ['Apanhar objetos', 'Soltar-se de um agarrão da vítima', 'Evitar ondas', 'Treinar apneia'], correctAnswer: 1, explanation: 'A vítima tende a largar para subir à superfície.' },
      { id: 'q4-5', question: 'Na extração de uma vítima consciente na areia, deve priorizar:', options: ['Arrastar pelos pés', 'Apoio lateral/Cadeirinha', 'Puxar pelo cabelo', 'Esperar pelo INEM'], correctAnswer: 1, explanation: 'O conforto e segurança no transporte.' },
      { id: 'q4-6', question: 'A abordagem por trás é preferível para:', options: ['Surpreender a vítima', 'Evitar que a vítima agarre o NS', 'Nadar mais rápido', 'Não serve para nada'], correctAnswer: 1, explanation: 'Minimiza o risco de agarrão direto.' },
      { id: 'q4-7', question: 'Prioridade no salvamento de múltiplas vítimas:', options: ['O que grita mais', 'O que está mais silencioso/submerso', 'O mais pesado', 'O mais novo'], correctAnswer: 1, explanation: 'As vítimas silenciosas estão em maior risco.' },
      { id: 'q4-8', question: 'No reboque com torpedo, onde deve estar a vítima?', options: ['Em cima do torpedo', 'Agarrada à corda', 'Longe do NS', 'Debaixo do NS'], correctAnswer: 0, explanation: 'O torpedo oferece a flutuabilidade necessária.' },
      { id: 'q4-9', question: 'Quando usar a técnica de libertação "Empurrar e Afastar"?', options: ['Sempre', 'Quando a vítima tenta agarrar o peito/ombros', 'Para brincar', 'Nunca'], correctAnswer: 1, explanation: 'Técnica de defesa pessoal aquática.' },
      { id: 'q4-10', question: 'A extração em plano inclinado (areia) deve ser:', options: ['Cabeça para baixo', 'Cabeça para cima', 'De lado', 'Rápida demais'], correctAnswer: 1, explanation: 'Evita a aspiração de fluidos.' }
    ]
  },
  {
    id: 'cap-5',
    title: 'Capítulo 5: Primeiros Socorros - SBV',
    description: 'Suporte Básico de Vida adaptado ao afogamento (ERC/ISN).',
    questions: [
      { id: 'q5-1', question: 'No afogamento, o algoritmo de SBV começa com:', options: ['30 compressões', '5 insuflações de resgate', 'Pedir DAE', 'Verificar pulso'], correctAnswer: 1, explanation: 'A causa é hipóxica, logo a ventilação é prioritária.' },
      { id: 'q5-2', question: 'Profundidade das compressões num adulto:', options: ['2-3 cm', '5-6 cm', '8-10 cm', 'O máximo possível'], correctAnswer: 1, explanation: 'Garante compressão eficaz do miocárdio.' },
      { id: 'q5-3', question: 'Frequência das compressões:', options: ['60/min', '100-120/min', '150/min', '80/min'], correctAnswer: 1, explanation: 'Ritmo recomendado pelas guidelines do ERC.' },
      { id: 'q5-4', question: 'Rácio compressões/ventilações (Adulto):', options: ['15:2', '30:2', '5:1', '10:2'], correctAnswer: 1, explanation: 'Padrão para adultos em paragem.' },
      { id: 'q5-5', question: 'Se a vítima respira mas está inconsciente:', options: ['Massagem cardíaca', 'Colocar em PLS', 'Dar água', 'Abandonar'], correctAnswer: 1, explanation: 'A PLS previne a queda da língua e aspiração.' },
      { id: 'q5-6', question: 'Quando ligar para o 112 no afogamento solitário?', options: ['Logo no início', 'Após 1 minuto de SBV (5 insuflações + ciclo)', 'No fim de 10 minutos', 'Nunca'], correctAnswer: 1, explanation: 'Prioriza-se a oxigenação inicial.' },
      { id: 'q5-7', question: 'Sinal de obstrução grave da via aérea:', options: ['Fala mas tosse', 'Incapacidade de falar e tosse ineficaz', 'Choro alto', 'Riso'], correctAnswer: 1, explanation: 'Requer manobra de Heimlich imediata.' },
      { id: 'q5-8', question: 'Como verificar a respiração (VOS)?', options: ['Durante 1 minuto', 'Máximo de 10 segundos', 'Apenas olhando', 'Pondo a mão na boca'], correctAnswer: 1, explanation: 'Ver, Ouvir e Sentir até 10 segundos.' },
      { id: 'q5-9', question: 'O DAE pode ser usado em vítimas molhadas?', options: ['Sim, sem problemas', 'Não, deve secar o tórax da vítima', 'Apenas em terra seca', 'Só médicos podem usar'], correctAnswer: 1, explanation: 'Deve-se secar o peito para garantir a adesão e segurança.' },
      { id: 'q5-10', question: 'Quando parar as manobras de SBV?', options: ['Quando estiver cansado', 'Quando chegar ajuda profissional ou sinais de vida', 'Após 5 minutos', 'Se a família pedir'], correctAnswer: 1, explanation: 'Manter até recuperação ou entrega a equipa médica.' }
    ]
  },
  {
    id: 'cap-6',
    title: 'Capítulo 6: Traumatologia e Lesões Específicas',
    description: 'Trauma cervical, peixe-aranha e insolação.',
    questions: [
      { id: 'q6-1', question: 'Suspeita de lesão cervical na água implica:', options: ['Retirar logo', 'Estabilização manual do eixo axial na água', 'Massagem nas costas', 'Pedir à vítima para nadar'], correctAnswer: 1, explanation: 'Evita lesões medulares permanentes.' },
      { id: 'q6-2', question: 'Tratamento imediato para picada de peixe-aranha:', options: ['Gelo', 'Água quente (tolerável) por 30-90 min', 'Vinagre', 'Lixívia'], correctAnswer: 1, explanation: 'A toxina é termolábil e degrada-se com o calor.' },
      { id: 'q6-3', question: 'Picada de caravela-portuguesa requer:', options: ['Água doce', 'Água do mar e vinagre (se disponível)', 'Esfregar com areia', 'Álcool'], correctAnswer: 1, explanation: 'Água doce dispara os nematocistos.' },
      { id: 'q6-4', question: 'Sinal de choque hipovolémico:', options: ['Pele quente e vermelha', 'Pele fria, pálida e pulso rápido', 'Fome extrema', 'Euforia'], correctAnswer: 1, explanation: 'Indicador de perda de volume sanguíneo.' },
      { id: 'q6-5', question: 'Tratamento de fratura exposta:', options: ['Empurrar osso para dentro', 'Cobrir com gaze estéril e imobilizar', 'Lavar com água do mar', 'Não fazer nada'], correctAnswer: 1, explanation: 'Proteger e estabilizar como se encontra.' },
      { id: 'q6-6', question: 'A insolação caracteriza-se por:', options: ['Tremores de frio', 'Temperatura corporal > 40°C e alteração consciência', 'Muita sede apenas', 'Pele bronzeada'], correctAnswer: 1, explanation: 'É uma emergência médica vital.' },
      { id: 'q6-7', question: 'Hemorragia externa grave deve ser controlada com:', options: ['Garrote logo', 'Compressão direta sobre a ferida', 'Gelo', 'Pôr a zona para baixo'], correctAnswer: 1, explanation: 'Compressão direta é a primeira linha.' },
      { id: 'q6-8', question: 'Como imobilizar um braço fraturado?', options: ['Com gesso na hora', 'Com talas e ligadura (triangular)', 'Puxando o braço', 'Deixar pendurado'], correctAnswer: 1, explanation: 'Estabilizar as articulações acima e abaixo.' },
      { id: 'q6-9', question: 'Sinal de traumatismo craniano grave:', options: ['Vómitos em jato e pupilas desiguais', 'Sede', 'Fome', 'Sono ligeiro'], correctAnswer: 0, explanation: 'Indicadores de pressão intracraniana.' },
      { id: 'q6-10', question: 'O que não fazer numa queimadura de 2º grau?', options: ['Arrefecer com água', 'Rebentar as bolhas', 'Proteger com gaze', 'Retirar anéis'], correctAnswer: 1, explanation: 'Rebentar bolhas aumenta risco de infeção.' }
    ]
  },
  {
    id: 'cap-7',
    title: 'Capítulo 7: Oxigenoterapia',
    description: 'Gestão de O2 medicinal e equipamentos de via aérea.',
    questions: [
      { id: 'q7-1', question: 'O débito de oxigénio em paragem cardíaca deve ser:', options: ['2 L/min', '6 L/min', '15 L/min (Máximo)', '10 L/min'], correctAnswer: 2, explanation: 'Maximizar a FiO2.' },
      { id: 'q7-2', question: 'A cor do ombro da garrafa de Oxigénio Medicinal é:', options: ['Azul', 'Branco', 'Preto', 'Verde'], correctAnswer: 1, explanation: 'Codificação padrão para oxigénio.' },
      { id: 'q7-3', question: 'A cânula de Guedel serve para:', options: ['Alimentação', 'Impedir a queda da língua em vítimas inconscientes', 'Drenar água', 'Insuflar pulmões'], correctAnswer: 1, explanation: 'Mantém a via aérea permeável.' },
      { id: 'q7-4', question: 'Precaução com garrafas de O2:', options: ['Pode usar óleo nas válvulas', 'Nunca usar gorduras/óleos nas válvulas', 'Pode fumar perto', 'Pode estar ao sol direto'], correctAnswer: 1, explanation: 'O O2 é comburente e reage violentamente com gorduras.' },
      { id: 'q7-5', question: 'A máscara de reservatório permite FiO2 de até:', options: ['21%', '50%', '90-100%', '10%'], correctAnswer: 2, explanation: 'É o método de alta concentração.' },
      { id: 'q7-6', question: 'O fluxómetro serve para:', options: ['Ver a pressão da garrafa', 'Controlar o débito de saída em L/min', 'Ligar ao doente', 'Pesar a garrafa'], correctAnswer: 1, explanation: 'Ajusta a quantidade de gás administrada.' },
      { id: 'q7-7', question: 'Quando usar a cânula de Guedel?', options: ['Vítimas conscientes', 'Vítimas inconscientes sem reflexo de vómito', 'Sempre', 'Apenas crianças'], correctAnswer: 1, explanation: 'Evita náuseas e aspiração.' },
      { id: 'q7-8', question: 'A válvula redutora de pressão:', options: ['Aumenta a pressão', 'Reduz a pressão da garrafa para uso seguro', 'Arrefece o gás', 'Mede o oxigénio no sangue'], correctAnswer: 1, explanation: 'Torna o gás utilizável.' },
      { id: 'q7-9', question: 'Sinal de garrafa vazia no manómetro:', options: ['Zona verde', 'Zona vermelha (0 bar)', 'Zona amarela', 'Não tem manómetro'], correctAnswer: 1, explanation: 'Indica ausência de pressão.' },
      { id: 'q7-10', question: 'A ventilação com balão auto-insuflável requer:', options: ['Estar sozinho', 'O2 ligado e selagem perfeita da máscara', 'Apenas a máscara', 'Puxar os pés da vítima'], correctAnswer: 1, explanation: 'Garante a eficácia da reanimação.' }
    ]
  },
  {
    id: 'cap-8',
    title: 'Capítulo 8: Oceanografia e Meteorologia',
    description: 'Correntes, marés, ventos e dinâmica das praias.',
    questions: [
      { id: 'q8-1', question: 'O que é um agueiro (Rip Current)?', options: ['Uma onda gigante', 'Uma corrente de retorno para o largo', 'Um tipo de peixe', 'Vento forte'], correctAnswer: 1, explanation: 'Corrente perigosa que puxa para fora da costa.' },
      { id: 'q8-2', question: 'Como sair de um agueiro?', options: ['Nadar contra a corrente', 'Nadar paralelamente à costa', 'Ficar parado', 'Mergulhar'], correctAnswer: 1, explanation: 'Permite sair do canal de sucção.' },
      { id: 'q8-3', question: 'A preia-mar é o ponto de:', options: ['Maré mínima', 'Maré máxima', 'Vento nulo', 'Nascer do sol'], correctAnswer: 1, explanation: 'O nível mais alto da maré.' },
      { id: 'q8-4', question: 'Vento "Nortada" sopra de que direção?', options: ['Sul', 'Este', 'Norte', 'Oeste'], correctAnswer: 2, explanation: 'Vento típico de Verão em Portugal.' },
      { id: 'q8-5', question: 'Marés de Vivas ocorrem em que fase da lua?', options: ['Quarto Crescente', 'Lua Cheia e Lua Nova', 'Apenas no Inverno', 'Qualquer fase'], correctAnswer: 1, explanation: 'Onde a amplitude da maré é maior.' },
      { id: 'q8-6', question: 'Um agueiro identifica-se por:', options: ['Ondas grandes a rebentar', 'Zona de água mais calma e escura entre rebentação', 'Muita espuma', 'Presença de barcos'], correctAnswer: 1, explanation: 'A ausência de rebentação indica o canal.' },
      { id: 'q8-7', question: 'O que é o "Swell"?', options: ['Ondulação gerada por vento local', 'Ondulação gerada por ventos distantes (vaga)', 'Um tipo de vento', 'Maré baixa'], correctAnswer: 1, explanation: 'Ondas que viajam longas distâncias.' },
      { id: 'q8-8', question: 'O vento de Levante é típico de onde?', options: ['Norte de Portugal', 'Algarve', 'Açores', 'Lisboa'], correctAnswer: 1, explanation: 'Vento de leste que sopra no Algarve.' },
      { id: 'q8-9', question: 'O que causa as marés?', options: ['Ventos', 'Atração gravítica da Lua e Sol', 'Terramotos', 'Peixes'], correctAnswer: 1, explanation: 'Forças astronómicas primárias.' },
      { id: 'q8-10', question: 'A amplitude da maré é:', options: ['A altura da onda', 'A diferença entre preia-mar e baixa-mar', 'O tempo entre marés', 'A velocidade da água'], correctAnswer: 1, explanation: 'Mede a variação do nível do mar.' }
    ]
  }
];

export const TIPS: Tip[] = [
  { id: 't1', category: 'Segurança', text: 'Mantenha o rádio sempre carregado e no Canal 16 durante o turno.' },
  { id: 't2', category: 'Prevenção', text: 'Vigie prioritariamente as crianças e idosos perto de agueiros.' },
  { id: 't3', category: 'Equipamento', text: 'Verifique a pressão da garrafa de O2 no início de cada turno.' },
  { id: 't4', category: 'Prevenção', text: 'Esteja atento a mudanças repentinas no padrão de rebentação.' },
  { id: 't5', category: 'Saúde', text: 'Mantenha-se hidratado e use proteção solar mesmo em dias nublados.' },
  { id: 't6', category: 'Segurança', text: 'Recertificação 2026: Verifique o calendário EEAT-REC no site do ISN para garantir a validade do seu cartão.' }
];
