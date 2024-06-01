"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "lib/medusa/types";
import { fetchStoreDetailsByDomain } from "lib/fetchStoreDetailsByDomain";
import { useState, useEffect } from "react";

export const fetchProductsByID = async (storeID: string): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products?store_id=${storeID}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Network response was not ok: ${errorData.message}`);
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

interface ProductGridProps {
  subdomain: string;
}

export default function ProductGrid({ subdomain }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeID = await fetchStoreDetailsByDomain(subdomain);
        const productData = await fetchProductsByID(storeID.store.id);
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [subdomain]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <Link href={`/product/${product.handle}`}>
            <div className="relative h-48">
              {product.thumbnail && (
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}