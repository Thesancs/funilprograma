
"use client";

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ConsumoAgua from '@/components/funnel/ConsumoAgua';

function AguaContent() {
    const searchParams = useSearchParams();
    const initialPontos = parseInt(searchParams.get('pontos') || '0', 10);
    const nome = searchParams.get('nome') || 'Mamãe';
    const [pontos, setPontos] = useState(initialPontos);

    return (
        <main className={cn("flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#D9A8B6] to-background transition-colors duration-500 overflow-hidden")}>
           <div className="w-full max-w-md mx-auto flex flex-col gap-4">
                <div className="w-full flex justify-end items-center">
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Heart className="h-5 w-5 text-primary" />
                        <span>Pontos de cuidado: {pontos}</span>
                    </div>
                </div>
                <ConsumoAgua nome={nome} pontos={pontos} setPontos={setPontos} />
            </div>
        </main>
    );
}

export default function AguaPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <AguaContent />
        </Suspense>
    );
}
