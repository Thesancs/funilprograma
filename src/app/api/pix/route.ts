
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { amount, description, payer } = await req.json();

    if (!amount || !description || !payer || !payer.name || !payer.email) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }
    
    // Simulação da API Push in Pay
    // Em um ambiente real, aqui estaria a chamada para a API externa.
    // const PUSHINPAY_KEY = process.env.PUSHINPAY_KEY;
    // if (!PUSHINPAY_KEY) {
    //   throw new Error('Chave da API Push in Pay não configurada');
    // }
    
    console.log('Gerando PIX para:', { amount, description, payer });

    // Mock da resposta da API com um QR Code de placeholder
    const qrCodeBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMVEX///8AAABVwtN+AAABaklEQVR42u3awWnDMAwFUP6gNIqUu5Rz5tpr3AKnTuECBc4gJsSTfUv+H8hAgJ+SQfT/m1vEt0/q8g5YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA1YgA3GftW14u1/L9vRDMbtCjDbCjDbCvCZ/WwR7M/sZocMcOypYgeGfU+2Y/iZ/Qx/LDuwy+xnuYvdk6x8y2Y3XbDDLE4bYIbtgY9lR1b+yD623TGDwS4bsAAbkFnyP2eHnY/Zzb4VbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEAHbEA3LLhA5P4BPo3rO9GAAAAAElFTkSuQmCC";

    return NextResponse.json({ qrCodeBase64 });

  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: 'Falha ao gerar PIX', details: errorMessage }, { status: 500 });
  }
}
