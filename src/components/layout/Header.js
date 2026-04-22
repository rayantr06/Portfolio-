"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/lib/apiClient";
import { logout } from "@/store/slices/authSlice";

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Projets" },
  { href: "/temoignages", label: "Temoignages" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  async function handleLogout() {
    try {
      await apiClient.post("/api/auth/logout");
    } finally {
      dispatch(logout());
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Portfolio Next.js
          </p>
          <h1 className="text-xl font-semibold text-slate-900">Rayan Terki</h1>
        </div>

        <nav className="flex flex-wrap items-center gap-3">
          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-cyan-700 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="ml-0 flex items-center gap-3 sm:ml-2">
            <span className="text-sm text-slate-600">
              {user ? `${user.prenom} ${user.nom}` : "Session active"}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-700 hover:text-cyan-700"
            >
              Deconnexion
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
