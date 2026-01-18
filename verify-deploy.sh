#!/bin/bash

# Script de Verificação Pré-Deploy
# Execute este script antes de fazer deploy no Vercel

echo "🔍 Verificando projeto Nadador Salvador..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para verificar
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
    else
        echo -e "${RED}✗${NC} $1"
        exit 1
    fi
}

# 1. Verificar se node_modules existe
echo "📦 Verificando dependências..."
if [ -d "node_modules" ]; then
    check "node_modules encontrado"
else
    echo -e "${YELLOW}⚠${NC} Instalando dependências..."
    npm install
    check "Dependências instaladas"
fi

# 2. Verificar se .env.example existe
echo ""
echo "🔐 Verificando arquivo de exemplo de variáveis de ambiente..."
if [ -f ".env.example" ]; then
    check ".env.example existe"
else
    echo -e "${RED}✗${NC} .env.example não encontrado"
fi

# 3. Verificar se vercel.json existe
echo ""
echo "⚙️  Verificando configuração do Vercel..."
if [ -f "vercel.json" ]; then
    check "vercel.json existe"
else
    echo -e "${RED}✗${NC} vercel.json não encontrado"
fi

# 4. Executar build
echo ""
echo "🏗️  Executando build de produção..."
npm run build
check "Build completado com sucesso"

# 5. Verificar se dist foi criado
echo ""
echo "📁 Verificando pasta de build..."
if [ -d "dist" ]; then
    check "Pasta dist criada"
    
    # Verificar tamanho dos arquivos
    echo ""
    echo "📊 Tamanho dos arquivos de build:"
    du -sh dist
    echo ""
    ls -lh dist/assets/ | tail -n +2
else
    echo -e "${RED}✗${NC} Pasta dist não foi criada"
    exit 1
fi

# 6. Resumo
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Todas as verificações passaram!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Próximos passos:"
echo "1. Configure a variável VITE_GEMINI_API_KEY no Vercel"
echo "2. Execute: vercel --prod"
echo "   ou faça push para o GitHub se configurou integração"
echo ""
echo "📚 Consulte DEPLOY.md para instruções detalhadas"
echo ""
