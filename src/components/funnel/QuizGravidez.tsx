
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const bellySizes = [
  { rx: 10, ry: 10 }, // 1º trimestre
  { rx: 25, ry: 20 }, // 2º trimestre
  { rx: 35, ry: 28 }, // 3º trimestre
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
        <div className="w-48 h-96 flex items-center justify-center">
            <svg viewBox="0 0 300 600" className="h-full w-auto drop-shadow-lg">
                <path d="M198.8,118.2c0,10.5-8.5,19-19,19s-19-8.5-19-19s8.5-19,19-19S198.8,107.7,198.8,118.2z M179.8,141.2 c-12,0-21.8,9.8-21.8,21.8v18.7l-15.5,34.3c-2,4.5-2.2,9.6-0.6,14.3c0,0,0,0,0,0l26.2,121.2c2.1,9.6,10.6,16.5,20.4,16.5h0.3 c9.8,0,18.3-6.9,20.4-16.5l14.5-98.9c0.2-1.3,0.3-2.6,0.3-3.9v-72C203.8,151,192.8,141.2,179.8,141.2z" fill="hsl(var(--foreground))" />
                <ellipse id="barriga" cx="160" cy="250" rx={rx} ry={ry} fill="hsl(var(--foreground))" style={{ transition: 'all 0.3s ease-in-out' }} />
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
