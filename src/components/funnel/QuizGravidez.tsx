
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface QuizGravidezProps {
  nome: string;
}

export default function QuizGravidez({ nome }: QuizGravidezProps) {
  const [trimestre, setTrimestre] = useState(1);

  const handleSliderChange = (value: number[]) => {
    setTrimestre(value[0]);
  };

  const renderIllustration = () => {
    switch (trimestre) {
      case 1:
        return (
           <Image
            src="https://i.postimg.cc/d0t41hkw/file-00000000b23861f7ab100f65b9e19870.png"
            alt="Ilustração do primeiro trimestre"
            width={200}
            height={256}
            className="h-full w-auto object-contain drop-shadow-lg"
            data-ai-hint="pregnant illustration"
          />
        );
      case 2:
        return (
          <Image
            src="https://i.postimg.cc/3JFXvKHR/file-00000000639861f5b913eaa03392637e.png"
            alt="Ilustração do segundo trimestre"
            width={200}
            height={256}
            className="h-full w-auto object-contain drop-shadow-lg"
            data-ai-hint="pregnant illustration"
          />
        );
      case 3:
        return (
          <Image
            src="https://i.postimg.cc/W1td1jNx/file-00000000e25461f592b3fb030b806998.png"
            alt="Ilustração do terceiro trimestre"
            width={200}
            height={256}
            className="h-full w-auto object-contain drop-shadow-lg"
            data-ai-hint="pregnant illustration"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md text-center bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50">
      <CardHeader>
        <CardTitle className="font-headline text-xl md:text-2xl font-bold text-foreground">
          {nome}, qual trimestre você está?
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-8">
        <div className="w-48 h-64 flex items-center justify-center">
          {renderIllustration()}
        </div>
        
        <div className="w-full max-w-xs px-4">
            <p className="mb-4 text-center text-muted-foreground">Você está no {trimestre}º trimestre</p>
            <Slider
                defaultValue={[1]}
                value={[trimestre]}
                min={1}
                max={3}
                step={1}
                onValueChange={handleSliderChange}
            />
             <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>1º tri</span>
                <span>2º tri</span>
                <span>3º tri</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
