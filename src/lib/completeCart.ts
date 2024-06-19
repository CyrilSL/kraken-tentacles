interface CompleteCartResponse {
  type: string;
  data: any;
}

export async function completeCart(cartId: string): Promise<CompleteCartResponse> {
  const completeResponse = await fetch(`http://localhost:9000/store/carts/${cartId}/complete`, {
    method: 'POST',
    credentials: 'include', // Include cookies in the request
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!completeResponse.ok) {
    throw new Error('Failed to complete the cart');
  }

  const data = await completeResponse.json();
  return data;
}