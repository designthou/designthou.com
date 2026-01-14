'use client';

import React from 'react';
import { useAuthStore } from '@/stores';
import { createClient } from '@/lib/supabase/client';

type Props = {
	children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
	const setUser = useAuthStore(({ setUser }) => setUser);
	const supabase = createClient();

	React.useEffect(() => {
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
