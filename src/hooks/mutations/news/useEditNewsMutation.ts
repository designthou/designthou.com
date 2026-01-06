import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type News } from "@/lib/supabase/schema";
import { updateNews } from "@/lib/supabase";
import { queryKey } from "@/constants";
import { OldData } from "@/types/mutation";

type Variables = News;

const edit =
  ({ id, title, url, category, updated_at }: Variables) =>
  (oldData: OldData<News>) => {
    return {
      ...oldData,
      pages: oldData.pages.map((page) =>
        page.map((item) =>
          item.id === id ? { ...item, title, url, category, updated_at } : item,
        ),
      ),
    };
  };

export default function useEditNewsMutation(handler?: () => void) {
  const queryClient = useQueryClient();
  const PAGINATION_QUERY_KEY = queryKey.ADMIN.NEWS_LIST_BY_PAGE;

  return useMutation({
    async mutationFn(variables: Variables) {
      await updateNews({ data: variables });
    },
    async onMutate(variables) {
      await queryClient.cancelQueries({ queryKey: PAGINATION_QUERY_KEY });
      const previousData = queryClient.getQueryData(PAGINATION_QUERY_KEY);

      if (previousData) {
        queryClient.setQueryData(PAGINATION_QUERY_KEY, edit(variables));
      }

      return { previousData };
    },
    async onError(error, _, context) {
      if (context?.previousData) {
        console.error(error);

        toast.error("뉴스를 업데이트 하는 데 에러가 발생했습니다.");
        queryClient.setQueryData(
          queryKey.ADMIN.NEWS_LIST_BY_PAGE,
          context?.previousData,
        );
      }
    },
    onSuccess() {
      handler?.();
      console.log("here");
      toast.success("뉴스를 성공적으로 업데이트 했습니다.");
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
