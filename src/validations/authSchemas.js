import { z } from "zod";

export const registerSchema = z.object({
  prenom: z.string().trim().min(2, "Le prenom doit contenir au moins 2 caracteres."),
  nom: z.string().trim().min(2, "Le nom doit contenir au moins 2 caracteres."),
  email: z
    .string()
    .trim()
    .min(1, "L'email est obligatoire.")
    .email("Veuillez entrer une adresse email valide."),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caracteres."),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'email est obligatoire.")
    .email("Veuillez entrer une adresse email valide."),
  password: z.string().min(1, "Le mot de passe est obligatoire."),
});
