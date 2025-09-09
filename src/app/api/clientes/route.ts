import { NextRequest, NextResponse } from 'next/server'
import { supabase, Cliente } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { nome, email, rg, telefone, plano_selecionado, valor_total, order_bumps, transaction_id } = body

    // Validar campos obrigatórios
    if (!nome || !email || !rg || !telefone || !plano_selecionado || !valor_total) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: nome, email, rg, telefone, plano_selecionado, valor_total' },
        { status: 400 }
      )
    }

    // Preparar dados para inserção
    const clienteData: Omit<Cliente, 'id' | 'created_at'> = {
      nome,
      email,
      rg,
      telefone,
      plano_selecionado,
      valor_total,
      order_bumps: order_bumps || {},
      transaction_id
    }

    // Inserir no banco de dados
    const { data, error } = await supabase
      .from('clientes')
      .insert([clienteData])
      .select()
      .single()

    if (error) {
      console.error('Erro ao inserir cliente:', error)
      return NextResponse.json(
        { error: 'Erro interno do servidor', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Cliente salvo com sucesso',
        cliente: data
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erro na API de clientes:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Endpoint para buscar clientes (opcional, para admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const transaction_id = searchParams.get('transaction_id')

    let query = supabase.from('clientes').select('*')

    if (email) {
      query = query.eq('email', email)
    }

    if (transaction_id) {
      query = query.eq('transaction_id', transaction_id)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar clientes:', error)
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      )
    }

    return NextResponse.json({ clientes: data })

  } catch (error) {
    console.error('Erro na API de clientes:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}