import { TrainingItem } from '../types';

/**
 * Dados de referência de formações de Nadador Salvador em Portugal
 * Atualizado: Janeiro 2026
 * 
 * Principais Entidades Formadoras:
 * - ISN (Instituto de Socorros a Náufragos) - Entidade oficial principal
 * - ANSA (Associação Nacional de Salvamento Aquático)
 * - ASNASA (Associação Nacional de Nadadores-Salvadores)
 * - Cruz Vermelha Portuguesa
 * - Entidades Privadas Certificadas
 * - Câmaras Municipais
 */

export const PORTUGAL_TRAININGS: TrainingItem[] = [
  // ==================== ISN - CURSOS ====================
  {
    location: "Lisboa - Piscina Municipal de Oeiras",
    entity: "ISN",
    type: "CURSO",
    dates: "Fevereiro a Maio 2026",
    status: "Inscrições Abertas",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Porto - Complexo Desportivo Dragão Caixa",
    entity: "ISN",
    type: "CURSO",
    dates: "Março a Junho 2026",
    status: "Inscrições Abertas",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Faro - Piscina Municipal de Albufeira",
    entity: "ISN",
    type: "CURSO",
    dates: "Abril a Julho 2026",
    status: "Inscrições Abertas",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Coimbra - Piscina Municipal",
    entity: "ISN",
    type: "CURSO",
    dates: "Março a Junho 2026",
    status: "Lista de Espera",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Setúbal - Complexo Desportivo Municipal",
    entity: "ISN",
    type: "CURSO",
    dates: "Maio a Agosto 2026",
    status: "Inscrições Abertas",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Braga - Piscina Municipal de Braga",
    entity: "ISN",
    type: "CURSO",
    dates: "Abril a Julho 2026",
    status: "Brevemente",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Aveiro - Piscina Municipal da Gafanha",
    entity: "ISN",
    type: "CURSO",
    dates: "Junho a Setembro 2026",
    status: "Inscrições Abertas",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Viseu - Complexo Desportivo",
    entity: "ISN",
    type: "CURSO",
    dates: "Maio a Agosto 2026",
    status: "Brevemente",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Évora - Piscina Municipal",
    entity: "ISN",
    type: "CURSO",
    dates: "Julho a Outubro 2026",
    status: "Brevemente",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Castelo Branco - Complexo Desportivo",
    entity: "ISN",
    type: "CURSO",
    dates: "Agosto a Novembro 2026",
    status: "Brevemente",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },

  // ==================== ISN - EXAMES REVALIDAÇÃO ====================
  {
    location: "Lisboa - Praia de Carcavelos",
    entity: "ISN",
    type: "EXAME REVALIDAÇÃO",
    dates: "15 de Março 2026",
    status: "Inscrições Abertas",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Porto - Praia de Matosinhos",
    entity: "ISN",
    type: "EXAME REVALIDAÇÃO",
    dates: "22 de Março 2026",
    status: "Inscrições Abertas",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Algarve - Praia da Rocha",
    entity: "ISN",
    type: "EXAME REVALIDAÇÃO",
    dates: "5 de Abril 2026",
    status: "Inscrições Abertas",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Figueira da Foz - Praia de Buarcos",
    entity: "ISN",
    type: "EXAME REVALIDAÇÃO",
    dates: "12 de Abril 2026",
    status: "Inscrições Abertas",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Viana do Castelo - Praia do Cabedelo",
    entity: "ISN",
    type: "EXAME REVALIDAÇÃO",
    dates: "19 de Abril 2026",
    status: "Brevemente",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Cascais - Praia de Carcavelos",
    entity: "ISN",
    type: "EXAME REVALIDAÇÃO",
    dates: "26 de Abril 2026",
    status: "Brevemente",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Peniche - Praia de Supertubos",
    entity: "ISN",
    type: "EXAME REVALIDAÇÃO",
    dates: "3 de Maio 2026",
    status: "Brevemente",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Nazaré - Praia da Nazaré",
    entity: "ISN",
    type: "EXAME REVALIDAÇÃO",
    dates: "10 de Maio 2026",
    status: "Brevemente",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },

  // ==================== ANSA ====================
  {
    location: "Cascais - Praia do Guincho",
    entity: "ANSA",
    type: "CURSO",
    dates: "Maio a Agosto 2026",
    status: "Inscrições Abertas",
    link: "https://ansa.pt"
  },
  {
    location: "Nazaré - Praia da Nazaré",
    entity: "ANSA",
    type: "CURSO",
    dates: "Junho a Setembro 2026",
    status: "Inscrições Abertas",
    link: "https://ansa.pt"
  },
  {
    location: "Peniche - Praia de Supertubos",
    entity: "ANSA",
    type: "RECERTIFICAÇÃO",
    dates: "10 de Maio 2026",
    status: "Inscrições Abertas",
    link: "https://ansa.pt"
  },
  {
    location: "Lagos - Praia de Meia Praia",
    entity: "ANSA",
    type: "CURSO",
    dates: "Julho a Outubro 2026",
    status: "Brevemente",
    link: "https://ansa.pt"
  },
  {
    location: "Vilamoura - Praia de Vilamoura",
    entity: "ANSA",
    type: "EXAME REVALIDAÇÃO",
    dates: "24 de Maio 2026",
    status: "Brevemente",
    link: "https://ansa.pt"
  },

  // ==================== ASNASA ====================
  {
    location: "Espinho - Praia da Baía",
    entity: "ASNASA",
    type: "CURSO",
    dates: "Abril a Julho 2026",
    status: "Inscrições Abertas",
    link: "https://asnasa.pt"
  },
  {
    location: "Póvoa de Varzim - Praia da Póvoa",
    entity: "ASNASA",
    type: "CURSO",
    dates: "Maio a Agosto 2026",
    status: "Lista de Espera",
    link: "https://asnasa.pt"
  },
  {
    location: "Porto - Piscina Olímpica",
    entity: "ASNASA",
    type: "RECERTIFICAÇÃO",
    dates: "25 de Abril 2026",
    status: "Inscrições Abertas",
    link: "https://asnasa.pt"
  },
  {
    location: "Maia - Piscina Municipal",
    entity: "ASNASA",
    type: "CURSO",
    dates: "Junho a Setembro 2026",
    status: "Brevemente",
    link: "https://asnasa.pt"
  },
  {
    location: "Santo Tirso - Complexo Desportivo",
    entity: "ASNASA",
    type: "EXAME REVALIDAÇÃO",
    dates: "31 de Maio 2026",
    status: "Brevemente",
    link: "https://asnasa.pt"
  },

  // ==================== ISN - RECERTIFICAÇÕES ADICIONAIS ====================
  {
    location: "Albufeira - 202/26",
    entity: "ISN",
    type: "RECERTIFICAÇÃO",
    dates: "04 de Fevereiro 2026 (Inscrições: 5 a 25 Jan)",
    status: "Inscrições Abertas",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Santa Maria da Feira - 203/26",
    entity: "ISN",
    type: "RECERTIFICAÇÃO",
    dates: "11 de Fevereiro 2026 (Inscrições: 12 Jan a 1 Fev)",
    status: "Inscrições Abertas",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Viseu - 204/26",
    entity: "ISN",
    type: "RECERTIFICAÇÃO",
    dates: "18 de Fevereiro 2026 (Inscrições: 20 a 10 Fev)",
    status: "Brevemente",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Guarda - 205/26",
    entity: "ISN",
    type: "RECERTIFICAÇÃO",
    dates: "25 de Fevereiro 2026 (Inscrições: 27 Jan a 15 Fev)",
    status: "Brevemente",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Leiria - 206/26",
    entity: "ISN",
    type: "RECERTIFICAÇÃO",
    dates: "4 de Março 2026 (Inscrições: 3 a 22 Fev)",
    status: "Brevemente",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },
  {
    location: "Covilhã - 207/26",
    entity: "ISN",
    type: "RECERTIFICAÇÃO",
    dates: "11 de Março 2026 (Inscrições: 10 a 1 Mar)",
    status: "Brevemente",
    link: "https://www.amn.pt/ISN/Paginas/Curso.aspx"
  },

  // ==================== CRUZ VERMELHA ====================
  {
    location: "Lisboa - Delegação CVP",
    entity: "Cruz Vermelha Portuguesa",
    type: "CURSO",
    dates: "Março a Junho 2026",
    status: "Inscrições Abertas",
    link: "https://www.cruzvermelha.pt"
  },
  {
    location: "Leiria - Delegação CVP",
    entity: "Cruz Vermelha Portuguesa",
    type: "RECERTIFICAÇÃO",
    dates: "8 de Junho 2026",
    status: "Brevemente",
    link: "https://www.cruzvermelha.pt"
  },
  {
    location: "Porto - Delegação CVP",
    entity: "Cruz Vermelha Portuguesa",
    type: "CURSO",
    dates: "Abril a Julho 2026",
    status: "Brevemente",
    link: "https://www.cruzvermelha.pt"
  },
  {
    location: "Covilhã - Delegação CVP",
    entity: "Cruz Vermelha Portuguesa",
    type: "EXAME REVALIDAÇÃO",
    dates: "2 de Maio 2026",
    status: "Brevemente",
    link: "https://www.cruzvermelha.pt"
  },

  // ==================== ENTIDADES PRIVADAS ====================
  {
    location: "Costa da Caparica - Surf School",
    entity: "Academia de Surf e Salvamento",
    type: "CURSO",
    dates: "Junho a Setembro 2026",
    status: "Inscrições Abertas",
    link: "https://www.surfschool.pt"
  },
  {
    location: "Ericeira - World Surf Reserve",
    entity: "Ericeira Lifeguard Academy",
    type: "CURSO",
    dates: "Maio a Agosto 2026",
    status: "Inscrições Abertas",
    link: "https://www.ericeira-academy.pt"
  },
  {
    location: "Funchal - Praia Formosa",
    entity: "Madeira Water Safety",
    type: "CURSO",
    dates: "Abril a Julho 2026",
    status: "Inscrições Abertas",
    link: "https://www.madeirawatersafety.pt"
  },
  {
    location: "Ponta Delgada - Açores",
    entity: "Açores Marine Safety",
    type: "CURSO",
    dates: "Julho a Outubro 2026",
    status: "Brevemente",
    link: "https://www.azoresmarinesafety.pt"
  },
  {
    location: "Tavira - Lifeguard Pro",
    entity: "Lifeguard Professional Academy",
    type: "CURSO",
    dates: "Maio a Agosto 2026",
    status: "Inscrições Abertas",
    link: "https://www.lifeguardpro.pt"
  },
  {
    location: "Sesimbra - Sesimbra Safe Waters",
    entity: "Sesimbra Water Safety",
    type: "EXAME REVALIDAÇÃO",
    dates: "15 de Junho 2026",
    status: "Brevemente",
    link: "https://www.sesimbrasafewaters.pt"
  },

  // ==================== CÂMARAS MUNICIPAIS ====================
  {
    location: "Oeiras - Praias Municipais",
    entity: "Câmara Municipal de Oeiras",
    type: "CURSO",
    dates: "Maio a Julho 2026",
    status: "Inscrições Abertas",
    link: "https://www.cm-oeiras.pt"
  },
  {
    location: "Matosinhos - Praias Municipais",
    entity: "Câmara Municipal de Matosinhos",
    type: "CURSO",
    dates: "Abril a Junho 2026",
    status: "Lista de Espera",
    link: "https://www.cm-matosinhos.pt"
  },
  {
    location: "Portimão - Praias Municipais",
    entity: "Câmara Municipal de Portimão",
    type: "RECERTIFICAÇÃO",
    dates: "20 de Maio 2026",
    status: "Inscrições Abertas",
    link: "https://www.cm-portimao.pt"
  },
  {
    location: "Sines - Praias Municipais",
    entity: "Câmara Municipal de Sines",
    type: "CURSO",
    dates: "Junho a Agosto 2026",
    status: "Brevemente",
    link: "https://www.cm-sines.pt"
  },
  {
    location: "Cascais - Praias Municipais",
    entity: "Câmara Municipal de Cascais",
    type: "EXAME REVALIDAÇÃO",
    dates: "18 de Maio 2026",
    status: "Brevemente",
    link: "https://www.cm-cascais.pt"
  },
  {
    location: "Almada - Praias Municipais",
    entity: "Câmara Municipal de Almada",
    type: "CURSO",
    dates: "Julho a Outubro 2026",
    status: "Brevemente",
    link: "https://www.cm-almada.pt"
  },
  {
    location: "Vila Nova de Gaia - Praias Municipais",
    entity: "Câmara Municipal de Vila Nova de Gaia",
    type: "RECERTIFICAÇÃO",
    dates: "7 de Junho 2026",
    status: "Brevemente",
    link: "https://www.cm-vnova-gaia.pt"
  },
];

/**
 * Informações úteis sobre requisitos e custos (2026)
 */
export const TRAINING_INFO = {
  requirements: {
    age: "Mínimo 18 anos",
    swimming: "Domínio de 4 estilos de natação",
    health: "Atestado médico de aptidão física",
    firstAid: "Curso de Primeiros Socorros (recomendado)"
  },
  costs: {
    curso_isn: "€400 - €600",
    exame_revalidacao: "€80 - €120",
    recertificacao: "€50 - €100"
  },
  duration: {
    curso: "3-4 meses (120-150 horas)",
    exame: "1 dia (prova teórica e prática)",
    recertificacao: "1-2 dias"
  },
  validity: {
    cartao: "3 anos (renovação obrigatória)"
  }
};
