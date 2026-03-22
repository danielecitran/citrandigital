import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  LOCALE_HEADER,
  negotiateLocale,
  type Locale,
} from "@/lib/i18n";

function localeFromPathname(pathname: string): Locale | null {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first === "de" || first === "en") return first;
  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameLocale = localeFromPathname(pathname);

  if (pathnameLocale) {
    if (pathname.startsWith(`/${pathnameLocale}/impressum`)) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(
        `/${pathnameLocale}/impressum`,
        `/${pathnameLocale}/legal`,
      );
      return NextResponse.redirect(url, 308);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LOCALE_HEADER, pathnameLocale);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const locale = negotiateLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();

  if (pathname === "/impressum") {
    url.pathname = `/${locale}/legal`;
  } else if (pathname.startsWith("/impressum/")) {
    url.pathname = `/${locale}/legal${pathname.slice("/impressum".length)}`;
  } else {
    url.pathname =
      pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
