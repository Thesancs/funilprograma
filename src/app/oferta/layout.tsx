"use client";

import { CheckoutProvider } from '@/contexts/CheckoutContext';

export default function OfertaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CheckoutProvider>
      {children}
    </CheckoutProvider>
  )
}