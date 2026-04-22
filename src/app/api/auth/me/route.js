import { NextResponse } from "next/server";
import { getRequestUser } from "@/lib/session";

export async function GET(request) {
  const user = await getRequestUser(request);

  if (!user) {
    return NextResponse.json({ message: "Utilisateur non authentifie." }, { status: 401 });
  }

  return NextResponse.json(
    {
      data: {
        id: user.id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
      },
    },
    { status: 200 },
  );
}
