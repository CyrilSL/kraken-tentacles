// CheckoutPage.tsx
import React from 'react';
import { cookies } from 'next/headers';
import ClientCheckout from './stripe/ClientCheckout';
import { Elements } from '@stripe/react-stripe-js';



const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';

interface PaymentProvider {
  provider_id: string;
  status: string;
}

interface CartResponse {
  cart: {
    payment_sessions: PaymentProvider[];
  };
}

async function fetchPaymentProviders(cartId: string): Promise<PaymentProvider[]> {
  const response = await fetch(`${BACKEND_URL}/store/carts/${cartId}/payment-sessions`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { cart } = await response.json() as CartResponse;
  return cart.payment_sessions;
}

export default async function CheckoutPage() {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return <div>Error: No cart ID found</div>;
  }

  let paymentProviders: PaymentProvider[] = [];
  let error: string | null = null;

  try {
    paymentProviders = await fetchPaymentProviders(cartId);
  } catch (e) {
    console.error('Failed to fetch payment providers:', e);
    error = e instanceof Error ? e.message : 'An unknown error occurred';
  }

  return (
    <ClientCheckout
      cartId={cartId}
      paymentProviders={paymentProviders}
      error={error}
    />
  );
}
