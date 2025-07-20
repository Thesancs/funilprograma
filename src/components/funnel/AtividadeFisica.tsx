
"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface AtividadeFisicaProps {
  pontos: number;
  setPontos: React.Dispatch<React.SetStateAction<number>>;
}

const atividades = [
  { valor: 0, label: "Descansando", emoji: "🛋️", imagem: "https://i.imgur.com/kS9j65Y.png", dataAiHint: "woman resting" },
  { valor: 1, label: "Caminhada", emoji: "🚶‍♀️", imagem: "https://i.imgur.com/mY3qkA8.png", dataAiHint: "woman walking" },
  { valor: 3, label: "Pilates", emoji: "🤸‍♀️", imagem: "https://i.imgur.com/QJ1Y1Yf.png", dataAiHint: "woman pilates" },
  { valor: 5, label: "Corrida", emoji: "🏃‍♀️", imagem: "https://i.imgur.com/bX6XQ28.png", dataAiHint: "woman running" },
];

const getAtividadeParaValor = (valor: number) => {
  if (valor === 0) return atividades[0];
  if (valor >= 1 && valor <= 2) return atividades[1];
  if (valor >= 3 && valor <= 4) return atividades[2];
  return atividades[3];
};

const getFeedbackParaValor = (valor: number) => {
  if (valor === 0) return "Vamos começar devagar! 💪";
  if (valor >= 1 && valor <= 2) return "Bom começo, continue!";
  if (valor >= 3 && valor <= 4) return "Excelente ritmo!";
  return "Uau! Mantenha essa energia!";
};

const getPontosParaValor = (valor: number) => {
  if (valor === 0) return 0;
  if (valor >= 1 && valor <= 2) return 50;
  if (valor >= 3 && valor <= 4) return 100;
  return 150;
};

export default function AtividadeFisica({ pontos, setPontos }: AtividadeFisicaProps) {
  const [frequencia, setFrequencia] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

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
    const newPoints = pontos + pontosGanhos;
    setPontos(newPoints);
    console.log('[AtividadeFisica]', frequencia);

    if (pontosGanhos > 0) {
        toast({
            title: `✨ +${pontosGanhos} Pontos de Cuidado!`,
            description: "Seu corpo agradece o movimento.",
            duration: 3000,
        });
    }

    setTimeout(() => {
      router.push(`/?pontos=${newPoints}`);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card text-card-foreground shadow-lg">
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[30rem]">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6">
          🏃‍♀️ Com que frequência você pratica atividade física por semana?
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
                        <p className="font-semibold mt-2 text-lg">{atividadeAtual.label}</p>
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
                className="bg-[#9D4C63] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Avançar
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
