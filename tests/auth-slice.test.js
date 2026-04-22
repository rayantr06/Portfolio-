import { describe, expect, it } from "vitest";
import reducer, {
  clearAuthError,
  setCredentials,
  setAuthLoading,
  logout,
} from "@/store/slices/authSlice";

describe("authSlice", () => {
  it("stores the authenticated user", () => {
    const state = reducer(
      undefined,
      setCredentials({
        user: { id: 1, prenom: "Rayan", nom: "Terki", email: "rayan@example.com" },
      }),
    );

    expect(state.user?.email).toBe("rayan@example.com");
    expect(state.isAuthenticated).toBe(true);
    expect(state.status).toBe("succeeded");
  });

  it("clears the session on logout", () => {
    const authenticatedState = reducer(
      undefined,
      setCredentials({
        user: { id: 1, prenom: "Rayan", nom: "Terki", email: "rayan@example.com" },
      }),
    );

    const state = reducer(authenticatedState, logout());

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("tracks loading and clears errors when asked", () => {
    const loadingState = reducer(undefined, setAuthLoading());
    const finalState = reducer(
      { ...loadingState, error: "Erreur" },
      clearAuthError(),
    );

    expect(loadingState.status).toBe("loading");
    expect(finalState.error).toBeNull();
  });
});
