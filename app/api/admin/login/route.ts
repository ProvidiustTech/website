// app/api/admin/login/route.ts - Admin login API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create response with auth cookie
    const response = NextResponse.json(
      { message: 'Authenticated successfully', success: true },
      { status: 200 }
    );

    // Set the authentication cookie - use root path for broader access
    response.cookies.set({
      name: 'admin-auth',
      value: 'true',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/', // Root path so it's accessible everywhere
    });

    return response;
  } catch (err) {
    console.error('[admin/login]', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
