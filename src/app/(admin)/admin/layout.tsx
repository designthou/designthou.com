import React from 'react';
import { AdminMain, AdminNav, Aside } from '@/components';
import { AuthProvider } from '@/providers';
import { createClient } from '@/lib/supabase/server';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const supabaseServer = await createClient();
	const {
		data: { user },
	} = await supabaseServer.auth.getUser();

	return (
		<div className="flex flex-col h-svh min-h-screen">
			<div className="flex flex-1">
				<AuthProvider>
					<Aside user={user} />
					<AdminNav />
					<AdminMain>{children}</AdminMain>
				</AuthProvider>
			</div>
		</div>
	);
}
