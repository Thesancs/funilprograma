
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight } from 'lucide-react';

interface RespiracaoGuiadaProps {
  nome: string;
  pontos: number;
  setPontos: React.Dispatch<React.SetStateAction<number>>;
}

const TOTAL_DURATION = 30; // 30 segundos de exercício
const PRE_START_COUNTDOWN = 5; // 5 segundos antes de começar
const CYCLE_PHASES = [
  { name: 'Inspire', duration: 4 },
  { name: 'Segure', duration: 4 },
  { name: 'Expire', duration: 6 },
];
const CYCLE_DURATION = CYCLE_PHASES.reduce((acc, phase) => acc + phase.duration, 0);


export default function RespiracaoGuiada({ nome, pontos, setPontos }: RespiracaoGuiadaProps) {
  const [status, setStatus] = useState<'initial' | 'countdown' | 'running' | 'finished'>('initial');
  const [countdown, setCountdown] = useState(PRE_START_COUNTDOWN);
  const [timeLeft, setTimeLeft] = useState(TOTAL_DURATION);
  const [currentPhase, setCurrentPhase] = useState('Expire');
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(CYCLE_PHASES[2].duration);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (status === 'countdown' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && status === 'countdown') {
       setStatus('running');
       setIsAnimating(true);
    }

    if (status === 'running' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && status === 'running') {
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
  }, [status, timeLeft, pontos, setPontos, toast, router, countdown]);

  useEffect(() => {
    if (status !== 'running') {
        if (status === 'initial') {
            setCurrentPhase('Expire');
            setPhaseTimeLeft(CYCLE_PHASES[2].duration)
        }
        return;
    }

    const elapsedSeconds = TOTAL_DURATION - timeLeft;
    const currentCycleTime = elapsedSeconds % CYCLE_DURATION;

    let phaseName = 'Expire';
    let timeInPhase = 0;

    if (currentCycleTime < CYCLE_PHASES[0].duration) {
      phaseName = 'Inspire';
      timeInPhase = currentCycleTime;
      setPhaseTimeLeft(CYCLE_PHASES[0].duration - timeInPhase);
    } else if (currentCycleTime < CYCLE_PHASES[0].duration + CYCLE_PHASES[1].duration) {
      phaseName = 'Segure';
      timeInPhase = currentCycleTime - CYCLE_PHASES[0].duration;
      setPhaseTimeLeft(CYCLE_PHASES[1].duration - timeInPhase);
    } else {
      phaseName = 'Expire';
      timeInPhase = currentCycleTime - (CYCLE_PHASES[0].duration + CYCLE_PHASES[1].duration);
      setPhaseTimeLeft(CYCLE_PHASES[2].duration - timeInPhase);
    }
    
    if (phaseName !== currentPhase) {
        setCurrentPhase(phaseName);
    }
    
  }, [timeLeft, status, currentPhase]);

  const handleStart = () => {
    console.log('[RespiracaoGuiada] Iniciando contagem regressiva');
    setStatus('countdown');
  };

  const handleNext = () => {
    setIsLoading(true);
    console.log('[RespiracaoGuiada] Navegando para a próxima etapa');
    
    router.push(`/quiz/alimentacao?pontos=${pontos}&nome=${encodeURIComponent(nome)}`);
  };

  const getCircleClass = () => {
    if (!isAnimating) return 'scale-100';
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto text-center">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[30rem]">
            {status === 'initial' && (
                <div className="animate-in fade-in duration-500 flex flex-col items-center gap-4">
                <Image
                    src="https://i.imgur.com/RqvBZIk.png"
                    alt="Mulher meditando"
                    width={150}
                    height={150}
                    className="mb-2 rounded-full"
                    data-ai-hint="woman meditating"
                />
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Vamos respirar juntas?
                </h2>

                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 my-2">
                    <div className="flex-1 bg-background p-2 rounded-lg shadow-md text-center">
                        <p className="font-semibold text-sm">Inspire por 4 segundos</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 hidden sm:block" />
                    <div className="flex-1 bg-background p-2 rounded-lg shadow-md text-center">
                        <p className="font-semibold text-sm">Segure por 4 segundos</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 hidden sm:block" />
                    <div className="flex-1 bg-background p-2 rounded-lg shadow-md text-center">
                        <p className="font-semibold text-sm">Expire por 6 segundos</p>
                    </div>
                </div>

                <Button
                    onClick={handleStart}
                    size="lg"
                    className="bg-[#9D4C63] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 mt-4"
                >
                    Iniciar Respiração Guiada
                </Button>
                <Button
                    onClick={handleNext}
                    variant="link"
                    className="mt-2"
                >
                    Pular
                </Button>
                </div>
            )}
            
            {status === 'countdown' && (
              <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
                <p className="text-lg font-medium text-foreground">Prepare-se...</p>
                <p className="text-6xl font-bold text-primary">{countdown}</p>
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
                            currentPhase === 'Inspire' && 'duration-[4000ms]',
                            currentPhase === 'Segure' && 'duration-[4000ms]',
                            currentPhase === 'Expire' && 'duration-[6000ms]'
                            )}
                        />
                        <div
                            className={cn(
                            'absolute rounded-full bg-primary/60 w-3/4 h-3/4 transition-transform ease-in-out',
                            getCircleClass(),
                            currentPhase === 'Inspire' && 'duration-[4000ms]',
                            currentPhase === 'Segure' && 'duration-[4000ms]',
                            currentPhase === 'Expire' && 'duration-[6000ms]'
                            )}
                        />
                        <div className="z-10 text-white drop-shadow-lg flex flex-col items-center">
                            <span className="text-2xl font-bold">{currentPhase}</span>
                            <span className="text-xl font-mono">{phaseTimeLeft}</span>
                        </div>
                    </div>
                </div>
            )}

            {status === 'finished' && (
                <div className="animate-in fade-in duration-500 text-center">
                <h2 className="text-xl font-medium text-[#344154]">
                    🎉 Uau! Que relaxante!
                </h2>
                <p className="text-muted-foreground mt-2">Você se sente mais calma agora.</p>
                <Button
                    onClick={handleNext}
                    disabled={isLoading}
                    size="lg"
                    className="rounded-full bg-[#344154] text-white px-8 py-6 text-base mt-6 transition-transform hover:scale-105"
                >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Continuar
                </Button>
                </div>
            )}
        </CardContent>
    </Card>
  );
}
