
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check, CheckCircle, Zap, Shield, CreditCard, Star, Clock, Sparkles, Gift, Heart, ShoppingBag, ShieldCheck, RefreshCcw, X, Users, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import OrderBumps from '@/components/funnel/OrderBumps';
import { useCheckout } from '@/contexts/CheckoutContext';
import { useToast } from '@/hooks/use-toast';


interface OfertaFinalProps {
  nome: string;
  pontos: number;
  ofertaExpirada: boolean;
  minutos: number;
  segundos: number;
  totalDuration: number;
  secondsLeft: number;
  onCtaClick: () => void;
}

const depoimentos = [
  {
    nome: "Mariana P.",
    cidade: "Belo Horizonte, MG",
    trimestre: "Mãe de primeira viagem",
    avaliacao: 5,
    depoimento: "O plano completo foi a melhor decisão! Tive todo o suporte que precisava, desde a dieta até os exercícios de relaxamento. Me senti muito mais segura e preparada.",
    avatar: "https://i.postimg.cc/Jzvpxpd1/images-14.jpg",
    dataAiHint: "happy mother"
  },
  {
    nome: "Luiza F.",
    cidade: "Porto Alegre, RS",
    trimestre: "2ª Gestação",
    avaliacao: 5,
    depoimento: "Mesmo já tendo um filho, cada gestação é única. O programa me ajudou a organizar minha rotina e a cuidar de mim. O grupo VIP é fantástico!",
    avatar: "https://i.postimg.cc/wTb2xWzh/images-15.jpg",
    dataAiHint: "smiling woman"
  },
  {
    nome: "Ana Clara R.",
    cidade: "Salvador, BA",
    trimestre: "3º Trimestre",
    avaliacao: 5,
    depoimento: "Na reta final, a ansiedade estava a mil. As técnicas de respiração e o acompanhamento fizeram toda a diferença. Cheguei no parto muito mais tranquila.",
    avatar: "https://i.postimg.cc/0N9dN7LG/images-11.jpg",
    dataAiHint: "serene woman"
  },
  {
    nome: "Júlia A.",
    cidade: "SP",
    trimestre: "mãe de primeira gestação",
    avaliacao: 5,
    depoimento: "Eu chorava de medo de comer algo errado e prejudicar meu bebê. O programa me deu segurança, clareza e uma paz absurda. Hoje, sigo o cardápio certinho e até meu marido entrou no clima da alimentação saudável. Valeu cada centavo!",
    avatar: "https://i.postimg.cc/Fz4qZTzf/images-12.jpg",
    dataAiHint: "woman portrait"
  },
  {
    nome: "Renata M.",
    cidade: "MG",
    trimestre: "32 semanas",
    avaliacao: 5,
    depoimento: "Tava sofrendo com enjoos diários e me sentindo fraca. Quando comecei o plano, em 3 dias já senti diferença! O bônus anti-enjoo salvou minha rotina. Recomendo pra toda grávida que quer parar de sofrer calada!",
    avatar: "https://i.postimg.cc/QCWCX8cT/images-10.jpg",
    dataAiHint: "woman portrait"
  },
  {
    nome: "Patrícia S.",
    cidade: "BA",
    trimestre: "mãe de segunda viagem",
    avaliacao: 4,
    depoimento: "Na primeira gestação eu fiquei perdida. Agora fiz diferente. Esse método me ajudou a organizar tudo: dieta, mente e rotina. O grupo de apoio também me deu força quando bateu a ansiedade. Me sinto muito mais preparada.",
    avatar: "https://i.postimg.cc/rpRP2Bt0/images-13.jpg",
    dataAiHint: "happy woman"
  }
];

