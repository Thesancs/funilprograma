
"use client";

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnaliseAlimentacao from '@/components/funnel/AnaliseAlimentacao';

function AlimentacaoContent() {
    const searchParams = useSearchParams();
    const initialPontos = parseInt(searchParams.get('pontos') || '450', 10);
    const [pontos, setPontos] = useState(initialPontos);

    return (
        <main className={cn("flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#D9A8B6] to-background transition-colors duration-500 overflow-hidden")}>
           <div className="w-full max-w-md mx-auto">
                <div className="w-full flex justify-end items-center mb-4">
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Heart className="h-5 w-5 text-primary" />
                        <span>Pontos de cuidado: {pontos}</span>
                    </div>
                </div>
                <AnaliseAlimentacao pontos={pontos} setPontos={setPontos} />
            </div>
        </main>
    );
}

export default function AlimentacaoPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen w-full items-center justify-center">Carregando...</div>}>
            <AlimentacaoContent />
        </Suspense>
    );
}
