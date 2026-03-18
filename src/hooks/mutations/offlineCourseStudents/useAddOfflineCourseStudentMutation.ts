import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type OfflineCourseStudentRow } from '@/lib/supabase';
import { queryKey } from '@/constants';
import { OldData } from '@/types';

type Variables = Omit<OfflineCourseStudentRow, 'id' | 'user_id'>;

const add = (data: Variables) => (oldData: OldData<OfflineCourseStudentRow>) => {
	if (oldData.pages.length === 0) {
		return {
			...oldData,
			pages: [[data]],
		};
	}

	const lastPageIndex = oldData.pages.length - 1;

	return {
		...oldData,
		pages: oldData.pages.map((page, index) => (index === lastPageIndex ? [...page, data] : page)),
	};
};

export default function useAddOfflineCourseStudentMutation(handler?: { [key: string]: () => void }) {
	const queryClient = useQueryClient();
	const QUERY_KEY = queryKey.SERVICE.OFFLINE_COURSE_STUDENTS_BY_PAGE;

	return useMutation({
		async mutationFn(variables: Variables) {
			const response = await fetch('/api/service/offline-course/apply', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(variables),
			});

			if (!response.ok) throw new Error('신청 실패');
		},
		async onMutate(variables) {
			await queryClient.cancelQueries({ queryKey: QUERY_KEY });
			const previousData = queryClient.getQueryData(QUERY_KEY);

			if (previousData) {
				queryClient.setQueryData(QUERY_KEY, add(variables));
			}

			return { previousData };
		},
		async onError(error, _, context) {
			if (context?.previousData) {
				console.error(error);

				toast.error('신청하는 데 에러가 발생했습니다.');
				queryClient.setQueryData(QUERY_KEY, context?.previousData);
			}
		},
		async onSuccess() {
			handler?.onSuccess();

			toast.success('성공적으로 신청했습니다.');
		},
		onSettled() {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: QUERY_KEY,
				}),
			]);
		},
	});
}
