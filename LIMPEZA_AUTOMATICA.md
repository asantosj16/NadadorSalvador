# Sistema de Limpeza Automática de Editais e Cursos

## Visão Geral

O Nadador Salvador implementa um sistema automático de limpeza mensal que remove editais e cursos com inscrições encerradas. Este sistema garante que a lista de oportunidades de formação se mantém sempre atualizada e relevante.

## Como Funciona

### 1. **Detecção de Itens Expirados**
- O sistema verifica automaticamente a data de término de cada edital/curso
- Compara com a data atual
- Marca itens com datas passadas como "expirados"

### 2. **Limpeza Mensal Automática**
- Executa uma verificação mensal (ao carregar a página)
- Remove todos os itens expirados
- Registra a operação no localStorage do navegador

### 3. **Filtragem em Tempo Real**
O componente `TrainingLocations` filtra automaticamente itens expirados:
```typescript
const availableItems = items.filter((item) => {
  const end = parseEndDate(item.dates || '');
  return !end || end >= now;
});
```

## Estrutura Técnica

### Serviço de Limpeza (`services/trainingCleanup.ts`)

#### Funções Principais:

##### `isExpired(item: TrainingItem): boolean`
Verifica se um item tem inscrições encerradas
```typescript
if (endDate < now) return true;
```

##### `filterActiveItems(items: TrainingItem[]): TrainingItem[]`
Remove todos os itens expirados da lista
```typescript
return items.filter(item => !isExpired(item));
```

##### `executeAutomaticCleanup(items: TrainingItem[])`
Executa a limpeza mensal automática
- Verifica se passou 1 mês desde a última limpeza
- Remove itens expirados
- Registra a operação

##### `getLastCleanupInfo()`
Retorna informações sobre a última limpeza:
- Data da última limpeza
- Número de itens removidos
- Data da próxima limpeza prevista

### Componente de Interface (`components/TrainingLocations.tsx`)

O componente exibe:
1. **Notificação de Limpeza** - Aparece quando itens são removidos
   ```
   ✅ Limpeza Mensal Executada
   X edital(is) com inscrições encerradas foi(foram) removido(s) automaticamente
   ```

2. **Informação sobre Sistema** - Seção "🧹 Limpeza Automática"
   - Explica ao utilizador que o sistema é automático
   - Frequência: mensal

## Armazenamento de Dados

O sistema usa `localStorage` para rastrear:

```typescript
{
  "trainingCleanupHistory": {
    "lastCleanup": "2026-01-25T15:30:00.000Z",
    "itemsRemoved": 5
  }
}
```

## Fluxo de Datas

### Formato de Datas Suportadas:

1. **Dia específico**: `15 de Março 2026`
2. **Intervalo de meses**: `Fevereiro a Maio 2026`
3. **Apenas mês**: `Janeiro 2026`

### Parsing de Datas:

```typescript
function parseEndDate(dates: string): Date | null {
  // Extrai a data de término do formato texto
  // Retorna Date ou null
}
```

## Comportamento na Interface

### Quando um item expira:

1. ✅ **Automaticamente** removido da lista
2. ✅ **Notificação** exibida ao utilizador
3. ✅ **Estatísticas** atualizadas
4. ✅ **localStorage** registra a operação

### Exemplo de Fluxo:

```
1. Utilizador abre a app (25 de Janeiro 2026)
   ↓
2. Sistema verifica última limpeza (24 de Dezembro 2025)
   ↓
3. Passou mais de 1 mês? SIM
   ↓
4. Filtra itens expirados (ex: "28 de Janeiro 2026")
   ↓
5. Remove 5 itens expirados
   ↓
6. Exibe notificação: "✅ Limpeza Mensal Executada - 5 itens removidos"
   ↓
7. Atualiza localStorage com data/quantidade
```

## Manutenção Manual

Se precisar forçar uma limpeza manual no console do navegador:

```javascript
// Limpar histórico de limpeza
localStorage.removeItem('trainingCleanupHistory');

// Verificar histórico atual
JSON.parse(localStorage.getItem('trainingCleanupHistory'));
```

## Benefícios

✅ **Automatizado** - Não requer intervenção manual  
✅ **Eficiente** - Usa parse inteligente de datas  
✅ **Rastreável** - Regista todas as operações  
✅ **Transparente** - Notifica o utilizador  
✅ **Confiável** - Funciona offline (localStorage)

## Configurações

### Frequência de Limpeza
Atualmente: **1 mês**

Para alterar, edite `services/trainingCleanup.ts`:
```typescript
const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
// Altere -1 para -2 (bimestral), -3 (trimestral), etc.
```

### Formatos de Data
Adicionar novos formatos em `MONTH_MAP` e `parseEndDate()`:
```typescript
const MONTH_MAP: Record<string, number> = {
  'janeiro': 1,
  'fevereiro': 2,
  // ... adicione mais conforme necessário
};
```

## Troubleshooting

### Problema: Itens antigos ainda aparecem
**Solução**: Limpar localStorage
```javascript
localStorage.clear();
```

### Problema: Notificação não aparece
**Verificar**:
1. Se `cleanupInfo.executed` está true
2. Se `cleanupInfo.itemsRemoved > 0`
3. Verificar console para logs

### Problema: Data não é reconhecida
**Solução**: Usar formatos suportados:
- ❌ `2026-01-25`
- ✅ `25 de Janeiro 2026`
- ✅ `Janeiro a Março 2026`

## Futuras Melhorias

- [ ] Interface de visualização de histórico de limpeza
- [ ] Exportar relatório de itens removidos
- [ ] Notificações antes de expiração (30 dias antes)
- [ ] Sincronização com servidor para limpeza centralizada
- [ ] Arquivo de histórico completo de limpezas
