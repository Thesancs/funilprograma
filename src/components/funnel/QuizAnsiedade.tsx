
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { useQuiz } from '@/contexts/QuizContext';

type OpcaoAnsiedade = "alta" | "media" | "baixa";
interface QuizAnsiedadeProps {
  nome: string;
}

const frasesEmpaticas = {
  alta: "Estamos aqui por você, respira fundo. 💗",
  media: "Tudo bem se sentir assim, vamos equilibrar juntas.",
  baixa: "Que bom! Vamos manter esse bem-estar.",
};

const opcoes = [
  { id: 'alta', emoji: '😰', label: 'Alta, não consigo me concentrar' },
  { id: 'media', emoji: '😐', label: 'Mais ou menos, me sinto um pouco eufórica' },
  { id: 'baixa', emoji: '😌', label: 'Baixa, estou tranquila' },
] as const;

export default function QuizAnsiedade({ nome }: QuizAnsiedadeProps) {
  const [selecionado, setSelecionado] = useState<OpcaoAnsiedade | null>(null);
  const [frase, setFrase] = useState("");
  const router = useRouter();
  const { addPoints } = useQuiz();

  const handleSelect = (opcao: OpcaoAnsiedade) => {
    if (selecionado) return; // Previne múltiplas seleções

    console.log('[QuizAnsiedade] Opção selecionada:', opcao);
    setSelecionado(opcao);
    setFrase(frasesEmpaticas[opcao]);
    
    const newPoints = addPoints(100);

    setTimeout(() => {
      console.log('Navegando para a proxima etapa...');
      router.push(`/quiz/respiracao?pontos=${newPoints}&nome=${encodeURIComponent(nome)}`);
    }, 2500);
  };

  return (
    <Card className="w-full max-w-md mx-auto text-center bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50 p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
         Como está sua ansiedade?
      </h2>
       <CardDescription className="mb-6">
        Toque na opção que mais se aproxima de como você se sente agora.
      </CardDescription>
      <div className="flex flex-col gap-4">
        {opcoes.map((opcao) => (
          <Card
            key={opcao.id}
            onClick={() => handleSelect(opcao.id)}
            className={cn(
              "w-full p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 transform bg-white/50",
              "hover:scale-105 hover:ring-2 hover:ring-primary",
              {
                "ring-2 ring-primary scale-105": selecionado === opcao.id,
                "opacity-50": selecionado !== null && selecionado !== opcao.id,
              }
            )}
            aria-label={opcao.label}
          >
            <CardContent className="p-0 flex items-center gap-4">
              <span className="text-3xl">{opcao.emoji}</span>
              <span className="font-semibold text-left">{opcao.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      {frase && (
         <div className="mt-6 animate-in fade-in duration-500">
            <p className="text-lg italic text-foreground/80">{frase}</p>
         </div>
      )}
    </Card>
  );
}
