
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useQuiz } from '@/contexts/QuizContext';

type OpcaoSono = "nenhuma" | "facil" | "mal" | "pessimo";

interface QuizSonoProps {
  nome: string;
  email: string;
  selecionado: OpcaoSono;
  setSelecionado: (value: OpcaoSono) => void;
}

const textColors: Record<OpcaoSono, string> = {
  nenhuma: "text-foreground",
  facil: "text-white",
  mal: "text-white",
  pessimo: "text-white",
};

const opcoes = [
  { id: 'facil', emoji: '😴', label: 'Durmo fácil' },
  { id: 'mal', emoji: '😐', label: 'Durmo mal às vezes' },
  { id: 'pessimo', emoji: '😩', label: 'Não durmo nada bem' },
] as const;

export default function QuizSono({ nome, email, selecionado, setSelecionado }: QuizSonoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { pontos, addPoints } = useQuiz();

  useEffect(() => {
    console.log('[QuizSono] Component mounted');
  }, []);
  
  const textColor = textColors[selecionado];

  // Avançar automaticamente ao selecionar uma opção (botão removido)
  const handleSelect = (opcao: OpcaoSono) => {
    if (isLoading) return;
    setSelecionado(opcao);
    console.log(`[QuizSono] Opção selecionada: ${opcao}`);
    setIsLoading(true);

    const newPoints = addPoints(100);
    console.log('[QuizSono] +100 pontos adicionados');
    console.log('[QuizSono] Avançando para a próxima etapa...');

    setTimeout(() => {
      const params = new URLSearchParams({
        pontos: newPoints.toString(),
        nome,
        email,
      });
      router.push(`/quiz/ansiedade?${params.toString()}`);
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-lg mx-auto flex-1 p-4">
        <div className={cn("w-full flex justify-end items-center mb-4", textColor)}>
              <Card className="flex items-center gap-2 font-semibold bg-black/10 backdrop-blur-sm p-2 rounded-full shadow-lg text-inherit">
                <Heart className="h-5 w-5" />
                <span>Pontos de cuidado: {pontos}</span>
            </Card>
        </div>

        <div className="text-center">
            <Card className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/20 text-white">
            <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                Como está seu sono?
                </CardTitle>
                 <CardDescription className={cn("text-white/80", textColor)}>
                    Selecione a opção que melhor descreve suas noites.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {opcoes.map((opcao) => (
                    <Card
                    key={opcao.id}
                    onClick={() => handleSelect(opcao.id)}
                    className={cn(
                        "p-6 bg-white/20 border-2 border-transparent rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/30",
                        {
                        "border-white scale-105 bg-white/40": selecionado === opcao.id,
                        "opacity-70 hover:opacity-100": selecionado !== "nenhuma" && selecionado !== opcao.id,
                        "pointer-events-none opacity-60": isLoading
                        }
                    )}
                    >
                    <div className="text-4xl mb-2">{opcao.emoji}</div>
                    <p className="font-semibold">{opcao.label}</p>
                    </Card>
                ))}
                </div>
            </CardContent>
            </Card>
            
            {/* Removido o botão "Continuar" */}
        </div>
    </div>
  );
}
