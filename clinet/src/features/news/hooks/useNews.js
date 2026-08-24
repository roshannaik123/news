import { useQuery } from "@tanstack/react-query";
import fetchNews from "../services/newsApi";

const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
    staleTime: 30 * 60 * 1000,
  });
};

export default useNews;