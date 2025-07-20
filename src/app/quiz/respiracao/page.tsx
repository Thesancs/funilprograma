
"use client";

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import RespiracaoGuiada from '@/components/funnel/RespiracaoGuiada';

function RespiracaoContent() {
    const searchParams = useSearchParams();
    const initialPontos = parseInt(searchParams.get('pontos') || '300', 10);
    const [pontos, setPontos] = useState(initialPontos);

    return (
         <main className={cn("flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#D9A8B6] to-background transition-colors duration-500")}>
            <div className="absolute top-4 right-4 flex items-center gap-2 text-foreground font-semibold">
                <Heart className="h-5 w-5 text-primary" />
                <span>Pontos de cuidado: {pontos}</span>
            </div>
            <RespiracaoGuiada pontos={pontos} setPontos={setPontos} />
        </main>
    );
}


export default function RespiracaoPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen w-full items-center justify-center">Carregando...</div>}>
            <RespiracaoContent />
        </Suspense>
    );
}
