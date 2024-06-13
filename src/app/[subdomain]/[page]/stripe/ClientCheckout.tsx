'use client';
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Ensure the Stripe public key is correctly set
const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "pk_test_51OyTzlSEZaK92Ulodkozht1cMui36WK2Rq2aIoQDbHjS3732ZBBwU8DCcQ781YWs1IjVoFBTfhpmdrMsw2pGZPSa00aoe2sSCo";
const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';

interface PaymentProvider {
  provider_id: string;
  status: string;
}

interface ClientCheckoutProps {
  cartId: string;
  paymentProviders: PaymentProvider[];
  error: string | null;
}

async function createStripePaymentSession(cartId: string): Promise<string> {
  const response = await fetch(`${BACKEND_URL}/store/carts/${cartId}/payment-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      provider_id: 'stripe',
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const { client_secret } = data.cart.payment_session.data;

  if (!client_secret) {
    throw new Error('Invalid server response, missing client secret');
  }

  return client_secret;
}

const StripeCheckout: React.FC<{ cartId: string }> = ({ cartId }) => {
  const [errorState, setError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleStripeCheckout = async () => {
    try {
      const clientSecret = await createStripePaymentSession(cartId);
      const cardElement = elements?.getElement(CardElement);
      
      if (!stripe || !cardElement) {
        throw new Error('Stripe has not loaded properly.');
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: 'customer@example.com',
            name:"Kraken",
            address: {
              city : "Example", 
              country : "us",
              line1 : "Line 1 Address",
              postal_code : "888888",
            },
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'An error occurred during payment');        
        return;
      }

      // Payment was successful, complete the cart in Medusa
      const completeResponse = await fetch(`${BACKEND_URL}/store/carts/${cartId}/complete`, {
        method: 'POST',
      });

      if (!completeResponse.ok) {
        throw new Error('Failed to complete the cart');
      }

      console.log('Payment successful:', paymentIntent);
    } catch (e) {
      console.error('Payment failed:', e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
    }
  };

  if (errorState) {
    return <div>Error: {errorState}</div>;
  }

  return (
    <div>
      <CardElement />
      <button onClick={handleStripeCheckout}>Pay with Stripe</button>
    </div>
  );
};

const ClientCheckout: React.FC<ClientCheckoutProps> = ({ cartId, paymentProviders, error }) => {
  const [errorState, setError] = useState<string | null>(error);

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  return (
    <Elements stripe={loadStripe(STRIPE_PUBLIC_KEY)}>
      <h1>Checkout</h1>
      <p>Cart ID: {cartId}</p>
      <h2>Available Payment Providers:</h2>
      {paymentProviders.length > 0 ? (
        <ul>
          {paymentProviders.map((provider, index) => (
            <li key={index}>
              <strong>{provider.provider_id}</strong>
              <br />
              Status: {provider.status}
              {provider.provider_id === 'stripe' && <StripeCheckout cartId={cartId} />}
            </li>
          ))}
        </ul>
      ) : (
        <p>No payment providers available.</p>
      )}
    </Elements>
  );
};

export default ClientCheckout;
