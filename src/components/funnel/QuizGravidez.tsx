"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const bellySizes = [
  { rx: 10, ry: 10 }, // 1º trimestre
  { rx: 60, ry: 80 }, // 2º trimestre
  { rx: 90, ry: 120 }, // 3º trimestre
];

export default function QuizGravidez() {
  const [trimestre, setTrimestre] = useState(1);
  const { rx, ry } = bellySizes[trimestre - 1];

  const handleSliderChange = (value: number[]) => {
    setTrimestre(value[0]);
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
             <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto drop-shadow-lg">
                <path d="M200,550 Q190,400 200,300 Q210,250 200,200 Q190,150 220,100 Q230,80 250,80 Q270,80 280,100 Q300,150 290,200 Q280,250 290,300 Q300,400 290,550 Z" fill="hsl(var(--foreground))"/>
                <ellipse id="barriga" cx="330" cy="300" rx={rx} ry={ry} fill="hsl(var(--foreground))" style={{ transition: 'all 0.3s ease-in-out' }}/>
            </svg>
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
