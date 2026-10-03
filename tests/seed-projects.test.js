import { describe, expect, it } from "vitest";
import { buildProjectSeed } from "@/lib/content/projectsSeed";

describe("buildProjectSeed", () => {
  it("returns the six approved portfolio projects", () => {
    const projects = buildProjectSeed();

    expect(projects).toHaveLength(6);
    expect(projects.map((project) => project.slug)).toEqual([
      "lidal-pulse",
      "ouiagent",
      "alerte-ia",
      "safar",
      "let-data-dz",
      "gestion-tournoi-golf",
    ]);
  });

  it("includes the fields needed by the API and project detail pages", () => {
    const [firstProject] = buildProjectSeed();

    expect(firstProject).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        shortDescription: expect.any(String),
        fullDescription: expect.any(String),
        role: expect.any(String),
        technologies: expect.any(String),
        githubUrl: expect.any(String),
      }),
    );
  });
});
