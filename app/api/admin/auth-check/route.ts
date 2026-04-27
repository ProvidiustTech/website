// app/api/admin/auth-check/route.ts - Check if admin is authenticated
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const adminCookie = cookieHeader.split('; ').find((c) => c.startsWith('admin-auth='));
    const isAuthenticated = adminCookie === 'admin-auth=true';

    return NextResponse.json(
      { authenticated: isAuthenticated },
      { status: isAuthenticated ? 200 : 401 }
    );
  } catch (err) {
    console.error('[admin/auth-check]', err);
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
