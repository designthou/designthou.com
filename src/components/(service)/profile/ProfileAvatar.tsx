import Image from 'next/image';
import { User } from '@supabase/supabase-js';
import { GradientCircle } from '@/components';

export default function ProfileAvatar({ user, size = 24 }: { user: User | null; size?: number }) {
	return (
		<>
			{user?.user_metadata?.avatar_url ? (
				<Image
					src={user?.user_metadata?.avatar_url}
					alt={`${user?.user_metadata?.name}'s avatar`}
					className="rounded-full"
					width={size}
					height={size}
				/>
			) : user?.user_metadata?.picture ? (
				<Image
					src={user?.user_metadata?.picture}
					alt={`${user?.user_metadata?.name}'s avatar`}
					className="rounded-full"
					width={size}
					height={size}
				/>
			) : (
				<GradientCircle trigger={user?.email ?? ''} className="w-6 h-6" />
			)}
		</>
	);
}
