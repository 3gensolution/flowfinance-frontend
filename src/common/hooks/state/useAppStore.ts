import { create } from "zustand";
import { AppState } from "@/common/types";

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
