import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

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
	isLoading: boolean;
	setUser: (user: User | null) => void;
	setIsLoading: (value: boolean) => void;
	resetUser: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
	user: null,
	isLoading: true,
	setUser: user => set({ user }),
	setIsLoading: (value: boolean) => set({ isLoading: value }),
	resetUser: () => set({ user: null }),
}));
