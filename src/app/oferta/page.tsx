
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import OfertaFinal from '@/components/funnel/OfertaFinal';
import { useCountdown } from '@/hooks/use-countdown';


function OfertaContent() {
    const searchParams = useSearchParams();
    const pontos = parseInt(searchParams.get('pontos') || '0', 10);
    const nome = searchParams.get('nome') || 'Mamãe';
    const DURATION_SECONDS = 15 * 60; // 15 minutos
    const { minutos, segundos, acabou, secondsLeft } = useCountdown(DURATION_SECONDS);

    return (
        <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-full py-12 px-4">
             <OfertaFinal 
                nome={nome} 
                pontos={pontos} 
                ofertaExpirada={acabou} 
                minutos={minutos}
                segundos={segundos}
                totalDuration={DURATION_SECONDS}
                secondsLeft={secondsLeft}
             />
        </div>
    );
}


export default function OfertaPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-white overflow-hidden">
        <div className="absolute inset-0 z-0 h-screen md:h-screen">
             <Image
                src="https://i.postimg.cc/RFbg7KVC/file-000000006d8c623095818c1747892548.png"
                alt="Mulher gestante feliz em um campo florido"
                fill
                className="object-cover object-top"
                quality={80}
                priority
                data-ai-hint="happy pregnant woman"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-pink-300/60 to-white/90"></div>
        </div>
        <Suspense fallback={
            <div className="flex min-h-screen w-full items-center justify-center z-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <OfertaContent />
        </Suspense>
    </main>
  );
}
