import { z } from "zod";

export const testimonialSchema = z.object({
  message: z
    .string()
    .trim()
    .min(10, "Le temoignage doit contenir au moins 10 caracteres."),
});
