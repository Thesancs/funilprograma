
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Shield, CreditCard, Star, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';


interface OfertaFinalProps {
  nome: string;
  pontos: number;
  ofertaExpirada: boolean;
  minutos: number;
  segundos: number;
}

const beneficiosEssencial = [
  { text: "Checklist nutricional em PDF", icon: CheckCircle },
  { text: "Planner semanal digital", icon: CheckCircle },
];

const beneficiosCompleto = [
  { text: "Dietas personalizadas por trimestre", icon: CheckCircle },
  { text: "Treinos adaptados para gestantes", icon: CheckCircle },
  { text: "Acompanhamento da saúde mental", icon: CheckCircle },
  { text: "Checklists e orientações semanais", icon: CheckCircle },
  { text: "Grupo VIP exclusivo", icon: Star },
  { text: "⭐ Preferência a novas atualizações", icon: Sparkles },
];

export default function OfertaFinal({ nome, ofertaExpirada, minutos, segundos }: OfertaFinalProps) {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'essencial' | 'completo'>('completo');
  
  const handleSelectPlan = (plan: 'essencial' | 'completo') => {
    setSelectedPlan(plan);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, plan: 'essencial' | 'completo') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectPlan(plan);
    }
  }

  const handleCtaClick = () => {
    if (ofertaExpirada) return;
    router.push(`/checkout?plan=${selectedPlan}`);
  };

  const ctaText = selectedPlan === 'essencial' 
    ? 'Garantir Essencial por R$ 19,90' 
    : 'Garantir Completo por R$ 39,90';

  return (
    <>
      <div className="fixed md:hidden top-0 left-0 right-0 bg-[#9D4C63] text-white text-center py-2 z-50 shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5" />
            <p className="font-semibold text-sm">
                {ofertaExpirada ? "Oferta Expirada!" : `Sua oferta expira em: ${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`}
            </p>
          </div>
      </div>
    
      <div className="w-full flex flex-col items-center justify-center gap-8 lg:gap-12 mt-12 md:mt-0">
        <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50 p-6 md:p-8 text-center text-[#344154]">
            
            <h1 className="text-2xl md:text-3xl font-bold">
                Parabéns, {nome}!
            </h1>
            <p className="mt-2 text-muted-foreground">
                Sua jornada de cuidado te rendeu uma oferta incrível! Escolha seu plano:
            </p>
            
            <div className="mt-6 flex flex-col md:flex-row justify-center items-stretch gap-6">
                
                {/* Plano Essencial */}
                <div
                    role="radio"
                    aria-checked={selectedPlan === 'essencial'}
                    tabIndex={0}
                    onClick={() => handleSelectPlan('essencial')}
                    onKeyDown={(e) => handleKeyDown(e, 'essencial')}
                    className={cn(
                        "flex-1 border border-emerald-400/50 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition text-left flex flex-col",
                        selectedPlan === 'essencial' && "ring-4 ring-pink-500/60 scale-105"
                    )}
                >
                    <h2 className="text-xl font-bold text-foreground mb-1">🌱 Plano Essencial</h2>
                    <p className="text-sm text-muted-foreground mb-4">Ideal para começar.</p>
                    <ul className="space-y-2 mb-4 text-sm">
                        {beneficiosEssencial.map((b, i) => (
                            <li key={i} className="flex items-start gap-2"><b.icon className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />{b.text}</li>
                        ))}
                    </ul>
                    <div className="mt-auto">
                        <p className="text-3xl font-bold text-pink-600">R$ 19,90</p>
                    </div>
                </div>

                {/* Plano Completo */}
                 <div
                    role="radio"
                    aria-checked={selectedPlan === 'completo'}
                    tabIndex={0}
                    onClick={() => handleSelectPlan('completo')}
                    onKeyDown={(e) => handleKeyDown(e, 'completo')}
                    className={cn(
                        "flex-1 bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 border-2 border-pink-400 shadow-xl cursor-pointer transition text-left flex flex-col relative",
                        selectedPlan === 'completo' && "ring-4 ring-pink-500/60 scale-105"
                    )}
                >
                    <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">Mais Popular</div>
                    <h2 className="text-xl font-bold text-foreground mb-1">🌸 Plano Completo</h2>
                    <p className="text-sm text-muted-foreground mb-4">A experiência completa.</p>
                     <ul className="space-y-2 mb-4 text-sm">
                        {beneficiosCompleto.map((b, i) => (
                            <li key={i} className="flex items-start gap-2"><b.icon className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />{b.text}</li>
                        ))}
                    </ul>
                     <div className="mt-auto">
                        <p className="text-3xl font-bold text-pink-600">R$ 39,90</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <Button 
                    size="lg"
                    onClick={handleCtaClick}
                    disabled={ofertaExpirada}
                    className="w-full max-w-lg mx-auto h-auto py-3 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full text-lg font-bold shadow-lg shadow-pink-400/40 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out animate-pulse hover:animate-none disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:animate-none disabled:shadow-none"
                >
                   {ofertaExpirada ? "Oferta Expirada" : ctaText}
                </Button>
            </div>
            
            <div className="flex items-center justify-center flex-wrap gap-4 text-xs text-gray-600 mt-4">
                <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4"/>
                    <span>7 Dias de Garantia</span>
                </div>
                <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    <span>Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    <span>Compra Segura</span>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

    