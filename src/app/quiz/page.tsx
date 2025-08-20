
"use client";

import { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import QuizGravidez from '@/components/funnel/QuizGravidez';
import { Heart, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useQuiz } from '@/contexts/QuizContext';
import QuizProgressRibbon from '@/components/funnel/QuizProgressRibbon';

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setStep, stepIndex, totalSteps, bonusStep, stepLabels, pontos, addPoints, setInitialPontos } = useQuiz();
  const toastShownRef = useRef(false);

  useEffect(() => {
    setStep(0);
    setInitialPontos(150);
  }, [setStep, setInitialPontos]);
  
  const [isLoading, setIsLoading] = useState(false);
  const nome = searchParams.get('nome') || 'Mamãe';
  const email = searchParams.get('email') || '';
  
  useEffect(() => {
    if (!toastShownRef.current) {
        addPoints(0, {
            title: `🎉 Bem-vinda, ${nome}! Você ganhou 150 Pontos de Cuidado!`,
            description: "Responda o quiz para ganhar mais pontos.",
            duration: 3000,
        });
        toastShownRef.current = true;
    }
  }, [addPoints, nome]);

  const handleTrimestreSelect = (trimestre: number) => {
    setIsLoading(true);
    const newPoints = addPoints(100);
    
    setTimeout(() => {
      const params = new URLSearchParams({
        pontos: newPoints.toString(),
        nome,
        email,
        trimestre: trimestre.toString(),
      });
      router.push(`/quiz/sono?${params.toString()}`);
    }, 1500);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#D9A8B6] to-background p-4">
      <QuizProgressRibbon
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        bonusStep={bonusStep}
        stepLabels={stepLabels}
      />
      <div className="h-[60px] md:h-[70px] w-full" />
      <div className="w-full max-w-md mx-auto">
        <div className="w-full flex justify-end items-center mb-4">
             <Card className="flex items-center gap-2 text-foreground font-semibold bg-white/60 backdrop-blur-sm p-2 rounded-full shadow-lg">
                <Heart className="h-5 w-5 text-primary" />
                <span>Pontos de cuidado: {pontos}</span>
            </Card>
        </div>
        <QuizGravidez nome={nome} onTrimestreSelect={handleTrimestreSelect} />
        {isLoading && (
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Avançando...</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


export default function QuizPage() {
  return (
    <Suspense fallback={
        <div className="flex min-h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    }>
      <QuizContent />
    </Suspense>
  )
}
