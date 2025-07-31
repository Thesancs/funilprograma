
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const chargeId = params.id;

  if (!chargeId) {
    return NextResponse.json({ error: 'ID da cobrança não fornecido' }, { status: 400 });
  }

  try {
    const PUSHINPAY_KEY = "40720|ZTeDFx0PSENL95JRHva9SWKXZnXhVIQOohifCp03f9d22c92";
    if (!PUSHINPAY_KEY) {
      throw new Error('Chave da API Push in Pay não configurada');
    }

    const response = await fetch(`https://api.pushinpay.com/v1/charges/${chargeId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PUSHINPAY_KEY}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Erro ao consultar status da cobrança ${chargeId}:`, errorBody);
       return NextResponse.json(
          { error: 'PushInPayStatusError', details: `Status: ${response.status} - ${errorBody}` },
          { status: response.status },
        )
    }

    const data = await response.json();
    
    return NextResponse.json({ status: data.status });

  } catch (error) {
    console.error(`Erro ao verificar status do PIX para ${chargeId}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: 'Falha ao verificar status do PIX', details: errorMessage }, { status: 500 });
  }
}
