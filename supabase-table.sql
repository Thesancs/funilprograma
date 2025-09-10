-- Criar tabela para armazenar dados dos clientes
CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  rg VARCHAR(20) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  plano_selecionado VARCHAR(50) NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  order_bumps JSONB,
  transaction_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_clientes_email ON clientes(email);
CREATE INDEX IF NOT EXISTS idx_clientes_transaction_id ON clientes(transaction_id);
CREATE INDEX IF NOT EXISTS idx_clientes_created_at ON clientes(created_at);

-- Habilitar RLS (Row Level Security)
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção de dados
CREATE POLICY "Permitir inserção de clientes" ON clientes
  FOR INSERT WITH CHECK (true);

-- Política para permitir leitura de dados (opcional, para admin)
CREATE POLICY "Permitir leitura de clientes" ON clientes
  FOR SELECT USING (true);