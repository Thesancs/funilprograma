
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { useQuiz } from '@/contexts/QuizContext';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface AtividadeFisicaProps {
  nome: string;
  email: string;
}

const atividades = [
  { valor: 0, label: "Nenhuma vez", emoji: "😴", imagem: "https://i.imgur.com/W5NUJsd.png", dataAiHint: "woman resting", feedback: "Vamos começar devagar! 💪" },
  { valor: 2, label: "1 a 2 vezes", emoji: "🚶‍♀️", imagem: "https://i.imgur.com/65EKzvH.png", dataAiHint: "woman walking", feedback: "Bom começo, continue!" },
  { valor: 4, label: "3 a 4 vezes", emoji: "🤸‍♀️", imagem: "https://i.imgur.com/DE7vElV.png", dataAiHint: "woman pilates", feedback: "Excelente ritmo!" },
  { valor: 6, label: "5 a 6 vezes", emoji: "🏃‍♀️", imagem: "https://i.imgur.com/ljJh5oa.png", dataAiHint: "woman running", feedback: "Uau! Mantenha essa energia!" },
  { valor: 7, label: "Todos os dias", emoji: "🔥", imagem: "https://i.postimg.cc/NF25xNdB/todos-os-dias.png", dataAiHint: "daily exercise", feedback: "Incrível! Você é uma inspiração!" }
];

export default function AtividadeFisica({ nome, email }: AtividadeFisicaProps) {
  const [frequenciaSelecionada, setFrequenciaSelecionada] = useState<number | null>(null);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  
  // Verificação de segurança para o contexto
  let addPoints: (value: number) => number;
  try {
    const quizContext = useQuiz();
    addPoints = quizContext.addPoints;
  } catch (error) {
    console.warn('QuizContext não disponível, usando fallback');
    addPoints = (value: number) => value; // Fallback simples
  }

  // Mostra a atividade selecionada ou a que está sendo hovereada
  const atividadeParaMostrar = atividades.find(a => 
    a.valor === (frequenciaSelecionada !== null ? frequenciaSelecionada : hoveredOption)
  );

  const handleNext = () => {
    if (frequenciaSelecionada === null) return;
    
    setIsLoading(true);
    const newPoints = addPoints(100);
    console.log('[AtividadeFisica]', {frequencia: frequenciaSelecionada, newPoints});

    setTimeout(() => {
      const params = new URLSearchParams({
        pontos: newPoints.toString(),
        nome,
        email,
      });
      router.push(`/quiz/espelho?${params.toString()}`);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50 text-card-foreground">
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[30rem]">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-2">
          Com que frequência você pratica atividade física por semana?
        </h2>
        <CardDescription className="mb-6 text-center">
          {frequenciaSelecionada === null ? "Passe o mouse sobre as opções para ver uma prévia" : "Clique na opção que melhor te representa."}
        </CardDescription>

        {/* Área da imagem - sempre visível */}
        <div className="w-full flex flex-col items-center gap-4 mb-6 min-h-[180px]">
          <div className="relative w-32 h-32">
            <AnimatePresence mode="wait">
              {atividadeParaMostrar && (
                <motion.div
                  key={atividadeParaMostrar.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex flex-col items-center justify-center"
                >
                  <Image 
                    src={atividadeParaMostrar.imagem} 
                    alt={atividadeParaMostrar.label} 
                    width={120} 
                    height={120} 
                    className={`drop-shadow-lg transition-opacity duration-300 ${
                      frequenciaSelecionada === null && hoveredOption !== null ? 'opacity-70' : 'opacity-100'
                    }`}
                    data-ai-hint={atividadeParaMostrar.dataAiHint}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {atividadeParaMostrar && (
            <motion.p 
              key={atividadeParaMostrar.feedback}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center font-medium transition-colors duration-300 ${
                frequenciaSelecionada === null && hoveredOption !== null 
                  ? 'text-muted-foreground' 
                  : 'text-primary'
              }`}
            >
              {frequenciaSelecionada === null && hoveredOption !== null 
                ? `Prévia: ${atividadeParaMostrar.feedback}` 
                : atividadeParaMostrar.feedback
              }
            </motion.p>
          )}
        </div>

        <div className="w-full space-y-3 mb-6">
          {atividades.map((atividade) => (
            <Button
              key={atividade.valor}
              variant={frequenciaSelecionada === atividade.valor ? "default" : "outline"}
              className={`w-full p-4 h-auto flex items-center gap-3 transition-all duration-300 ${
                frequenciaSelecionada === atividade.valor 
                  ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                  : hoveredOption === atividade.valor
                  ? "bg-primary/20 border-primary/50 scale-102"
                  : "hover:bg-primary/10"
              }`}
              onClick={() => setFrequenciaSelecionada(atividade.valor)}
              onMouseEnter={() => setHoveredOption(atividade.valor)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <span className="text-2xl">{atividade.emoji}</span>
              <span className="font-semibold">{atividade.label}</span>
            </Button>
          ))}
        </div>

        <Button 
          onClick={handleNext} 
          disabled={frequenciaSelecionada === null || isLoading}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-full transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            'Continuar'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
