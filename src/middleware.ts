import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { url, cookies } = request;
  const { redirect, next } = NextResponse;
  const token = cookies.get('userLogin')?.value;
  const signInURL = new URL('/', url);
  const dashboardURL = new URL('/dashboard', url);

  if (!token) {
    if (pathname === '/' || pathname === '/create-account') return next();
    return redirect(signInURL);
  }

  if (pathname === '/' || pathname === '/create-account')
    return redirect(dashboardURL);
}

export const config = {
  matcher: ['/', '/create-account', '/dashboard/:path*'],
};
