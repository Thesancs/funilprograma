
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const chargeId = params.id; // Agora este é o txid

  if (!chargeId) {
    return NextResponse.json({ error: 'ID da cobrança (txid) não fornecido' }, { status: 400 });
  }

  try {
    const apiKey = process.env.PUSHINPAY_KEY;
    if (!apiKey) {
      throw new Error('Chave da API Push in Pay (PUSHINPAY_KEY) não configurada no ambiente.');
    }

    // O endpoint para consultar o status usa /api/transactions/{txid}
    const response = await fetch(`https://api.pushinpay.com.br/api/transactions/${chargeId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
    });

    const responseBody = await response.text();

    if (!response.ok) {
      console.error(`Erro ao consultar status da cobrança ${chargeId}:`, responseBody);
       return NextResponse.json(
          { error: 'PushInPayStatusError', details: `Status: ${response.status} - ${responseBody}` },
          { status: response.status },
        )
    }

    const data = JSON.parse(responseBody);
    
    // A resposta de status tem uma estrutura diferente
    return NextResponse.json({ status: data.status });

  } catch (error) {
    console.error(`Erro ao verificar status do PIX para ${chargeId}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: 'Falha ao verificar status do PIX', details: errorMessage }, { status: 500 });
  }
}
