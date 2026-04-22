"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormError from "@/components/forms/FormError";
import InputField from "@/components/forms/InputField";
import apiClient from "@/lib/apiClient";
import { setAuthError, setCredentials } from "@/store/slices/authSlice";
import { registerSchema } from "@/validations/authSchemas";

const initialForm = {
  prenom: "",
  nom: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setServerError("");

    const validation = registerSchema.safeParse(form);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await apiClient.post("/api/auth/register", form);
      dispatch(setCredentials({ user: response.data.data }));
      router.push("/");
      router.refresh();
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
      setServerError(error.response?.data?.message || "Inscription impossible.");
      dispatch(setAuthError(error.response?.data?.message || "Inscription impossible."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-300/50 sm:p-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
          Nouveau compte
        </p>
        <h1 className="text-3xl font-semibold text-slate-950">Inscription</h1>
        <p className="leading-7 text-slate-600">
          Creez un compte pour consulter les pages protegees et publier un temoignage.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Prenom"
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            placeholder="Rayan"
            error={errors.prenom?.[0]}
          />
          <InputField
            label="Nom"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            placeholder="Terki"
            error={errors.nom?.[0]}
          />
        </div>

        <InputField
          label="Adresse email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="rayan@example.com"
          error={errors.email?.[0]}
        />

        <InputField
          label="Mot de passe"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Au moins 6 caracteres"
          error={errors.password?.[0]}
        />

        <FormError message={serverError} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creation..." : "Creer le compte"}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-600">
        Vous avez deja un compte ?{" "}
        <Link href="/login" className="font-semibold text-cyan-700 hover:text-cyan-800">
          Aller a la connexion
        </Link>
      </p>
    </div>
  );
}
