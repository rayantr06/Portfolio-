import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import projectsReducer from "@/store/slices/projectsSlice";
import testimonialsReducer from "@/store/slices/testimonialsSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      projects: projectsReducer,
      testimonials: testimonialsReducer,
    },
  });
}
