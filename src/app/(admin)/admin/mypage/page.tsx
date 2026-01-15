'use client';

import { AtSign } from 'lucide-react';
import { SiteConfig } from '@/app/config';
import { AnimateLoaderWithText, GradientCircle, LogoutButton } from '@/components';
import { convertSupabaseDateToShortHumanReadable } from '@/lib/supabase';
import { useAuthStore } from '@/stores';

export default function MyPage() {
	const user = useAuthStore(({ user }) => user);

	if (!user) {
		return <AnimateLoaderWithText />;
	}

	return (
		<section className="p-4">
			<div className="flex flex-col items-start gap-8 w-full h-full">
				{user && (
					<div className="flex flex-col gap-8 p-4 mx-auto w-full bg-light rounded-lg md:w-auto md:min-w-120">
						<div className="relative flex items-center gap-4">
							<GradientCircle trigger={user?.email ?? SiteConfig.url} />
							<div className="flex flex-col gap-2">
								<span className="font-black" aria-label="user nickname">
									{user.user_metadata.nickname}
								</span>
								<span className="text-xs text-gray-700">{convertSupabaseDateToShortHumanReadable(user.last_sign_in_at!)} 에 로그인</span>
							</div>
							<span className="absolute top-4 right-4 px-2 py-1 text-xs bg-black text-white rounded-full" aria-label="user role">
								{user?.user_metadata?.role ?? 'admin'}
							</span>
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
		</section>
	);
}
