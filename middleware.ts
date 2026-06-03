import { NextResponse, type NextRequest } from "next/server";

// Flip this on in Vercel → Project → Settings → Environment Variables:
//   MAINTENANCE_MODE = true   → site shows the "down for repairs" page
//   (delete it or set to anything else)  → site is live as normal
//
// Optional: set MAINTENANCE_BYPASS_TOKEN to a secret string so you can still
// browse the real site while it's "down" by visiting:  /?preview=<that-token>
// (it drops a cookie, so you only need to do it once per browser).

const COOKIE = "mb-preview";

export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  const { pathname, searchParams } = request.nextUrl;

  // Always let the maintenance page itself and the admin dashboard through.
  if (pathname === "/maintenance" || pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Preview bypass for the site owner.
  const token = process.env.MAINTENANCE_BYPASS_TOKEN;
  if (token) {
    if (searchParams.get("preview") === token) {
      const res = NextResponse.next();
      res.cookies.set(COOKIE, token, { httpOnly: true, sameSite: "lax", path: "/" });
      return res;
    }
    if (request.cookies.get(COOKIE)?.value === token) {
      return NextResponse.next();
    }
  }

  // Everyone else: serve the maintenance page with a 503 (temporary) status.
  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  return NextResponse.rewrite(url, {
    status: 503,
    headers: { "Retry-After": "3600" },
  });
}

// Run on all routes except Next internals, the API, and static assets.
export const config = {
  matcher: ["/((?!_next/|api/|favicon.ico|.*\\.[\\w]+$).*)"],
};
