"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextAreaField from "@/components/forms/TextAreaField";
import FormError from "@/components/forms/FormError";
import apiClient from "@/lib/apiClient";
import { testimonialSchema } from "@/validations/testimonialSchemas";
import {
  addTestimonial,
  updateTestimonial,
} from "@/store/slices/testimonialsSlice";
import { useDispatch } from "react-redux";

export default function TestimonialForm({ initialValue = "", testimonialId = null }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setServerError("");

    const payload = { message };
    const validation = testimonialSchema.safeParse(payload);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      if (testimonialId) {
        const response = await apiClient.put(`/api/testimonials/${testimonialId}`, payload);
        dispatch(updateTestimonial(response.data.data));
      } else {
        const response = await apiClient.post("/api/testimonials", payload);
        dispatch(addTestimonial(response.data.data));
      }

      router.push("/temoignages");
      router.refresh();
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
      setServerError(
        error.response?.data?.message || "Impossible d'enregistrer le temoignage.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/60 sm:p-8">
      <TextAreaField
        label="Votre message"
        name="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Partagez votre retour sur ce portfolio."
        error={errors.message?.[0]}
        rows={7}
      />

      <FormError message={serverError} />

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting
          ? "Enregistrement..."
          : testimonialId
            ? "Mettre a jour le temoignage"
            : "Publier le temoignage"}
      </button>
    </form>
  );
}
