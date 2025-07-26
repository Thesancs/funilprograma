
"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useQuiz } from '@/contexts/QuizContext';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface AtividadeFisicaProps {
  nome: string;
}

const atividades = [
  { valor: 0, label: "Nenhuma vez", emoji: "😴", imagem: "https://i.imgur.com/W5NUJsd.png", dataAiHint: "woman resting" },
  { valor: 1, label: "1 a 2 vezes", emoji: "🚶‍♀️", imagem: "https://i.imgur.com/65EKzvH.png", dataAiHint: "woman walking" },
  { valor: 3, label: "3 a 4 vezes", emoji: "🤸‍♀️", imagem: "https://i.imgur.com/DE7vElV.png", dataAiHint: "woman pilates" },
  { valor: 5, label: "5 a 6 vezes", emoji: "🏃‍♀️", imagem: "https://i.imgur.com/ljJh5oa.png", dataAiHint: "woman running" },
  { valor: 7, label: "Todos os dias", emoji: "🔥", imagem: "https://i.imgur.com/spabmNB.jpeg", dataAiHint: "daily exercise" }
];

const getAtividadeParaValor = (valor: number) => {
  if (valor === 0) return atividades[0];
  if (valor >= 1 && valor <= 2) return atividades[1];
  if (valor >= 3 && valor <= 4) return atividades[2];
  if (valor >= 5 && valor <= 6) return atividades[3];
  return atividades[4];
};

const getFeedbackParaValor = (valor: number) => {
  if (valor === 0) return "Vamos começar devagar! 💪";
  if (valor >= 1 && valor <= 2) return "Bom começo, continue!";
  if (valor >= 3 && valor <= 4) return "Excelente ritmo!";
  if (valor >= 5 && valor <= 6) return "Uau! Mantenha essa energia!";
  return "Incrível! Você é uma inspiração!";
};

const getPontosParaValor = (valor: number) => {
  if (valor === 0) return 0;
  if (valor >= 1 && valor <= 2) return 50;
  if (valor >= 3 && valor <= 4) return 100;
  if (valor >= 5 && valor <= 6) return 150;
  return 200;
};

export default function AtividadeFisica({ nome }: AtividadeFisicaProps) {
  const [frequencia, setFrequencia] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { pontos, addPoints } = useQuiz();

  const atividadeAtual = useMemo(() => getAtividadeParaValor(frequencia), [frequencia]);
  const feedbackAtual = useMemo(() => getFeedbackParaValor(frequencia), [frequencia]);

  const handleSliderChange = (value: number[]) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setFrequencia(value[0]);
  };

  const handleNext = () => {
    setIsLoading(true);
    const pontosGanhos = getPontosParaValor(frequencia);
    const newPoints = addPoints(pontosGanhos);
    console.log('[AtividadeFisica]', frequencia);

    setTimeout(() => {
      router.push(`/quiz/espelho?pontos=${newPoints}&nome=${encodeURIComponent(nome)}`);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50 text-card-foreground">
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[30rem]">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6">
          Com que frequência você pratica atividade física por semana?
        </h2>

        <div className="w-full flex flex-col items-center gap-6">
            <div className="relative w-48 h-48">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={atividadeAtual.label}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex flex-col items-center justify-center"
                    >
                        <Image src={atividadeAtual.imagem} alt={atividadeAtual.label} width={150} height={150} className="drop-shadow-lg" data-ai-hint={atividadeAtual.dataAiHint}/>
                        <p className="font-semibold mt-2 text-lg">{atividadeAtual.label} {atividadeAtual.emoji}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="w-full max-w-xs px-4">
                <Slider
                    defaultValue={[0]}
                    value={[frequencia]}
                    min={0}
                    max={7}
                    step={1}
                    onValueChange={handleSliderChange}
                    aria-label="Número de treinos por semana"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0x</span>
                    <span>7x</span>
                </div>
            </div>
            
            <p className="text-center text-muted-foreground h-6 font-medium">{feedbackAtual}</p>
        </div>


        <div className="mt-8">
            <Button 
                onClick={handleNext} 
                size="lg" 
                disabled={!hasInteracted || isLoading}
                className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Avançar
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
