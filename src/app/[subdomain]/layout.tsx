import Navbar from 'components/layout/navbar';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';
import { CSPostHogProvider } from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default async function RootLayout({ params, children }: { params: { subdomain: string }; children: ReactNode }) {
  return (
    
      <CSPostHogProvider>
      <div className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Navbar />
        <Suspense>
          
          <main>{children}</main>
        </Suspense>
     </div>
      </CSPostHogProvider>


  );
}


