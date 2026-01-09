import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type News } from "@/lib/supabase/schema";
import { deleteNews } from "@/lib/supabase";
import { queryKey } from "@/constants";
import { OldData } from "@/types/mutation";

type Variables = Pick<News, "id">;

const remove =
  ({ id }: Variables) =>
  (oldData: OldData<News>) => {
    return {
      ...oldData,
      pages: oldData.pages.map((page) => page.filter((item) => item.id !== id)),
    };
  };

export default function useDeleteNewsMutation(handler?: () => void) {
  const queryClient = useQueryClient();
  const PAGINATION_QUERY_KEY = queryKey.ADMIN.NEWS_LIST_BY_PAGE;

  return useMutation({
    async mutationFn(variables: Variables) {
      await deleteNews(variables);
    },
    async onMutate(variables) {
      await queryClient.cancelQueries({ queryKey: PAGINATION_QUERY_KEY });
      const previousData = queryClient.getQueryData(PAGINATION_QUERY_KEY);

      if (previousData) {
        queryClient.setQueryData(PAGINATION_QUERY_KEY, remove(variables));
      }

      return { previousData };
    },
    async onError(error, _, context) {
      if (context?.previousData) {
        console.error(error);

        toast.error("뉴스를 삭제하는 데 에러가 발생했습니다.");
        queryClient.setQueryData(
          queryKey.ADMIN.NEWS_LIST_BY_PAGE,
          context?.previousData
        );
      }
    },
    onSuccess() {
      handler?.();

      toast.success("뉴스를 성공적으로 삭제했습니다.");
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
