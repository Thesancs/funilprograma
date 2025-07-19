"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

const trimesters = [
  { label: '3º mês', icon: '🤰🏻', points: 150 },
  { label: '6º mês', icon: '🤰🏽', points: 150 },
  { label: '9º mês', icon: '🤰🏿', points: 150 },
];

export default function QuizTrimestre() {
  const [selectedTrimester, setSelectedTrimester] = useState<string | null>(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    console.log('[QuizTrimestre] Component mounted');
  }, []);

  const handleSelectTrimester = (label: string, trimesterPoints: number) => {
    if (selectedTrimester === null) { // Only award points on the first selection
        setPoints(points + trimesterPoints);
        console.log(`[QuizTrimestre] Added ${trimesterPoints} points. Total: ${points + trimesterPoints}`);
    }
    setSelectedTrimester(label);
    console.log('[QuizTrimestre] Selected trimester:', label);
  };

  const handleNext = () => {
    console.log('[QuizTrimestre] Navigating to next step with selection:', selectedTrimester);
    // Here you would navigate to the next quiz step
    // e.g. router.push('/quiz/step-2');
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
        <div className="absolute top-0 right-0 md:top-4 md:right-4">
            <div className="flex items-center gap-2 rounded-full bg-background/80 px-4 py-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-foreground">
                    Pontos de cuidado: {points}
                </span>
            </div>
        </div>

      <Card className="w-full text-center p-6 md:p-8">
        <CardContent className="flex flex-col items-center justify-center gap-6 md:gap-8">
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-foreground">
            🤰 Qual trimestre você está?
          </h1>
          
          <div className="grid w-full grid-cols-3 gap-3 md:gap-4">
            {trimesters.map((trim) => (
              <div
                key={trim.label}
                onClick={() => handleSelectTrimester(trim.label, trim.points)}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300",
                  selectedTrimester === trim.label
                    ? "border-primary scale-105 shadow-lg bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                )}
              >
                <span className="text-4xl md:text-5xl">{trim.icon}</span>
                <span className="font-medium text-foreground text-sm md:text-base">{trim.label}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleNext}
            disabled={!selectedTrimester}
            size="lg"
            className="w-full md:w-auto md:px-12 transition-transform duration-200 hover:scale-105"
          >
            Avançar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
