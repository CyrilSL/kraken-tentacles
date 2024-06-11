import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getValidSubdomain } from 'utils/subdomain';

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Check only the pathname, not the full URL (which includes query params)
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) {
    return;
  }

  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);

  if (subdomain) {
    // Subdomain available, rewriting
    console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  const path = `${url.pathname === '/' ? '' : url.pathname}`;
  url.pathname = `/home${path}`;
  return NextResponse.rewrite(url);
}