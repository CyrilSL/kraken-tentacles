// app/product-grid/page.tsx

import { fetchProductsByID } from 'lib/fetchProductsByID';
import { fetchStoreDetailsByDomain } from 'lib/fetchStoreDetailsByDomain';
import Image from 'next/image';
import Link from 'next/link';
// import type { Product } from 'lib/medusa/types';

interface ProductGridProps {
  subdomain: string;
}

const ProductGrid = async ({ subdomain }: ProductGridProps) => {
  try {
    const storeDetails = await fetchStoreDetailsByDomain(subdomain);
    const products = await fetchProductsByID(storeDetails.store.id, { cache: 'no-store' });

    if (!products || products.length === 0) {
      return <p>No products found.</p>;
    }

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
  } catch (error) {
    console.error('Failed to load products:', error);
    return <p>Failed to load products. Please try again later.</p>;
  }
};

export default ProductGrid;
