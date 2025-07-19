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
                <path d="M290,90 C285,60 325,60 320,90 Q320,110 305,110 Q290,110 290,90 Z" fill="hsl(var(--foreground))"/>
                <rect x="295" y="110" width="10" height="15" fill="hsl(var(--foreground))"/>
                <path d="M270,125 Q260,150 265,180 Q270,210 260,260 Q250,320 260,370 Q270,420 265,470 Q260,520 270,550 Q310,550 350,550 Q360,520 355,470 Q350,420 360,370 Q370,320 360,260 Q350,210 355,180 Q360,150 350,125 Z" fill="hsl(var(--foreground))"/>
                <path d="M260,160 Q250,210 260,260 Q270,210 260,160 Z" fill="hsl(var(--foreground))"/>
                <path d="M350,160 Q360,210 350,260 Q340,210 350,160 Z" fill="hsl(var(--foreground))"/>
                <ellipse id="barriga" cx="380" cy="300" rx={rx} ry={ry} fill="hsl(var(--foreground))" style={{ transition: 'all 0.3s ease-in-out' }}/>
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
