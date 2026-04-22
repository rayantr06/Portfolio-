import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

const SECRET = process.env.JWT_SECRET || "portfolio-secret-rayan-terki";
const JOSE_SECRET = new TextEncoder().encode(SECRET);

export function serializeUser(user) {
  return {
    id: user.id,
    prenom: user.prenom,
    nom: user.nom,
    email: user.email,
  };
}

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JOSE_SECRET);
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function flattenZodErrors(error) {
  return error.flatten().fieldErrors;
}
