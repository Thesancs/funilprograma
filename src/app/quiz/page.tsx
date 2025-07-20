"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import QuizGravidez from '@/components/funnel/QuizGravidez';
import { Heart, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function QuizPage() {
  const [pontos, setPontos] = useState(150);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    toast({
        title: "🎉 Bem-vinda! Você ganhou 150 Pontos de Cuidado!",
        description: "Responda o quiz para ganhar mais pontos.",
        duration: 4000,
    });
  }, [toast]);

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
    }, 1500);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D9A8B6] to-background p-4 gap-8">
      <div className="w-full max-w-md mx-auto">
        <div className="w-full flex justify-end items-center mb-4">
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
