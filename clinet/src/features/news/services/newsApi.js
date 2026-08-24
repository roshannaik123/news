import apiClient from "../../../lib/axios";

const fetchNews = async () => {
  const response = await apiClient.get("/news");

  return response.data.data;
};

export default fetchNews;