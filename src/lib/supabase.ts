 import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yalsgaqmddzgbgxyrhdu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhbHNnYXFtZGR6Z2JneHlyaGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY3MzMsImV4cCI6MjA3MzAxMjczM30.tWgl_qiSXNVB72MgkgHWRdCbghfVU6emqko4iHafIII'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos para o banco de dados
export interface Cliente {
  id?: number
  nome: string
  email: string
  rg: string
  telefone: string
  plano_selecionado: string
  valor_total: number
  order_bumps?: any
  transaction_id?: string
  created_at?: string
}