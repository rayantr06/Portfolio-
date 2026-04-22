import { NextResponse } from "next/server";
import { syncDb } from "@/lib/db";
import { flattenZodErrors } from "@/lib/auth";
import { getRequestUser } from "@/lib/session";
import { Testimonial, User } from "@/models/relations";
import { testimonialSchema } from "@/validations/testimonialSchemas";

function formatDateLabel(value) {
  return new Date(value).toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function serializeTestimonial(testimonial) {
  return {
    id: testimonial.id,
    message: testimonial.message,
    userId: testimonial.userId,
    authorName: `${testimonial.user.prenom} ${testimonial.user.nom}`,
    createdAt: testimonial.createdAt,
    updatedAt: testimonial.updatedAt,
    updatedLabel: formatDateLabel(testimonial.updatedAt),
  };
}

export async function GET(_request, { params }) {
  const { id } = await params;

  await syncDb();

  const testimonial = await Testimonial.findByPk(id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "prenom", "nom"],
      },
    ],
  });

  if (!testimonial) {
    return NextResponse.json({ message: "Temoignage introuvable." }, { status: 404 });
  }

  return NextResponse.json({ data: serializeTestimonial(testimonial) }, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = await params;

  await syncDb();

  const user = await getRequestUser(request);

  if (!user) {
    return NextResponse.json({ message: "Utilisateur non authentifie." }, { status: 401 });
  }

  const testimonial = await Testimonial.findByPk(id);

  if (!testimonial) {
    return NextResponse.json({ message: "Temoignage introuvable." }, { status: 404 });
  }

  if (Number(testimonial.userId) !== Number(user.id)) {
    return NextResponse.json(
      { message: "Vous ne pouvez modifier que votre propre temoignage." },
      { status: 403 },
    );
  }

  const body = await request.json();
  const validation = testimonialSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        errors: flattenZodErrors(validation.error),
        message: "Veuillez corriger le temoignage.",
      },
      { status: 400 },
    );
  }

  await testimonial.update({ message: body.message.trim() });

  const updated = await Testimonial.findByPk(id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "prenom", "nom"],
      },
    ],
  });

  return NextResponse.json({ data: serializeTestimonial(updated) }, { status: 200 });
}
