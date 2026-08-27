import React, { useMemo, useState } from "react";
import CategoryTabs from "../features/news/components/CategoryTabs";
import NewsGrid from "../features/news/components/NewsGrid";
import useNews from "../features/news/hooks/useNews";

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const {
    data: news = [],
    isLoading,
    isError,
    error,
  } = useNews({
    category: selectedCategory.toLocaleLowerCase(),
    page: page,
    limit: 10,
  });

  const filteredNews = useMemo(() => {
    if (selectedCategory === "All") {
      return news;
    }

    return news.filter((item) => item.category === selectedCategory);
  }, [news, selectedCategory]);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading news...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Failed to load news: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-gray-500 tracking-widest">DAILY EDITION</p>

          <h1 className="text-4xl md:text-6xl font-bold mt-2">WebDev Times</h1>

          <p className="text-gray-400 mt-3">
            Latest news from Web Development and AI.
          </p>
        </header>

        <div className="mb-8">
          <CategoryTabs
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <NewsGrid news={filteredNews} />
        <button onClick={() => setPage((prev) => prev + 1)}>Load More</button>
      </div>
    </div>
  );
};

export default News;
