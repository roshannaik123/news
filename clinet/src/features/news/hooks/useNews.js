import { useQuery } from "@tanstack/react-query";
import fetchNews from "../services/newsApi";

const useNews = ({category="all",page=1,limit=10}={}) => {
  return useQuery({
        queryKey: ["news", category, page, limit],
    queryFn: ()=>fetchNews({category,page,limit}),
    staleTime: 30 * 60 * 1000,
  });
};

export default useNews;