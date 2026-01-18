<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🌊 Lifeguard Pro - Nadador Salvador

Sistema de Apoio para Nadadores Salvadores com IA integrada

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/asantosj16/NadadorSalvador)

## 🚀 Deploy no Vercel

### Deploy Rápido
1. Clique no botão "Deploy with Vercel" acima
2. Configure a variável de ambiente: `VITE_GEMINI_API_KEY`
3. Deploy automático!

### Deploy Manual
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

📖 **[Guia completo de deploy](DEPLOY.md)**

## 💻 Executar Localmente

**Pré-requisitos:** Node.js 18+

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```
   Edite `.env` e adicione sua API key do Gemini:
   ```
   VITE_GEMINI_API_KEY=sua_chave_aqui
   ```
   🔑 Obtenha sua API key em: https://aistudio.google.com/app/apikey

3. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse: http://localhost:3000

4. **Build de produção:**
   ```bash
   npm run build
   npm run preview
   ```

## 🔍 Verificar antes de Deploy

Execute o script de verificação:
```bash
./verify-deploy.sh
```

## 🛠️ Tecnologias

- ⚡ **Vite** - Build tool
- ⚛️ **React 19** - UI Framework
- 📘 **TypeScript** - Tipagem estática
- 🎨 **TailwindCSS** - Estilização
- 🤖 **Google Gemini AI** - Inteligência Artificial
- 🚀 **Vercel** - Hospedagem

## 📱 Funcionalidades

- 🗺️ Mapa interativo de praias de Portugal
- 🌊 Dados meteorológicos em tempo real
- 🚨 Sistema de alertas e emergências
- 📚 Manuais e guias de salvamento
- 🎯 Cenários de treino com IA
- 🏋️ Gestão de locais de treino
- 💬 Assistente IA para dúvidas

## 🌐 Links

- **AI Studio**: https://ai.studio/apps/drive/11gOo2SLIa20TE-nIEyLYX6-zG_pukdA-

## 📝 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `VITE_GEMINI_API_KEY` | Chave da API do Google Gemini | ✅ Sim |

## 🐛 Troubleshooting

### Build falha
```bash
# Limpar cache e reinstalar
rm -rf node_modules dist
npm install
npm run build
```

### Variável de ambiente não encontrada
- Certifique-se de que o nome começa com `VITE_`
- Reinicie o servidor de desenvolvimento após alterar `.env`
- No Vercel, configure em Settings > Environment Variables

## 📄 Licença

Este projeto foi desenvolvido para apoio aos Nadadores Salvadores de Portugal.

## 👤 Autor

**asantosj16**
- GitHub: [@asantosj16](https://github.com/asantosj16)

---

<div align="center">
Desenvolvido com ❤️ para os Nadadores Salvadores 🏖️
</div>
