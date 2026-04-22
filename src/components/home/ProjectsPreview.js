"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "@/components/projects/ProjectCard";
import apiClient from "@/lib/apiClient";
import {
  setProjects,
  setProjectsError,
  setProjectsLoading,
} from "@/store/slices/projectsSlice";

export default function ProjectsPreview() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.projects);

  useEffect(() => {
    if (items.length > 0 || status === "loading") {
      return;
    }

    async function loadProjects() {
      dispatch(setProjectsLoading());

      try {
        const response = await apiClient.get("/api/projects");
        dispatch(setProjects(response.data.data));
      } catch (error) {
        dispatch(
          setProjectsError(
            error.response?.data?.message || "Impossible de charger les projets.",
          ),
        );
      }
    }

    loadProjects();
  }, [dispatch, items.length, status]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
            Projets
          </p>
          <h3 className="text-2xl font-semibold text-slate-950">
            Deux realisations presentes depuis le backend
          </h3>
        </div>
        <Link
          href="/projets"
          className="text-sm font-semibold text-cyan-700 hover:text-cyan-800"
        >
          Voir tous les projets
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {items.slice(0, 2).map((project) => (
          <ProjectCard key={project.slug} project={project} compact />
        ))}
      </div>
    </section>
  );
}
