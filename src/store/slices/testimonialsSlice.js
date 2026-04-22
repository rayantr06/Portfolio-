import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    setTestimonialsLoading: (state) => {
      state.status = "loading";
    },
    setTestimonials: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    addTestimonial: (state, action) => {
      state.items.unshift(action.payload);
      state.status = "succeeded";
      state.error = null;
    },
    updateTestimonial: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
      state.status = "succeeded";
      state.error = null;
    },
    setTestimonialsError: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export const {
  addTestimonial,
  setTestimonials,
  setTestimonialsError,
  setTestimonialsLoading,
  updateTestimonial,
} = testimonialsSlice.actions;

export default testimonialsSlice.reducer;
