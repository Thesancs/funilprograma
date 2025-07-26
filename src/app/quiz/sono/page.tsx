
"use client";

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import QuizSono from '@/components/funnel/QuizSono';
import { useQuiz } from '@/contexts/QuizContext';
import QuizProgressRibbon from '@/components/funnel/QuizProgressRibbon';

function QuizSonoContent() {
  const searchParams = useSearchParams();
  const { setStep, stepIndex, totalSteps, bonusStep, stepLabels, setInitialPontos } = useQuiz();

  useEffect(() => {
    setStep(1);
    const initialPontos = parseInt(searchParams.get('pontos') || '150', 10);
    setInitialPontos(initialPontos);
  }, [setStep, searchParams, setInitialPontos]);

  const nome = searchParams.get('nome') || 'Mamãe';

  return (
    <>
      <QuizProgressRibbon
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        bonusStep={bonusStep}
        stepLabels={stepLabels}
      />
       <div className="h-[60px] md:h-[70px] w-full" />
      <QuizSono nome={nome} />
    </>
  );
}

export default function QuizSonoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <QuizSonoContent />
    </Suspense>
  );
}
