"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TestimonialList from "@/components/testimonials/TestimonialList";
import apiClient from "@/lib/apiClient";
import {
  setTestimonials,
  setTestimonialsError,
  setTestimonialsLoading,
} from "@/store/slices/testimonialsSlice";

export default function TestimonialsPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const { items, status, error } = useSelector((state) => state.testimonials);

  useEffect(() => {
    if (status !== "idle") {
      return;
    }

    async function loadTestimonials() {
      dispatch(setTestimonialsLoading());

      try {
        const response = await apiClient.get("/api/testimonials");
        dispatch(setTestimonials(response.data.data));
      } catch (requestError) {
        dispatch(
          setTestimonialsError(
            requestError.response?.data?.message ||
              "Impossible de charger les temoignages.",
          ),
        );
      }
    }

    loadTestimonials();
  }, [dispatch, status]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
            Temoignages
          </p>
          <h2 className="text-4xl font-semibold text-slate-950">
            Avis laisses par les visiteurs connectes
          </h2>
          <p className="max-w-3xl leading-7 text-slate-700">
            Les temoignages sont geres via le backend Next API. Chaque utilisateur peut
            ajouter un temoignage et modifier uniquement celui qu&apos;il a cree.
          </p>
        </div>

        <Link
          href="/temoignages/nouveau"
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800"
        >
          Laisser un temoignage
        </Link>
      </div>

      {status === "loading" ? (
        <div className="rounded-[2rem] bg-white p-8 text-slate-600 shadow-lg shadow-slate-200/60">
          Chargement des temoignages...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-[2rem] bg-red-50 p-6 text-red-700">{error}</div>
      ) : null}

      <TestimonialList testimonials={items} currentUserId={currentUser?.id} />
    </section>
  );
}
