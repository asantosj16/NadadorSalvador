/**
 * Serviço de limpeza automática de Editais e Cursos
 * Verifica e remove menalmente itens com inscrições encerradas
 */

import { TrainingItem } from '../types';

const MONTH_MAP: Record<string, number> = {
  'janeiro': 1, 'fevereiro': 2, 'março': 3, 'abril': 4,
  'maio': 5, 'junho': 6, 'julho': 7, 'agosto': 8,
  'setembro': 9, 'outubro': 10, 'novembro': 11, 'dezembro': 12
};

const lastDayOfMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

/**
 * Parse data de término do edital/curso
 */
function parseEndDate(dates: string): Date | null {
  const lower = dates.toLowerCase();
  const yearMatch = lower.match(/(20\d{2})/);
  const year = yearMatch ? Number(yearMatch[1]) : new Date().getFullYear();

  // Formato: "15 de Março 2026"
  const singleDay = lower.match(/(\d{1,2})\s+de\s+(\w+)/);
  if (singleDay) {
    const day = Number(singleDay[1]);
    const month = MONTH_MAP[singleDay[2]];
    if (month) return new Date(year, month - 1, day);
  }

  // Formato: "Fevereiro a Maio 2026"
  const rangeMonths = lower.match(/(\w+)\s+a\s+(\w+)\s+(20\d{2})?/);
  if (rangeMonths) {
    const startMonth = MONTH_MAP[rangeMonths[1]];
    const endMonth = MONTH_MAP[rangeMonths[2]];
    const yr = rangeMonths[3] ? Number(rangeMonths[3]) : year;
    if (startMonth && endMonth) {
      return new Date(yr, endMonth - 1, lastDayOfMonth(yr, endMonth));
    }
  }

  // Fallback: procura por qualquer mês
  for (const [name, num] of Object.entries(MONTH_MAP)) {
    if (lower.includes(name)) {
      return new Date(year, num - 1, lastDayOfMonth(year, num));
    }
  }

  return null;
}

/**
 * Verifica se um item tem inscrições encerradas
 */
export function isExpired(item: TrainingItem): boolean {
  const endDate = parseEndDate(item.dates || '');
  if (!endDate) return false;
  
  const now = new Date();
  return endDate < now;
}

/**
 * Filtra e remove itens com inscrições encerradas
 */
export function filterActiveItems(items: TrainingItem[]): TrainingItem[] {
  return items.filter(item => !isExpired(item));
}

/**
 * Identifica itens expirados para limpeza mensal
 */
export function getExpiredItems(items: TrainingItem[]): TrainingItem[] {
  return items.filter(item => isExpired(item));
}

/**
 * Obtém histórico de limpeza do localStorage
 */
function getCleanupHistory(): {
  lastCleanup: string;
  itemsRemoved: number;
} {
  const stored = localStorage.getItem('trainingCleanupHistory');
  if (!stored) {
    return {
      lastCleanup: new Date().toISOString(),
      itemsRemoved: 0
    };
  }
  return JSON.parse(stored);
}

/**
 * Registra a última limpeza realizada
 */
function recordCleanup(itemsRemoved: number): void {
  const history = {
    lastCleanup: new Date().toISOString(),
    itemsRemoved
  };
  localStorage.setItem('trainingCleanupHistory', JSON.stringify(history));
}

/**
 * Verifica se é necessário fazer limpeza mensal
 */
function shouldPerformMonthlyCleanup(): boolean {
  const history = getCleanupHistory();
  const lastCleanup = new Date(history.lastCleanup);
  const now = new Date();
  
  // Fazer limpeza se passou 1 mês desde a última
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  return lastCleanup <= oneMonthAgo;
}

/**
 * Executa limpeza automática mensal se necessário
 * Retorna o número de itens removidos
 */
export function executeAutomaticCleanup(items: TrainingItem[]): {
  executed: boolean;
  itemsRemoved: number;
  activeItems: TrainingItem[];
} {
  const shouldClean = shouldPerformMonthlyCleanup();
  
  if (!shouldClean) {
    return {
      executed: false,
      itemsRemoved: 0,
      activeItems: items
    };
  }

  const expiredItems = getExpiredItems(items);
  const activeItems = filterActiveItems(items);
  
  recordCleanup(expiredItems.length);

  // Log para debugging
  if (expiredItems.length > 0) {
    console.log(
      `[Training Cleanup] Limpeza mensal executada: ${expiredItems.length} itens removidos`,
      expiredItems.map(item => `${item.location} (${item.dates})`)
    );
  }

  return {
    executed: true,
    itemsRemoved: expiredItems.length,
    activeItems
  };
}

/**
 * Obtém informações sobre a última limpeza
 */
export function getLastCleanupInfo(): {
  lastCleanup: Date;
  itemsRemoved: number;
  nextCleanup: Date;
} {
  const history = getCleanupHistory();
  const lastCleanup = new Date(history.lastCleanup);
  const nextCleanup = new Date(lastCleanup.getFullYear(), lastCleanup.getMonth() + 1, lastCleanup.getDate());

  return {
    lastCleanup,
    itemsRemoved: history.itemsRemoved,
    nextCleanup
  };
}
