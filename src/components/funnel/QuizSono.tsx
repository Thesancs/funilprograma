"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Heart, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type OpcaoSono = "nenhuma" | "facil" | "mal" | "pessimo";

interface QuizSonoProps {
  nome: string;
  pontos: number;
  setPontos: React.Dispatch<React.SetStateAction<number>>;
}

const bgColors: Record<OpcaoSono, string> = {
  nenhuma: "bg-gradient-to-b from-[#D9A8B6] to-background",
  facil: "bg-[#344154]",
  mal: "bg-[#B3A4D4]",
  pessimo: "bg-[#B16262]",
};

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

export default function QuizSono({ nome, pontos, setPontos }: QuizSonoProps) {
  const [selecionado, setSelecionado] = useState<OpcaoSono>("nenhuma");
  const [bgColor, setBgColor] = useState(bgColors.nenhuma);
  const [textColor, setTextColor] = useState(textColors.nenhuma);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    console.log('[QuizSono] Component mounted');
  }, []);

  const handleSelect = (opcao: OpcaoSono) => {
    setSelecionado(opcao);
    setBgColor(bgColors[opcao]);
    setTextColor(textColors[opcao]);
    console.log(`[QuizSono] Opção selecionada: ${opcao}`);
  };

  const handleNext = () => {
    setIsLoading(true);
    const newPoints = pontos + 100;
    setPontos(newPoints);
    
    toast({
        title: "✨ +100 Pontos de Cuidado!",
        description: "Seu bem-estar é nossa prioridade.",
        duration: 3000,
    });
    console.log('[QuizSono] +100 pontos adicionados');

    console.log('[QuizSono] Avançando para a próxima etapa...');
    setTimeout(() => {
      router.push(`/quiz/ansiedade?pontos=${newPoints}&nome=${encodeURIComponent(nome)}`);
    }, 1500);
  };

  return (
    <main className={cn("flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-500", bgColor)}>
        <div className="w-full max-w-lg mx-auto">
            <div className={cn("w-full flex justify-end items-center mb-4", textColor)}>
                <div className="flex items-center gap-2 font-semibold">
                    <Heart className="h-5 w-5" />
                    <span>Pontos de cuidado: {pontos}</span>
                </div>
            </div>

            <div className="text-center">
                <Card className="bg-card/90 text-card-foreground shadow-xl backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl font-bold">
                    Como está seu sono?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {opcoes.map((opcao) => (
                        <Card
                        key={opcao.id}
                        onClick={() => handleSelect(opcao.id)}
                        className={cn(
                            "p-6 bg-background/50 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:bg-accent/80",
                            {
                            "border-primary scale-105 bg-accent": selecionado === opcao.id,
                            "border-transparent opacity-70 hover:opacity-100": selecionado !== "nenhuma" && selecionado !== opcao.id,
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
                
                <div className="mt-12">
                    <Button
                    onClick={handleNext}
                    disabled={selecionado === "nenhuma" || isLoading}
                    size="lg"
                    className="bg-[#9D4C63] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Continuar
                    </Button>
                </div>
            </div>
        </div>
    </main>
  );
}