const faqItems = [
    { q: "Esse plano ajuda quem sente muito enjoo ou tem restrições alimentares?", a: "Sim! O bônus 'Guia Anti-Enjoo' foi criado especificamente para isso. Além disso, os cardápios são flexíveis e ensinamos você a fazer substituições inteligentes para lidar com restrições e aversões, sempre com foco em alimentos seguros e nutritivos." },
    { q: "É seguro pra quem está no 1º trimestre ou pré-eclâmpsia?", a: "Com certeza. Todo o conteúdo é adaptado para cada trimestre, incluindo o primeiro, que é o mais delicado. Para casos específicos como pré-eclâmpsia, o programa serve como um forte apoio, mas é fundamental que você continue o acompanhamento com seu médico. Nossas orientações complementam e não substituem o cuidado profissional." },
    { q: "Sou mãe de primeira viagem, esse programa vai me deixar mais segura?", a: "Absolutamente. O programa foi desenhado pensando especialmente nas mães de primeira viagem, oferecendo um passo a passo claro e seguro, desde a alimentação até a preparação emocional, para que você se sinta amparada e confiante em cada etapa." },
    { q: "Posso comprar mesmo com pouco tempo pra mim no dia a dia?", a: "Sim! O método é pensado para a realidade da mulher moderna. As orientações são práticas, as receitas são rápidas e os exercícios são curtos e eficientes. Você só precisa de 15 a 20 minutos por dia para aplicar e já sentir os benefícios." },
    { q: "O que acontece após a compra?", a: "Você recebe um e-mail de boas-vindas com o link para acessar a plataforma imediatamente. Todo o conteúdo, incluindo dietas, treinos e bônus, já estará liberado para você começar sua jornada." },
    { q: "Posso pedir reembolso caso queira?", a: "Sim! Você tem uma garantia incondicional de 7 dias. Se por qualquer motivo você achar que o programa não é para você dentro desse período, basta nos enviar um e-mail e devolveremos 100% do seu investimento, sem burocracia." },
    { q: "Preciso de equipamentos especiais?", a: "Não. Os treinos foram pensados para serem feitos em casa, utilizando o peso do corpo ou itens simples que você já tem. Para a alimentação, focamos em alimentos acessíveis e fáceis de encontrar." },
    { q: "O programa serve para qualquer fase da gestação?", a: "Sim! O conteúdo é dividido por trimestre e se adapta às suas necessidades específicas em cada fase, desde o primeiro dia até o pós-parto, garantindo segurança e eficácia." }
];

const planos = {
  essencial: {
    title: "Nutrição Expressa™",
    emoji: "💚",
    price: "19,90",
    oldPrice: "65,90",
    subtitle: "Ideal pra começar com o básico da nutrição segura na gravidez",
    features: [
      { text: "Cardápio nutricional seguro e simples, aprovado por especialistas", included: true },
      { text: "Organização semanal prática: evite enjoo, inchaço e fome fora de hora", included: true },
    ],
    summary: "Perfeito pra quem quer começar o cuidado agora com um plano leve, direto ao ponto e acessível.",
  },
  completo: {
    title: "Método Gestante Blindada™",
    subtitle: "A experiência completa para cuidar de você e do seu bebê do início ao parto",
    emoji: "🌸",
    price: "39,90",
    oldPrice: "129,90",
    tag: "Mais Completo",
    features: [
      { text: "Cardápios personalizados pra cada trimestre da gestação", included: true },
      { text: "Exercícios leves que aliviam dores, melhoram o sono e te preparam pro parto", included: true },
      { text: "Técnicas de apoio à saúde mental para reduzir estresse e ansiedade", included: true },
      { text: "Grupo VIP com suporte direto + outras gestantes", included: true },
      { text: "Acesso prioritário às novas atualizações de conteúdo", included: true },
    ],
    summary: "Feito pra quem quer segurança total, apoio contínuo e mais conforto em cada fase da gravidez.",
  }
}

