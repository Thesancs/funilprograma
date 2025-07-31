
"use client";

import { useState, useEffect, Suspense } from 'react';
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

  useEffect(() => {
    setStep(0);
    setInitialPontos(150);
  }, [setStep, setInitialPontos]);
  
  const [isLoading, setIsLoading] = useState(false);
  const nome = searchParams.get('nome') || 'Mamãe';
  const email = searchParams.get('email') || '';
  
  useEffect(() => {
    addPoints(0, {
        title: `🎉 Bem-vinda, ${nome}! Você ganhou 150 Pontos de Cuidado!`,
        description: "Responda o quiz para ganhar mais pontos.",
        duration: 4000,
    });
  }, [addPoints, nome]);

  const handleNext = () => {
    setIsLoading(true);
    const newPoints = addPoints(100);
    
    setTimeout(() => {
      const params = new URLSearchParams({
        pontos: newPoints.toString(),
        nome,
        email,
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
        <QuizGravidez nome={nome} />
        <div className="mt-8 text-center">
            <Button 
              size="lg" 
              onClick={handleNext} 
              disabled={isLoading} 
              className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Avançar
            </Button>
        </div>
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
