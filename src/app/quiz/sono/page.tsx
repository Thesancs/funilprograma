
"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import QuizSono from '@/components/funnel/QuizSono';
import { useQuiz } from '@/contexts/QuizContext';
import QuizProgressRibbon from '@/components/funnel/QuizProgressRibbon';
import { cn } from '@/lib/utils';

type OpcaoSono = "nenhuma" | "facil" | "mal" | "pessimo";

const bgColors: Record<OpcaoSono, string> = {
  nenhuma: "bg-gradient-to-b from-[#D9A8B6] to-background",
  facil: "bg-gradient-to-b from-[#344154] to-[#6E7C8E]",
  mal: "bg-gradient-to-b from-[#B3A4D4] to-[#8374A4]",
  pessimo: "bg-gradient-to-b from-[#B16262] to-[#813232]",
};


function QuizSonoContent() {
  const searchParams = useSearchParams();
  const { setStep, stepIndex, totalSteps, bonusStep, stepLabels, setInitialPontos } = useQuiz();
  const [selecionado, setSelecionado] = useState<OpcaoSono>("nenhuma");

  useEffect(() => {
    setStep(1);
    const initialPontos = parseInt(searchParams.get('pontos') || '150', 10);
    setInitialPontos(initialPontos);
  }, [setStep, searchParams, setInitialPontos]);

  const nome = searchParams.get('nome') || 'Mamãe';
  const bgColor = bgColors[selecionado];

  return (
    <main className={cn("flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-500", bgColor)}>
      <QuizProgressRibbon
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        bonusStep={bonusStep}
        stepLabels={stepLabels}
      />
       <div className="h-[60px] md:h-[70px] w-full" />
      <QuizSono 
        nome={nome}
        selecionado={selecionado}
        setSelecionado={setSelecionado}
      />
    </main>
  );
}

export default function QuizSonoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <QuizSonoContent />
    </Suspense>
  );
}
