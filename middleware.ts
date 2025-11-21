import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  // Rutas protegidas
  const protectedRoutes = ["/admin/biblioteca"];

  const path = req.nextUrl.pathname;

  if (protectedRoutes.includes(path) && !token) {
    const loginUrl = new URL("/admin", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Middleware aplicado a rutas específicas
export const config = {
  matcher: ["/admin/biblioteca"],
};
