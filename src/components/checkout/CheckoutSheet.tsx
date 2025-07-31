
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCheckout } from '@/contexts/CheckoutContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle } from 'lucide-react';

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
  const [chargeId, setChargeId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: nome, email: email });
      setQrCode(null);
      setChargeId(null);
      setPaymentStatus(null);
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    } else {
       if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    }
  }, [isOpen, nome, email]);

  const checkPaymentStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/pix/status/${id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'paid') {
          setPaymentStatus('paid');
          toast({
            title: "Pagamento Aprovado!",
            description: "Sua compra foi confirmada com sucesso.",
            variant: "default"
          });
          if (pollingInterval.current) {
            clearInterval(pollingInterval.current);
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

      if (!response.ok) {
        throw new Error('Falha na resposta da API');
      }

      const data = await response.json();
      setQrCode(data.qrCodeBase64);
      setChargeId(data.chargeId);

    } catch (error) {
      console.error("Erro ao gerar PIX:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao gerar o código PIX. Tente novamente.",
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 touch-none"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 pb-10 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] touch-none"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100) onClose();
            }}
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
                <div className="flex flex-col items-center">
                    <h3 className="font-semibold">Pagamento via PIX</h3>
                    <p className="text-sm text-gray-600 mb-2">Escaneie o código para pagar</p>
                    <img src={qrCode} alt="QR Code PIX" className="w-48 h-48 mx-auto my-4" />
                    <div className="flex items-center gap-2 text-gray-500">
                        <Loader2 className="animate-spin h-4 w-4" />
                        <span>Aguardando pagamento...</span>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-4">Após o pagamento, você receberá um e-mail de confirmação com acesso ao programa.</p>
                    <Button variant="link" onClick={onClose} className="mt-4">Fechar</Button>
                </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
