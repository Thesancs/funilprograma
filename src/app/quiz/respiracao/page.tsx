
"use client";

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import RespiracaoGuiada from '@/components/funnel/RespiracaoGuiada';
import { useQuiz } from '@/contexts/QuizContext';
import QuizProgressRibbon from '@/components/funnel/QuizProgressRibbon';

function RespiracaoContent() {
    const searchParams = useSearchParams();
    const { setStep, stepIndex, totalSteps, bonusStep, stepLabels, pontos, setInitialPontos } = useQuiz();

    useEffect(() => {
        setStep(3);
        const initialPontos = parseInt(searchParams.get('pontos') || '300', 10);
        setInitialPontos(initialPontos);
    }, [setStep, searchParams, setInitialPontos]);

    const nome = searchParams.get('nome') || 'Mamãe';
    const email = searchParams.get('email') || '';

    return (
         <main className={cn("flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-[#D9A8B6] to-background transition-colors duration-500")}>
            <QuizProgressRibbon
              stepIndex={stepIndex}
              totalSteps={totalSteps}
              bonusStep={bonusStep}
              stepLabels={stepLabels}
            />
            <div className="h-[60px] md:h-[70px] w-full" />
            <div className="w-full max-w-md mx-auto">
                <div className="w-full flex justify-end items-center mb-4">
                    <div className="flex items-center gap-2 text-foreground font-semibold bg-white/60 backdrop-blur-sm p-2 rounded-full shadow-lg">
                        <Heart className="h-5 w-5 text-primary" />
                        <span>Pontos de cuidado: {pontos}</span>
                    </div>
                </div>
                <RespiracaoGuiada nome={nome} email={email} />
            </div>
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
