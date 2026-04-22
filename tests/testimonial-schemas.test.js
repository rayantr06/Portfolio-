import { describe, expect, it } from "vitest";
import { testimonialSchema } from "@/validations/testimonialSchemas";

describe("testimonialSchema", () => {
  it("rejects empty and too-short messages", () => {
    const result = testimonialSchema.safeParse({
      message: "ok",
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.message?.[0]).toBeTruthy();
  });

  it("accepts a message with enough content", () => {
    const result = testimonialSchema.safeParse({
      message: "Projet tres bien structure et facile a utiliser.",
    });

    expect(result.success).toBe(true);
  });
});
