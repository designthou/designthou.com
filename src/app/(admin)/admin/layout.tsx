import React from 'react'
import { AdminMain, AdminNav, Aside } from '@/components'
import AuthProvider from '@/providers/AuthProvider'

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col h-svh min-h-screen">
			<div className="flex flex-1">
				<AuthProvider>
					<Aside />
					<AdminNav />
					<AdminMain>{children}</AdminMain>
				</AuthProvider>
			</div>
		</div>
	)
}
