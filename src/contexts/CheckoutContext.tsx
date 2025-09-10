
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

interface OrderBumps {
  [id: string]: number;
}

interface CheckoutContextType {
  orderBumps: OrderBumps;
  toggleBump: (id: string, price: number) => void;
  selectedPlan: 'essencial' | 'completo';
  setSelectedPlan: (plan: 'essencial' | 'completo') => void;
  totalPrice: number;
  nome: string;
  email: string;
  rg: string;
  telefone: string;
  setNome: (name: string) => void;
  setEmail: (email: string) => void;
  setRg: (rg: string) => void;
  setTelefone: (telefone: string) => void;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

const planPrices = {
  essencial: 19.90,
  completo: 39.90
};

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [orderBumps, setOrderBumps] = useState<OrderBumps>({});
  const [selectedPlan, setSelectedPlan] = useState<'essencial' | 'completo'>('completo');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [rg, setRg] = useState('');
  const [telefone, setTelefone] = useState('');

  const toggleBump = useCallback((id: string, price: number) => {
    setOrderBumps(prev => {
      const newBumps = { ...prev };
      if (newBumps[id]) {
        delete newBumps[id];
      } else {
        newBumps[id] = price;
      }
      return newBumps;
    });
  }, []);

  const totalPrice = useMemo(() => {
    const basePrice = planPrices[selectedPlan];
    const extrasPrice = Object.values(orderBumps).reduce((sum, price) => sum + price, 0);
    return basePrice + extrasPrice;
  }, [selectedPlan, orderBumps]);


  return (
    <CheckoutContext.Provider value={{ orderBumps, toggleBump, selectedPlan, setSelectedPlan, totalPrice, nome, setNome, email, setEmail, rg, setRg, telefone, setTelefone }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
