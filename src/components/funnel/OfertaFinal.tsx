
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Shield, CreditCard, Star, Clock, Sparkles, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";


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

const depoimentos = [
  {
    nome: "Mariana P.",
    cidade: "Belo Horizonte, MG",
    trimestre: "Mãe de primeira viagem",
    avaliacao: 5,
    depoimento: "O plano completo foi a melhor decisão! Tive todo o suporte que precisava, desde a dieta até os exercícios de relaxamento. Me senti muito mais segura e preparada.",
    avatar: "https://i.imgur.com/w8kf5xT.jpeg",
    dataAiHint: "happy mother"
  },
  {
    nome: "Luiza F.",
    cidade: "Porto Alegre, RS",
    trimestre: "2ª Gestação",
    avaliacao: 5,
    depoimento: "Mesmo já tendo um filho, cada gestação é única. O programa me ajudou a organizar minha rotina e a cuidar de mim. O grupo VIP é fantástico!",
    avatar: "https://i.imgur.com/gplExUE.jpeg",
    dataAiHint: "smiling woman"
  },
  {
    nome: "Ana Clara R.",
    cidade: "Salvador, BA",
    trimestre: "3º Trimestre",
    avaliacao: 5,
    depoimento: "Na reta final, a ansiedade estava a mil. As técnicas de respiração e o acompanhamento fizeram toda a diferença. Cheguei no parto muito mais tranquila.",
    avatar: "https://i.imgur.com/N1aE24Z.jpeg",
    dataAiHint: "serene woman"
  },
];

const faqItems = [
  { q: "O que acontece após a compra?", a: "Você recebe um e-mail de boas-vindas com o link para acessar a plataforma imediatamente. Todo o conteúdo, incluindo dietas, treinos e bônus, já estará liberado para você começar sua jornada." },
  { q: "Posso cancelar quando quiser?", a: "Sim. A assinatura é mensal e você pode cancelar a qualquer momento, com apenas 2 cliques, diretamente na plataforma, sem burocracia. Além disso, você tem 7 dias de garantia incondicional." },
  { q: "Preciso de equipamentos especiais?", a: "Não. Os treinos foram pensados para serem feitos em casa, utilizando o peso do corpo ou itens simples que você já tem. Para a alimentação, focamos em alimentos acessíveis e fáceis de encontrar." },
  { q: "O programa serve para qualquer fase da gestação?", a: "Sim! O conteúdo é dividido por trimestre e se adapta às suas necessidades específicas em cada fase, desde o primeiro dia até o pós-parto, garantindo segurança e eficácia." }
];

const getMensagemPorPontos = (pontos: number, nome: string) => {
    if (pontos > 800) {
        return `Você é uma supermãe, ${nome}! Seu cuidado e dedicação são inspiradores. Por isso, preparamos um presente especial para você continuar brilhando.`;
    }
    if (pontos > 500) {
        return `Vimos que você é uma mãe esforçada, ${nome}! Adoramos seu empenho e, por isso, queremos te dar um presente para essa jornada.`;
    }
    return `Notamos que sua gestação pode ter desafios, ${nome}. Queremos que saiba que não está sozinha. Para te apoiar, preparamos uma condição especial para começarmos a melhorar isso juntas!`;
};

