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

export async function GET() {
  await syncDb();
  await ensureProjectSeed();

  const projects = await Project.findAll({
    order: [["id", "ASC"]],
  });

  return NextResponse.json(
    { data: projects.map(serializeProject) },
    { status: 200 },
  );
}
