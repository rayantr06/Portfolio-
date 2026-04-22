import Link from "next/link";
import TestimonialForm from "@/components/testimonials/TestimonialForm";

export default function NewTestimonialPage() {
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
          Nouveau temoignage
        </p>
        <h2 className="text-4xl font-semibold text-slate-950">
          Ajouter un message
        </h2>
      </div>
      <TestimonialForm />
    </section>
  );
}