function FAQ({ ctaAction, ctaText, ofertaExpirada }: { ctaAction: () => void; ctaText: string, ofertaExpirada: boolean; }) {
  return (
    <section id="faq" className="w-full mx-auto max-w-3xl py-12 sm:py-16 px-4">
      <h2 id="faq-heading" className="text-center text-3xl font-headline font-semibold text-foreground/80 mb-2">
        Perguntas Frequentes
      </h2>
       <p className="text-center text-muted-foreground mb-8">Tire suas últimas dúvidas antes de começar.</p>

      <Accordion type="multiple" className="w-full space-y-4">
        {faqItems.map(({ q, a }, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
            <AccordionTrigger className="bg-white/60 backdrop-blur-md rounded-2xl px-6 py-4 text-left font-semibold text-foreground hover:bg-white/80 transition-all text-base text-start hover:no-underline shadow-md">
              {q}
            </AccordionTrigger>
            <AccordionContent className="px-6 pt-4 pb-2 text-muted-foreground leading-relaxed bg-white/40 backdrop-blur-sm rounded-b-2xl -mt-2">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-12 text-center">
          <Button 
              size="lg"
              onClick={ctaAction}
              disabled={ofertaExpirada}
              className="w-full max-w-lg mx-auto h-auto py-3 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full text-lg font-bold shadow-lg shadow-pink-400/40 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out animate-pulse hover:animate-none disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:animate-none disabled:shadow-none"
          >
             {ofertaExpirada ? "Oferta Expirada" : ctaText}
          </Button>
      </div>
    </section>
  );
}


export default function OfertaFinal({ nome, pontos, ofertaExpirada, minutos, segundos }: OfertaFinalProps) {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'essencial' | 'completo'>('completo');
  const [bonus, setBonus] = useState(false);
  
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
    router.push(`/checkout?plan=${selectedPlan}&bonus=${bonus}`);
  };

  const descontoPercentual = 70;
  const mensagemPersonalizada = getMensagemPorPontos(pontos, nome);

  const precos = {
    essencial: { original: "65,90", final: "19,90" },
    completo: { original: "129,90", final: "39,90" },
  };

  const ctaText = selectedPlan === 'essencial' 
    ? `Garantir Essencial por R$ ${precos.essencial.final}` 
    : `Garantir Completo por R$ ${precos.completo.final}`;


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
            
             <div className="flex justify-center mb-2" data-ai-hint="happy mother">
                <Image 
                    src="https://i.postimg.cc/sXrxmz3H/file-000000002d8c61fab07c5beac8aa5994.png"
                    alt="Mãe feliz" 
                    width={100}
                    height={100}
                    className="w-24 h-auto"
                />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold">
                Parabéns, {nome}!
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                {mensagemPersonalizada}
            </p>

            <div className="mt-4 w-full max-w-sm mx-auto">
                <p className="text-sm font-semibold text-foreground mb-1">Seu desconto: <span className="text-primary">{descontoPercentual}% OFF</span></p>
                <Progress value={descontoPercentual} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>{descontoPercentual}%</span>
                </div>
            </div>

            <p className="mt-6 text-muted-foreground">
              Clique abaixo para resgatar seu bônus especial:
            </p>
            
            <div className="w-full max-w-md mx-auto">
              <div
                role="checkbox"
                aria-checked={bonus}
                tabIndex={0}
                onClick={() => setBonus(!bonus)}
                onKeyDown={(e)=> ['Enter',' '].includes(e.key) && setBonus(!bonus)}
                className={cn(`w-full mt-2 p-4 rounded-2xl border-2
                  ${bonus ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-300/40 scale-[1.02]' 
                          : 'border-gray-300 bg-white hover:shadow-lg'}
                  transition cursor-pointer`)}
              >
                <div className="flex items-center gap-3">
                  <Gift color={bonus ? '#059669' : '#9CA3AF'} size={24}/>
                  <div className="flex flex-col text-left">
                    <span className="font-semibold">
                      {bonus ? 'Bônus Selecionado!' : 'Resgatar Bônus Especial'}
                    </span>
                    <span className="text-xs text-gray-500">
                      E-book “10 Receitas Detox” (PDF)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="mt-6 text-muted-foreground">
              Agora, escolha seu plano:
            </p>

            <div className="mt-4 flex flex-col md:flex-row justify-center items-stretch gap-6">
                
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
                         <div className="flex items-end gap-2">
                           <p className="text-3xl font-bold text-pink-600">R$ {precos.essencial.final}</p>
                           <p className="text-muted-foreground line-through">R$ {precos.essencial.original}</p>
                        </div>
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
                         <div className="flex items-end gap-2">
                           <p className="text-3xl font-bold text-pink-600">R$ {precos.completo.final}</p>
                           <p className="text-muted-foreground line-through">R$ {precos.completo.original}</p>
                         </div>
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

        {/* Seção de Depoimentos */}
        <section className="w-full flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground/80">
            O que as mamães do programa dizem
            </h2>
            <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full max-w-sm sm:max-w-md md:max-w-xl"
            >
            <CarouselContent>
                {depoimentos.map((depoimento, index) => (
                <CarouselItem key={index}>
                    <div className="p-1">
                    <UICard className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md px-6 py-6 flex flex-col items-center gap-4 text-foreground">
                        <Avatar className="w-20 h-20 border-4 border-pink-100">
                        <AvatarImage src={depoimento.avatar} alt={depoimento.nome} data-ai-hint={depoimento.dataAiHint} />
                        <AvatarFallback>{depoimento.nome.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                        <p className="font-bold text-lg">{depoimento.nome}</p>
                        <p className="text-sm text-muted-foreground">{depoimento.cidade} | {depoimento.trimestre}</p>
                        </div>
                        <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < depoimento.avaliacao ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        </div>
                        <p className="text-center text-foreground italic">"{depoimento.depoimento}"</p>
                    </UICard>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </section>

        <FAQ ctaAction={handleCtaClick} ctaText={ctaText} ofertaExpirada={ofertaExpirada}/>
      </div>
    </>
  );
}
