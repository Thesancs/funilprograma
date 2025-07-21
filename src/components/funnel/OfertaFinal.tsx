"use client";

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Star, ShieldCheck } from 'lucide-react';

interface OfertaFinalProps {
  nome: string;
  pontos: number;
  ofertaExpirada: boolean;
}

const PRECO_ORIGINAL = 147.90;
const PRECO_FINAL = 37.90;

const beneficios = [
  "Dietas personalizadas por trimestre",
  "Treinos adaptados (pilates, caminhada, musculação)",
  "Acompanhamento da saúde mental",
  "Checklists e orientações semanais",
  "Grupo VIP exclusivo",
];

const calcDesconto = (pontos: number) => {
  if (pontos <= 100) return 10;
  if (pontos <= 200) return 30;
  if (pontos <= 300) return 50;
  return 70;
};

export default function OfertaFinal({ nome, pontos, ofertaExpirada }: OfertaFinalProps) {
  const router = useRouter();

  const descontoPercentual = useMemo(() => calcDesconto(pontos), [pontos]);

  const handleCtaClick = () => {
    if (ofertaExpirada) return;
    console.log('[OfertaFinal]', pontos, descontoPercentual);
    // TODO: A rota /checkout não existe
    // router.push('/checkout');
    alert("Redirecionando para o checkout...")
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-5xl mx-auto">
      <Card className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
        <CardHeader className="text-center bg-primary/10 p-6">
          <CardTitle className="text-2xl md:text-3xl font-bold text-primary">
            🎉 Parabéns, {nome}!
          </CardTitle>
          <CardDescription className="text-md text-foreground">
            Você acumulou <strong className="text-primary">{pontos} Pontos de Cuidado</strong> e desbloqueou uma oferta exclusiva!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="text-center bg-green-100 text-green-800 font-semibold p-3 rounded-lg">
            <p className="text-lg">🎯 Uau! Você desbloqueou {descontoPercentual}% de desconto com seus pontos! 🎯</p>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground line-through text-lg">De R$ {PRECO_ORIGINAL.toFixed(2)}</p>
            <p className="text-4xl font-bold text-foreground">
              Por apenas <span className="text-primary">R$ {PRECO_FINAL.toFixed(2)}</span>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-center">O que você recebe:</h3>
            <ul className="space-y-2">
              {beneficios.map((beneficio, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">{beneficio}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Button 
            size="lg"
            onClick={handleCtaClick}
            disabled={ofertaExpirada}
            className="w-full h-14 bg-[#9D4C63] text-white rounded-full text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {ofertaExpirada ? "Oferta Expirada" : `Quero garantir por R$ ${PRECO_FINAL.toFixed(2)}`}
          </Button>

           <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-green-600"/>
                <span>Garantia de 7 dias</span>
              </div>
               <div className="flex items-center gap-1">
                 <Star className="h-4 w-4 text-yellow-500 fill-yellow-400" />
                <span>4.9/5.0 (200+ alunas)</span>
              </div>
          </div>
        </CardContent>
      </Card>

      <div className="hidden lg:flex w-full max-w-md">
        <Image 
          src="https://placehold.co/600x800.png" 
          alt="Mockup do Programa"
          width={600}
          height={800}
          className="rounded-2xl shadow-xl"
          data-ai-hint="app mockup"
        />
      </div>
    </div>
  );
}
