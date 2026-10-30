import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (/^\/(en|fa)(\/|$)/.test(pathname)) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = '/fa' + pathname;
  return NextResponse.redirect(url);
}

export const config = { matcher: ['/((?!_next|media|favicon|.*\\..*).*)'] };
