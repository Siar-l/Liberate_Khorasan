import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "culture_admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isCultureAdmin = /^\/(fa|en)\/culture\/admin(?:\/|$)/.test(pathname);
  const isLoginPage = /^\/(fa|en)\/culture\/admin\/login\/?$/.test(pathname);

  if (!isCultureAdmin || isLoginPage) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (session) {
    return NextResponse.next();
  }

  const locale = pathname.startsWith("/en") ? "en" : "fa";
  const loginUrl = new URL(`/${locale}/culture/admin/login`, request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/:path*"],
};
