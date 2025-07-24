
"use client";

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import QuizAnsiedade from '@/components/funnel/QuizAnsiedade';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuiz } from '@/contexts/QuizContext';
import QuizProgressRibbon from '@/components/funnel/QuizProgressRibbon';


function QuizAnsiedadeContent() {
  const searchParams = useSearchParams();
  const { setStep, stepIndex, totalSteps, bonusStep, stepLabels } = useQuiz();

  useEffect(() => {
    setStep(2);
  }, [setStep]);

  const initialPontos = parseInt(searchParams.get('pontos') || '250', 10);
  const nome = searchParams.get('nome') || 'Mamãe';
  const [pontos, setPontos] = useState(initialPontos);

  return (
    <main className={cn("flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-[#D9A8B6] to-background transition-colors duration-500 gap-8")}>
      <QuizProgressRibbon
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        bonusStep={bonusStep}
        stepLabels={stepLabels}
      />
       <div className="absolute top-4 right-4 flex items-center gap-2 text-foreground font-semibold bg-white/60 backdrop-blur-sm p-2 rounded-full shadow-lg">
        <Heart className="h-5 w-5 text-primary" />
        <span>Pontos de cuidado: {pontos}</span>
      </div>
      <QuizAnsiedade nome={nome} pontos={pontos} setPontos={setPontos} />
    </main>
  );
}

export default function QuizAnsiedadePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen w-full items-center justify-center">Carregando...</div>}>
      <QuizAnsiedadeContent />
    </Suspense>
  );
}
