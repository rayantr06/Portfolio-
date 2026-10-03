function splitTechnologies(technologies) {
  return technologies.split(",").map((item) => item.trim());
}

export default function ProjectDetails({ project }) {
  return (
    <section className="space-y-8 rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/60 sm:p-8">
      <div className="space-y-4">
        <span className="rounded-full bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-800">
          {project.slug}
        </span>
        <h2 className="text-4xl font-semibold tracking-tight text-slate-950">
          {project.title}
        </h2>
        <p className="max-w-3xl text-lg leading-8 text-slate-700">
          {project.fullDescription}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">Mon role</h3>
          <p className="mt-3 leading-7 text-slate-700">{project.role}</p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">Technologies utilisees</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {splitTechnologies(project.technologies).map((technology) => (
              <span
                key={`${project.slug}-${technology}`}
                className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {project.githubUrl ? <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800"
        >
          Ouvrir le depot GitHub
        </a> : null}
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-700 hover:text-cyan-700"
          >
            Voir le site public
          </a>
        ) : null}
      </div>
    </section>
  );
}
