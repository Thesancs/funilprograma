
"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnaliseAlimentacao from '@/components/funnel/AnaliseAlimentacao';
import { motion } from 'framer-motion';
import { useQuiz } from '@/contexts/QuizContext';
import QuizProgressRibbon from '@/components/funnel/QuizProgressRibbon';

function AlimentacaoContent() {
    const searchParams = useSearchParams();
    const { setStep, stepIndex, totalSteps, bonusStep, stepLabels } = useQuiz();

    useEffect(() => {
        setStep(5);
    }, [setStep]);

    const initialPontos = parseInt(searchParams.get('pontos') || '450', 10);
    const nome = searchParams.get('nome') || 'Mamãe';
    const [pontos, setPontos] = useState(initialPontos);

    return (
        <main className={cn("flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-[#D9A8B6] to-background transition-colors duration-500 overflow-hidden")}>
            <QuizProgressRibbon
              stepIndex={stepIndex}
              totalSteps={totalSteps}
              bonusStep={bonusStep}
              stepLabels={stepLabels}
            />
             <div className="h-[60px] md:h-[70px] w-full" />
           <div className="w-full max-w-md mx-auto flex flex-col gap-4">
                <div className="w-full flex justify-end items-center">
                    <div className="flex items-center gap-2 text-foreground font-semibold bg-white/60 backdrop-blur-sm p-2 rounded-full shadow-lg">
                        <Heart className="h-5 w-5 text-primary" />
                        <span>Pontos de cuidado: {pontos}</span>
                    </div>
                </div>
                <AnaliseAlimentacao nome={nome} pontos={pontos} setPontos={setPontos} />
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
