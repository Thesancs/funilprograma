import { NextRequest, NextResponse } from 'next/server';
import { sendCapiEvent, CapiPayload } from '@/server/capi';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CapiPayload;
    if (!body.event_name || !body.event_time) {
      return NextResponse.json({ error: 'invalid payload' }, { status: 400 });
    }
    await sendCapiEvent(body);
    if (process.env.NODE_ENV !== 'production') {
      console.log('CAPI event', body.event_name);
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('CAPI error', err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
