import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading: (state) => {
      state.status = "loading";
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = Boolean(action.payload.user);
      state.status = "succeeded";
      state.error = null;
      state.initialized = true;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
      state.initialized = true;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    setAuthInitialized: (state) => {
      state.initialized = true;
    },
    logout: () => ({ ...initialState, initialized: true }),
  },
});

export const {
  clearAuthError,
  logout,
  setAuthError,
  setAuthInitialized,
  setAuthLoading,
  setCredentials,
} = authSlice.actions;

export default authSlice.reducer;
