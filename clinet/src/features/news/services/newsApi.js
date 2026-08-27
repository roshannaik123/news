import apiClient from "../../../lib/axios";

const fetchNews = async ({category="all",page=1,limit=10,date}) => {
  const response = await apiClient.get("/news",{
    params:{
      category,page,limit,date,
    }
  });

  return response.data.data;
};
  
export default fetchNews;