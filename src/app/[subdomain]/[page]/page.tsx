import React from 'react';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'; // Replace with your actual backend URL

interface PaymentProvider {
  provider_id: string;
  status: string;
  // Add other properties as needed
}

interface CartResponse {
  cart: {
    payment_sessions: PaymentProvider[];
  };
}

async function fetchPaymentProviders(cartId: string): Promise<PaymentProvider[]> {
  const response = await fetch(`${BACKEND_URL}/store/carts/${cartId}/payment-sessions`, {
    method: "POST",
    credentials: "include",
    cache: 'no-store', // Disable caching for this request
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
    console.error("Failed to fetch payment providers:", e);
    error = e instanceof Error ? e.message : 'An unknown error occurred';
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <p>Cart ID: {cartId}</p>
      
      <h2>Available Payment Providers:</h2>
      {paymentProviders.length > 0 ? (
        <ul>
          {paymentProviders.map((provider, index) => (
            <li key={index}>
              <strong>{provider.provider_id}</strong>
              <p>Status: {provider.status}</p>
              {/* Add more provider details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No payment providers available.</p>
      )}
    </div>
  );
}