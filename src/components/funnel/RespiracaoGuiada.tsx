
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

interface RespiracaoGuiadaProps {
  pontos: number;
  setPontos: React.Dispatch<React.SetStateAction<number>>;
}

const TOTAL_DURATION = 70; // 5 cycles * 14s each
const CYCLE_PHASES = [
  { name: 'Inspire', duration: 4 },
  { name: 'Segure', duration: 4 },
  { name: 'Expire', duration: 6 },
];

export default function RespiracaoGuiada({ pontos, setPontos }: RespiracaoGuiadaProps) {
  const [status, setStatus] = useState<'initial' | 'running' | 'finished'>('initial');
  const [timeLeft, setTimeLeft] = useState(TOTAL_DURATION);
  const [currentPhase, setCurrentPhase] = useState(CYCLE_PHASES[0].name);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'running' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && status === 'running') {
      setStatus('finished');
      const newPoints = pontos + 150;
      setPontos(newPoints);
      toast({
          title: "🎁 +150 Pontos de Cuidado!",
          description: "Você desbloqueou uma recompensa bônus!",
          duration: 4000,
      });
    }
    return () => clearInterval(timer);
  }, [status, timeLeft, pontos, setPontos, toast]);

  useEffect(() => {
    if (status !== 'running') return;
  
    const elapsedSeconds = TOTAL_DURATION - timeLeft;
    const currentCycleTime = elapsedSeconds % 14; 
  
    if (currentCycleTime < 4) {
      setCurrentPhase('Inspire');
    } else if (currentCycleTime < 8) {
      setCurrentPhase('Segure');
    } else {
      setCurrentPhase('Expire');
    }
  }, [timeLeft, status]);

  const handleStart = () => {
    console.log('[RespiracaoGuiada] Iniciando respiração guiada');
    setStatus('running');
  };

  const handleNext = () => {
    setIsLoading(true);
    // Lógica para navegar para a próxima página do quiz
    console.log('[RespiracaoGuiada] Navegando para a próxima etapa');
    toast({
        title: "✨ Parabéns por completar o quiz!",
        description: "Seu plano personalizado está sendo criado.",
        duration: 5000,
    });
    router.push(`/`);
  };

  const getCircleClass = () => {
    switch (currentPhase) {
      case 'Inspire':
        return 'scale-150';
      case 'Segure':
        return 'scale-150';
      case 'Expire':
        return 'scale-100';
      default:
        return 'scale-100';
    }
  };
  
  const getPhaseDurationClass = () => {
    switch (currentPhase) {
      case 'Inspire':
        return 'duration-[4000ms]';
      case 'Segure':
        return 'duration-[4000ms]'; // a escala não muda, então a duração não importa aqui
      case 'Expire':
        return 'duration-[6000ms]';
      default:
        return 'duration-1000';
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div className="w-full max-w-md mx-auto text-center flex flex-col items-center justify-center h-full">
      {status === 'initial' && (
        <div className="animate-in fade-in duration-500">
          <h2 className="text-lg sm:text-xl font-medium text-[#344154]">
            🌬️ Vamos respirar juntas? <br/> Inspire 4s → Segure 4s → Expire 6s (5x)
          </h2>
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-[#9D4C63] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 mt-6"
          >
            Iniciar Respiração Guiada
          </Button>
        </div>
      )}

      {status === 'running' && (
        <div className="flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500">
            <p className="text-sm font-medium text-[#344154]">⏳ Tempo restante: {formatTime(timeLeft)}</p>
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
                <div
                    className={cn(
                    'absolute rounded-full bg-primary/30 w-full h-full transition-transform ease-in-out',
                    getCircleClass(),
                    getPhaseDurationClass()
                    )}
                />
                 <div
                    className={cn(
                    'absolute rounded-full bg-primary/60 w-3/4 h-3/4 transition-transform ease-in-out',
                    getCircleClass(),
                    getPhaseDurationClass()
                    )}
                />
                <span className="z-10 text-2xl font-bold text-white drop-shadow-lg">{currentPhase}</span>
            </div>
        </div>
      )}

      {status === 'finished' && (
        <div className="animate-in fade-in duration-500 text-center">
          <h2 className="text-xl font-medium text-[#344154]">
            🎁 Você desbloqueou uma recompensa bônus!
          </h2>
          <Button
            onClick={handleNext}
            disabled={isLoading}
            size="lg"
            className="rounded-full bg-[#344154] text-white px-8 py-6 text-base mt-6 transition-transform hover:scale-105"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Finalizar e ver meu plano
          </Button>
        </div>
      )}
    </div>
  );
}
