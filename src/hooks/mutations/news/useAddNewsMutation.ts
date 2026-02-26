import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type NewsRow, addNews } from '@/lib/supabase';
import { queryKey } from '@/constants';
import { OldData } from '@/types';

type Variables = Omit<NewsRow, 'id'>;

const add = (data: Variables) => (oldData: OldData<NewsRow>) => {
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

export default function useAddNewsMutation(handler?: () => void) {
	const queryClient = useQueryClient();
	const PAGINATION_QUERY_KEY = queryKey.ADMIN.NEWS_LIST_BY_PAGE;

	return useMutation({
		async mutationFn(variables: Variables) {
			await addNews(variables);
		},
		async onMutate(variables) {
			await queryClient.cancelQueries({ queryKey: PAGINATION_QUERY_KEY });
			const previousData = queryClient.getQueryData(PAGINATION_QUERY_KEY);

			if (previousData) {
				queryClient.setQueryData(PAGINATION_QUERY_KEY, add(variables));
			}

			return { previousData };
		},
		async onError(error, _, context) {
			if (context?.previousData) {
				console.error(error);

				toast.error('뉴스를 추가하는 데 에러가 발생했습니다.');
				queryClient.setQueryData(queryKey.ADMIN.NEWS_LIST_BY_PAGE, context?.previousData);
			}
		},
		onSuccess() {
			handler?.();

			toast.success('뉴스를 성공적으로 추가했습니다.');
		},
		onSettled() {
			handler?.();
			return Promise.all([
				queryClient.invalidateQueries({ queryKey: PAGINATION_QUERY_KEY }),
				queryClient.invalidateQueries({
					queryKey: queryKey.ADMIN.NEWS_LIST_PAGE_INFO,
				}),
			]);
		},
	});
}
