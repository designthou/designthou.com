import { useSuspenseQuery } from "@tanstack/react-query";
import { getCalculatedTotalPage } from "../utils/pagination";

interface UseGetPaginationInfo {
  queryKey: ReadonlyArray<unknown>;
  queryFn: () => Promise<string | Record<string, unknown>[]>;
  staleTime?: number;
  pageSize: number;
}

const DEFAULT_STALE_TIME = 1000 * 3;

export default function useGetPaginationInfo({
  queryKey,
  queryFn,
  staleTime = DEFAULT_STALE_TIME,
  pageSize,
}: UseGetPaginationInfo) {
  const { data: pageInfo } = useSuspenseQuery({
    queryKey,
    queryFn,
    staleTime,
  });

  const calculatedTotalPage = getCalculatedTotalPage(pageInfo, pageSize);

  return {
    pageInfo,
    calculatedTotalPage,
  };
}
