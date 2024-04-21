import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getValidSubdomain } from './lib/util/subdomain';

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;

  const hostname = req.headers.get('host');
  console.log("env: ",process.env.NEXT_PUBLIC_BASE_URL)
  const subdomain = getValidSubdomain(hostname);
  if (subdomain) {
    // Subdomain available, rewriting
    console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
    url.pathname = `/${subdomain}${url.pathname}`;
  }

   // Check if the request is made to the root domain (localhost:8000 or your production domain)
   if (hostname === 'localhost:8000' || hostname === process.env.NEXT_PUBLIC_BASE_URL) {
    // Rewrite the root application to `/home` folder
    const path = `${url.pathname === '/' ? '' : url.pathname}`;
    url.pathname = `/home${path}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.rewrite(url);
}