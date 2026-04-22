import { describe, expect, it } from "vitest";
import reducer, {
  setProjects,
  setProjectsLoading,
  setSelectedProject,
} from "@/store/slices/projectsSlice";

describe("projectsSlice", () => {
  it("stores the fetched project list", () => {
    const state = reducer(
      undefined,
      setProjects([
        { id: 1, slug: "ramypulse", title: "RamyPulse" },
        { id: 2, slug: "gestion-tournoi-golf", title: "Gestion de tournoi de golf" },
      ]),
    );

    expect(state.items).toHaveLength(2);
    expect(state.status).toBe("succeeded");
  });

  it("stores the selected project detail", () => {
    const state = reducer(
      undefined,
      setSelectedProject({ id: 1, slug: "ramypulse", title: "RamyPulse" }),
    );

    expect(state.selectedProject?.slug).toBe("ramypulse");
  });

  it("tracks project loading state", () => {
    const state = reducer(undefined, setProjectsLoading());

    expect(state.status).toBe("loading");
  });
});
