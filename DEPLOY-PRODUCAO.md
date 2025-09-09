# 🚀 Guia de Deploy para Produção

## ✅ Checklist Pré-Deploy

### 1. Configurações Atualizadas
- [x] Links do WhatsApp e email atualizados no código
- [x] Logs de debug removidos/comentados
- [x] Arquivo .env.example criado

### 2. Variáveis de Ambiente Necessárias

Configure as seguintes variáveis no seu provedor de hosting:

```bash
# PushInPay API
PUSHINPAY_KEY=sua_chave_api_pushinpay_real

# URL da aplicação (importante para webhooks)
NEXT_PUBLIC_APP_URL=https://seudominio.com

# Supabase (se usando)
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_supabase
```

### 3. Banco de Dados

Certifique-se de que a tabela `clientes` foi criada no Supabase:

```sql
-- Execute o arquivo supabase-table.sql no painel do Supabase
-- Ou execute manualmente:
CREATE TABLE IF NOT EXISTS public.clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  plano VARCHAR(100) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  bumps JSONB,
  transaction_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 Passos para Deploy

### Vercel (Recomendado)

1. **Conectar Repositório**
   ```bash
   # Se ainda não fez, faça push para o GitHub
   git add .
   git commit -m "Preparação para produção"
   git push origin main
   ```

2. **Configurar no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Importe o repositório
   - Configure as variáveis de ambiente
   - Deploy automático

3. **Configurar Domínio**
   - Adicione seu domínio personalizado
   - Configure DNS
   - Atualize `NEXT_PUBLIC_APP_URL`

### Netlify

1. **Build Settings**
   ```bash
   # Build command
   npm run build
   
   # Publish directory
   .next
   ```

2. **Configurar Variáveis**
   - Site settings > Environment variables
   - Adicione todas as variáveis necessárias

## 🧪 Testes Pós-Deploy

### 1. Teste da API PIX
```bash
# Teste se a API está respondendo
curl https://seudominio.com/api/pix/status/test_id
```

### 2. Teste do Fluxo Completo
1. Acesse a landing page
2. Complete o quiz
3. Faça um pagamento teste
4. Verifique a página de obrigado
5. Confirme se o link do WhatsApp funciona

### 3. Teste dos Webhooks
- Configure webhook no PushInPay: `https://seudominio.com/api/webhook/pushinpay`
- Teste com pagamento real
- Verifique logs no painel do provedor

## 🔍 Monitoramento

### Logs Importantes
Os seguintes console.error foram mantidos para monitoramento:
- Erros de API do PushInPay
- Erros de inserção no banco de dados
- Erros de webhook

### Métricas para Acompanhar
- Taxa de conversão do quiz
- Pagamentos aprovados vs pendentes
- Erros de API
- Tempo de resposta

## 🚨 Troubleshooting

### Problema: Página de obrigado não mostra status
- Verifique se `PUSHINPAY_KEY` está configurada
- Confirme se a API `/api/pix/status/[id]` está funcionando

### Problema: Webhook não funciona
- Verifique se `NEXT_PUBLIC_APP_URL` está correto
- Confirme se o endpoint está acessível publicamente

### Problema: Banco de dados
- Verifique se a tabela `clientes` existe
- Confirme as credenciais do Supabase

## 📞 Contatos Configurados

- **WhatsApp:** https://chat.whatsapp.com/Fm9YwzZwpYR8DdwX70zjGL
- **Email:** agenciasancs@gmail.com

---

**✅ Projeto pronto para produção!**

Todos os logs de debug foram removidos, links atualizados e configurações documentadas.