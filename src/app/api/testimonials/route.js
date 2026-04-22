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

export async function GET() {
  await syncDb();

  const testimonials = await Testimonial.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "prenom", "nom"],
      },
    ],
    order: [["updatedAt", "DESC"]],
  });

  return NextResponse.json(
    { data: testimonials.map(serializeTestimonial) },
    { status: 200 },
  );
}

export async function POST(request) {
  await syncDb();

  const user = await getRequestUser(request);

  if (!user) {
    return NextResponse.json({ message: "Utilisateur non authentifie." }, { status: 401 });
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

  const testimonial = await Testimonial.create({
    message: body.message.trim(),
    userId: user.id,
  });

  const created = await Testimonial.findByPk(testimonial.id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "prenom", "nom"],
      },
    ],
  });

  return NextResponse.json({ data: serializeTestimonial(created) }, { status: 201 });
}
