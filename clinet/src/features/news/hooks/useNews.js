import { useInfiniteQuery } from "@tanstack/react-query";
import fetchNews from "../services/newsApi";

const useNews = ({ category = "all", limit = 10 } = {}) => {
  return useInfiniteQuery({
    queryKey: ["news", category],

    queryFn: ({ pageParam }) =>
      fetchNews({
        category,
        page: pageParam,
        limit,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      // Because your API can return fewer than 10
      // even when another page exists, don't use
      // data.length to determine this.

      if (lastPage.data?.length === 0) {
        return undefined;
      }

      return allPages.length + 1;
    },

    staleTime: 30 * 60 * 1000,
  });
};

export default useNews;