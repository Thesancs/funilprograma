"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import QuizGravidez from '@/components/funnel/QuizGravidez';
import { Heart, PlusCircle, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

export default function QuizPage() {
  const [pontos, setPontos] = useState(150);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleNext = () => {
    setIsLoading(true);
    const newPoints = pontos + 100;
    setPontos(newPoints);
    
    toast({
        title: "✨ +100 Pontos de Cuidado!",
        description: "Você está no caminho certo para uma gestação saudável.",
        duration: 3000,
    });
    
    setTimeout(() => {
      router.push(`/quiz/sono?pontos=${newPoints}`);
    }, 1500); // Reduced delay to make navigation faster after toast
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D9A8B6] to-background p-4 gap-8">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-end items-center mb-4 relative h-8">
            <div className="flex items-center gap-2 text-foreground font-semibold">
                <Heart className="h-5 w-5 text-primary" />
                <span>Pontos de cuidado: {pontos}</span>
            </div>
        </div>
        <QuizGravidez />
        <div className="mt-8 text-center">
            <Button size="lg" onClick={handleNext} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Avançar
            </Button>
        </div>
      </div>
    </main>
  );
}
