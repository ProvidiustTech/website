// app/api/admin/logout/route.ts - Admin logout endpoint
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  );

  // Clear the authentication cookie
  response.cookies.set({
    name: 'admin-auth',
    value: '',
    httpOnly: true,
    maxAge: 0,
    path: '/admin',
  });

  return response;
}
