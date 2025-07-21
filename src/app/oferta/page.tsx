
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Loader2, AlertTriangle, Clock } from 'lucide-react';
import OfertaFinal from '@/components/funnel/OfertaFinal';
import { useCountdown } from '@/hooks/use-countdown';


function OfertaContent() {
    const searchParams = useSearchParams();
    const pontos = parseInt(searchParams.get('pontos') || '0', 10);
    const nome = searchParams.get('nome') || 'Mamãe';
    const DURATION_SECONDS = 15 * 60; // 15 minutos
    const { minutos, segundos, acabou } = useCountdown(DURATION_SECONDS);

    return (
        <div className="flex flex-col items-center gap-4 text-center">
            {acabou ? (
                <div className="flex items-center gap-2 text-red-700 bg-red-100 px-4 py-2 rounded-full">
                    <AlertTriangle className="h-5 w-5" />
                    <p className="font-semibold">Seu tempo acabou! A oferta especial expirou.</p>
                </div>
            ) : (
                 <div className="flex items-center gap-2 text-primary-foreground bg-primary/80 px-4 py-2 rounded-full shadow-md">
                    <Clock className="h-5 w-5" />
                    <p className="font-semibold">Sua oferta expira em:</p>
                    <p className="text-lg font-mono font-bold tracking-widest">
                    {minutos.toString().padStart(2, '0')}:{segundos.toString().padStart(2, '0')}
                    </p>
                </div>
            )}

            <div className="my-4" data-ai-hint="mother baby">
                <Image 
                  src="https://i.imgur.com/pWBIXpR.png" 
                  alt="Logo Bem-Vinda, Mamãe!" 
                  width={112} 
                  height={112} 
                  className="w-24 h-24 sm:w-28 sm:h-28"
                  priority
                />
            </div>

            <OfertaFinal nome={nome} pontos={pontos} ofertaExpirada={acabou} />
        </div>
    );
}


export default function OfertaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D9A8B6] to-background p-4">
      <Suspense fallback={
            <div className="flex min-h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <OfertaContent />
        </Suspense>
    </main>
  );
}
