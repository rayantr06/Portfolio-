"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectDetails from "@/components/projects/ProjectDetails";
import apiClient from "@/lib/apiClient";
import {
  setProjectsError,
  setProjectsLoading,
  setSelectedProject,
} from "@/store/slices/projectsSlice";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const dispatch = useDispatch();
  const { selectedProject, status, error } = useSelector((state) => state.projects);

  useEffect(() => {
    if (!slug) {
      return;
    }

    if (selectedProject?.slug === slug && status === "succeeded") {
      return;
    }

    async function loadProject() {
      dispatch(setProjectsLoading());

      try {
        const response = await apiClient.get(`/api/projects/${slug}`);
        dispatch(setSelectedProject(response.data.data));
      } catch (requestError) {
        dispatch(
          setProjectsError(
            requestError.response?.data?.message ||
              "Impossible de charger le projet.",
          ),
        );
      }
    }

    loadProject();
  }, [dispatch, selectedProject?.slug, slug, status]);

  return (
    <section className="space-y-6">
      <Link href="/projets" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
        Retour vers les projets
      </Link>

      {status === "loading" ? (
        <div className="rounded-[2rem] bg-white p-8 text-slate-600 shadow-lg shadow-slate-200/60">
          Chargement du projet...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-[2rem] bg-red-50 p-6 text-red-700">{error}</div>
      ) : null}

      {selectedProject && selectedProject.slug === slug ? (
        <ProjectDetails project={selectedProject} />
      ) : null}
    </section>
  );
}
