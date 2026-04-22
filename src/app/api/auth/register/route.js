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
import { registerSchema } from "@/validations/authSchemas";

export async function POST(request) {
  await syncDb();

  const body = await request.json();
  const validation = registerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        errors: flattenZodErrors(validation.error),
        message: "Veuillez corriger les champs du formulaire.",
      },
      { status: 400 },
    );
  }

  const existingUser = await User.findOne({ where: { email: body.email.trim() } });

  if (existingUser) {
    return NextResponse.json(
      {
        errors: { email: ["Cette adresse email est deja utilisee."] },
        message: "Cette adresse email est deja utilisee.",
      },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await User.create({
    prenom: body.prenom.trim(),
    nom: body.nom.trim(),
    email: body.email.trim(),
    password: hashedPassword,
  });

  const payload = serializeUser(user);
  const token = signToken(payload);
  const response = NextResponse.json({ data: payload }, { status: 201 });

  response.cookies.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  return response;
}
