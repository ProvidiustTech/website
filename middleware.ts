// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // CRITICAL: Protect API routes, static files, etc. - let them through without modification
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname === '/favicon.ico' ||
    /\.(png|svg|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Protect admin routes - check auth cookie
  if (pathname.startsWith('/admin/') && pathname !== '/admin/login') {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map((c) => {
        const [key, val] = c.split('=');
        return [key, val];
      })
    );
    const isAuthenticated = cookies['admin-auth'] === 'true';

    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(`/admin/login?redirect=${encodeURIComponent(pathname)}`, request.url),
        { status: 307 }
      );
    }
  }

  // Protect admin API routes
  if (pathname.startsWith('/api/blog/') && (pathname.includes('create') || pathname.includes('PUT'))) {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map((c) => {
        const [key, val] = c.split('=');
        return [key, val];
      })
    );
    const isAuthenticated = cookies['admin-auth'] === 'true';

    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Functional routes
  const functionalRoutes = ['/', '/founding', '/admin', '/blog'];
  const isFunctionalRoute = functionalRoutes.some(route => {
    if (pathname === route) return true;
    if (pathname.startsWith(route + '/')) return true;
    return false;
  });

  // Redirect unfunctional routes to Coming Soon
  if (!isFunctionalRoute && pathname !== '/founding/coming-soon') {
    return NextResponse.redirect(
      new URL('/founding/coming-soon', request.url),
      { status: 307 }
    );
  }

  return NextResponse.next();
}

// Run middleware on all routes EXCEPT these patterns
export const config = {
  matcher: [
    '/((?!api|_next|static|favicon\\.ico|.*\\.(?:png|svg|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
};