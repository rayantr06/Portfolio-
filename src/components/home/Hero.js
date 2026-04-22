import Image from "next/image";
import { profile } from "@/lib/content/profile";

export default function Hero() {
  return (
    <section className="grid gap-8 rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/60 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
            Portfolio personnel
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {profile.name}
          </h2>
          <p className="text-lg text-slate-700">{profile.title}</p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
          <span className="rounded-full bg-slate-100 px-4 py-2">{profile.location}</span>
          <span className="rounded-full bg-slate-100 px-4 py-2">{profile.availability}</span>
          <span className="rounded-full bg-slate-100 px-4 py-2">
            {profile.languages.join(" · ")}
          </span>
        </div>

        <div className="space-y-4 text-base leading-8 text-slate-700">
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {profile.strengths.map((item) => (
            <span
              key={item}
              className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-800"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 rounded-[2rem] bg-slate-950 p-6 text-white">
        <div className="relative h-72 w-full max-w-xs overflow-hidden rounded-[1.75rem] border border-white/10">
          <Image
            src="/profile-rayan.jpeg"
            alt="Photo de Rayan Terki"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
            priority
          />
        </div>
        <p className="text-center text-sm leading-7 text-slate-300">
          Portfolio developpe dans le cadre du cours Next.js avec backend API,
          routes protegees, formulaires valides et gestion d&apos;etat Redux.
        </p>
      </div>
    </section>
  );
}
