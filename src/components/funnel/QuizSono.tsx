"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

type OpcaoSono = "nenhuma" | "facil" | "mal" | "pessimo";

interface QuizSonoProps {
  pontos: number;
  setPontos: React.Dispatch<React.SetStateAction<number>>;
}

const bgColors: Record<OpcaoSono, string> = {
  nenhuma: "bg-gradient-to-b from-[#D9A8B6] to-background",
  facil: "bg-[#344154]", // Azul escuro
  mal: "bg-[#B3A4D4]", // Roxo claro
  pessimo: "bg-[#B16262]", // Vermelho suave
};

const opcoes = [
  { id: 'facil', emoji: '😴', label: 'Dorme fácil' },
  { id: 'mal', emoji: '😐', label: 'Dorme mal às vezes' },
  { id: 'pessimo', emoji: '😩', label: 'Não dorme nada bem' },
] as const;


export default function QuizSono({ pontos, setPontos }: QuizSonoProps) {
  const [selecionado, setSelecionado] = useState<OpcaoSono>("nenhuma");
  const [bgColor, setBgColor] = useState(bgColors.nenhuma);
  const router = useRouter();

  useEffect(() => {
    console.log('[QuizSono] Component mounted');
  }, []);

  const handleSelect = (opcao: OpcaoSono) => {
    if (selecionado === "nenhuma") {
      setPontos(prev => prev + 100);
      console.log('[QuizSono] +100 pontos adicionados');
    }
    setSelecionado(opcao);
    setBgColor(bgColors[opcao]);
    console.log(`[QuizSono] Opção selecionada: ${opcao}`);
  };

  const handleNext = () => {
    console.log('[QuizSono] Avançando para a próxima etapa...');
    // router.push('/proxima-etapa'); // Navegar para a próxima página do quiz
  };

  return (
    <main className={cn("flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-500", bgColor)}>
      <div className="absolute top-4 right-4 flex items-center gap-2 text-white font-semibold">
        <Heart className="h-5 w-5 text-white/80" />
        <span>Pontos de cuidado: {pontos}</span>
      </div>

      <div className="w-full max-w-lg text-center">
        <Card className="bg-card text-card-foreground shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              😴 Como está seu sono?
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
            disabled={selecionado === "nenhuma"}
            size="lg"
            className="bg-[#9D4C63] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Continuar
            </Button>
        </div>
      </div>
    </main>
  );
}