const fakePurchases = [
  { name: 'Juliana S.', plan: 'Método Gestante Blindada™' },
  { name: 'Fernanda L.', plan: 'Nutrição Expressa™' },
  { name: 'Carla M.', plan: 'Método Gestante Blindada™' },
  { name: 'Aline P.', plan: 'Método Gestante Blindada™' },
  { name: 'Mariana C.', plan: 'Nutrição Expressa™' },
  { name: 'Patrícia A.', plan: 'Método Gestante Blindada™' },
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

function Guarantee() {
  return (
    <section id="guarantee" aria-labelledby="guarantee-heading" className="w-full mx-auto max-w-4xl py-12 sm:py-16 px-4">
      <div className="relative rounded-3xl bg-white/60 backdrop-blur-xl p-8 sm:p-12 shadow-2xl ring-1 ring-white/50 flex flex-col sm:flex-row items-center gap-10">
        
        <div className="flex-shrink-0 flex items-center justify-center">
           <div className="relative transition-transform duration-200 hover:scale-105">
            <div aria-hidden="true" className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-pink-300/80 to-purple-500/70 border border-white/30 flex items-center justify-center">
              <Heart size={64} className="text-white drop-shadow" strokeWidth={1.5} />
            </div>
            <div aria-hidden="true" className="absolute inset-0 rounded-full bg-pink-300/30 blur-2xl -z-10" />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-6 text-center sm:text-left">
          <h2 id="guarantee-heading" className="text-2xl sm:text-3xl font-semibold text-foreground/90">
             Satisfação garantida e <span className="text-pink-600 font-bold">risco zero!</span>
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            “⚠️ Você tem 7 dias inteiros pra usar, aplicar e ver resultado. Se não sentir melhora no seu bem-estar, NEM PRECISA DAR MOTIVO: é só pedir que devolvemos 100%. Sem letras miúdas. Sem blá blá blá. Só respeito por você e seu bebê.”
          </p>
           <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: ShoppingBag, label: "Compra 100% segura" },
              { icon: ShieldCheck, label: "7 dias de garantia" },
              { icon: RefreshCcw,  label: "Reembolso garantido" },
              { icon: Star,        label: "Qualidade certificada" }
            ].map(({ icon: Icon, label }) => (
              <li key={label}
                  className="flex items-center gap-3 rounded-xl bg-white/40 ring-1 ring-white/20 backdrop-blur px-4 py-3 transition-colors duration-200 hover:bg-white/60">
                <Icon size={22} className="text-primary" />
                <span className="text-foreground text-sm">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


function FAQ({ ctaAction, ctaText, ofertaExpirada }: { ctaAction: () => void; ctaText: string, ofertaExpirada: boolean; }) {
  return (
    <section id="faq" className="w-full mx-auto max-w-3xl py-12 sm:py-16 px-4">
      <h2 id="faq-heading" className="text-center text-3xl font-semibold text-foreground/80 mb-2">
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
             {ofertaExpirada ? "Oferta Expirada" : "Quero cuidar do meu bebê"}
          </Button>
      </div>
    </section>
  );
}

function Footer() {
    return (
        <footer className="w-full max-w-4xl mx-auto pt-8 pb-4 px-4 text-center">
            <p className="text-xs text-muted-foreground">
                © 2025 Bem-Estar Gestacional | Todos os direitos reservados
            </p>
        </footer>
    );
}

export default function OfertaFinal({ nome, pontos, ofertaExpirada, minutos, segundos, totalDuration, secondsLeft, onCtaClick }: OfertaFinalProps) {
  const { selectedPlan, setSelectedPlan, totalPrice, orderBumps } = useCheckout();
  const { toast } = useToast();
  
  const handleSelectPlan = (plan: 'essencial' | 'completo') => {
    setSelectedPlan(plan);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, plan: 'essencial' | 'completo') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectPlan(plan);
    }
  }

  const descontoPercentual = 70;
  const mensagemPersonalizada = getMensagemPorPontos(pontos, nome);

  const extrasCount = Object.keys(orderBumps).length;
  const totalString = totalPrice.toFixed(2).replace('.', ',');

  const ctaText = "Quero me cuidar agora";


  const vagas = Math.floor((secondsLeft / totalDuration) * 32);

  useEffect(() => {
    let socialProofTimeout: NodeJS.Timeout;

    const showSocialProofToast = () => {
      const randomPurchase = fakePurchases[Math.floor(Math.random() * fakePurchases.length)];
      toast({
        title: (
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-emerald-500" />
            <p className="text-sm font-medium text-foreground">
              <span className="font-bold">{randomPurchase.name}</span>
              {' acabou de adquirir o '}
              <span className="font-semibold text-primary/90">{randomPurchase.plan}</span>!
            </p>
          </div>
        ),
        duration: 4000,
      });

      const nextInterval = Math.random() * (10000 - 3000) + 3000;
      socialProofTimeout = setTimeout(showSocialProofToast, nextInterval);
    };

    const initialDelay = Math.random() * (10000 - 3000) + 3000;
    socialProofTimeout = setTimeout(showSocialProofToast, initialDelay);

    return () => clearTimeout(socialProofTimeout);
  }, [toast]);


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
                Parabéns, ${nome}!
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                {mensagemPersonalizada}
            </p>

            <div className="mt-6 mb-2 p-4 rounded-xl bg-emerald-500/10 backdrop-blur ring-1 ring-emerald-300/20 max-w-lg mx-auto text-center">
                 <div className="flex items-start justify-center gap-3">
                    <Checkbox id="bonus-checkbox" defaultChecked className="border-emerald-400 data-[state=checked]:bg-emerald-500 mt-1" />
                    <Label htmlFor="bonus-checkbox" className="flex flex-col items-start text-left">
                        <span className="font-semibold text-foreground/90 leading-tight">🧠 BÔNUS EXCLUSIVO - <span className="text-primary">R$97 de Valor</span></span>
                        <span className="text-foreground/80 mt-1 text-sm">📘 Guia Anti-Enjoo + 🗓️ Calendário da Gestante Saudável</span>
                        <blockquote className="mt-2 text-xs italic text-foreground/70 border-l-2 border-emerald-300 pl-2">
                           “Feito pra te dar alívio imediato nos momentos mais difíceis da gestação — sem depender de remédios ou suposições.”
                        </blockquote>
                    </Label>
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6 text-sm font-semibold text-amber-700 bg-amber-100 border border-amber-300 rounded-lg p-2 max-w-sm mx-auto">
                <AlertTriangle className="h-5 w-5" />
                <span>Só ganha se comprar HOJE</span>
            </div>

            <div className="mt-4 w-full max-w-sm mx-auto">
                <p className="text-sm font-semibold text-foreground mb-1">Seu desconto: <span className="text-primary">{descontoPercentual}% OFF</span></p>
                <Progress value={descontoPercentual} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>{descontoPercentual}%</span>
                </div>
            </div>

            <div className="my-6 flex items-center justify-center gap-2 font-semibold text-rose-600 animate-pulse">
                <Users className="h-5 w-5" />
                <span>
                    {ofertaExpirada ? 'As vagas com desconto acabaram!' : `Restam ${vagas} vagas com esse desconto`}
                </span>
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
                    <h2 className="text-xl font-bold text-foreground mb-1" aria-hidden="true">{planos.essencial.emoji} {planos.essencial.title}</h2>
                    <p className="text-sm text-muted-foreground mb-4">{planos.essencial.subtitle}</p>
                    <ul className="space-y-2 mb-4 text-sm">
                        {planos.essencial.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span aria-hidden="true" className="mt-0.5">{f.included ? '✔️' : '❌'}</span>
                              <span>{f.text}</span>
                            </li>
                        ))}
                    </ul>
                     <p className="text-sm text-muted-foreground italic my-4">💬 {planos.essencial.summary}</p>
                    <div className="mt-auto">
                        <p className="text-sm text-muted-foreground"><s className="opacity-60">De R$ {planos.essencial.oldPrice}</s> por apenas</p>
                         <div className="flex items-end gap-2">
                           <p className="text-3xl font-bold text-pink-600">R$ {planos.essencial.price}</p>
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
                    <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">{planos.completo.tag}</div>
                    <h2 className="text-xl font-bold text-foreground mb-1" aria-hidden="true">{planos.completo.emoji} {planos.completo.title}</h2>
                    <p className="text-sm text-muted-foreground mb-4">{planos.completo.subtitle}</p>
                     <ul className="space-y-2 mb-4 text-sm">
                        {planos.completo.features.map((f, i) => (
                           <li key={i} className="flex items-start gap-2">
                              <span aria-hidden="true" className="mt-0.5">{f.included ? '✔️' : '❌'}</span>
                              <span>{f.text}</span>
                            </li>
                        ))}
                    </ul>
                     <p className="text-sm text-muted-foreground italic my-4">💬 {planos.completo.summary}</p>
                     <div className="mt-auto">
                        <p className="text-sm text-muted-foreground"><s className="opacity-60">De R$ {planos.completo.oldPrice}</s> por apenas</p>
                         <div className="flex items-end gap-2">
                           <p className="text-3xl font-bold text-pink-600">R$ {planos.completo.price}</p>
                         </div>
                    </div>
                </div>
            </div>

            <OrderBumps />

             <div className="my-6 p-4 rounded-xl bg-rose-400/10 backdrop-blur ring-1 ring-rose-300/20 max-w-lg mx-auto text-center">
                <p className="font-semibold text-foreground/90 leading-relaxed">
                    “Por menos de R$1,50 por dia você evita problemas sérios, cuida da sua saúde e protege seu bebê com orientação real!”
                </p>
            </div>
            
            <div className="text-center">
               <p className="text-lg font-semibold text-foreground/90">✨ Está pronta para se sentir mais segura, nutrida e cuidada durante sua gestação?</p>
               <p className="text-muted-foreground mt-1">Escolha o plano ideal pra você e comece agora!</p>
            </div>


            <div className="mt-8">
                <Button 
                    size="lg"
                    onClick={onCtaClick}
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
            <CarouselPrevious className="flex left-2 sm:-left-4" />
            <CarouselNext className="flex right-2 sm:-right-4" />
            </Carousel>
        </section>
        
        <FAQ ctaAction={onCtaClick} ctaText={ctaText} ofertaExpirada={ofertaExpirada}/>
        <Guarantee />

        <div className="px-4 w-full max-w-3xl text-center">
            <Button 
              size="lg"
              onClick={onCtaClick}
              disabled={ofertaExpirada}
              className="w-full max-w-lg mx-auto h-auto py-3 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full text-lg font-bold shadow-lg shadow-pink-400/40 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out animate-pulse hover:animate-none disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:animate-none disabled:shadow-none"
          >
             {ofertaExpirada ? "Oferta Expirada" : "Vou garantir o programa"}
          </Button>
      </div>

        <Footer />
      </div>
    </>
  );
}
