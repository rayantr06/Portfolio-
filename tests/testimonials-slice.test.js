import { describe, expect, it } from "vitest";
import reducer, {
  addTestimonial,
  setTestimonials,
  setTestimonialsLoading,
  updateTestimonial,
} from "@/store/slices/testimonialsSlice";

describe("testimonialsSlice", () => {
  it("stores the testimonials list", () => {
    const state = reducer(
      undefined,
      setTestimonials([
        { id: 1, message: "Tres bon travail", userId: 1 },
      ]),
    );

    expect(state.items).toHaveLength(1);
    expect(state.status).toBe("succeeded");
  });

  it("adds a new testimonial to the state", () => {
    const state = reducer(
      undefined,
      addTestimonial({ id: 2, message: "Interface claire", userId: 1 }),
    );

    expect(state.items[0].id).toBe(2);
  });

  it("updates an existing testimonial", () => {
    const initialState = reducer(
      undefined,
      setTestimonials([{ id: 1, message: "Ancien message", userId: 1 }]),
    );

    const state = reducer(
      initialState,
      updateTestimonial({ id: 1, message: "Message mis a jour", userId: 1 }),
    );

    expect(state.items[0].message).toBe("Message mis a jour");
  });

  it("tracks testimonial loading state", () => {
    const state = reducer(undefined, setTestimonialsLoading());

    expect(state.status).toBe("loading");
  });
});
