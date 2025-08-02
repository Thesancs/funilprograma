import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ error: 'ID do pagamento é obrigatório' }, { status: 400 });
    }

    const apiKey = process.env.PUSHINPAY_KEY;
    if (!apiKey) {
      throw new Error('Chave da API Push in Pay (PUSHINPAY_KEY) não configurada no ambiente.');
    }

    console.log('Verificando status do pagamento:', id);
    
    const response = await fetch(`https://api.pushinpay.com.br/api/pix/cashIn/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': apiKey, // Sem "Bearer"
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    const responseBody = await response.text();
    
    if (!response.ok) {
      console.error('Erro da API Push in Pay ao verificar status:', responseBody);
      return NextResponse.json(
        { error: 'PushInPayError', details: `Status: ${response.status} - ${responseBody}` },
        { status: response.status }
      );
    }

    const data = JSON.parse(responseBody);
    
    // A Push in Pay retorna diferentes status, mapeamos para nosso sistema
    let status = 'pending';
    if (data.status === 'paid' || data.status === 'approved') {
      status = 'paid';
    } else if (data.status === 'cancelled' || data.status === 'expired') {
      status = 'cancelled';
    }

    return NextResponse.json({ 
      status,
      originalStatus: data.status,
      paymentData: data
    });

  } catch (error) {
    console.error('Erro ao verificar status do PIX:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: 'Falha ao verificar status do PIX', details: errorMessage }, { status: 500 });
  }
}