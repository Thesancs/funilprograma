import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('Webhook Push in Pay recebido:', data);
    
    // Aqui você pode processar a notificação de pagamento
    // Por exemplo, atualizar status no banco de dados
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}