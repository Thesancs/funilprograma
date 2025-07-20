"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import QuizGravidez from '@/components/funnel/QuizGravidez';
import { Heart } from 'lucide-react';

export default function QuizPage() {
  const [pontos, setPontos] = useState(150);
  const router = useRouter();

  const handleNext = () => {
    router.push('/quiz/sono');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D9A8B6] to-background p-4 gap-8">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-end items-center mb-4">
            <div className="flex items-center gap-2 text-foreground font-semibold">
                <Heart className="h-5 w-5 text-primary" />
                <span>Pontos de cuidado: {pontos}</span>
            </div>
        </div>
        <QuizGravidez />
        <div className="mt-8 text-center">
            <Button size="lg" onClick={handleNext}>
                Avançar
            </Button>
        </div>
      </div>
    </main>
  );
}
