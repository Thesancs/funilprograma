
"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import MirrorSlider from '@/components/funnel/MirrorSlider';
import { useQuiz } from '@/contexts/QuizContext';
import QuizProgressRibbon from '@/components/funnel/QuizProgressRibbon';

function EspelhoContent() {
    const searchParams = useSearchParams();
    const { setStep, stepIndex, totalSteps, bonusStep, stepLabels, pontos, setInitialPontos } = useQuiz();

    useEffect(() => {
        setStep(8);
        const initialPontos = parseInt(searchParams.get('pontos') || '0', 10);
        setInitialPontos(initialPontos);
    }, [setStep, searchParams, setInitialPontos]);

    const nome = searchParams.get('nome') || 'Mamãe';
    const email = searchParams.get('email') || '';
    const [bgColor, setBgColor] = useState('bg-gray-100'); 

    return (
        <main className={cn(
            "flex min-h-screen flex-col items-center p-4 transition-colors duration-500 overflow-hidden",
            bgColor
        )}>
            <QuizProgressRibbon
              stepIndex={stepIndex}
              totalSteps={totalSteps}
              bonusStep={bonusStep}
              stepLabels={stepLabels}
            />
             <div className="h-[60px] md:h-[70px] w-full" />
           <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
                <div className="w-full flex justify-end items-center sticky top-[70px] md:top-[80px] z-20 pr-4">
                    <div className={cn(
                        "flex items-center gap-2 font-semibold bg-white/60 backdrop-blur-sm p-2 rounded-full shadow-lg",
                         "text-foreground"
                    )}>
                        <Heart className="h-5 w-5 text-primary" />
                        <span>Pontos de cuidado: {pontos}</span>
                    </div>
                </div>
                <MirrorSlider
                    nome={nome}
                    email={email}
                    setBgColor={setBgColor}
                />
            </div>
        </main>
    );
}

export default function EspelhoPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <EspelhoContent />
        </Suspense>
    );
}
