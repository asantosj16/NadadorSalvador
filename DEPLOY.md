# Deploy no Vercel

## 🚀 Passos para publicar

### 1. Instalar Vercel CLI (opcional)
```bash
npm install -g vercel
```

### 2. Deploy via CLI
```bash
# Login no Vercel
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### 3. Deploy via GitHub (Recomendado)

1. Faça push do código para o GitHub:
```bash
git add .
git commit -m "Preparado para deploy no Vercel"
git push origin main
```

2. Acesse [vercel.com](https://vercel.com) e faça login

3. Clique em "Add New Project"

4. Importe o repositório do GitHub

5. Configure as variáveis de ambiente:
   - `VITE_GEMINI_API_KEY`: Sua chave da API do Gemini
   - Obtenha em: https://aistudio.google.com/app/apikey

6. Clique em "Deploy"

## ⚙️ Configuração de Variáveis de Ambiente

No dashboard do Vercel:
- Vá em Settings > Environment Variables
- Adicione: `VITE_GEMINI_API_KEY` = sua_chave_api

## 📋 Checklist Pré-Deploy

- [x] Build local passou sem erros (`npm run build`)
- [x] Arquivo `.env.example` criado
- [x] `.gitignore` configurado
- [x] `vercel.json` otimizado
- [x] Variáveis de ambiente configuradas no Vercel
- [x] Dependências instaladas (`npm install`)

## 🔍 Testar Localmente

```bash
# Build de produção
npm run build

# Preview da build
npm run preview
```

## 🌐 URL do Projeto

Após o deploy, sua aplicação estará disponível em:
- https://nadador-salvador.vercel.app (ou similar)
- URL personalizada pode ser configurada no dashboard do Vercel

## 🔄 Atualizações Automáticas

Cada push para a branch `main` irá automaticamente:
1. Fazer build da aplicação
2. Executar verificações
3. Fazer deploy se tudo estiver OK

## 📱 Recursos

- **Framework**: Vite + React + TypeScript
- **UI**: TailwindCSS
- **API**: Google Gemini AI
- **Hospedagem**: Vercel

## 🐛 Troubleshooting

### Build falha no Vercel
- Verifique se todas as dependências estão no `package.json`
- Confirme que a API key está configurada
- Verifique os logs no dashboard do Vercel

### App não carrega
- Verifique a variável `VITE_GEMINI_API_KEY`
- Confirme que o domínio está correto nas configurações
- Verifique o console do navegador para erros

## 📞 Suporte

Para problemas com:
- **Vercel**: https://vercel.com/support
- **Gemini API**: https://ai.google.dev/gemini-api/docs
