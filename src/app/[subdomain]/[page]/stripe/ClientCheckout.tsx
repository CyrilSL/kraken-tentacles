'use client';
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

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

const StripeCheckout: React.FC<{ cartId: string; clientSecret: string }> = ({ cartId, clientSecret }) => {
  const [errorState, setError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleStripeCheckout = async () => {
    try {
      if (!stripe || !elements) {
        throw new Error('Stripe has not loaded properly.');
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'https://google.com',
          payment_method_data: {
            billing_details: {
              name: 'John Doe', // Replace with the desired name
              address: {
                line1: '123 Main St', // Replace with the desired address
                city: 'Anytown',
                state: 'CA',
                postal_code: '12345',
                country: 'US',
              },
            },
          },
        },
      });

      if (error) {
        setError(error.message ?? 'An error occurred');
        return;
      }

      // Payment was successful, complete the cart in Medusa
      const completeResponse = await fetch(`${BACKEND_URL}/store/carts/${cartId}/complete`, {
        method: 'POST',
      });

      if (!completeResponse.ok) {
        throw new Error('Failed to complete the cart');
      }

      console.log('Payment successful');
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
      <PaymentElement />
      <button onClick={handleStripeCheckout}>Pay with Stripe</button>
    </div>
  );
};

const ClientCheckout: React.FC<ClientCheckoutProps> = ({ cartId, paymentProviders, error }) => {
  const [errorState, setError] = useState<string | null>(error);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setError(error);
    }

    const fetchClientSecret = async () => {
      try {
        const secret = await createStripePaymentSession(cartId);
        setClientSecret(secret);
      } catch (e) {
        console.error('Failed to fetch client secret:', e);
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      }
    };

    fetchClientSecret();
  }, [cartId, error]);

  return clientSecret ? (
    <Elements stripe={loadStripe(STRIPE_PUBLIC_KEY)} options={{ clientSecret }}>
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
              {provider.provider_id === 'stripe' && <StripeCheckout cartId={cartId} clientSecret={clientSecret} />}
            </li>
          ))}
        </ul>
      ) : (
        <p>No payment providers available.</p>
      )}
    </Elements>
  ) : (
    <div>Loading...</div>
  );
};

export default ClientCheckout;