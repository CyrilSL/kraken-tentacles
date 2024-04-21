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



  return NextResponse.rewrite(url);
}