
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useQuiz } from '@/contexts/QuizContext';
import { Loader2 } from 'lucide-react';

interface MirrorSliderProps {
  nome: string;
  email: string;
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
    imagem: "https://i.postimg.cc/QNvbZvGg/brava-com-a-balan-a.png",
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
    imagem: "https://i.postimg.cc/LXnzr3x0/n-o-esta-facil-mas-estou-tentando.png",
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
    imagem: "https://i.postimg.cc/W1w6r3DS/contente-que-esta-gerando.png",
    dataAiHint: "confident woman mirror",
    alt: "Mulher confiante com seu corpo em frente ao espelho",
    frase: "Meu corpo está criando uma vida!",
    corFundo: "bg-pink-200",
    corTexto: "text-pink-900",
    cta: "Quero continuar cuidando",
    emoji: "🥰"
  }
];

export default function MirrorSlider({ nome, email, setBgColor }: MirrorSliderProps) {
  const [nivel, setNivel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  
  const router = useRouter();
  const { addPoints } = useQuiz();

  const estadoAtual = useMemo(() => estados[nivel], [nivel]);

  useEffect(() => {
    console.log('[MirrorSlider] Component mounted');
  }, []);

  useEffect(() => {
      setBgColor(estadoAtual.corFundo);
      console.log(`[MirrorSlider] Background color changed to: ${estadoAtual.corFundo}`);
  }, [estadoAtual.corFundo, setBgColor]);

  const handleOptionSelect = (selectedNivel: number) => {
    setNivel(selectedNivel);
    setHasSelected(true);
    console.log(`[MirrorSlider] Option selected: ${selectedNivel}`);
  };

  const handleNext = () => {
    setIsLoading(true);
    const newPoints = addPoints(100);
    console.log(`[MirrorSlider] User chose state ${nivel}. Awarding 100 points. New total: ${newPoints}`);

    setTimeout(() => {
      const params = new URLSearchParams({
        pontos: newPoints.toString(),
        nome,
        email,
      });
      router.push(`/quiz/termometro-emocional?${params.toString()}`);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50">
       <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Como você se sente com seu corpo?</CardTitle>
         <CardDescription>Toque na opção que melhor representa como você se sente.</CardDescription>
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
                className="object-contain" 
                data-ai-hint={estadoAtual.dataAiHint}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full max-w-sm px-4 mb-6">
          <div className="flex justify-center gap-3 mb-4">
            {estados.map((estado) => (
              <motion.button
                key={estado.nivel}
                onClick={() => handleOptionSelect(estado.nivel)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200 border-2 ${
                  nivel === estado.nivel 
                    ? 'bg-gradient-to-br from-pink-500 to-purple-600 border-pink-500 shadow-lg scale-110' 
                    : 'bg-white/80 border-gray-200 hover:border-pink-300 hover:scale-105 shadow-md'
                }`}
                whileHover={{ scale: nivel === estado.nivel ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {estado.emoji}
              </motion.button>
            ))}
          </div>
          
          {hasSelected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-muted-foreground"
            >
              Você selecionou: {estadoAtual.emoji}
            </motion.div>
          )}
        </div>

        <div className="mt-4">
            <Button 
                onClick={handleNext} 
                size="lg" 
                disabled={isLoading || !hasSelected}
                className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : estadoAtual.cta}
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
