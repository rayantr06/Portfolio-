import { verifyToken } from "@/lib/auth";

export const AUTH_COOKIE_NAME = "portfolio_token";

export async function getRequestUser(request) {
  const forwardedUser = request.headers.get("x-user");

  if (forwardedUser) {
    try {
      return JSON.parse(forwardedUser);
    } catch {
      return null;
    }
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}
