
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { amount, description, payer } = await req.json();

    if (!amount || !description || !payer || !payer.name || !payer.email) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }
    
    const apiKey = process.env.PUSHINPAY_KEY;
    if (!apiKey) {
      throw new Error('Chave da API Push in Pay (PUSHINPAY_KEY) não configurada no ambiente.');
    }

    console.log('Gerando PIX para:', { amount, description, payer });
    
    const response = await fetch('https://api.pushinpay.com.br/api/pix/cashIn', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            value: amount,
            description,
            payer,
            "payment_methods": ["pix"],
        })
    });

    const responseBody = await response.text();
    
    if (!response.ok) {
        console.error('Erro da API Push in Pay:', responseBody);
        return NextResponse.json(
          { error: 'PushInPayError', details: `Status: ${response.status} - ${responseBody}` },
          { status: response.status },
        )
    }

    const data = JSON.parse(responseBody);
    
    if (!data.pix || !data.pix.qr_code_base64 || !data.pix.txid) {
        console.error('Resposta inesperada da API Push in Pay:', data);
        throw new Error('Formato de resposta inesperado da API.');
    }

    return NextResponse.json({ 
        qrCodeBase64: data.pix.qr_code_base64,
        chargeId: data.pix.txid, // txid é o ID que usaremos para consultar o status
    });

  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: 'Falha ao gerar PIX', details: errorMessage }, { status: 500 });
  }
}
