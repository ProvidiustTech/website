// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // List all your FUNCTIONAL pages/routes here (do NOT redirect these)
  const functionalRoutes = [
    '/',                      // homepage
    '/founding',              // founding program page
    '/admin',                 // admin dashboard
    '/admin/applications',    // admin applications section
  ];

  // Protect API routes, static files, etc. - let them through without modification
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the current route is functional (exact match or starts with functional route)
  const isFunctionalRoute = functionalRoutes.some(route => {
    // Exact match
    if (pathname === route) return true;
    // Sub-route match (e.g., /admin/applications starts with /admin)
    if (pathname.startsWith(route + '/')) return true;
    return false;
  });

  // If the route is NOT in your functional list → redirect to Coming Soon
  if (!isFunctionalRoute && pathname !== '/founding/coming-soon') {
    const response = NextResponse.redirect(
      new URL('/founding/coming-soon', request.url),
      { status: 307 }
    );
    return response;
  }

  return NextResponse.next();
}

// Run middleware on all routes except static assets
export const config = {
  matcher: [
    // Run on all routes except:
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.jpeg|.*\\.webp).*)',
  ],
};