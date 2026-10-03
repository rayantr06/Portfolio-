import { Project } from "@/models/relations";
import { buildProjectSeed } from "@/lib/content/projectsSeed";

export async function ensureProjectSeed() {
  const oldLidal = await Project.findOne({ where: { slug: "ramypulse" } });
  const currentLidal = await Project.findOne({ where: { slug: "lidal-pulse" } });
  if (oldLidal && !currentLidal) {
    await oldLidal.update({ slug: "lidal-pulse" });
  }

  for (const project of buildProjectSeed()) {
    const content = { ...project };
    delete content.category;
    const [record, created] = await Project.findOrCreate({
      where: { slug: project.slug },
      defaults: content,
    });
    if (!created && Object.entries(content).some(([key, value]) => record.get(key) !== value)) {
      await record.update(content);
    }
  }
}
