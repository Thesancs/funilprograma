declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    utmify?: (...args: any[]) => void;
  }
}

type EventData = Record<string, any>;

let queue: { event: string; data?: EventData }[] = [];

function send(event: string, data?: EventData) {
  const fbq = window.fbq;
  const utm = window.utmify;
  if (fbq) fbq('track', event, data);
  if (utm) utm('event', event, data);
}

export function track(event: string, data?: EventData) {
  if (typeof window === 'undefined') return;
  const mode = process.env.NEXT_PUBLIC_TRACKING_MODE || process.env.TRACKING_MODE || 'client-min';
  const allowed = mode === 'legacy-client' || ['PageView', 'Purchase'].includes(event);
  if (!allowed) return;

  if (window.fbq || window.utmify) {
    send(event, data);
    if (queue.length) {
      queue.forEach(({ event: e, data: d }) => send(e, d));
      queue = [];
    }
  } else {
    queue.push({ event, data });
    if (queue.length === 1) {
      const timer = setInterval(() => {
        if (window.fbq || window.utmify) {
          clearInterval(timer);
          queue.forEach(({ event: e, data: d }) => send(e, d));
          queue = [];
        }
      }, 1000);
    }
  }
}
