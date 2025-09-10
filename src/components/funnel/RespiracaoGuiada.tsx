
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { useQuiz } from '@/contexts/QuizContext';
import { Loader2, ArrowRight } from 'lucide-react';

interface RespiracaoGuiadaProps {
  nome: string;
  email: string;
}

const CYCLE_PHASES = [
  { name: 'Inspire', duration: 4 },
  { name: 'Segure', duration: 4 },
  { name: 'Expire', duration: 6 },
];
const CYCLE_DURATION = CYCLE_PHASES.reduce((acc, phase) => acc + phase.duration, 0);
const TOTAL_CYCLES = 3;
const TOTAL_DURATION = CYCLE_DURATION * TOTAL_CYCLES;
const PRE_START_COUNTDOWN = 5;


export default function RespiracaoGuiada({ nome, email }: RespiracaoGuiadaProps) {
  const [status, setStatus] = useState<'initial' | 'countdown' | 'running' | 'finished'>('initial');
  const [countdown, setCountdown] = useState(PRE_START_COUNTDOWN);
  const [timeLeft, setTimeLeft] = useState(TOTAL_DURATION);
  const [currentPhase, setCurrentPhase] = useState('Expire');
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(CYCLE_PHASES[2].duration);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { pontos, addPoints } = useQuiz();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (status === 'countdown' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && status === 'countdown') {
       setStatus('running');
    }

    if (status === 'running' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && status === 'running') {
      setStatus('finished');
      addPoints(150, {
          title: "🎁 Bônus Desbloqueado!",
          description: "Você se sente mais calma agora.",
      });
    }
    return () => clearInterval(timer);
  }, [status, timeLeft, addPoints, countdown]);

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
    
    const params = new URLSearchParams({
      pontos: pontos.toString(),
      nome,
      email,
    });
    router.push(`/quiz/alimentacao?${params.toString()}`);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  const animationVariants = {
    initial: { scale: 1 },
    inspire: {
      scale: 1.5,
      transition: { duration: CYCLE_PHASES[0].duration, ease: 'easeInOut' },
    },
    segure: {
      scale: 1.5,
      transition: { duration: CYCLE_PHASES[1].duration, ease: 'easeInOut' },
    },
    expire: {
      scale: 1,
      transition: { duration: CYCLE_PHASES[2].duration, ease: 'easeInOut' },
    },
  };
  
  const getAnimationState = () => {
    if (status !== 'running') return 'initial';
    switch (currentPhase) {
      case 'Inspire': return 'inspire';
      case 'Segure': return 'segure';
      case 'Expire': return 'expire';
      default: return 'initial';
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto text-center bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[30rem]">
            {status === 'initial' && (
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex flex-col items-center gap-4">
                <Image
                    src="https://i.postimg.cc/CKnpvMYC/file-00000000cb4461f9915920b0f307dcdf.png"
                    alt="Mulher meditando"
                    width={150}
                    height={150}
                    className="mb-2 rounded-full"
                    data-ai-hint="woman meditating"
                />
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Vamos respirar juntas?
                </h2>
                 <CardDescription>
                    Um exercício rápido para acalmar a mente. Siga as instruções na tela.
                </CardDescription>

                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 my-2">
                    <div className="flex-1 bg-background/50 p-2 rounded-lg shadow-md text-center">
                        <p className="font-semibold text-sm">Inspire por 4 segundos</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 hidden sm:block" />
                    <div className="flex-1 bg-background/50 p-2 rounded-lg shadow-md text-center">
                        <p className="font-semibold text-sm">Segure por 4 segundos</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 hidden sm:block" />
                    <div className="flex-1 bg-background/50 p-2 rounded-lg shadow-md text-center">
                        <p className="font-semibold text-sm">Expire por 6 segundos</p>
                    </div>
                </div>

                <Button
                    onClick={handleStart}
                    size="lg"
                    className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 mt-4"
                >
                    Iniciar Respiração Guiada
                </Button>
                
                <Button
                    onClick={handleNext}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground mt-2 underline"
                >
                    Pular exercício
                </Button>
                </motion.div>
            )}
            
            {status === 'countdown' && (
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex flex-col items-center justify-center gap-4">
                <p className="text-lg font-medium text-foreground">Prepare-se...</p>
                <p className="text-6xl font-bold text-primary">{countdown}</p>
              </motion.div>
            )}

            {status === 'running' && (
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex flex-col items-center justify-center gap-8">
                    <p className="text-sm font-medium text-foreground">⏳ Tempo restante: {formatTime(timeLeft)}</p>
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
                        <motion.div
                            className='absolute rounded-full bg-primary/30 w-full h-full'
                            variants={animationVariants}
                            animate={getAnimationState()}
                        />
                        <motion.div
                             className='absolute rounded-full bg-primary/60 w-3/4 h-3/4'
                             variants={animationVariants}
                             animate={getAnimationState()}
                        />
                        <div className="z-10 text-white drop-shadow-lg flex flex-col items-center">
                          <AnimatePresence mode="wait">
                              <motion.span
                                  key={currentPhase}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.5 }}
                                  className="text-2xl font-bold"
                              >
                                {currentPhase}
                              </motion.span>
                          </AnimatePresence>
                          <span className="text-xl font-mono">{phaseTimeLeft}</span>
                        </div>
                    </div>
                </motion.div>
            )}

            {status === 'finished' && (
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center">
                <h2 className="text-xl font-medium text-foreground">
                    🎉 Uau! Que relaxante!
                </h2>
                <p className="text-muted-foreground mt-2">Você se sente mais calma agora.</p>
                <Button
                    onClick={handleNext}
                    disabled={isLoading}
                    size="lg"
                    className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 mt-6"
                >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Continuar
                </Button>
                </motion.div>
            )}
        </CardContent>
    </Card>
  );
}
