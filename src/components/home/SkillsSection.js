import { profile } from "@/lib/content/profile";

export default function SkillsSection() {
  return (
    <section className="space-y-5 rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/60 sm:p-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
          Competences
        </p>
        <h3 className="text-2xl font-semibold text-slate-950">
          Technologies et domaines que j&apos;utilise regulierement
        </h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
