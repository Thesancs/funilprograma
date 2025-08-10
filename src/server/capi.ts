export interface CapiPayload {
  event_name: string;
  event_time: number;
  event_id?: string;
  event_source_url?: string;
  user_data?: Record<string, any>;
  custom_data?: Record<string, any>;
}

export async function sendCapiEvent(payload: CapiPayload) {
  const pixelId = process.env.FB_PIXEL_ID;
  const token = process.env.FB_ACCESS_TOKEN;
  if (!pixelId || !token) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Missing FB_PIXEL_ID or FB_ACCESS_TOKEN');
    }
    return;
  }
  const url = `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${token}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [payload] }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
  return res.json();
}
