import { Skeleton } from '@/components';

export default function UserListLoading() {
	return (
		<section className="p-4">
			<h2 className="font-black font-mono text-xl" aria-label="User List Page Title">
				오프라인 수강생 목록
			</h2>
			<Skeleton className="mt-4 w-50 h-10" />
			<div className="flex flex-col gap-2 mt-4">
				{Array.from({ length: 20 }, (_, idx) => (
					<Skeleton key={idx} className="h-10 rounded-md" />
				))}
			</div>
		</section>
	);
}
