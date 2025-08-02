
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { amount, description, payer } = await req.json();

    if (!amount || !description || !payer || !payer.name || !payer.email) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }
    
    const apiKey = process.env.PUSHINPAY_KEY;
    const cleanApiKey = apiKey?.replace(/['"]/g, '');
    
    if (!cleanApiKey || cleanApiKey.includes('sua_api_key') || cleanApiKey.length < 20) {
      throw new Error('Chave da API Push in Pay (PUSHINPAY_KEY) não configurada no ambiente.');
    }

    // Validar valor mínimo (50 centavos conforme documentação)
    if (amount < 50) {
      return NextResponse.json({ error: 'Valor mínimo é de 50 centavos' }, { status: 400 });
    }

    console.log('Gerando PIX para:', { amount, description, payer });
    
    // Formato CORRETO conforme documentação oficial
    const response = await fetch('https://api.pushinpay.com.br/api/pix/cashIn', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cleanApiKey}`, // CORREÇÃO: Adicionar "Bearer "
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            value: amount, // CORREÇÃO: Enviar direto em centavos (não dividir por 100)
            webhook_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002'}/api/webhook/pushinpay`,
            // Removido description e payer - não estão na documentação oficial
        })
    });

    const responseBody = await response.text();
    console.log('Resposta da Push in Pay:', responseBody);
    
    if (!response.ok) {
        console.error('Erro da API Push in Pay:', responseBody);
        return NextResponse.json(
          { error: 'PushInPayError', details: `Status: ${response.status} - ${responseBody}` },
          { status: response.status },
        )
    }

    const data = JSON.parse(responseBody);
    
    // Formato de resposta conforme documentação
    if (!data.qr_code_base64 || !data.id) {
        console.error('Resposta inesperada da API Push in Pay:', data);
        throw new Error('Formato de resposta inesperado da API.');
    }

    return NextResponse.json({ 
        qrCodeBase64: data.qr_code_base64.replace('data:image/png;base64,', ''),
        chargeId: data.id,
        qrCode: data.qr_code,
        status: data.status,
        value: data.value
    });

  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: 'Falha ao gerar PIX', details: errorMessage }, { status: 500 });
  }
}
