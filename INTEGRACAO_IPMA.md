# Integração IPMA - Instituto Português do Mar e da Atmosfera

## 🌊 Sobre a Integração

O sistema **Nadador Salvador** agora utiliza dados meteorológicos **em tempo real** fornecidos pela API pública do IPMA (Instituto Português do Mar e da Atmosfera).

## 📡 Dados Disponíveis

### Informações Meteorológicas
- ✅ **Temperatura do Ar** - Mediana entre min/max diária
- ✅ **Temperatura da Água** - Dados oceanográficos costeiros
- ✅ **Altura das Ondas** - Previsão marítima diária
- ✅ **Velocidade do Vento** - Classificação por intensidade
- ✅ **Direção do Vento** - Pontos cardeais
- ✅ **Índice UV** - Nível de radiação ultravioleta
- ✅ **Condição Meteorológica** - Céu limpo, nublado, chuva, etc.
- ✅ **Avisos Meteorológicos** - Alertas amarelos, laranja e vermelhos

## 🗺️ Localidades Cobertas

O sistema cobre as principais praias e localidades costeiras de Portugal:

### Norte
- Viana do Castelo
- Póvoa de Varzim
- Matosinhos (Porto)
- Espinho

### Centro
- Aveiro
- Figueira da Foz
- Peniche
- Nazaré
- Ericeira

### Lisboa e Setúbal
- Cascais
- Costa da Caparica
- Sesimbra
- Setúbal

### Algarve
- Sagres
- Lagos
- Portimão
- Albufeira
- Faro

## 🔄 Atualização de Dados

### Frequência
- **Cache**: 30 minutos
- **Auto-refresh**: Opcional (configurável pelo usuário)
- **Atualização manual**: Botão de refresh disponível

### Fontes de Dados IPMA
1. **Previsão Meteorológica**: `/forecast/meteorology/cities/daily/{id}.json`
2. **Dados Oceanográficos**: `/forecast/oceanography/daily/hp-daily-sea.json`
3. **Índice UV**: `/forecast/meteorology/uv/uv.json`
4. **Avisos Meteorológicos**: `/warnings/warnings_www.json`

## 🎯 Nível de Risco Automático

O sistema calcula automaticamente o nível de risco baseado em:

### 🟢 Risco Baixo
- Vento < 30 km/h
- Sem precipitação significativa
- Sem avisos meteorológicos

### 🟠 Risco Moderado
- Vento 30-50 km/h
- Precipitação moderada
- Condições de mar agitado

### 🔴 Risco Alto
- Vento > 50 km/h
- Avisos meteorológicos ativos
- Trovoadas ou condições severas

## 💻 Implementação Técnica

### Serviço IPMA (`services/ipma.ts`)
```typescript
import { getIPMAWeatherData } from './services/ipma';

// Buscar dados em tempo real
const data = await getIPMAWeatherData('Lisboa');
```

### Componente BeachDataPanel
- Busca automática ao selecionar praia
- Atualização periódica (30 min)
- UI responsiva com indicadores de carregamento
- Exibição de alertas meteorológicos

## 🔧 Configuração

### Sem API Key Necessária
A API do IPMA é **pública e gratuita**, não requerendo autenticação.

### Cache Local
Os dados são armazenados em cache por 30 minutos para:
- Reduzir chamadas à API
- Melhorar performance
- Garantir disponibilidade offline temporária

## 📊 Estrutura de Dados

```typescript
interface BeachConditions {
  airTemp: string;        // "20°C"
  waterTemp: string;      // "17°C"
  waves: string;          // "1.5m"
  windSpeed: string;      // "15-20 km/h"
  windDir: string;        // "N" | "NW" | "W" | ...
  uvIndex: string;        // "5"
  condition: string;      // "Céu limpo"
  riskLevel: 'low' | 'medium' | 'high';
  alerts: Alert[];
  ipmaIcon: string;       // "☀️" | "🌧️" | ...
  lastUpdate: string;     // "14:30"
}
```

## 🌐 API Endpoints IPMA

### Base URL
```
https://api.ipma.pt/open-data
```

### Principais Endpoints
- **Cidades**: `/forecast/meteorology/cities/daily/{localId}.json`
- **Mar**: `/forecast/oceanography/daily/hp-daily-sea.json`
- **UV**: `/forecast/meteorology/uv/uv.json`
- **Avisos**: `/warnings/warnings_www.json`

## 📱 Interface do Usuário

### Painel de Dados
- **Grid 2x3**: Temperatura ar/água, ondas, vento, direção, UV
- **Alertas**: Exibição destacada de avisos meteorológicos
- **Condição Atual**: Ícone e descrição do tempo
- **Nível de Risco**: Indicador visual colorido
- **Última Atualização**: Timestamp da última busca

### Controles
- **Botão Refresh**: Atualização manual forçada
- **Toggle Auto-refresh**: Liga/desliga atualização automática
- **Seleção de Praia**: Via mapa interativo

## 🔍 Fallback e Error Handling

### Quando a API Falha
O sistema retorna dados padrão seguros:
```typescript
{
  airTemp: '20°C',
  waterTemp: '17°C',
  waves: '1.2m',
  windSpeed: '15 km/h',
  windDir: 'N',
  uvIndex: '5',
  condition: 'Céu limpo',
  riskLevel: 'low'
}
```

### Logging
- Erros são registrados no console
- Não bloqueia a aplicação
- Graceful degradation

## 📚 Referências

- **IPMA**: https://www.ipma.pt
- **API IPMA**: https://api.ipma.pt
- **Documentação**: https://www.ipma.pt/pt/otempo/obs.tempo.pt/

## 🎓 Créditos

Dados meteorológicos fornecidos por:
**IPMA - Instituto Português do Mar e da Atmosfera**

API pública e gratuita para fins educacionais e informativos.

---

**Nota**: Os dados do IPMA são atualizados regularmente pelo instituto. Este sistema apenas consome e exibe essas informações para apoio aos nadadores salvadores.
