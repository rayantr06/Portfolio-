"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/lib/apiClient";
import { logout, setCredentials } from "@/store/slices/authSlice";

export default function AuthBootstrap() {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.auth.initialized);

  useEffect(() => {
    if (initialized) {
      return undefined;
    }

    async function bootstrapAuth() {
      try {
        const response = await apiClient.get("/api/auth/me");
        dispatch(setCredentials({ user: response.data.data }));
      } catch {
        dispatch(logout());
      }
    }

    bootstrapAuth();
  }, [dispatch, initialized]);

  return null;
}
