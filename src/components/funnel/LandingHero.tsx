
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Leaf, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function LandingHero() {
  useEffect(() => {
    console.log('[LandingHero] Component mounted');
  }, []);

  const handleCtaClick = () => {
    console.log('[LandingHero] CTA clicked, navigating to /cadastro');
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto px-4 sm:px-6 overflow-hidden">
        <Heart className="absolute top-[20%] left-[5%] h-6 w-6 text-primary/20 opacity-80 animate-pulse " data-ai-hint="heart" />
        <Leaf className="absolute top-[40%] right-[8%] h-8 w-8 text-primary/20 opacity-80 rotate-45 animate-pulse delay-500" data-ai-hint="leaf" />
        <Heart className="absolute bottom-[25%] right-[10%] h-5 w-5 text-primary/20 opacity-80 animate-pulse delay-200" data-ai-hint="heart" />
        <Leaf className="absolute bottom-[30%] left-[12%] h-7 w-7 text-primary/20 opacity-80 -rotate-45 animate-pulse delay-700" data-ai-hint="leaf" />

        <div className="z-10 flex flex-col items-center justify-center space-y-4 md:space-y-6 py-16">
            <div className="mb-4 animate-in fade-in slide-in-from-top-12 duration-1000" data-ai-hint="mother baby">
                <Image 
                  src="https://i.imgur.com/pWBIXpR.png" 
                  alt="Logo Bem-Vinda, Mamãe!" 
                  width={112} 
                  height={112} 
                  className="w-24 h-24 sm:w-28 sm:h-28"
                  priority
                />
            </div>

            <Card className="w-full max-w-2xl text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50">
              <CardHeader>
                <CardTitle className="font-headline text-2xl md:text-3xl font-bold text-foreground">
                  Crie sua conta e desbloqueie uma jornada personalizada para você e seu bebê!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <CardDescription className="font-body text-base md:text-lg text-muted-foreground">
                  Seu corpo muda a cada semana, e sua alimentação precisa acompanhar esse ritmo. Vamos montar um caminho leve, baseado em como você está hoje.
                </CardDescription>

                <Separator />
                
                <ul className="space-y-2 font-body text-base text-foreground inline-flex flex-col items-start text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Diagnóstico gratuito</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Pontuação com recompensas reais</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Desconto exclusivo com base no seu esforço</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="pt-6 animate-in fade-in zoom-in-95 duration-1000 delay-600 text-center">
                <p className="mb-2 font-semibold text-foreground uppercase tracking-wider">COMEÇE AGORA MESMO</p>
                <Link href="/cadastro" passHref>
                    <Button
                    size="lg"
                    className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 animate-pulse hover:animate-none"
                    onClick={handleCtaClick}
                    >
                    Criar minha conta agora
                    </Button>
                </Link>
            </div>
        </div>
    </div>
  );
}
