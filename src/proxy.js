import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { AUTH_COOKIE_NAME } from "@/lib/session";

const publicRoutes = new Set([
  "/login",
  "/inscription",
  "/api/auth/login",
  "/api/auth/register",
]);

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isApi = pathname.startsWith("/api");

  if (publicRoutes.has(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    if (isApi) {
      return NextResponse.json({ message: "Non autorise." }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await verifyToken(token);

  if (!user) {
    if (isApi) {
      return NextResponse.json({ message: "Session invalide." }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  const headers = new Headers(request.headers);
  headers.set(
    "x-user",
    JSON.stringify({
      id: user.id,
      prenom: user.prenom,
      nom: user.nom,
      email: user.email,
    }),
  );

  return NextResponse.next({
    request: { headers },
  });
}

export const config = {
  matcher: [
    "/",
    "/projets/:path*",
    "/temoignages/:path*",
    "/api/projects/:path*",
    "/api/testimonials/:path*",
    "/api/auth/me",
    "/api/auth/logout",
  ],
};
