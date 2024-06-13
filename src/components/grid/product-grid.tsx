// app/product-grid/page.tsx
import { fetchProductsByID } from 'lib/fetchProductsByID';
import { fetchStoreDetailsByDomain } from 'lib/fetchStoreDetailsByDomain';
import Image from 'next/image';
import Link from 'next/link';

interface ProductGridProps {
  subdomain: string;
}

const ProductGrid = async ({ subdomain }: ProductGridProps) => {
  try {
    const storeDetails = await fetchStoreDetailsByDomain(subdomain);
    if (!storeDetails?.store?.id) {
      return <p>Store details not found.</p>;
    }

    const products = await fetchProductsByID(storeDetails.store.id, { cache: 'no-store' });
    if (!products || products.length === 0) {
      return <p>No products found.</p>;
    }

    return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
          >
            <Link href={`/product/${product.handle}`} className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            {product.thumbnail && (
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={500}
                height={500}
                className="object-cover w-full aspect-square"
              />
            )}
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">{product.title}</h3>
            </div>
          </div>
        ))}
      </section>
    );
  } catch (error) {
    console.error('Failed to load products:', error);
    return <p>Failed to load products. Please try again later.</p>;
  }
};

export default ProductGrid;