import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLang, langs } from "./i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname has a language prefix
  const pathnameHasLang = langs.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`,
  );

  if (!pathnameHasLang) {
    // Redirect to the default language
    const redirectUrl = new URL(
      `/${defaultLang}${pathname === "/" ? "" : pathname}`,
      request.url,
    );

    // 确保重定向是永久性的，这对 SEO 和缓存很重要
    return NextResponse.redirect(redirectUrl, { status: 301 });
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
