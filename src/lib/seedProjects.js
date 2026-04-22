import { Project } from "@/models/relations";
import { buildProjectSeed } from "@/lib/content/projectsSeed";

export async function ensureProjectSeed() {
  const totalProjects = await Project.count();

  if (totalProjects === 0) {
    await Project.bulkCreate(buildProjectSeed());
  }
}
