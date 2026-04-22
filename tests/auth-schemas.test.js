import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "@/validations/authSchemas";

describe("registerSchema", () => {
  it("rejects empty required fields", () => {
    const result = registerSchema.safeParse({
      prenom: "",
      nom: "",
      email: "not-an-email",
      password: "123",
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.prenom?.[0]).toBeTruthy();
    expect(result.error.flatten().fieldErrors.nom?.[0]).toBeTruthy();
    expect(result.error.flatten().fieldErrors.email?.[0]).toBeTruthy();
    expect(result.error.flatten().fieldErrors.password?.[0]).toBeTruthy();
  });

  it("accepts a valid registration payload", () => {
    const result = registerSchema.safeParse({
      prenom: "Rayan",
      nom: "Terki",
      email: "rayan@example.com",
      password: "secure123",
    });

    expect(result.success).toBe(true);
  });
});

describe("loginSchema", () => {
  it("rejects an invalid email and missing password", () => {
    const result = loginSchema.safeParse({
      email: "wrong",
      password: "",
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.email?.[0]).toBeTruthy();
    expect(result.error.flatten().fieldErrors.password?.[0]).toBeTruthy();
  });
});
