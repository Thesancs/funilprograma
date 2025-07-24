
"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import TermometroEmocional, { getBackgroundColor } from '@/components/funnel/TermometroEmocional';
import { useQuiz } from '@/contexts/QuizContext';

function TermometroEmocionalContent() {
    const searchParams = useSearchParams();
    const { setStep } = useQuiz();

    useEffect(() => {
        setStep(8);
    }, [setStep]);

    const initialPontos = parseInt(searchParams.get('pontos') || '0', 10);
    const nome = searchParams.get('nome') || 'Mamãe';
    const [pontos, setPontos] = useState(initialPontos);
    const [nivelMedo, setNivelMedo] = useState(0);

    const faixa = getBackgroundColor(nivelMedo, true);
    const bgColor = faixa.bgColor;
    const textColor = faixa.textColor;

    return (
        <main className={cn(
            "flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-500 overflow-hidden",
            bgColor
        )}>
           <div className="w-full max-w-md mx-auto flex flex-col gap-4">
                <div className={cn("w-full flex justify-end items-center mb-0")}>
                    <div className={cn("flex items-center gap-2 font-semibold bg-white/60 backdrop-blur-sm p-2 rounded-full shadow-lg", textColor)}>
                        <Heart className="h-5 w-5" />
                        <span>Pontos de cuidado: {pontos}</span>
                    </div>
                </div>
                <TermometroEmocional
                    nome={nome}
                    pontos={pontos} 
                    setPontos={setPontos}
                    nivelMedo={nivelMedo}
                    setNivelMedo={setNivelMedo} 
                />
            </div>
        </main>
    );
}

export default function TermometroEmocionalPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <TermometroEmocionalContent />
        </Suspense>
    );
}
