"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TestimonialForm from "@/components/testimonials/TestimonialForm";
import apiClient from "@/lib/apiClient";
import {
  setTestimonials,
  setTestimonialsError,
  setTestimonialsLoading,
} from "@/store/slices/testimonialsSlice";

export default function EditTestimonialPage() {
  const params = useParams();
  const testimonialId = Number(params.id);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const { items, status, error } = useSelector((state) => state.testimonials);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!testimonialId || status !== "idle") {
      return;
    }

    async function loadTestimonials() {
      dispatch(setTestimonialsLoading());

      try {
        const response = await apiClient.get("/api/testimonials");
        dispatch(setTestimonials(response.data.data));
        setNotFound(!response.data.data.some((item) => item.id === testimonialId));
      } catch (requestError) {
        dispatch(
          setTestimonialsError(
            requestError.response?.data?.message ||
              "Impossible de charger le temoignage.",
          ),
        );
      }
    }

    loadTestimonials();
  }, [dispatch, status, testimonialId]);

  const testimonial = items.find((item) => item.id === testimonialId);
  const isAuthor = testimonial && currentUser && testimonial.userId === currentUser.id;

  return (
    <section className="space-y-6">
      <Link
        href="/temoignages"
        className="text-sm font-semibold text-cyan-700 hover:text-cyan-800"
      >
        Retour vers les temoignages
      </Link>

      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
          Modification
        </p>
        <h2 className="text-4xl font-semibold text-slate-950">
          Modifier votre temoignage
        </h2>
      </div>

      {status === "loading" ? (
        <div className="rounded-[2rem] bg-white p-8 text-slate-600 shadow-lg shadow-slate-200/60">
          Chargement du temoignage...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-[2rem] bg-red-50 p-6 text-red-700">{error}</div>
      ) : null}

      {notFound ? (
        <div className="rounded-[2rem] bg-white p-8 text-slate-600 shadow-lg shadow-slate-200/60">
          Ce temoignage est introuvable.
        </div>
      ) : null}

      {testimonial && !isAuthor ? (
        <div className="rounded-[2rem] bg-red-50 p-6 text-red-700">
          Vous ne pouvez modifier que votre propre temoignage.
        </div>
      ) : null}

      {testimonial && isAuthor ? (
        <TestimonialForm
          testimonialId={testimonial.id}
          initialValue={testimonial.message}
        />
      ) : null}
    </section>
  );
}
