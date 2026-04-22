import { profile } from "@/lib/content/profile";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          {profile.name} · {profile.title}
        </p>
        <div className="flex flex-wrap gap-4">
          <a className="hover:text-cyan-700" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="hover:text-cyan-700" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="hover:text-cyan-700" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
