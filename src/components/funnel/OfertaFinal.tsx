
"use client";

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Shield, CreditCard, PlayCircle, Star, Clock } from 'lucide-react';

interface OfertaFinalProps {
  nome: string;
  pontos: number;
  ofertaExpirada: boolean;
  minutos: number;
  segundos: number;
}

const PRECO_ORIGINAL = 147.90;
const PRECO_FINAL = 37.90;
const PONTOS_MAXIMO = 1200;

const beneficios = [
  { text: "Dietas personalizadas por trimestre", icon: CheckCircle },
  { text: "Treinos adaptados para gestantes", icon: PlayCircle },
  { text: "Acompanhamento da saúde mental", icon: CheckCircle },
  { text: "Checklists e orientações semanais", icon: CheckCircle },
  { text: "Grupo VIP exclusivo", icon: Star },
];

const calcDesconto = (pontos: number) => {
  if (pontos <= 600) return 10;
  if (pontos <= 800) return 30;
  if (pontos <= 1000) return 50;
  return 70;
};

export default function OfertaFinal({ nome, pontos, ofertaExpirada, minutos, segundos }: OfertaFinalProps) {
  const router = useRouter();

  const descontoPercentual = useMemo(() => calcDesconto(pontos), [pontos]);
  const progressPercent = useMemo(() => Math.min((pontos / PONTOS_MAXIMO) * 100, 100), [pontos]);

  const handleCtaClick = () => {
    if (ofertaExpirada) return;
    console.log('[OfertaFinal]', pontos, descontoPercentual);
    // TODO: A rota /checkout não existe
    alert("Redirecionando para o checkout...");
  };

  return (
    <>
      {/* Micro-timer Sticky para Mobile */}
      <div className="fixed md:hidden top-0 left-0 right-0 bg-[#9D4C63] text-white text-center py-2 z-20 shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5" />
            <p className="font-semibold text-sm">
                {ofertaExpirada ? "Oferta Expirada!" : `Sua oferta expira em: ${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`}
            </p>
          </div>
      </div>
    
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-white/50 p-8 text-center text-[#344154]">
            
          <Image 
            src="https://i.postimg.cc/sXrxmz3H/file-000000002d8c61fab07c5beac8aa5994.png"
            alt="Mockup do programa Bem-Vinda, Mamãe!"
            width={192}
            height={192}
            className="w-40 sm:w-48 mx-auto drop-shadow-lg mb-6"
            loading="lazy"
            data-ai-hint="product mockup"
          />

          <h1 className="text-2xl md:text-3xl font-bold">
            Parabéns, {nome}!
          </h1>
          <p className="mt-2 mb-4">
            Sua jornada de cuidado te rendeu uma oferta incrível!
          </p>

          <div className="w-full my-4">
            <div className="h-2 w-full bg-rose-100 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${progressPercent}%`}}
                />
            </div>
            {descontoPercentual >= 70 && (
                <p className="text-xs text-center mt-2 font-medium">🔥 Desconto máximo desbloqueado: <span className="font-bold">{descontoPercentual}% OFF!</span></p>
            )}
          </div>

          <div className="text-center my-4">
            <p className="text-gray-600 line-through">De R$ {PRECO_ORIGINAL.toFixed(2)}</p>
            <p className="text-4xl font-bold">
              Por apenas <span className="text-pink-600">R$ {PRECO_FINAL.toFixed(2)}</span>
            </p>
          </div>

          <ul className="space-y-3 my-6 text-left">
              {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm font-medium">
                      <beneficio.icon className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{beneficio.text}</span>
                  </li>
              ))}
          </ul>
          
          <Button 
            size="lg"
            onClick={handleCtaClick}
            disabled={ofertaExpirada}
            className="w-full h-auto py-3 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full text-lg font-bold shadow-lg shadow-pink-400/40 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out animate-pulse hover:animate-none disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:animate-none disabled:shadow-none"
          >
            {ofertaExpirada ? "Oferta Expirada" : `Garantir por R$ ${PRECO_FINAL.toFixed(2)}`}
          </Button>

           <div className="flex items-center justify-center gap-4 text-xs text-gray-600 mt-4">
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

        <div className="hidden lg:flex w-full max-w-lg">
            <Image 
                src="https://placehold.co/600x800.png" 
                alt="Mockup do Programa em um tablet"
                width={600}
                height={800}
                className="rounded-2xl shadow-xl"
                loading="lazy"
                data-ai-hint="app mockup"
            />
        </div>
      </div>
    </>
  );
}
