'use client';

import { AtSign } from 'lucide-react';
import { AnimateLoader, LogoutButton } from '@/components';
import { convertSupabaseDateToShortHumanReadable } from '@/lib/supabase';
import { useAuthStore } from '@/stores';
import { generateGradient } from '@/utils/seedGradient';

export default function AdminRootPage() {
	const user = useAuthStore(({ user }) => user);

	if (!user) {
		return (
			<div className="ui-flex-center w-full h-full text-xs text-gray-700">
				<AnimateLoader /> Loading...
			</div>
		);
	}

	return (
		<div className="flex flex-col items-start gap-8 p-4 w-full h-full">
			{user && (
				<div className="flex flex-col gap-8 p-4 mx-auto bg-light rounded-lg md:min-w-120">
					<div className="flex items-center gap-4">
						<div className="p-4 w-10 h-10 rounded-full" style={{ background: generateGradient(user.email!) }} />
						<div className="flex flex-col gap-2">
							<span className="font-black">{user.user_metadata.nickname}</span>
							<span className="text-xs text-gray-700">{convertSupabaseDateToShortHumanReadable(user.last_sign_in_at!)} 에 로그인</span>
						</div>
					</div>
					<div className="flex items-center gap-2 text-gray-900 ">
						<AtSign size="16" /> <span className="text-sm">{user.email}</span>
					</div>
					<div className="mt-12">
						<LogoutButton />
					</div>
				</div>
			)}
		</div>
	);
}
