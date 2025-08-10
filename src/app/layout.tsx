import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import { Poppins, Dancing_Script } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const fontClass = process.env.DISABLE_NEXT_FONT === '1' ? '' : `${poppins.className} ${dancingScript.className}`;

export const metadata: Metadata = {
  title: 'Bem-Vinda, Mamãe!',
  description: 'Crie sua conta e ganhe pontos de cuidado.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script src="https://cdn.utmify.com.br/utms/latest.js" strategy="lazyOnload" />
        <Script src="https://cdn.utmify.com.br/pixel/pixel.js" strategy="lazyOnload" />
        <Script id="fb-init" strategy="afterInteractive">
          {`
            window.fbq = window.fbq || function(){(fbq.q = fbq.q || []).push(arguments);};
            fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? ''}');
            const fire = () => {
              if (window.fbq) fbq('track', 'PageView');
              if ((window as any).utmify) (window as any).utmify('event', 'PageView');
            };
            ['scroll','click'].forEach(evt => window.addEventListener(evt, fire, { once: true }));
            window.addEventListener('load', () => setTimeout(fire, 1000), { once: true });
          `}
        </Script>
        <Script src="https://connect.facebook.net/en_US/fbevents.js" strategy="lazyOnload" />
      </head>
      <body className={`${fontClass} font-body antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
