import ProductGrid from 'components/grid/product-grid';

// // export const runtime = 'edge';

// export const revalidate = 43200; // 12 hours

export const metadata = {
  description: 'your store',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage({ params }: { params: { subdomain: string }}) {

  return (
    <>
        <ProductGrid subdomain={params.subdomain} /> {/* Pass subdomain as a prop */}
      {/* <ThreeItemGrid />
      {params.subdomain}
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
          {params.subdomain}
        </Suspense>
      </Suspense> */}
    </>
  );
}
