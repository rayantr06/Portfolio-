import Link from "next/link";

function splitTechnologies(technologies) {
  return technologies.split(",").map((item) => item.trim());
}

export default function ProjectCard({ project, compact = false }) {
  const technologies = splitTechnologies(project.technologies).slice(0, compact ? 3 : 5);

  return (
    <article className="flex h-full flex-col justify-between rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800">
            Projet
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            {project.slug}
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-slate-950">{project.title}</h3>
          <p className="leading-7 text-slate-700">{project.shortDescription}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span
              key={`${project.slug}-${technology}`}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <Link
          href={`/projets/${project.slug}`}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800"
        >
          Voir le detail
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-cyan-700 hover:text-cyan-800"
        >
          GitHub
        </a>
      </div>
    </article>
  );
}
