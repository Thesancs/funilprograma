"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import QuizGravidez from '@/components/funnel/QuizGravidez';
import { Heart, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function QuizPage() {
  const [pontos, setPontos] = useState(150);
  const [showPointsToast, setShowPointsToast] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    const newPoints = pontos + 100;
    setPontos(newPoints);
    setShowPointsToast(true);
    
    setTimeout(() => {
      setShowPointsToast(false);
      router.push(`/quiz/sono?pontos=${newPoints}`);
    }, 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D9A8B6] to-background p-4 gap-8">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-end items-center mb-4 relative h-8">
            <div className="flex items-center gap-2 text-foreground font-semibold">
                <Heart className="h-5 w-5 text-primary" />
                <span>Pontos de cuidado: {pontos}</span>
            </div>
            <div className={cn(
              "absolute top-0 right-0 flex items-center gap-2 text-primary font-bold transition-all duration-500",
              showPointsToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}>
              <PlusCircle className="h-5 w-5" />
              <span>+100</span>
            </div>
        </div>
        <QuizGravidez />
        <div className="mt-8 text-center">
            <Button size="lg" onClick={handleNext} disabled={showPointsToast}>
                Avançar
            </Button>
        </div>
      </div>
    </main>
  );
}
