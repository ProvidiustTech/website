// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Let asset and internal framework requests through immediately.
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname === '/favicon.ico' ||
    /\.(png|svg|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map((c) => {
      const [key, val] = c.split('=');
      return [key, val];
    })
  );
  const isAuthenticated = cookies['admin-auth'] === 'true';

  // Protect admin UI routes.
  if (pathname.startsWith('/admin/') && pathname !== '/admin/login') {
    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(`/admin/login?redirect=${encodeURIComponent(pathname)}`, request.url),
        { status: 307 }
      );
    }
  }

  // Protect admin-only blog APIs.
  if (pathname.startsWith('/api/blog')) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Allow admin auth APIs.
  if (
    pathname === '/api/admin/login' ||
    pathname === '/api/admin/auth-check' ||
    pathname === '/api/admin/logout'
  ) {
    return NextResponse.next();
  }

  // Allow all other API routes.
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Functional routes.
  const functionalRoutes = ['/', '/founding', '/admin', '/blog', '/pricing', '/product'];
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