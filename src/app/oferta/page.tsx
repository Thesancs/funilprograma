"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import OfertaFinal from '@/components/funnel/OfertaFinal';
import { useCountdown } from '@/hooks/use-countdown';


function OfertaContent() {
    const searchParams = useSearchParams();
    const pontos = parseInt(searchParams.get('pontos') || '0', 10);
    const nome = searchParams.get('nome') || 'Mamãe';
    const DURATION_SECONDS = 15 * 60; // 15 minutos
    const { minutos, segundos, acabou } = useCountdown(DURATION_SECONDS);

    if (acabou) {
        return (
             <div className="flex flex-col items-center gap-4 text-center">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg">
                    <p className="font-bold text-lg">Seu tempo acabou! 😔</p>
                    <p>Infelizmente, a oferta especial expirou.</p>
                </div>
                <OfertaFinal nome={nome} pontos={pontos} ofertaExpirada={true} />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center gap-4 text-center">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg">
                <p className="font-bold">Sua oferta expira em:</p>
                <p className="text-2xl font-mono font-bold tracking-widest">
                {minutos.toString().padStart(2, '0')}:{segundos.toString().padStart(2, '0')}
                </p>
            </div>
            <OfertaFinal nome={nome} pontos={pontos} ofertaExpirada={false} />
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
