
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

interface MirrorSliderProps {
  nome: string;
  pontos: number;
  setPontos: React.Dispatch<React.SetStateAction<number>>;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
}

const estados = [
  {
    nivel: 0,
    imagem: "https://i.imgur.com/AwXVYAi.png",
    dataAiHint: "insecure woman mirror",
    alt: "Mulher com postura insegura em frente ao espelho",
    frase: "Tem dias que nem me reconheço no espelho…",
    corFundo: "bg-gray-200",
    corTexto: "text-gray-800",
    cta: "Quero me sentir melhor",
    emoji: "😟"
  },
  {
    nivel: 1,
    imagem: "https://i.imgur.com/50nslO2.jpeg",
    dataAiHint: "guilty woman mirror",
    alt: "Mulher com expressão de culpa em frente ao espelho",
    frase: "A balança virou minha inimiga…",
    corFundo: "bg-yellow-100",
    corTexto: "text-yellow-900",
    cta: "Quero entender meu corpo",
    emoji: "😔"
  },
  {
    nivel: 2,
    imagem: "https://placehold.co/600x600.png",
    dataAiHint: "accepting woman mirror",
    alt: "Mulher em processo de aceitação em frente ao espelho",
    frase: "Não está fácil, mas estou tentando.",
    corFundo: "bg-purple-100",
    corTexto: "text-purple-900",
    cta: "Quero aprender a cuidar",
    emoji: "🙂"
  },
  {
    nivel: 3,
    imagem: "https://placehold.co/600x600.png",
    dataAiHint: "confident woman mirror",
    alt: "Mulher confiante com seu corpo em frente ao espelho",
    frase: "Meu corpo está criando uma vida!",
    corFundo: "bg-pink-200",
    corTexto: "text-pink-900",
    cta: "Quero continuar cuidando",
    emoji: "🥰"
  }
];

export default function MirrorSlider({ nome, pontos, setPontos, setBgColor }: MirrorSliderProps) {
  const [nivel, setNivel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const estadoAtual = useMemo(() => estados[nivel], [nivel]);

  useEffect(() => {
    console.log('[MirrorSlider] Component mounted');
  }, []);

  useEffect(() => {
      setBgColor(estadoAtual.corFundo);
      console.log(`[MirrorSlider] Background color changed to: ${estadoAtual.corFundo}`);
  }, [estadoAtual.corFundo, setBgColor]);

  const handleSliderChange = (value: number[]) => {
    setNivel(value[0]);
    console.log(`[MirrorSlider] Slider value changed to: ${value[0]}`);
  };

  const handleNext = () => {
    setIsLoading(true);
    const pontosGanhos = 50; 
    const newPoints = pontos + pontosGanhos;
    setPontos(newPoints);
    console.log(`[MirrorSlider] User chose state ${nivel}. Awarding ${pontosGanhos} points.`);

    toast({
        title: `✨ +${pontosGanhos} Pontos de Cuidado!`,
        description: "Reconhecer seus sentimentos é o primeiro passo.",
        duration: 3000,
    });

    setTimeout(() => {
      router.push(`/quiz/termometro-emocional?pontos=${newPoints}&nome=${encodeURIComponent(nome)}`);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-card/80 backdrop-blur-sm text-card-foreground shadow-xl">
       <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Como você está se sentindo com seu corpo hoje?</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex flex-col items-center justify-center min-h-[36rem]">
        <AnimatePresence mode="wait">
            <motion.p
                key={`frase-${estadoAtual.nivel}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="text-center text-lg text-muted-foreground mb-4 h-12"
            >
                {`"${estadoAtual.frase}"`}
            </motion.p>
        </AnimatePresence>

        <div className="relative w-full aspect-square max-w-sm mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`imagem-${estadoAtual.nivel}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image 
                src={estadoAtual.imagem} 
                alt={estadoAtual.alt} 
                fill
                className="object-contain rounded-lg" 
                data-ai-hint={estadoAtual.dataAiHint}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full max-w-sm px-4">
          <Slider
            value={[nivel]}
            min={0}
            max={estados.length - 1}
            step={1}
            onValueChange={handleSliderChange}
            aria-label="Seletor de emoção corporal"
          />
          <div className="flex justify-between text-2xl mt-2 px-1">
            {estados.map(e => <span key={e.nivel}>{e.emoji}</span>)}
          </div>
        </div>

        <div className="mt-8">
            <Button 
                onClick={handleNext} 
                size="lg" 
                disabled={isLoading}
                className="bg-[#9D4C63] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : estadoAtual.cta}
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
