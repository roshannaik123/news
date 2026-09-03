import React from "react";
import NewsCard from "./NewsCard";

const NewsGrid = ({ allnews }) => {
  console.log(allnews);
  if (allnews.length == 0) {
    return <div>No articles found...</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {allnews.map((item) => (
        <NewsCard key={item.id} allnews={item} />
      ))}
    </div>
  );
};

export default NewsGrid;
