import React from 'react';
import { notFound } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
// Define the type for the product data
type ProductData = {
  download_link: {
    id: string;
    unique_url: string;
    expires_at: string;
  };
  variant: {
    id: string;
    title: string;
    sku: string;
    thumbnail: string;
    product: {
      id: string;
      title: string;
    };
  };
  media: {
    id: string;
    name: string;
    mime_type: string;
  };
  download_url: string;
};


// Function to fetch product data
async function fetchProductData(uniqueUrl: string): Promise<ProductData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/download/${uniqueUrl}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch product data');
  }

  return res.json();
}

export default async function ProductDownloadPage({ params }: { params: { uniqueUrl: string } }) {
  let productData: ProductData;


  try {
    productData = await fetchProductData(params.uniqueUrl);
  } catch (error) {
    console.error('Error fetching product data:', error);
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load product data. Please try again later. `{process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/download/{params.uniqueUrl}` </AlertDescription>
      </Alert>
    );
  }

  if (!productData) {
    notFound();
  }

  const { download_link, variant, media, download_url } = productData;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">{variant.product.title}</h1>
          <p className="text-gray-500">{variant.title}</p>
        </CardHeader>
        <CardContent>
          {variant.thumbnail && (
            <img 
              src={variant.thumbnail} 
              alt={variant.title} 
              className="w-full h-64 object-cover mb-4"
            />
          )}
          <p><strong>SKU:</strong> {variant.sku}</p>
          <p><strong>File Name:</strong> {media.name}</p>
          <p><strong>File Type:</strong> {media.mime_type}</p>
          <p><strong>Expires At:</strong> {new Date(download_link.expires_at).toLocaleString()}</p>
        </CardContent>
        <CardFooter>
          <Link href={download_url} passHref legacyBehavior>
            <a 
              download={media.name}
              className="w-full px-4 py-2 bg-blue-500 text-white text-center rounded hover:bg-blue-600 transition-colors"
            >
              Download File
            </a>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}