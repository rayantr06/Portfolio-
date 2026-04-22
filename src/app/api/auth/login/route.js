import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { syncDb } from "@/lib/db";
import {
  flattenZodErrors,
  getAuthCookieOptions,
  serializeUser,
  signToken,
} from "@/lib/auth";
import { AUTH_COOKIE_NAME } from "@/lib/session";
import { User } from "@/models/relations";
import { loginSchema } from "@/validations/authSchemas";

export async function POST(request) {
  await syncDb();

  const body = await request.json();
  const validation = loginSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        errors: flattenZodErrors(validation.error),
        message: "Veuillez corriger les champs du formulaire.",
      },
      { status: 400 },
    );
  }

  const user = await User.findOne({ where: { email: body.email.trim() } });

  if (!user) {
    return NextResponse.json(
      { message: "Email ou mot de passe invalide." },
      { status: 401 },
    );
  }

  const passwordMatches = await bcrypt.compare(body.password, user.password);

  if (!passwordMatches) {
    return NextResponse.json(
      { message: "Email ou mot de passe invalide." },
      { status: 401 },
    );
  }

  const payload = serializeUser(user);
  const token = signToken(payload);
  const response = NextResponse.json({ data: payload }, { status: 200 });

  response.cookies.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  return response;
}
