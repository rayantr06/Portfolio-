import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedProject: null,
  status: "idle",
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectsLoading: (state) => {
      state.status = "loading";
    },
    setProjects: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    setProjectsError: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export const {
  setProjects,
  setProjectsError,
  setProjectsLoading,
  setSelectedProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
