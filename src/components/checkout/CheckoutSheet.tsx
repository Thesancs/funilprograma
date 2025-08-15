
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCheckout } from '@/contexts/CheckoutContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, Copy, Check, QrCode, CreditCard } from 'lucide-react';

interface CheckoutSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const planos = {
  essencial: { title: "Nutrição Expressa™" },
  completo: { title: "Método Gestante Blindada™" }
};

const bumpDetails: { [key: string]: string } = {
  preeclampsia: "Guia Rápido da Pré-eclâmpsia",
  amamentacao: "Guia Realista da Amamentação",
  ansiedade: "Guia de Ansiedade na Gestação"
};

export default function CheckoutSheet({ isOpen, onClose }: CheckoutSheetProps) {
  const { nome, email, selectedPlan, orderBumps, totalPrice } = useCheckout();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null); // NOVO: PIX Copia e Cola
  const [chargeId, setChargeId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [copied, setCopied] = useState(false); // NOVO: Estado do botão copiar
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: nome, email });
    } else {
      setQrCode(null);
      setPixCode(null); // NOVO: Limpar PIX code
      setChargeId(null);
      setPaymentStatus(null);
      setCopied(false); // NOVO: Reset copied state
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    }
  }, [isOpen, nome, email]);

  // DISPARAR EVENTO UTMIFY DE INITIATE CHECKOUT ao abrir o checkout
  useEffect(() => {
    if (!isOpen) return;
    if (typeof window !== 'undefined' && (window as any).utmify) {
      const items = [
        { id: `plan_${selectedPlan}`, name: planos[selectedPlan].title, price: planPrices[selectedPlan], quantity: 1 },
        ...Object.entries(orderBumps).map(([id, price]) => ({
          id: `bump_${id}`,
          name: bumpDetails[id],
          price,
          quantity: 1
        }))
      ];
      (window as any).utmify('event', 'InitiateCheckout', {
        currency: 'BRL',
        value: totalPrice,
        items
      });
    }
  }, [isOpen, selectedPlan, orderBumps, totalPrice]);
  const checkPaymentStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/pix/status/${id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'paid') {
          setPaymentStatus('paid');
          
          // DISPARAR EVENTO UTMIFY DE PURCHASE
          if (typeof window !== 'undefined' && (window as any).utmify) {
            const items = [
              { id: `plan_${selectedPlan}`, name: planos[selectedPlan].title, price: planPrices[selectedPlan], quantity: 1 },
              ...Object.entries(orderBumps).map(([id, price]) => ({
                id: `bump_${id}`,
                name: bumpDetails[id],
                price,
                quantity: 1
              }))
            ];
            (window as any).utmify('event', 'Purchase', {
              transaction_id: id,
              content_name: selectedPlan === 'completo' ? 'Método Gestante Blindada' : 'Nutrição Expressa',
              currency: 'BRL',
              value: totalPrice,
              items
            });
          }
          
          toast({
            title: "Pagamento Aprovado!",
            description: "Sua compra foi confirmada com sucesso.",
            variant: "default"
          });
          if (pollingInterval.current) {
            clearInterval(pollingInterval.current);
          }

          // Redirecionar para a página de obrigado
          const params = new URLSearchParams({
            tx: id,
            plan: selectedPlan,
            value: totalPrice.toFixed(2),
            name: nome || '',
            email: email || '',
            bumps: JSON.stringify(orderBumps) // Incluir order bumps
          });
          // Evita múltiplos redirects em caso de chamadas quase simultâneas
          if (typeof window !== 'undefined') {
            window.location.href = `/obrigado?${params.toString()}`;
          }
        }
      }
    } catch (error) {
      console.error("Erro ao verificar status do pagamento:", error);
    }
  };
  
  useEffect(() => {
    if (chargeId && paymentStatus !== 'paid') {
      pollingInterval.current = setInterval(() => {
        checkPaymentStatus(chargeId);
      }, 3000); // Check every 3 seconds

      // Stop polling after some time to avoid infinite loops
      setTimeout(() => {
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
        }
      }, 5 * 60 * 1000); // Stop after 5 minutes
    }
    
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    }
  }, [chargeId, paymentStatus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // NOVA FUNÇÃO: Copiar PIX code
  const copyPixCode = async () => {
    if (pixCode) {
      try {
        await navigator.clipboard.writeText(pixCode);
        setCopied(true);
        toast({
          title: "PIX Copiado!",
          description: "Código PIX copiado para a área de transferência.",
          variant: "default"
        });
        setTimeout(() => setCopied(false), 3000);
      } catch (error) {
        toast({
          title: "Erro ao copiar",
          description: "Não foi possível copiar o código PIX.",
          variant: "destructive"
        });
      }
    }
  };

  const generatePix = async () => {
    if (!formData.name || !formData.email) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e e-mail.",
      });
      return;
    }

    setIsLoading(true);
    setQrCode(null);
    setPixCode(null); // NOVO: Limpar PIX code anterior

    const description = `Plano: ${planos[selectedPlan].title}`;

    try {
      const response = await fetch('/api/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(totalPrice * 100), // em centavos
          description: description,
          payer: { name: formData.name, email: formData.email }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || 'Falha na resposta da API');
      }
      
      setQrCode(data.qrCodeBase64);
      setPixCode(data.qrCode); // NOVO: Salvar PIX Copia e Cola
      setChargeId(data.chargeId);

      // DISPARAR EVENTO UTMIFY DE ADD PAYMENT INFO (venda iniciada - geração do PIX)
      if (typeof window !== 'undefined' && (window as any).utmify) {
        const items = [
          { id: `plan_${selectedPlan}`, name: planos[selectedPlan].title, price: planPrices[selectedPlan], quantity: 1 },
          ...Object.entries(orderBumps).map(([id, price]) => ({
            id: `bump_${id}`,
            name: bumpDetails[id],
            price,
            quantity: 1
          }))
        ];
        (window as any).utmify('event', 'AddPaymentInfo', {
          transaction_id: data.chargeId,
          currency: 'BRL',
          value: totalPrice,
          payment_method: 'pix',
          items
        });
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Tente novamente.";
      console.error("Erro ao gerar PIX:", errorMessage);
      toast({
        variant: "destructive",
        title: "Erro ao gerar PIX",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderOrderSummary = () => (
    <div className="my-4 space-y-2 text-sm text-gray-700">
      <div className="flex justify-between font-semibold">
        <span>{planos[selectedPlan].title}</span>
        <span>R$ {planPrices[selectedPlan].toFixed(2).replace('.', ',')}</span>
      </div>
      {Object.entries(orderBumps).map(([id, price]) => (
        <div key={id} className="flex justify-between text-xs">
          <span className="text-gray-500">{bumpDetails[id]}</span>
          <span>+ R$ {price.toFixed(2).replace('.', ',')}</span>
        </div>
      ))}
      <div className="border-t my-2"></div>
      <div className="flex justify-between font-bold text-base">
        <span>Total</span>
        <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
      </div>
    </div>
  );

  const planPrices = {
    essencial: 19.90,
    completo: 39.90
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
         <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

         <motion.div
  className="
    fixed inset-0 z-50 bg-white
    h-[100vh] w-[100vw]
    flex flex-col
    p-0
    rounded-none
    shadow-none
    overflow-y-auto
  "
  initial={{ y: '100%' }}
  animate={{ y: 0 }}
  exit={{ y: '100%' }}
  transition={{ type: 'spring', stiffness: 260, damping: 25 }}
>
          
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Fechar"
            >
              &times;
            </button>
            
            <h2 className="text-lg font-bold text-center mb-4">Finalizar Compra</h2>
            
            {!qrCode ? (
                <>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Seu nome" />
                        </div>
                        <div>
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="seu.email@exemplo.com" />
                        </div>
                    </div>

                    {renderOrderSummary()}

                    <Button
                        disabled={isLoading}
                        onClick={generatePix}
                        className="w-full mt-6 py-3 h-auto rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-semibold text-lg shadow-lg active:scale-95 transition"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Gerar PIX'}
                    </Button>
                </>
            ) : paymentStatus === 'paid' ? (
                <div className="flex flex-col items-center text-center">
                    <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto my-4" />
                    <h3 className="font-semibold text-xl">Pagamento Aprovado!</h3>
                    <p className="text-sm text-gray-600 mt-2 mb-4">Parabéns! Você receberá um e-mail em breve com todos os detalhes de acesso ao seu programa.</p>
                    <Button variant="outline" onClick={onClose} className="mt-4">Fechar</Button>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-4">
                    <h3 className="font-semibold text-xl">Pagamento via PIX</h3>
                    
                    {/* SEÇÃO QR CODE */}
                    <div className="bg-gray-50 rounded-2xl p-4 w-full">
                        <div className="flex items-center gap-2 mb-3">
                            <QrCode className="w-5 h-5 text-emerald-600" />
                            <span className="font-medium text-gray-700">Escaneie o QR Code</span>
                        </div>
                        <div className="bg-white rounded-xl p-4 flex justify-center">
                            <img 
                                src={`data:image/png;base64,${qrCode}`} 
                                alt="QR Code PIX" 
                                className="w-48 h-48" 
                            />
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">
                            Abra o app do seu banco e escaneie o código
                        </p>
                    </div>

                    {/* DIVISOR */}
                    <div className="flex items-center w-full my-4">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="px-3 text-sm text-gray-500 bg-white">ou</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* SEÇÃO PIX COPIA E COLA */}
                    <div className="bg-blue-50 rounded-2xl p-4 w-full">
                        <div className="flex items-center gap-2 mb-3">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-gray-700">PIX Copia e Cola</span>
                        </div>
                        
                        <div className="bg-white rounded-xl border-2 border-dashed border-blue-200 p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-medium text-blue-600">CÓDIGO PIX</span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <p className="text-xs text-gray-600 font-mono break-all leading-relaxed">
                                    {pixCode}
                                </p>
                            </div>
                            <Button
                                onClick={copyPixCode}
                                variant="outline"
                                className="w-full flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copiado!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copiar código PIX
                                    </>
                                )}
                            </Button>
                        </div>
                        
                        <p className="text-xs text-gray-500 text-center mt-2">
                            Cole este código no seu app bancário na opção "PIX Copia e Cola"
                        </p>
                    </div>

                    {/* STATUS DE PAGAMENTO */}
                    <div className="flex items-center gap-2 text-gray-500 mt-4">
                        <Loader2 className="animate-spin h-4 w-4" />
                        <span className="text-sm">Aguardando pagamento...</span>
                    </div>
                    
                    <p className="text-xs text-center text-gray-500 mt-2">
                        Após o pagamento, você receberá um e-mail de confirmação com acesso ao programa.
                    </p>
                    
                    <Button variant="link" onClick={onClose} className="mt-4">Fechar</Button>
                </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
