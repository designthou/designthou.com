import { create } from "zustand";
import { User } from "@supabase/supabase-js";

/**
 * Session {
 * 	access_token: string
 * 	refresh_token: string
 * 	expires_in: number
 * 	expires_at?: number
 * 	token_type: string
 *	user: User
 * }
 */

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  resetUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));
