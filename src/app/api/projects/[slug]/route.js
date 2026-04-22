import { NextResponse } from "next/server";
import { syncDb } from "@/lib/db";
import { ensureProjectSeed } from "@/lib/seedProjects";
import { Project } from "@/models/relations";

function serializeProject(project) {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    fullDescription: project.fullDescription,
    role: project.role,
    technologies: project.technologies,
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl || "",
    imageUrl: project.imageUrl || "",
  };
}

export async function GET(_request, { params }) {
  const { slug } = await params;

  await syncDb();
  await ensureProjectSeed();

  const project = await Project.findOne({ where: { slug } });

  if (!project) {
    return NextResponse.json({ message: "Projet introuvable." }, { status: 404 });
  }

  return NextResponse.json({ data: serializeProject(project) }, { status: 200 });
}
