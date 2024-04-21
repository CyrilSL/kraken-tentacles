import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getValidSubdomain } from './lib/util/subdomain';

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('/_next')) return;

  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);
  
  if (subdomain && host) { // Ensure host is not null
    // Check if the request is a subdomain
    if (host.startsWith(`${subdomain}.`)) {
      // Subdomain available, rewriting
      console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
      url.pathname = `/${subdomain}${url.pathname}`;
      return NextResponse.rewrite(url);
    } else {
      // The request is not a subdomain, return a 404 page
      return NextResponse.redirect(new URL('/404', req.url));
    }
  }

  // If no subdomain found, rewrite everything else to `[domain]/[slug]` dynamic route
  const rootDomain = process.env.NEXT_PUBLIC_BASE_URL || 'localhost:8000';
  if (host !== rootDomain) {
    return NextResponse.rewrite(new URL(`/${host}${url.pathname}`, req.url));
  }

  // If the host is the root domain, return the original request
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};