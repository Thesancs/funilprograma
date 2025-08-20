
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizGravidezProps {
  nome: string;
  onTrimestreSelect?: (trimestre: number) => void;
}

export default function QuizGravidez({ nome, onTrimestreSelect }: QuizGravidezProps) {
  const [trimestre, setTrimestre] = useState(1);

  const trimestreOptions = [
    {
      value: 1,
      label: "1º Trimestre",
      subtitle: "1-12 semanas",
      image: "https://i.postimg.cc/6QbJ5JQb/file-00000000c4ac623090d92775e88385ea.png"
    },
    {
      value: 2,
      label: "2º Trimestre", 
      subtitle: "13-27 semanas",
      image: "https://i.postimg.cc/3JFXvKHR/file-00000000639861f5b913eaa03392637e.png"
    },
    {
      value: 3,
      label: "3º Trimestre",
      subtitle: "28-40 semanas", 
      image: "https://i.postimg.cc/W1td1jNx/file-00000000e25461f592b3fb030b806998.png"
    }
  ];

  const handleTrimestreSelect = (value: number) => {
    setTrimestre(value);
    // Chama a função de callback após um pequeno delay para mostrar a seleção
    setTimeout(() => {
      onTrimestreSelect?.(value);
    }, 800);
  };

  const renderIllustration = () => {
    const selectedOption = trimestreOptions.find(opt => opt.value === trimestre);
    return (
      <Image
        src={selectedOption?.image || trimestreOptions[0].image}
        alt={`Ilustração do ${selectedOption?.label}`}
        width={200}
        height={256}
        className="h-full w-auto object-contain drop-shadow-lg"
        data-ai-hint="pregnant illustration"
      />
    );
  };

  return (
    <Card className="w-full max-w-md text-center bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50">
      <CardHeader>
        <CardTitle className="font-headline text-xl md:text-2xl font-bold text-foreground">
          {nome}, qual trimestre você está?
        </CardTitle>
        <CardDescription>Clique na opção que corresponde ao seu período.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6">
        <div className="w-48 h-64 flex items-center justify-center">
          {renderIllustration()}
        </div>
        
        <div className="w-full space-y-3">
          {trimestreOptions.map((option) => (
            <Button
              key={option.value}
              variant={trimestre === option.value ? "default" : "outline"}
              className={`w-full p-4 h-auto flex flex-col items-center gap-1 transition-all ${
                trimestre === option.value 
                  ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                  : "hover:bg-primary/10"
              }`}
              onClick={() => handleTrimestreSelect(option.value)}
            >
              <span className="font-semibold">{option.label}</span>
              <span className="text-sm opacity-80">{option.subtitle}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
