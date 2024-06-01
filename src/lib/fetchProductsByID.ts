// lib/fetchProductsByID.ts

import type { Product } from "./medusa/types";

export const fetchProductsByID = async (storeID: string, options?: RequestInit): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products?store_id=${storeID}`,
      {
        ...options,
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Network response was not ok: ${errorData.message}`);
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};
