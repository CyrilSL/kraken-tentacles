import Image from "next/image";
import Link from "next/link";
import type { Product } from 'lib/medusa/types';
import { fetchProductsByDomain } from 'lib/fetchProductsByDomain';

interface ProductGridProps {
  subdomain: string;
}

export default async function ProductGrid({ subdomain }: ProductGridProps) {
  const domainProducts = await fetchProductsByDomain(subdomain);

  console.log("Subdomain : ",subdomain)
  console.log("Subdomain products : ",domainProducts)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      Subdomain products : {JSON.stringify(domainProducts, null, 2)}
      products : {subdomain}
      {domainProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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