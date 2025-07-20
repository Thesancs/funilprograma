"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const bellySizes = [
  { rx: 10, ry: 10 }, // 1º trimestre
  { rx: 60, ry: 80 }, // 2º trimestre - not used for rx/ry, but keeps array consistent
  { rx: 90, ry: 120 }, // 3º trimestre - not used for rx/ry, but keeps array consistent
];

export default function QuizGravidez() {
  const [trimestre, setTrimestre] = useState(1);
  const { rx, ry } = bellySizes[trimestre - 1];

  const handleSliderChange = (value: number[]) => {
    setTrimestre(value[0]);
  };

  const renderIllustration = () => {
    switch (trimestre) {
      case 1:
        return (
           <Image
            src="https://i.imgur.com/LMrbhFK.png"
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
            src="https://i.imgur.com/KYaEIoA.png"
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
            src="https://i.imgur.com/ogSgUmF.png"
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
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle className="font-headline text-xl md:text-2xl font-bold text-foreground">
          Você está no {trimestre}º trimestre
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-8">
        <div className="w-48 h-64 flex items-center justify-center">
          {renderIllustration()}
        </div>
        
        <div className="w-full max-w-xs px-4">
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
