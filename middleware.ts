import { NextRequest, NextResponse } from 'next/server';
import { readSession, routeRoles } from './src/lib/session';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const rule = Object.entries(routeRoles).find(([prefix]) => path === prefix || path.startsWith(prefix + '/'));
  if (!rule) return NextResponse.next();
  const session = await readSession(request);
  if (!session) {
    const url = new URL('/login', request.url);
    url.searchParams.set('next', path);
    return NextResponse.redirect(url);
  }
  if (!rule[1].includes(session.role)) return NextResponse.redirect(new URL('/unauthorized', request.url));
  return NextResponse.next();
}
export const config = { matcher: ['/platform/:path*','/owner/:path*','/manager/:path*','/member/:path*'] };
