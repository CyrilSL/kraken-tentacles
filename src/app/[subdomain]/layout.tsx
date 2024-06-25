import Navbar from 'components/layout/navbar';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import { CSPostHogProvider } from './providers';
import { fetchStoreDetailsByDomain } from 'lib/fetchStoreDetailsByDomain';
import PageDoesNotExist
 from './page-does-not-exist';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default async function RootLayout({ 
  params, 
  children 
}: { 
  params: { subdomain: string }; 
  children: ReactNode 
}) {
  try {
    const storeDetails = await fetchStoreDetailsByDomain(params.subdomain, { cache: 'no-store' });
    
    if (!storeDetails?.store?.id) {
      return <PageDoesNotExist/>;
    }

    return (
      <html lang="en" className={inter.variable}>
        <body>
          <CSPostHogProvider>
            <div className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
              <Navbar />
              <main>{children}</main>
            </div>
          </CSPostHogProvider>
        </body>
      </html>
    );
  } catch (error) {
    console.error('Error fetching store details:', error);
    return <p>An error occurred while loading the store.</p>;
  }
}