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

  // CRITICAL: Protect API routes, static files, etc. - let them through without modification
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname === '/favicon.ico' ||
    // Allow all files in public directory (images, fonts, etc.)
    /\.(png|svg|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$/i.test(pathname)
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

// Run middleware on all routes EXCEPT these patterns
export const config = {
  matcher: [
    // Exclude API routes, static files, and common assets
    '/((?!api|_next|static|favicon\\.ico|.*\\.(?:png|svg|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
};