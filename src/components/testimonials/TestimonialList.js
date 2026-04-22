import Link from "next/link";

export default function TestimonialList({ testimonials, currentUserId }) {
  if (testimonials.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
        Aucun temoignage pour le moment. Soyez le premier a en laisser un.
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {testimonials.map((testimonial) => {
        const isAuthor = testimonial.userId === currentUserId;

        return (
          <article
            key={testimonial.id}
            className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/60"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">
                  {testimonial.authorName}
                </h3>
                <p className="leading-7 text-slate-700">{testimonial.message}</p>
                <p className="text-sm text-slate-500">
                  Mis a jour le {testimonial.updatedLabel}
                </p>
              </div>
              {isAuthor ? (
                <Link
                  href={`/temoignages/${testimonial.id}/modifier`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-700 hover:text-cyan-700"
                >
                  Modifier
                </Link>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
