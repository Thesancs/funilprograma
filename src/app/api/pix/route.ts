
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { amount, description, payer } = await req.json();

    if (!amount || !description || !payer || !payer.name || !payer.email) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }
    
    // Chamada real para a API Push in Pay
    const PUSHINPAY_KEY = "40720|ZTeDFx0PSENL95JRHva9SWKXZnXhVIQOohifCp03f9d22c92";
    if (!PUSHINPAY_KEY) {
      throw new Error('Chave da API Push in Pay não configurada');
    }

    console.log('Gerando PIX para:', { amount, description, payer });
    
    const response = await fetch('https://api.pushinpay.com/v1/charges', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${PUSHINPAY_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount,
            description,
            payer,
            "payment_methods": ["pix"],
        })
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('Erro da API Push in Pay:', errorBody);
        throw new Error(`Falha na API Push in Pay: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.pix || !data.pix.qr_code_base64 || !data.id) {
        console.error('Resposta inesperada da API Push in Pay:', data);
        throw new Error('Formato de resposta inesperado da API.');
    }

    return NextResponse.json({ 
        qrCodeBase64: data.pix.qr_code_base64,
        chargeId: data.id 
    });

  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: 'Falha ao gerar PIX', details: errorMessage }, { status: 500 });
  }
}
