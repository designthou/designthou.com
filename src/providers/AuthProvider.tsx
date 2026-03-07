'use client';

import React from 'react';
import { useAuthStore } from '@/stores';
import { createClient } from '@/lib/supabase/client';

interface AuthProviderProps {
	children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
	const supabase = createClient();

	const setUser = useAuthStore(({ setUser }) => setUser);
	const setIsLoading = useAuthStore(({ setIsLoading }) => setIsLoading);

	React.useEffect(() => {
		const initialize = async () => {
			const { data } = await supabase.auth.getUser();

			setUser(data.user);
			setIsLoading(false);
		};

		initialize();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setUser]);

	return <>{children}</>;
}
