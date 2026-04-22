"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "@/components/projects/ProjectCard";
import apiClient from "@/lib/apiClient";
import {
  setProjects,
  setProjectsError,
  setProjectsLoading,
} from "@/store/slices/projectsSlice";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.projects);

  useEffect(() => {
    if (items.length > 0 || status === "loading") {
      return;
    }

    async function loadProjects() {
      dispatch(setProjectsLoading());

      try {
        const response = await apiClient.get("/api/projects");
        dispatch(setProjects(response.data.data));
      } catch (requestError) {
        dispatch(
          setProjectsError(
            requestError.response?.data?.message ||
              "Impossible de charger les projets.",
          ),
        );
      }
    }

    loadProjects();
  }, [dispatch, items.length, status]);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
          Projets
        </p>
        <h2 className="text-4xl font-semibold text-slate-950">
          Projets presentes dans le portfolio
        </h2>
        <p className="max-w-3xl leading-7 text-slate-700">
          Cette page recupere les projets depuis le backend Next API et affiche leur
          description, leurs technologies et leur lien de detail.
        </p>
      </div>

      {status === "loading" && items.length === 0 ? (
        <div className="rounded-[2rem] bg-white p-8 text-slate-600 shadow-lg shadow-slate-200/60">
          Chargement des projets...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-[2rem] bg-red-50 p-6 text-red-700">{error}</div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {items.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
