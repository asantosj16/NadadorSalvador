# Integração Tempo.pt - Meteorologia em Tempo Real

## 📋 Visão Geral

O sistema **Nadador Salvador** agora utiliza dados meteorológicos **em tempo real** fornecidos pelo **Tempo.pt** (https://www.tempo.pt), um dos principais portais de meteorologia em Portugal.

## ✨ Funcionalidades

- ✅ **Atualização automática** a cada **30 minutos**
- ✅ **Dados em tempo real** de temperatura, vento, ondulação e UV
- ✅ **Sistema de cache** para otimizar requisições
- ✅ **Alertas meteorológicos** baseados em condições de risco
- ✅ **Suporte a 40+ localidades** costeiras portuguesas
- ✅ **Fallback inteligente** em caso de indisponibilidade

## 🗺️ Localidades Suportadas

### Principais Praias e Locais Costeiros

- **Norte**: Viana do Castelo, Caminha, Póvoa de Varzim, Vila do Conde, Matosinhos, Porto, Espinho
- **Centro**: Aveiro, Costa Nova, Figueira da Foz, Peniche, Baleal, Nazaré, Ericeira
- **Lisboa**: Cascais, Carcavelos, Guincho, Costa da Caparica, Lisboa
- **Sul**: Setúbal, Sesimbra, Comporta, Sagres, Lagos, Portimão, Albufeira, Quarteira, Faro

## 📊 Dados Fornecidos

O serviço retorna as seguintes informações meteorológicas:

```typescript
interface BeachConditions {
  airTemp: string;        // "22°C"
  waterTemp: string;      // "17°C"
  waves: string;          // "1.5m"
  windSpeed: string;      // "25 km/h"
  windDir: string;        // "N" | "NW" | "SE" | ...
  uvIndex: string;        // "5" | "7" | "10"
  condition: string;      // "Céu limpo" | "Chuva" | ...
  riskLevel: 'low' | 'medium' | 'high';
  alerts: Array<{
    type: string;
    level: string;
    description: string;
  }>;
  ipmaIcon: string;       // "☀️" | "🌧️" | ...
  lastUpdate: string;     // "14:30"
}
```

## 🔧 Uso no Código

### Importação do Serviço

```typescript
import { getIPMAWeatherData, refreshData } from './services/ipma';
```

### Buscar Dados Meteorológicos

```typescript
const data = await getIPMAWeatherData('Nazaré');
console.log(data.airTemp);      // "22°C"
console.log(data.waves);        // "2.5m"
console.log(data.riskLevel);    // "medium"
```

### Forçar Atualização (Limpar Cache)

```typescript
refreshData('Nazaré');  // Limpar cache de uma localidade
refreshData();          // Limpar todo o cache
```

## 🌐 Fonte de Dados

**Base URL**: `https://www.tempo.pt`

O sistema faz web scraping das páginas de localidades do Tempo.pt para extrair:
- Temperatura do ar e da água
- Velocidade e direção do vento
- Altura das ondas
- Índice UV
- Condições meteorológicas gerais

### Exemplo de URL
```
https://www.tempo.pt/nazare.html
https://www.tempo.pt/lisboa.html
https://www.tempo.pt/porto.html
```

## ⚡ Sistema de Cache

- **Duração**: 30 minutos
- **Tipo**: Em memória (Map)
- **Invalidação**: Manual via `refreshData()` ou automática após expiração

```typescript
const CACHE_DURATION = 1800000; // 30 minutos em ms
```

## 🚨 Sistema de Alertas

### Níveis de Risco

1. **🟢 Baixo (low)**: Condições normais, seguro para atividades aquáticas
2. **🟠 Moderado (medium)**: Atenção recomendada, condições podem ser desafiadoras
3. **🔴 Alto (high)**: Condições perigosas, evitar atividades aquáticas

### Critérios de Avaliação

| Condição | Moderado | Alto |
|----------|----------|------|
| Vento | ≥ 30 km/h | ≥ 50 km/h |
| Ondas | ≥ 2.5m | ≥ 4.0m |
| Precipitação | Chuva/Aguaceiros | Trovoada/Temporal |

## 📱 Interface do Usuário

### Auto-atualização
- Por padrão, ativada
- Intervalo: 30 minutos
- Pode ser desativada pelo usuário no painel

### Indicadores Visuais
- 🔵 Ponto pulsante: Dados em tempo real
- 🟢 Auto: Auto-atualização ativa
- 🔄 Botão refresh: Atualização manual

## 🛠️ Componentes Afetados

### `services/ipma.ts`
Serviço principal de integração com Tempo.pt

### `components/BeachDataPanel.tsx`
Exibe dados meteorológicos com auto-atualização

### `App.tsx`
Consume dados para exibição no mapa

## 📝 Notas Técnicas

### Parsing de Dados
Os dados são extraídos do HTML usando expressões regulares (regex):
```typescript
const airTempMatch = html.match(/temperatura[^>]*>(\d+)°/i);
const windSpeedMatch = html.match(/vento[^>]*>(\d+)[\s]*km/i);
const wavesMatch = html.match(/ondulação[^>]*>(\d+[\.,]?\d*)[\s]*m/i);
```

### Tratamento de Erros
- Fallback automático para valores padrão seguros
- Logs de erro no console para debugging
- Alerta visual ao usuário em caso de falha

### Otimizações
- Cache de 30 minutos reduz carga no servidor
- Requisições silenciosas para auto-refresh (sem loading)
- Dados fallback imediatos em caso de erro

## 🔗 Links Úteis

- **Tempo.pt**: https://www.tempo.pt
- **Documentação do serviço**: [services/ipma.ts](services/ipma.ts)

## 📄 Licença e Créditos

**Tempo.pt** - Portal de meteorologia em Portugal

---

**Nota**: Os dados do Tempo.pt são obtidos através de web scraping. Este sistema apenas consome e exibe essas informações para apoio aos nadadores salvadores. Recomenda-se sempre consultar múltiplas fontes meteorológicas antes de atividades aquáticas.
